package com.gbike.segwayblemanager

import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReactModuleWithSpec

import java.lang.IllegalStateException
import java.util.*

abstract class SegwayBleManagerSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
    protected abstract fun getTypedExportedConstants(): Map<String, Any>
    @DoNotStrip
    fun getConstants(): Map<String, Any>? {
        val constants = getTypedExportedConstants()
        if (ReactBuildConfig.DEBUG || ReactBuildConfig.IS_INTERNAL_BUILD) {
            val obligatoryFlowConstants: MutableSet<String> = HashSet<String>(
                Arrays.asList<String>(
                    "supportedEvents"
                )
            )
            val optionalFlowConstants: Set<String> = HashSet<String>()
            var undeclaredConstants: MutableSet<String> = HashSet<String>(constants.keys)
            undeclaredConstants.removeAll(obligatoryFlowConstants)
            undeclaredConstants.removeAll(optionalFlowConstants)
            if (!undeclaredConstants.isEmpty()) {
                throw IllegalStateException(
                    String.format(
                        "Native Module Flow doesn't declare constants: %s",
                        undeclaredConstants
                    )
                )
            }
            undeclaredConstants = obligatoryFlowConstants
            undeclaredConstants.removeAll(constants.keys)
            if (!undeclaredConstants.isEmpty()) {
                throw IllegalStateException(
                    String.format(
                        "Native Module doesn't fill in constants: %s",
                        undeclaredConstants
                    )
                )
            }
        }
        return constants
    }
    @ReactMethod
    @DoNotStrip
    abstract fun init(secretKey: String?, operatorCode: String?, isDebug: Boolean)
    @ReactMethod(isBlockingSynchronousMethod = true)
    @DoNotStrip
    abstract fun connect(bleMac: String?, bleKey: String?, iotImei: String?): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    @DoNotStrip
    abstract fun disconnect(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    @DoNotStrip
    abstract fun unLock(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    @DoNotStrip
    abstract fun lock(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    @DoNotStrip
    abstract fun openBatteryCover(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    @DoNotStrip
    abstract fun openSaddle(): Boolean
    @ReactMethod(isBlockingSynchronousMethod = true)
    @DoNotStrip
    abstract fun openTailBox(): Boolean
    @ReactMethod
    @DoNotStrip
    abstract fun queryVehicleInformation()
    @ReactMethod
    @DoNotStrip
    abstract fun queryIotInformation()
    @ReactMethod
    @DoNotStrip
    abstract fun addListener(eventType: String?)
    @ReactMethod
    @DoNotStrip
    abstract fun removeListeners(count: Double)
}
