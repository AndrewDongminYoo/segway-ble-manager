import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  "The package '@gbike/segway-ble-manager' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({
    ios: '- You have run `pod install` in the `ios` directory and then clean, rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.\n',
    android:
      '- You have run `./gradlew generateCodegenArtifactsFromSchema` in the `android` directory and then clean, rebuild and re-run the app. You may also need to re-open Android Studio.\n',
    default: '',
  }) +
  '- Use the "npx react-native clean" command to clean up the module\'s cache and select the ' +
  '"watchman", "yarn", "metro", "android", "npm" options with comma-separated. ' +
  'Re-Install packages and re-build the app again .' +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n' +
  'If none of these fix the issue, please open an issue on the Github repository: ' +
  'https://github.com/AndrewDongminYoo/react-native-segway-ble-manager`';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const SegwayBleManagerModule = isTurboModuleEnabled
  ? require('./NativeSegwayBleManager').default
  : NativeModules.SegwayBleManager;

const SegwayBleManager = SegwayBleManagerModule
  ? SegwayBleManagerModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
export function init(secretKey: string, operatorCode: string, isDebug: boolean): void {
  SegwayBleManager.init(secretKey, operatorCode, isDebug);
}

export function connect(bleMac: string, bleKey: string, iotImei: string): void {
  SegwayBleManager.connect(bleMac, bleKey, iotImei);
}

export function disconnect(): void {
  SegwayBleManager.disconnect();
}

export function unLock(): void {
  SegwayBleManager.unLock();
}

export function lock(): void {
  SegwayBleManager.lock();
}

export function vehicleInfo(): void {
  SegwayBleManager.vehicleInfo();
}

export function openBatteryCover(): void {
  SegwayBleManager.openBatteryCover();
}

export function openSaddle(): void {
  SegwayBleManager.openSaddle();
}

export function openTailBox(): void {
  SegwayBleManager.openTailBox();
}

export function queryVehicleInformation(): void {
  SegwayBleManager.queryVehicleInformation();
}

export function queryIotInformation(): void {
  SegwayBleManager.queryIotInformation();
}

// const callback = (arg: any) => {
//   console.log(arg);
// };

// const commonListener = (emitter: NativeEventEmitter) => {
//   emitter.addListener('connectionStateChange', (state) => callback(state));
//   emitter.addListener('connectDeviceOnError', (error) => callback(error));
//   emitter.addListener('bluetoothStateChanged', (state) => callback(state));
// };

// const NBIoTBleRNEventEmitter = new NativeEventEmitter(SegwayBleManager);
