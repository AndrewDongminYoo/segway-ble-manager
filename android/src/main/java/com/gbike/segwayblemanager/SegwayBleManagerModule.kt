package com.gbike.segwayblemanager

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.segwaydiscovery.nbiot.BluetoothKit
import com.segwaydiscovery.nbiot.NBIotBle
import com.segwaydiscovery.nbiot.bean.QueryVehicleInformation
import com.segwaydiscovery.nbiot.interfaces.*

class SegwayBleManagerModule(private val reactContext: ReactApplicationContext) :
    SegwayBleManagerSpec(reactContext) {
    private var bluetoothKit: BluetoothKit? = null

    override fun getName(): String {
        return NAME
    }

    fun sendEvent(eventName: String?, params: WritableMap?) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName!!, params)
    }

    @ReactMethod
    override fun init(
        secretKey: String?,
        operatorCode: String?,
        isDebug: Boolean,
        callback: Callback?
    ) {
        try {
            NBIotBle.getInstance().init(secretKey, operatorCode, isDebug)
            bluetoothKit = BluetoothKit()
            bluetoothKit!!.init(reactContext)
            callback?.invoke("Get Instance Success")
        } catch (error: Exception) {
            callback?.invoke(error.message)
        }
    }

    @ReactMethod
    override fun connect(
        bleMac: String?,
        bleKey: String?,
        iotImei: String?,
        failCallback: Callback
    ) {
        val nineBothBluetooth = "NBBleSDK"
        try {
            bluetoothKit!!.connect(bleMac, bleKey, iotImei) { state: Int ->
                when (state) {
                    ConnectionState.STATE_CONNECTED -> {
                        Log.d(nineBothBluetooth, "Connected")
                        sendEvent("Connected", null)
                    }
                    ConnectionState.STATE_DISCONNECTED -> {
                        Log.d(nineBothBluetooth, "Disconnected")
                        sendEvent("Disconnected", null)
                    }
                    else -> Log.d(nineBothBluetooth, "ConnectFailed")
                }
            }
        } catch (error: Exception) {
            failCallback.invoke(error.message)
        }
    }

    @ReactMethod
    override fun disconnect(callback: Callback?) {
        try {
            if (bluetoothKit != null) {
                bluetoothKit!!.disConnect()
                callback?.invoke("call disconnect")
            }
        } catch (error: Exception) {
            callback?.invoke(error.message)
        }
    }

    @ReactMethod
    override fun unLock(failCallback: Callback) {
        val unlockResult = "UnlockResult"
        try {
            bluetoothKit!!.unLock(object : OnUnlockListener {
                override fun onUnlockSuccess() {
                    val params = Arguments.createMap()
                    params.putString(STATE, "succeeded")
                    sendEvent(unlockResult, params)
                }

                override fun onUnlockFail(code: Int, msg: String) {
                    val params = Arguments.createMap()
                    params.putString(STATE, "failed")
                    sendEvent(unlockResult, params)
                }
            })
        } catch (error: Exception) {
            failCallback.invoke(error.message)
            val params = Arguments.createMap()
            params.putString("error", error.message)
            sendEvent(unlockResult, params)
        }
    }

    @ReactMethod
    override fun lock(failCallback: Callback) {
        val lockResult = "LockResult"
        try {
            bluetoothKit!!.lock(object : OnLockListener {
                override fun onLockSuccess() {
                    val params = Arguments.createMap()
                    params.putString(STATE, "succeeded")
                    sendEvent(lockResult, params)
                }

                override fun onLockFail(code: Int, msg: String) {
                    val params = Arguments.createMap()
                    params.putString(STATE, "failed")
                    sendEvent(lockResult, params)
                }
            })
        } catch (error: Exception) {
            failCallback.invoke(error.message)
            val params = Arguments.createMap()
            params.putString("error", error.message)
            sendEvent(lockResult, params)
        }
    }

    @ReactMethod
    override fun vehicleInfo(callback: Callback?) {
        try {
            bluetoothKit!!.queryVehicleInformation(object : OnQueryVehicleInfoListener {
                override fun onQueryVehicleInfoSuccess(queryVehicleInformation: QueryVehicleInformation) {
                    Log.d(BLUETOOTH_KIT, "QueryVehicleInfoSuccess")
                    callback?.invoke(
                        queryVehicleInformation.powerPercent,
                        queryVehicleInformation.currentMode,
                        queryVehicleInformation.speedMode,
                        queryVehicleInformation.totalRange,
                        queryVehicleInformation.remainingRange
                    )
                }

                override fun onQueryVehicleInfoFail(code: Int, msg: String) {
                    Log.e(BLUETOOTH_KIT, "QueryVehicleInfoFail")
                    callback?.invoke(-1)
                }
            })
        } catch (error: Exception) {
            callback?.invoke(error.message)
        }
    }

    @ReactMethod
    override fun openBatteryCover(failCallback: Callback) {
        val openCoverResult = "OpenCoverResult"
        try {
            bluetoothKit!!.openBatteryCover(object : OnOpenBatteryCoverListener {
                override fun OnOpenBatteryCoverSuccess() {
                    val params = Arguments.createMap()
                    params.putString(STATE, "succeeded")
                    sendEvent(openCoverResult, params)
                }

                override fun OnOpenBatteryCoverFail(code: Int, msg: String) {
                    val params = Arguments.createMap()
                    params.putString(STATE, "failed")
                    sendEvent(openCoverResult, params)
                }
            })
        } catch (error: Exception) {
            failCallback.invoke(error.message)
            val params = Arguments.createMap()
            params.putString("error", error.message)
            sendEvent(openCoverResult, params)
        }
    }

    @ReactMethod
    override fun openSaddle(callback: Callback) {
        try {
            bluetoothKit!!.openSaddle(object : OnOpenSaddleListener {
                override fun onOpenSaddleSuccess() {
                    Log.d(BLUETOOTH_KIT, "OpenSaddleSuccess")
                    callback.invoke("OpenSaddleSuccess!")
                }

                override fun onOpenSaddleFail(code: Int, msg: String) {
                    Log.e(BLUETOOTH_KIT, "OpenSaddleFail")
                    callback.invoke("OpenSaddleFail!")
                }
            })
        } catch (error: Exception) {
            callback.invoke(error.message)
        }
    }

    @ReactMethod
    override fun openTailBox(callback: Callback) {
        try {
            bluetoothKit!!.openTailBox(object : OnOpenTailBoxListener {
                override fun onOpenTailBoxSuccess() {
                    Log.d(BLUETOOTH_KIT, "OpenTailBoxSuccess")
                    callback.invoke("OpenTailBoxSuccess!")
                }

                override fun onOpenTailBoxFail(code: Int, msg: String) {
                    Log.e(BLUETOOTH_KIT, "OpenTailBoxFail")
                    callback.invoke("OpenTailBoxFail!")
                }
            })
        } catch (error: Exception) {
            callback.invoke(error.message)
        }
    }

    companion object {
        const val NAME = "SegwayBleManager"
        const val BLUETOOTH_KIT = "bluetoothKit"
        const val STATE = "state"
    }
}
