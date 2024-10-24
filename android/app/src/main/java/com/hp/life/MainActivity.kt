package com.hp.life

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle
import com.zoontek.rnbootsplash.RNBootSplash  //react-native-bootsplash
import android.content.Intent //react-native-orientation-locker
import android.content.res.Configuration //react-native-orientation-locker
import org.wonday.orientation.OrientationActivityLifecycle // react-native-orientation-locker
import android.os.Build // react-native-orientation-locker

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "HP LIFE"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.BootTheme) // ⬅️ initialize the splash screen
    super.onCreate(null) // super.onCreate(null) with react-native-screens

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      registerActivityLifecycleCallbacks(OrientationActivityLifecycle.getInstance()) // react-native-orientation-locker
    }

  }

  // react-native-orientation-locker
  override fun onConfigurationChanged(newConfig: Configuration) {
      super.onConfigurationChanged(newConfig)
      val intent = Intent("onConfigurationChanged")
      intent.putExtra("newConfig", newConfig)
      sendBroadcast(intent)
  }
}
