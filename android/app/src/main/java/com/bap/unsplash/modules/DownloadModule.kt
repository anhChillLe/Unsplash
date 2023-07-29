package com.bap.unsplash.modules

import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Environment
import com.bap.unsplash.services.DownloadService
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.util.Date

class DownloadModule(
    private val context: ReactApplicationContext
) : ReactContextBaseJavaModule(context) {
    companion object {
        const val MODULE_NAME = "DownloadModule"
    }

    private val downloadManager: DownloadManager by lazy { context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager }

    override fun getName() = MODULE_NAME

    @ReactMethod
    fun downloadWithService(url: String) {
        val intent = Intent(context, DownloadService::class.java)
        intent.action = DownloadService.ACTION_DOWNLOAD
        intent.putExtra("url", url)
        context.startService(intent)
    }

    @ReactMethod
    fun download(
        url: String,
        name: String = Date().time.toString(),
    ): Long {
        val uri = Uri.parse(url)
        val picturesPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).absolutePath
        val path = "$picturesPath/ChillPaper/$name.jpg"
        val fileUri = Uri.fromFile(File(path))
        val request = DownloadManager.Request(uri)
        request.setTitle("Downloading photos")
            .setDestinationUri(fileUri)
            .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            .setMimeType("image/jpeg")
        return downloadManager.enqueue(request)
    }
}

