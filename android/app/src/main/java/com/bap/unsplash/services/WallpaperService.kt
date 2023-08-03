package com.bap.unsplash.services

import android.app.DownloadManager
import android.app.Notification
import android.app.Service
import android.app.WallpaperManager
import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.IBinder
import android.util.Log
import android.widget.Toast
import androidx.core.app.NotificationCompat
import androidx.lifecycle.LifecycleService
import androidx.lifecycle.lifecycleScope
import com.bap.unsplash.R
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.IOException
import java.net.URL
import java.util.Date

class WallpaperService : LifecycleService() {
    companion object {
        const val ACTION_SET_WALLPAPER = "ACTION_SET_WALLPAPER"
        const val ACTION_SET_WALLPAPER_FROM_STREAM = "ACTION_SET_WALLPAPER_FROM_STREAM"
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
            ACTION_SET_WALLPAPER -> {
                val path = intent.getStringExtra("path")
                if (path != null) {
                    setWallpaper(path)
                }
            }

            ACTION_SET_WALLPAPER_FROM_STREAM -> {
                val url = intent.getStringExtra("url")
                if (url != null) {
                    setWallpaperFromStream(url)
                }
            }
        }

        return START_NOT_STICKY
    }

    private fun setWallpaper(path: String) {
        val wallpaperManager = WallpaperManager.getInstance(this)
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return
        if (!wallpaperManager.isWallpaperSupported) return

        startForeground(1, notification)
        val bitmap = BitmapFactory.decodeFile(path)
        wallpaperManager.setBitmap(bitmap)
        stopSelf()
    }

    private fun setWallpaperFromStream(url: String) {
        val wallpaperManager = WallpaperManager.getInstance(this)
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return
        if (!wallpaperManager.isWallpaperSupported) return

        lifecycleScope.launch(Dispatchers.IO) {
            startForeground(1, notification)
            try {
                val imgUrl = URL(url)
                val inputStream = imgUrl.openStream()
                val bitmap = BitmapFactory.decodeStream(inputStream)
                wallpaperManager.setBitmap(bitmap)
            } catch (e: IOException) {
                Toast.makeText(this@WallpaperService, e.message, Toast.LENGTH_SHORT).show()
            }
            stopSelf()
        }
    }
}