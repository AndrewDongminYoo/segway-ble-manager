package com.gbike.segwayblemanager

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.segwaydiscovery.nbiot.BluetoothKit
import com.segwaydiscovery.nbiot.NBIotBle
import com.segwaydiscovery.nbiot.bean.QueryVehicleInformation
import com.segwaydiscovery.nbiot.interfaces.*

class SegwayBleManagerModule(private val reactContext: ReactApplicationContext) :
    SegwayBleManagerSpec(reactContext) {
    private var bluetoothKit: BluetoothKit? = null
    private val deviceEventEmitter = reactContext.getJSModule(RCTDeviceEventEmitter::class.java)

    override fun getName(): String {
        return NAME
    }

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
        }
        Log.e(BLUETOOTH_KIT, "$eventName: $error")
        sendEvent(eventName, params)
    }

    @ReactMethod
    override fun init(
        secretKey: String?,
        operatorCode: String?,
        isDebug: Boolean,
    ): Boolean {
        val initializeResult = "InitializeResult"
        return try {
            NBIotBle.getInstance().init(secretKey, operatorCode, isDebug)
            bluetoothKit = BluetoothKit()
            bluetoothKit!!.init(reactContext)
            onSuccess(initializeResult, true)
            true
        } catch (error: Exception) {
            onError(initializeResult, error)
            false
        }
    }

    override fun connect(bleMac: String?, bleKey: String?, iotImei: String?): Boolean {
        val connectResult = "ConnectResult"
        var result = false
        try {
            bluetoothKit!!.connect(bleMac, bleKey, iotImei) { state: Int ->
                when (state) {
                    ConnectionState.STATE_CONNECTED -> {
                        onSuccess(connectResult, true)
                        result = true
                    }
                    ConnectionState.STATE_DISCONNECTED -> {
                        onSuccess(connectResult, false)
                    }
                    ConnectionState.STATE_CONNECTED_FAILED -> {
                        onSuccess(connectResult, false)
                    }
                }
            }
        } catch (error: Exception) {
            onError(connectResult, error)
        }
        return result
    }


    @ReactMethod
    override fun disconnect(): Boolean {
        val disconnectResult = "DisconnectResult"
        return try {
            if (bluetoothKit != null) {
                bluetoothKit!!.disConnect()
                onSuccess(disconnectResult, true)
                true
            } else {
                onSuccess(disconnectResult, false)
                false
            }
        } catch (error: Exception) {
            onError(disconnectResult, error)
            false
        }
    }

    @ReactMethod
    override fun unLock(): Boolean {
        val unlockResult = "UnlockResult"
        var result = false
        try {
            bluetoothKit!!.unLock(object : OnUnlockListener {
                override fun onUnlockSuccess() {
                    onSuccess(unlockResult, true)
                    result = true
                }

                override fun onUnlockFail(code: Int, msg: String) {
                    onFailure(unlockResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(unlockResult, error)
        }
        return result
    }

    @ReactMethod
    override fun lock(): Boolean {
        val lockResult = "LockResult"
        var result = false
        try {
            bluetoothKit!!.lock(object : OnLockListener {
                override fun onLockSuccess() {
                    onSuccess(lockResult, true)
                    result = true
                }

                override fun onLockFail(code: Int, msg: String) {
                    onFailure(lockResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(lockResult, error)
        }
        return result
    }

    @ReactMethod
    override fun vehicleInfo() {
        val eventName = "VehicleInfoResult"
        try {
            bluetoothKit!!.queryVehicleInformation(object : OnQueryVehicleInfoListener {
                override fun onQueryVehicleInfoSuccess(information: QueryVehicleInformation) {
                    Log.d(BLUETOOTH_KIT, "QueryVehicleInfoSuccess")
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
                    Log.e(BLUETOOTH_KIT, "QueryVehicleInfoFail")
                    onFailure(eventName, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(eventName, error)
        }
    }

    @ReactMethod
    override fun openBatteryCover(): Boolean {
        val openCoverResult = "OpenCoverResult"
        var result = false
        try {
            bluetoothKit!!.openBatteryCover(object : OnOpenBatteryCoverListener {
                override fun OnOpenBatteryCoverSuccess() {
                    onSuccess(openCoverResult, true)
                    result = true
                }

                override fun OnOpenBatteryCoverFail(code: Int, msg: String) {
                    onFailure(openCoverResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(openCoverResult, error)
        }
        return result
    }

    @ReactMethod
    override fun openSaddle(): Boolean {
        val openSaddleResult = "OpenSaddleResult"
        var result = false
        try {
            bluetoothKit!!.openSaddle(object : OnOpenSaddleListener {
                override fun onOpenSaddleSuccess() {
                    onSuccess(openSaddleResult, true)
                    result = true
                }

                override fun onOpenSaddleFail(code: Int, msg: String) {
                    onFailure(openSaddleResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(openSaddleResult, error)
        }
        return result
    }

    @ReactMethod
    override fun openTailBox(): Boolean {
        val openTailBoxResult = "OpenTailBoxResult"
        var result = false
        try {
            bluetoothKit!!.openTailBox(object : OnOpenTailBoxListener {
                override fun onOpenTailBoxSuccess() {
                    onSuccess(openTailBoxResult, true)
                    result = true
                }

                override fun onOpenTailBoxFail(code: Int, msg: String) {
                    onFailure(openTailBoxResult, msg, code)
                }
            })
        } catch (error: Exception) {
            onError(openTailBoxResult, error)
        }
        return result
    }

    companion object {
        const val NAME = "SegwayBleManager"
        const val BLUETOOTH_KIT = "BluetoothKit"
    }
}
