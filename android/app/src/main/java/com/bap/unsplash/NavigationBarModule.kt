package com.bap.unsplash

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class NavigationBarModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    override fun getName() = "NavigationBarModule"

    fun changeNavigationBarColor(isDarkMode: Boolean){
        
    }
}