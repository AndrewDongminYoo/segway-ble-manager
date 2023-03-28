package com.gbike.segwayblemanager

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.segwaydiscovery.nbiot.BluetoothKit
import com.segwaydiscovery.nbiot.NBIotBle
/* cspell:disable-next-line */
import com.segwaydiscovery.nbiot.bean.QueryIoTInfomation
import com.segwaydiscovery.nbiot.bean.QueryVehicleInformation
import com.segwaydiscovery.nbiot.interfaces.*
import com.segwaydiscovery.nbiot.interfaces.ConnectionState.STATE_CONNECTED
import com.segwaydiscovery.nbiot.interfaces.ConnectionState.STATE_DISCONNECTED

class SegwayBleManagerModule(private val reactContext: ReactApplicationContext) :
    SegwayBleManagerSpec(reactContext) {
    /**
     * This is the NINE_BOT's Bluetooth module.
     * It starts as `null` and is initialized in the [init] method.
     */
    private var bluetoothKit: BluetoothKit? = null

    /**
     * This is the event emitter that is used to send events to the JavaScript side.
     * This is the same as the `DeviceEventEmitter` in the React Native.
     * @see [RCTDeviceEventEmitter]
     * @see [com.facebook.react.modules.core.DeviceEventManagerModule]
     * @see [com.facebook.react.bridge.ReactContext.getJSModule]
     * @see [com.facebook.react.bridge.ReactContext]
     * @see [com.facebook.react.bridge.ReactApplicationContext]
     * @see [com.facebook.react.bridge.ReactContextBaseJavaModule]
     * @see [com.facebook.react.bridge.NativeModule]
     */
    private val deviceEventEmitter = reactContext.getJSModule(RCTDeviceEventEmitter::class.java)

    override fun getName(): String {
        return NAME
    }

    /**
     * This method is called when the module is being initialized.
     * It should return a map with the constants this module is exporting.
     * The map is exposed as a native module's `Constants` field.
     * The values can be any primitive that is supported by the `Map` interface.
     * Note that boolean will be converted to number when sent to JavaScript.
     * Use `Promise` instead if you need to pass booleans to JavaScript.
     * @return a map with the constants this module is exporting.
     * @see [getConstants]
     * @see [com.facebook.react.bridge.Promise]
     * @see [ReactMethod.isBlockingSynchronousMethod]
     * @see [ReactMethod]
     */
    override fun getTypedExportedConstants(): MutableMap<String, Any> {
        return mutableMapOf(
            "supportedEvents" to listOf(
                "InitializeResult",
                "ConnectResult",
                "DisconnectResult",
                "UnlockResult",
                "LockResult",
                "VehicleInfoResult",
                "OpenCoverResult",
                "OpenSaddleResult",
                "OpenTailBoxResult",
                "IoTInfoResult",
            ), "moduleName" to NAME,
        )
    }

    /**
     * This method is sending device events to the JavaScript side.
     * @param eventName the name of the event.
     * @param params the parameters of the event.
     */
    private fun sendEvent(eventName: String, params: WritableMap) {
        deviceEventEmitter.emit(eventName, params)
    }

    private fun onSuccess(eventName: String, result: Boolean) {
        val params = Arguments.createMap().apply {
            putBoolean("result", result)
        }
        Log.d(BLUETOOTH_KIT, "$eventName: $result")
        sendEvent(eventName, params)
    }

    private fun onFailure(eventName: String, message: String, code: Int) {
        val params = Arguments.createMap().apply {
            putBoolean("result", false)
            putString("message", message)
            putInt("code", code)
        }
        Log.w(BLUETOOTH_KIT, "$eventName: $message")
        sendEvent(eventName, params)
    }

    private fun onError(eventName: String, error: Exception) {
        val params = Arguments.createMap().apply {
            putBoolean("result", false)
            putString("errorMessage", error.localizedMessage)
            putString("errorName", error.javaClass.name)
            putString("errorStack", error.stackTraceToString())
        }
        Log.e(BLUETOOTH_KIT, "$eventName: $error")
        sendEvent(eventName, params)
    }

    @ReactMethod
    override fun init(
        secretKey: String?,
        operatorCode: String?,
        isDebug: Boolean,
    ) {
        val initializeResult = "InitializeResult"
        try {
            NBIotBle.getInstance().init(secretKey, operatorCode, isDebug)
            bluetoothKit = BluetoothKit()
            bluetoothKit!!.init(reactContext)
            onSuccess(initializeResult, true)
        } catch (error: Exception) {
            onError(initializeResult, error)
        }
    }

    override fun connect(deviceMac: String?, deviceKey: String?, iotImei: String?) {
        val connectResult = "ConnectResult"
        try {
            bluetoothKit!!.connect(deviceMac, deviceKey, iotImei) {
                OnConnectionStateChangeListener { state ->
                    when (state) {
                        STATE_CONNECTED -> {
                            Log.d(BLUETOOTH_KIT, "STATE_CONNECTED")
                            onSuccess(connectResult, true)
                        }
                        STATE_DISCONNECTED -> {
                            Log.d(BLUETOOTH_KIT, "STATE_DISCONNECTED")
                            onFailure(connectResult, "The connection was disconnected, please reconnect it", -1001)
                        }
                        else -> {  // STATE_CONNECTED_FAILED
                            Log.d(BLUETOOTH_KIT, "STATE_CONNECTED_FAILED")
                            onFailure(connectResult, "Connecting failed, Check again the BLE parameters", -1004)
                        }
                    }
                }
            }
        } catch (error: Exception) {
            onError(connectResult, error)
        }
    }

    @ReactMethod
    override fun disconnect() {
        val disconnectResult = "DisconnectResult"
        try {
            if (bluetoothKit != null) {
                bluetoothKit!!.disConnect()
                onSuccess(disconnectResult, true)
            } else {
                onSuccess(disconnectResult, false)
            }
        } catch (error: Exception) {
            onError(disconnectResult, error)
        }
    }

    @ReactMethod
    override fun unLock() {
        val unlockResult = "UnlockResult"
        try {
            bluetoothKit!!.unLock(object : OnUnlockListener {
                override fun onUnlockSuccess() {
                    onSuccess(unlockResult, true)
                }
                override fun onUnlockFail(code: Int, msg: String) {
                    onFailure(unlockResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(unlockResult, error)
        }
    }

    @ReactMethod
    override fun lock() {
        val lockResult = "LockResult"
        try {
            bluetoothKit!!.lock(object : OnLockListener {
                override fun onLockSuccess() {
                    onSuccess(lockResult, true)
                }
                override fun onLockFail(code: Int, msg: String) {
                    onFailure(lockResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(lockResult, error)
        }
    }

    @ReactMethod
    override fun queryVehicleInformation() {
        val eventName = "VehicleInfoResult"
        try {
            bluetoothKit!!.queryVehicleInformation(object : OnQueryVehicleInfoListener {
                override fun onQueryVehicleInfoSuccess(information: QueryVehicleInformation) {
                    val params = Arguments.createMap().apply {
                        putBoolean("result", true)
                        putInt("powerPercent", information.powerPercent)
                        putInt("currentMode", information.currentMode)
                        putInt("speedMode", information.speedMode)
                        putInt("totalRange", information.totalRange)
                        putInt("remainingRange", information.remainingRange)
                    }
                    sendEvent(eventName, params)
                }
                override fun onQueryVehicleInfoFail(code: Int, msg: String) {
                    onFailure(eventName, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(eventName, error)
        }
    }


    @ReactMethod
    override fun openBatteryCover() {
        val openCoverResult = "OpenCoverResult"
        try {
            bluetoothKit!!.openBatteryCover(object : OnOpenBatteryCoverListener {
                override fun OnOpenBatteryCoverSuccess() {
                    onSuccess(openCoverResult, true)
                }
                override fun OnOpenBatteryCoverFail(code: Int, msg: String) {
                    onFailure(openCoverResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(openCoverResult, error)
        }
    }

    @ReactMethod
    override fun openSaddle() {
        val openSaddleResult = "OpenSaddleResult"
        try {
            bluetoothKit!!.openSaddle(object : OnOpenSaddleListener {
                override fun onOpenSaddleSuccess() {
                    onSuccess(openSaddleResult, true)
                }
                override fun onOpenSaddleFail(code: Int, msg: String) {
                    onFailure(openSaddleResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(openSaddleResult, error)
        }
    }

    @ReactMethod
    override fun openTailBox() {
        val openTailBoxResult = "OpenTailBoxResult"
        try {
            bluetoothKit!!.openTailBox(object : OnOpenTailBoxListener {
                override fun onOpenTailBoxSuccess() {
                    onSuccess(openTailBoxResult, true)
                }
                override fun onOpenTailBoxFail(code: Int, msg: String) {
                    onFailure(openTailBoxResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(openTailBoxResult, error)
        }
    }

    override fun queryIoTInformation() {
        val eventName = "IoTInfoResult"
        bluetoothKit!!.queryIoTInformation(object : OnQueryIoTInfoListener {
            /* cspell:disable-next-line */
            override fun onQueryIoTInfoSuccess(ioTInformation: QueryIoTInfomation) {
                val params = Arguments.createMap().apply {
                    putBoolean("result", true)
                    putInt("highBatteryVoltage", ioTInformation.highBatteryVoltage)
                    putInt("majorVersionNumber", ioTInformation.majorVersionNumber)
                    putInt("minorVersionNumber", ioTInformation.minorVersionNumber)
                    putInt("updateTimes", ioTInformation.updateTimes)
                    putInt("voltage", ioTInformation.voltage)
                    putBoolean("isLocked", ioTInformation.isLocked)
                }
                sendEvent(eventName, params)
            }
            override fun onQueryIoTInfoFail(code: Int, msg: String) {
                onFailure(eventName, msg, code)
            }
        })
    }
    override fun addListener(eventType: String?) {
    }
    override fun removeListeners(count: Double) {
    }
    companion object {
        const val NAME = "SegwayBleManager"
        const val BLUETOOTH_KIT = "BluetoothKit"
    }
}
