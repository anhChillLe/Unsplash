package com.bap.unsplash;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;

import android.os.Bundle;

public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "UnsplashApp";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled(),
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled()
        );
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this);
    super.onCreate(savedInstanceState);
  }
}
