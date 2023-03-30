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

/**
 * This is very important part.
 * If new architecture is enabled, we should use the turbo module.
 * Otherwise, we should get the module from NativeModules.
 *
 * @see [NativeModule](../example/node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter.d.ts)
 */
const SegwayBleManagerModule = isTurboModuleEnabled
  ? require('./NativeSegwayBleManager').default
  : NativeModules.SegwayBleManager;

/**
 * @description This is a proxy that throws an error when SegwayBleManagerModule is accessed.
 * This is used to prevent SegwayBleManagerModule from being accessed in a
 * context where it is not defined, such as during static analysis.
 * @throws Linking Error when accessed without import module.
 */
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

/**
 * @description The event emitter of the module.
 */
export const eventEmitter = new NativeEventEmitter(Spec);

/** Scooter represents a scooter. */
export interface Scooter {
  /** The scooter's number. */
  number: string;
  /** The scooter's device mac address. */
  deviceMac: string;
  /** The scooter's device key. */
  deviceKey: string;
  /** The scooter's imei. */
  iotImei: string;
}

export interface VehicleInfo {
  /**
   * @description The percentage value of battery, 80 means 80%.
   * @example 44
   */
  powerPercent: number;
  /**
   * @description The level of the speed.
   * @constant 1: Low speed
   * @constant 2: Medium speed
   * @constant 3: High speed
   */
  speedMode: number;
  /**
   * @description The current speed of the car in km/h.
   */
  currentSpeed: number;
  /**
   * @description The total range of the car in meter.
   */
  totalRange: number;
  /**
   * @description The remaining range of the car in meter.
   */
  remainingRange: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The current level of battery.
   * Available in Android yet, but will be deprecated in java.
   * Not exists in ios. Use `powerPercent` instead.
   */
  currentBatteryLevel?: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The current speed of the car.
   * Available in Android yet, but will be deprecated in java.
   * Not exists in ios. Use `speedMode` instead.
   */
  currentMode?: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The remaining range of the car in meter.
   * Available in android yet. Not exists in ios.
   * Use `remainingRange` instead.
   */
  range?: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The total range of the car in meter.
   * Available in android, but deprecated in java. Not exists in ios.
   * Use `totalRange` instead.
   */
  singleMileage?: number;
}
export interface IoTInformation {
  /**
   * @deprecated From version v1.1.0.
   * @description The low voltage of the battery in mV.
   * Will be deprecated in java, No longer supported in ios.
   */
  lowBatteryVoltage: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The high voltage of the battery in mV.
   * Available in android. Still available but will be deprecated in java, Not exists in ios.
   */
  highBatteryVoltage: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The status of the battery power.
   * Will be deprecated in java, Not exists in ios.
   */
  powerStatus: number;
  /**
   * @deprecated From version v1.1.0.
   * @description Reserve.
   * Will be deprecated in java, Not exists in ios.
   */
  reserve: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The number of major version.
   * Will be deprecated in ios. Use `majorVersionNumber` instead.
   */
  mainVersion: number;
  /**
   * @description The number of major version.
   * Will be deprecated in ios. Use `majorVersionNumber` instead.
   */
  majorVersionNumber: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The number of minor version.
   * Will be deprecated in ios. Not exists in java.
   */
  secondVersion: number;
  /**
   * @description The number of minor version.
   */
  minorVersionNumber: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The number of revision version.
   * Will be deprecated in java, Not exists in ios.
   */
  versionRevisions: number;
  /**
   * @deprecated From version v1.1.0.
   * @description The times of updating software.
   * Will be deprecated In ios. Use `updateTimes` instead.
   */
  modifiedTimes: number;
  /**
   * @since version v1.1.0.
   * @description IoT device software version update times.
   */
  updateTimes: number;
  /**
   * @since version v1.1.0.
   * @description The state of the IoT device being locked or not.
   */
  isLocked: boolean;
  /**
   * @deprecated From version v1.1.0.
   * @description Highest voltage in mV.
   * Will be deprecated in ios. Use `voltage` instead.
   */
  voltageH: number;
  /**
   * @deprecated From version v1.1.0.
   * @description Lowest voltage in mV.
   * Will be deprecated in ios. Use `voltage` instead.
   */
  voltageL: number;
  /**
   * @since version v1.1.0.
   * @description The voltage of IoT is an integer in mV.
   * It is the average of the highest and lowest voltage.
   */
  voltage: number;
}

/**
 * @description The enumeration values of supported event names.
 * NOTE: It has to be same with native module's event names.
 * @see [Exporting Constants](https://reactnative.dev/docs/native-modules-ios#exporting-constants)
 * @see [Sending Events to JavaScript](https://reactnative.dev/docs/native-modules-ios#sending-events-to-javascript)
 * @member `CONNECT`: The event that returns whether the scooter is connected.
 * @member `DISCONNECT`: The event that returns whether the scooter is disconnected.
 * @member `INITIALIZE`: The event that returns whether the scooter is initialized.
 * @member `IOT_INFO`: The event that contains condition about the scooter's IoT information.
 * @member `VEHICLE_INFO`: The event that contains condition about the scooter's vehicle information.
 * @member `LOCK`: The event that returns whether the scooter is locked.
 * @member `UNLOCK`: The event that returns whether the scooter is unlocked.
 * @member `OPEN_COVER`: The event that returns whether the scooter's cover is opened.
 * @member `OPEN_SADDLE`: The event that returns whether the scooter's saddle is opened.
 * @member `OPEN_TAIL_BOX`: The event that returns whether the scooter's tail box is opened.
 */
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

/**
 * The enumeration values of supported event names.
 */
export const SupportedEvents = (Spec.getConstants().supportedEvents = Object.values(Events));

/**
 * EventListener type of the supported events what returns the scooter's information.
 */
type mListener<T extends Events> = (
  data: T extends Events.CONNECT
    ? Scooter
    : T extends Events.IOT_INFO
    ? IoTInformation
    : T extends Events.VEHICLE_INFO
    ? VehicleInfo
    : unknown
) => void;

/**
 * Function that takes an event type and a listener,
 * check the listener count to have only single subscription,
 * and returns a event emitter subscription.
 *
 * @type EmitterSubscription {@link https://reactnative.dev/docs/emittersubscription}
 * @param {Events} eventType - The event type to listen for.
 * @param {mListener<Events>} [listener] - The function to be called when the event is emitted.
 * @returns {EmitterSubscription} A function that takes a single argument of type T and returns void.
 * @example `submitListener(Events.INITIALIZE, (data) => console.debug(data));`
 */
const submitListener = <T extends Events>(eventType: T, listener?: mListener<T>) => {
  const count = eventEmitter.listenerCount(eventType);
  if (count > 0) {
    eventEmitter.removeAllListeners(eventType);
  }
  listener = listener ?? ((data) => console.debug(`${eventType} Event: ${JSON.stringify(data)}`));
  return eventEmitter.addListener(eventType, listener);
};

/**
 * Function that calls the initializing method named `Spec.init` and then calls the
 * `submitListener` function with the `Events.INITIALIZE` parameter.
 *
 * @param {string} secretKey - The secret key you received from the Spec.ai team.
 * @param {string} operatorCode - The operator code you received from the Spec team.
 * @param {boolean} isDebug - If true, the SDK will log all the events to the console.
 * @example `init(e0382c1944874be7a1ed7f4546e0f412, B40006, true)
 */
export function init(secretKey: string, operatorCode: string, isDebug: boolean) {
  validateKeyCode(operatorCode, secretKey, isDebug);
  Spec.init(secretKey, operatorCode, isDebug);
  submitListener(Events.INITIALIZE);
}

/**
 * Function that calls the `Spec.connect` function and then calls the
 * `submitListener` function with the `Events.CONNECT` parameter.
 *
 * @param {string} deviceMac - The MAC address of the scooter.
 * @param {string} deviceKey - The device key is a unique identifier for the scooter.
 * It is a 16-character string.
 * @param {string} iotImei - The IMEI number of the scooter.
 * @example `connect('FA:B7:08:B5:B5:46', 'gBiKeWkd', '861123056350117');`
 */
export function connect(deviceMac: string, deviceKey: string, iotImei: string) {
  validateScooter(deviceMac, deviceKey, iotImei);
  Spec.connect(deviceMac, deviceKey, iotImei);
  submitListener(Events.CONNECT);
}

/**
 * Function that calls the `Spec.disconnect` function and then calls the
 * `submitListener` function with the `Events.DISCONNECT` parameter.
 *
 * @example `disconnect();`
 */
export function disconnect() {
  Spec.disconnect();
  submitListener(Events.DISCONNECT);
}

/**
 * Function that calls the `Spec.unLock` function and then calls the
 * `submitListener` function with the `Events.UNLOCK` parameter.
 *
 * @example `unLock();`
 */
export function unLock() {
  Spec.unLock();
  submitListener(Events.UNLOCK);
}

/**
 * Function that calls the `Spec.lock` function and then calls the
 * `submitListener` function with the `Events.LOCK` parameter.
 *
 * @example `lock();`
 */
export function lock() {
  Spec.lock();
  submitListener(Events.LOCK);
}

/**
 * Function that calls the `Spec.openBatteryCover` function and then calls the
 * `submitListener` function with the `Events.OPEN_COVER` parameter.
 *
 * @example `onBatteryCover();`
 */
export function openBatteryCover() {
  Spec.openBatteryCover();
  submitListener(Events.OPEN_COVER);
}

/**
 * Function that calls the `Spec.openSaddle` function and then calls the
 * `submitListener` function with the `Events.OPEN_SADDLE` parameter.
 *
 * @example `openSaddle()`
 */
export function openSaddle() {
  Spec.openSaddle();
  submitListener(Events.OPEN_SADDLE);
}

/**
 * Function that calls the `Spec.openTailBox` function and then calls the
 * `submitListener` function with the `Events.OPEN_TAIL_BOX` parameter.
 *
 * @example `openTailBox();`
 */
export function openTailBox() {
  Spec.openTailBox();
  submitListener(Events.OPEN_TAIL_BOX);
}

/**
 * Function that calls the `Spec.queryVehicleInformation` function and then calls the
 * `submitListener` function with the `Events.VEHICLE_INFO` parameter.
 *
 * @param {mListener<Events.VEHICLE_INFO>} listener - The function to be called when the event is emitted.
 * @example `queryVehicleInformation((data) => console.debug(data));`
 */
export function queryVehicleInformation(listener: mListener<Events.VEHICLE_INFO>) {
  Spec.queryVehicleInformation();
  return submitListener(Events.VEHICLE_INFO, listener);
}

/**
 * Function that calls the `Spec.queryIoTInformation` function and then calls the
 * `submitListener` function with the `Events.IOT_INFO` parameter.
 *
 * @param {mListener<Events.IOT_INFO>} listener - The function to be called when the event is emitted.
 * @example `queryIoTInformation((data) => console.debug(data));`
 */
export function queryIoTInformation(listener: mListener<Events.IOT_INFO>) {
  Spec.queryIoTInformation();
  return submitListener(Events.IOT_INFO, listener);
}
