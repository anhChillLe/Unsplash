package com.bap.unsplash

import com.bap.unsplash.modules.DownloadModule
import com.bap.unsplash.modules.WallpaperModule
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class MyAppPackages : ReactPackage {
    override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        modules.add(WallpaperModule(context))
        modules.add(DownloadModule(context))
        return modules
    }

    override fun createViewManagers(context: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}