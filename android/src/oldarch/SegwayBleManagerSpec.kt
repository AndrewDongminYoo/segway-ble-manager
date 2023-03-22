package com.gbike.segwayblemanager

import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReactModuleWithSpec

abstract class SegwayBleManagerSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
    @ReactMethod
    abstract fun init(secretKey: String?, operatorCode: String?, isDebug: Boolean)
    @ReactMethod
    abstract fun vehicleInfo()
    @ReactMethod(isBlockingSynchronousMethod = true)
    abstract fun connect(bleMac: String?, bleKey: String?, iotImei: String?): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    abstract fun disconnect(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    abstract fun unLock(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    abstract fun lock(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    abstract fun openBatteryCover(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    abstract fun openSaddle(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    abstract fun openTailBox(): Boolean
}
