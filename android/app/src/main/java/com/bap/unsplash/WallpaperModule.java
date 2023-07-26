package com.bap.unsplash;

import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;

public class WallpaperModule extends ReactContextBaseJavaModule {
    static String MODULE_NAME = "WallpaperModule";
    ReactApplicationContext context;

    WallpaperModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void setWallpaper(String uri) throws IOException {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return;

        WallpaperManager wallpaperManager = WallpaperManager.getInstance(context);
        if (!wallpaperManager.isWallpaperSupported()) return;
        Bitmap bitmap = BitmapFactory.decodeFile(uri);
        if (bitmap != null) {
            wallpaperManager.setBitmap(bitmap);
        }
    }

    @ReactMethod
    public void toast(String message) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
    }
}
