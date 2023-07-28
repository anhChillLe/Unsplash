package com.bap.unsplash.modules;

import android.content.Intent;
import androidx.annotation.NonNull;
import com.bap.unsplash.services.WallpaperService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class WallpaperModule extends ReactContextBaseJavaModule {
    static String MODULE_NAME = "WallpaperModule";
    ReactApplicationContext context;

    public WallpaperModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void setWallpaper(String path) {
        Intent intent = new Intent(context, WallpaperService.class);
        intent.setAction(WallpaperService.ACTION_SET_WALLPAPER);
        intent.putExtra("path", path);
        context.startService(intent);
    }

    @ReactMethod()
    public void setWallpaperFromStream(String url) {
        Intent intent = new Intent(context, WallpaperService.class);
        intent.setAction(WallpaperService.ACTION_SET_WALLPAPER_FROM_STREAM);
        intent.putExtra("url", url);
        context.startService(intent);
    }

    @ReactMethod
    public void downloadWithService(String url){
        Intent intent = new Intent(context, WallpaperService.class);
        intent.setAction(WallpaperService.ACTION_DOWNLOAD);
        intent.putExtra("url", url);
        context.startService(intent);
    }

    @ReactMethod
    public void download(String url){

    }
}
