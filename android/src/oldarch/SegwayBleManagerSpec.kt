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
    protected abstract val typedExportedConstants: Map<String, Any>
    @DoNotStrip
    override fun getConstants(): Map<String, Any>? {
        val constants = typedExportedConstants
        if (ReactBuildConfig.DEBUG || ReactBuildConfig.IS_INTERNAL_BUILD) {
            val obligatoryFlowConstants: MutableSet<String> = HashSet(
                Arrays.asList(
                    "moduleName",
                    "supportedEvents"
                )
            )
            val optionalFlowConstants: Set<String> = HashSet()
            var undeclaredConstants: MutableSet<String> = HashSet(constants.keys)
            undeclaredConstants.removeAll(obligatoryFlowConstants)
            undeclaredConstants.removeAll(optionalFlowConstants)
            check(undeclaredConstants.isEmpty()) {
                String.format(
                    "Native Module Flow doesn't declare constants: %s",
                    undeclaredConstants
                )
            }
            undeclaredConstants = obligatoryFlowConstants
            undeclaredConstants.removeAll(constants.keys)
            check(undeclaredConstants.isEmpty()) {
                String.format(
                    "Native Module doesn't fill in constants: %s",
                    undeclaredConstants
                )
            }
        }
        return constants
    }
    @ReactMethod
    @DoNotStrip
    abstract fun init(
        secretKey: String?,
        operatorCode: String?,
        isDebug: Boolean,
        promise: Promise?
    )
    @ReactMethod
    @DoNotStrip
    abstract fun connect(deviceMac: String?, deviceKey: String?, iotImei: String?)
    @ReactMethod
    @DoNotStrip
    abstract fun disconnect(promise: Promise?)
    @ReactMethod
    @DoNotStrip
    abstract fun unLock(promise: Promise?)
    @ReactMethod
    @DoNotStrip
    abstract fun lock(promise: Promise?)
    @ReactMethod
    @DoNotStrip
    abstract fun openBatteryCover(promise: Promise?)
    @ReactMethod
    @DoNotStrip
    abstract fun openSaddle(promise: Promise?)
    @ReactMethod
    @DoNotStrip
    abstract fun openTailBox(promise: Promise?)
    @ReactMethod
    @DoNotStrip
    abstract fun queryVehicleInformation()
    @ReactMethod
    @DoNotStrip
    abstract fun queryIoTInformation()
    @ReactMethod
    @DoNotStrip
    abstract fun addListener(eventType: String?)
    @ReactMethod
    @DoNotStrip
    abstract fun removeListeners(count: Double)
}
