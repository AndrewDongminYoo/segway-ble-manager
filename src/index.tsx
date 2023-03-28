import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import SegwayBleManager from './NativeSegwayBleManager';
import { validateKeyCode, validateScooter } from './utils';

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

export const eventEmitter = new NativeEventEmitter(Spec);

export interface Scooter {
  number: string;
  deviceMac: string;
  deviceKey: string;
  iotImei: string;
}
export interface VehicleInfo {
  powerPercent: number;
  speedMode: number;
  currentSpeed: number;
  totalRange: number;
  remainingRange: number;
}
export interface IoTInformation {
  highBatteryVoltage: number;
  majorVersionNumber: number;
  minorVersionNumber: number;
  updateTimes: number;
  isLocked: boolean;
  voltage: number;
}

export enum Events {
  CONNECT = 'ConnectResult',
  DISCONNECT = 'DisconnectResult',
  INITIALIZE = 'InitializeResult',
  IOT_INFO = 'IoTInfoResult',
  LOCK = 'LockResult',
  OPEN_COVER = 'OpenCoverResult',
  OPEN_SADDLE = 'OpenSaddleResult',
  OPEN_TAIL_BOX = 'OpenTailBoxResult',
  UNLOCK = 'UnlockResult',
  VEHICLE_INFO = 'VehicleInfoResult',
}

export const SupportedEvents = (Spec.getConstants().supportedEvents = Object.values(Events));

type mListener<T extends Events> = (
  data: T extends Events.CONNECT
    ? Scooter
    : T extends Events.IOT_INFO
    ? IoTInformation
    : T extends Events.VEHICLE_INFO
    ? VehicleInfo
    : unknown
) => void;

const submitListener = <T extends Events>(eventType: T, listener?: mListener<T>) => {
  const count = eventEmitter.listenerCount(eventType);
  if (count > 0) {
    eventEmitter.removeAllListeners(eventType);
  }
  listener = listener ?? ((data) => console.debug(`${eventType} Event: ${JSON.stringify(data)}`));
  return eventEmitter.addListener(eventType, listener);
};

export function init(secretKey: string, operatorCode: string, isDebug: boolean) {
  validateKeyCode(operatorCode, secretKey, isDebug);
  Spec.init(secretKey, operatorCode, isDebug);
  submitListener(Events.INITIALIZE);
}

export function connect(deviceMac: string, deviceKey: string, iotImei: string) {
  validateScooter(deviceMac, deviceKey, iotImei);
  Spec.connect(deviceMac, deviceKey, iotImei);
  submitListener(Events.CONNECT);
}

export function disconnect() {
  Spec.disconnect();
  submitListener(Events.DISCONNECT);
}

export function unLock() {
  Spec.unLock();
  submitListener(Events.UNLOCK);
}

export function lock() {
  Spec.lock();
  submitListener(Events.LOCK);
}

export function openBatteryCover() {
  Spec.openBatteryCover();
  submitListener(Events.OPEN_COVER);
}

export function openSaddle() {
  Spec.openSaddle();
  submitListener(Events.OPEN_SADDLE);
}

export function openTailBox() {
  Spec.openTailBox();
  submitListener(Events.OPEN_TAIL_BOX);
}

export function queryVehicleInformation(listener: mListener<Events.VEHICLE_INFO>) {
  Spec.queryVehicleInformation();
  return submitListener(Events.VEHICLE_INFO, listener);
}

// Using infer to extract the listener type
export function queryIoTInformation(listener: mListener<Events.IOT_INFO>) {
  Spec.queryIoTInformation();
  return submitListener(Events.IOT_INFO, listener);
}
