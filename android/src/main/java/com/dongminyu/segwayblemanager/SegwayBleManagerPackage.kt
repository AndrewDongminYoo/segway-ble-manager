package com.dongminyu.segwayblemanager

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.module.model.ReactModuleInfo
import java.util.HashMap

/**
 * This is the package that is used to register the native module with the React Native runtime.
 * This is the class that is referenced in the `getPackages` method of the `MainApplication` class.
 * This Suppression is here because this class is not used in the current project,
 * but it is used in the project that uses this library. So it's not unused. Thanks for the warning.
 */
@Suppress("unused")
class SegwayBleManagerPackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == SegwayBleManagerModule.NAME) SegwayBleManagerModule(reactContext) else null
    }

    /**
     * This is the method that is called by the React Native runtime to get the list of native modules
     * that should be registered with the runtime. This method is called only once, when the application
     * starts.
     * In the case of packaging multiple submodules together at the same time,
     * it is convenient to use this method carefully.
     * I might be making a BLE module related to a helmet someday.
     */
    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            /**
             * Sometimes during development, you might be warned to import this
             * [BuildConfig] that is here, or you might not be able to find the
             * [NativeSegwayBleManagerSpec]. If you can't find that native interfaces (built with Codegen),
             * so don't bother replacing it with something else or trying to find it,
             * just re-build it with Gradle! it'll solve it.
             * [ReactModuleInfo] Method's last parameter is [isTurboModule][BuildConfig.IS_NEW_ARCHITECTURE_ENABLED] that the [BuildConfig] is for.
             */
            val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            moduleInfos[SegwayBleManagerModule.NAME] = ReactModuleInfo(
                SegwayBleManagerModule.NAME,
                SegwayBleManagerModule.NAME,
                false,  // canOverrideExistingModule
                false,  // needsEagerInit
                true,  // hasConstants
                false,  // isCxxModule
                isTurboModule // isTurboModule
            )
            moduleInfos
        }
    }
}
