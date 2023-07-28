package com.bap.unsplash.modules

import android.content.Intent
import com.bap.unsplash.services.DownloadService
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DownloadModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        const val MODULE_NAME = "DownloadModule"
    }

    override fun getName() = MODULE_NAME

    @ReactMethod
    fun downloadWithService(url: String) {
        val intent = Intent(context, DownloadService::class.java)
        intent.action = DownloadService.ACTION_DOWNLOAD
        intent.putExtra("url", url)
        context.startService(intent)
    }

    @ReactMethod
    fun download(url: String) {

    }
}

