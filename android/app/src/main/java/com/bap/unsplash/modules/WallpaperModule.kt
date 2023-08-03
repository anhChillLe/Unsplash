package com.bap.unsplash.modules

import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import com.bap.unsplash.services.WallpaperService
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WallpaperModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    companion object {
        const val MODULE_NAME = "WallpaperModule"
    }
    override fun getName() = MODULE_NAME

    @ReactMethod
    fun setWallpaper(path: String) {
        val intent = Intent(context, WallpaperService::class.java)
        intent.action = WallpaperService.ACTION_SET_WALLPAPER
        intent.putExtra("path", path)
        context.startService(intent)
    }

    @ReactMethod
    fun setWallpaperFromStream(url: String) {
        val intent = Intent(context, WallpaperService::class.java)
        intent.action = WallpaperService.ACTION_SET_WALLPAPER_FROM_STREAM
        intent.putExtra("url", url)
        context.startService(intent)
    }
}