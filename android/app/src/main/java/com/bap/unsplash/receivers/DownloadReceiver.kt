package com.bap.unsplash.receivers

import android.app.DownloadManager
import android.app.WallpaperManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import android.os.Build
import android.util.Log
import com.bap.unsplash.modules.WallpaperModule
import java.io.File

class DownloadReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        if (context == null || intent == null) return
        if (intent.action != DownloadManager.ACTION_DOWNLOAD_COMPLETE) return
        val downloadId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
        Log.d("DownloadId", downloadId.toString())
        setWallpaper(downloadId, context)
    }

    private fun setWallpaper(id: Long, context: Context){
        val manager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        val uri = manager.getUriForDownloadedFile(id)
        val file = File(uri.path)
        val fileName = file.nameWithoutExtension
        if(fileName.contains("wallpaper")){
            val wallpaperManager = WallpaperManager.getInstance(context)
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (wallpaperManager.isWallpaperSupported) {
                    val bitmap = BitmapFactory.decodeFile(uri.path)
                    wallpaperManager.setBitmap(bitmap)
                }
            }
        }
    }
}