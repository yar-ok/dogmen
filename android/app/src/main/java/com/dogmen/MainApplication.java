package com.dogmen;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.dogmen.modules.managers.ReactModulePackage;
import com.facebook.react.ReactApplication;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import org.pgsqlite.SQLitePluginPackage;


public class MainApplication extends Application implements ReactApplication {
  private static MainApplication application;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new ReactModulePackage(),
                new FIRMessagingPackage(),
                  new SQLitePluginPackage(),
                    new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    application = this;
    SoLoader.init(this, /* native exopackage */ false);
  }

  public static MainApplication getApplication() {
    return application;
  }
}
