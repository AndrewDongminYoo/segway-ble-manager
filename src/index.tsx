import { EmitterSubscription, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import SegwayBleManager from './NativeSegwayBleManager';

const LINKING_ERROR =
  "The package '@gbike/segway-ble-manager' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({
    ios: '- You have run `pod install` in the `ios` directory and then clean, rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.\n',
    android:
      '- You have run `./gradlew generateCodeGenArtifactsFromSchema` in the `android` directory and then clean, rebuild and re-run the app. You may also need to re-open Android Studio.\n',
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

const Spec = (
  SegwayBleManagerModule
    ? SegwayBleManagerModule
    : new Proxy(
        {},
        {
          get() {
            throw new Error(LINKING_ERROR);
          },
        }
      )
) as typeof SegwayBleManager;

const eventEmitter = new NativeEventEmitter(Spec);

export interface Scooter {
  number: string;
  bleMac: string;
  bleKey: string;
  iotImei: string;
}
export interface IoTInformation {
  powerPercent: number;
  speedMode: number;
  currentSpeed: number;
  totalRange: number;
  remainingRange: number;
}
export interface VehicleInfo {
  voltage: string;
  majorVersionNumber: string;
  minorVersionNumber: string;
  updateTimes: string;
  isLocked: string;
}

export enum Events {
  'ConnectResult',
  'DisconnectResult',
  'InitializeResult',
  'IoTInfoResult',
  'LockResult',
  'OpenCoverResult',
  'OpenSaddleResult',
  'OpenTailBoxResult',
  'UnlockResult',
  'VehicleInfoResult',
}

// Implementing a one-time listener function
function submitOneTimeListener(eventType: string): EmitterSubscription {
  const count = eventEmitter.listenerCount(eventType);
  if (count > 0) {
    eventEmitter.removeAllListeners(eventType);
  }
  const subscription = eventEmitter.addListener(eventType, (data) => {
    console.log(`event received!: ${data}`);
    eventEmitter.removeSubscription(subscription);
  });
  return subscription;
}

export function init(secretKey: string, operatorCode: string, isDebug: boolean) {
  Spec.init(secretKey, operatorCode, isDebug);
  submitOneTimeListener('InitializeResult');
}

export function connect(bleMac: string, bleKey: string, iotImei: string) {
  Spec.connect(bleMac, bleKey, iotImei);
  submitOneTimeListener('ConnectResult');
}

export function disconnect() {
  Spec.disconnect();
  submitOneTimeListener('DisconnectResult');
}

export function unLock() {
  Spec.unLock();
  submitOneTimeListener('UnlockResult');
}

export function lock() {
  Spec.lock();
  submitOneTimeListener('LockResult');
}

export function openBatteryCover() {
  Spec.openBatteryCover();
  submitOneTimeListener('OpenCoverResult');
}

export function openSaddle() {
  Spec.openSaddle();
  submitOneTimeListener('OpenSaddleResult');
}

export function openTailBox() {
  Spec.openTailBox();
  submitOneTimeListener('OpenTailBoxResult');
}

export function queryVehicleInformation() {
  Spec.queryVehicleInformation();
  submitOneTimeListener('VehicleInfoResult');
}

export function queryIotInformation() {
  Spec.queryIotInformation();
  submitOneTimeListener('IoTInfoResult');
}
