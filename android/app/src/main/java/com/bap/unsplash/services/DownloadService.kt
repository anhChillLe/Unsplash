package com.bap.unsplash.services

import android.app.DownloadManager
import android.app.Notification
import android.app.Service
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.lifecycle.LifecycleService
import androidx.lifecycle.lifecycleScope
import androidx.media3.database.StandaloneDatabaseProvider
import androidx.media3.datasource.cache.SimpleCache
import com.bap.unsplash.R
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.Date

class DownloadService : LifecycleService() {
    companion object {
        const val ACTION_DOWNLOAD = "ACTION_DOWNLOAD"
    }

    // Note: This should be a singleton in your app.
   val databaseProvider = StandaloneDatabaseProvider(this)

// A download cache should not evict media, so should use a NoopCacheEvictor.
    val downloadCache = SimpleCache(downloadDirectory, NoOpCacheEvictor(), databaseProvider)

// Create a factory for reading the data from the network.
    val dataSourceFactory = DefaultHttpDataSource.Factory()

    // Choose an executor for downloading data. Using Runnable::run will cause each download task to
// download data on its own thread. Passing an executor that uses multiple threads will speed up
// download tasks that can be split into smaller parts for parallel execution. Applications that
// already have an executor for background downloads may wish to reuse their existing executor.
    val downloadExecutor = Executor(Runnable::run)

// Create the download manager.
    val downloadManager =     DownloadManager(context, databaseProvider, downloadCache, dataSourceFactory, downloadExecutor)

// Optionally, properties can be assigned to configure the download manager.
    downloadManager.requirements = requirements
    downloadManager.maxParallelDownloads = 3



    private val notification: Notification
        get() {
            return NotificationCompat.Builder(this, getString(R.string.channel_download))
                .setContentTitle("Unsplash")
                .setContentText("Downloading image")
                .setSmallIcon(R.drawable.wallpaper)
                .build()
        }

    override fun onBind(intent: Intent): IBinder? {
        super.onBind(intent)
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        super.onStartCommand(intent, flags, startId)
        if(intent == null) return START_NOT_STICKY

        when(intent.action){
            ACTION_DOWNLOAD -> {
                val url = intent.getStringExtra("url")
                if (url != null) {
                    download(url)
                }
            }
        }

        return START_NOT_STICKY
    }

    private fun download(url: String) {
        lifecycleScope.launch(Dispatchers.IO) {
            startForeground(1, notification)
            val downloadManager = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            val uri = Uri.parse(url)
            val request = DownloadManager.Request(uri)
                .setDestinationInExternalFilesDir(
                    this@DownloadService,
                    "Pictures",
                    Date().time.toString()
                )
            downloadManager.enqueue(request)
            stopSelf()
        }
    }
}