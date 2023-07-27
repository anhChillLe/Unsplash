package com.bap.unsplash.modules;

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
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class WallpaperModule extends ReactContextBaseJavaModule {
    static String MODULE_NAME = "WallpaperModule";
    WallpaperManager wallpaperManager;
    ReactApplicationContext context;

    public WallpaperModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
        wallpaperManager = WallpaperManager.getInstance(context);
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void setWallpaper(String path) throws IOException {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return;
        if (!wallpaperManager.isWallpaperSupported()) return;
        Bitmap bitmap = BitmapFactory.decodeFile(path);
        wallpaperManager.setBitmap(bitmap);
    }

    @ReactMethod()
    public void setWallpaperFromStream(String url) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return;
        if (!wallpaperManager.isWallpaperSupported()) return;

        try {
            URL imgUrl = new URL(url);
            InputStream inputStream = imgUrl.openStream();
            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
            wallpaperManager.setBitmap(bitmap);
        } catch (IOException e) {
            toast(e.getMessage());
        }
    }

    @ReactMethod
    public void toast(String message) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
    }
}
