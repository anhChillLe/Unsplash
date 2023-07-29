package com.bap.unsplash.services

import android.app.DownloadManager
import android.app.Notification
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.lifecycle.LifecycleService
import androidx.lifecycle.lifecycleScope
import com.bap.unsplash.R
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.Date

class DownloadService : LifecycleService() {
    companion object {
        const val ACTION_DOWNLOAD = "ACTION_DOWNLOAD"
    }

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
        if (intent == null) return START_NOT_STICKY

        when (intent.action) {
            ACTION_DOWNLOAD -> {
                val url = intent.getStringExtra("url")
                if (url != null) {
                    download(url)
                }
            }
        }

        return START_NOT_STICKY
    }

    private fun download(url: String, name: String = Date().time.toString()) {
        lifecycleScope.launch(Dispatchers.IO) {
            startForeground(1, notification)
            val downloadManager = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            val uri = Uri.parse(url)
            val request = DownloadManager.Request(uri)
                .setDestinationInExternalFilesDir(
                    this@DownloadService,
                    "Pictures",
                    name
                )
            downloadManager.enqueue(request)
            stopSelf()
        }
    }
}