export interface OnSuccess {
  result: true;
}
export interface OnFailure {
  result: false;
  code?: number;
  message?: string;
  errorName?: string;
  errorStack?: string;
  errorMessage?: string;
}
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
   * @enum 1: Low speed
   * @enum 2: Medium speed
   * @enum 3: High speed
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
export interface IoTInfo {
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
   * @description IoT device software version update times.
   */
  updateTimes: number;
  /**
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
   * @description The voltage of IoT is an integer in mV.
   * It is the average of the highest and lowest voltage.
   */
  voltage: number;
}
/**
 * @description The enumeration values of supported event names.
 * NOTE: It has to be same with native module's event names.
 * @see [getConstants](https://reactnative.dev/docs/native-modules-ios#exporting-constants)
 * @see [Sending Events to JavaScript](https://reactnative.dev/docs/native-modules-ios#sending-events-to-javascript)
 * @typedef {Record<string, string>} EventType
 * @property {string} name
 * @property {string} CONNECT The event that returns whether the scooter is connected.
 * @property {string} DISCONNECT The event that returns whether the scooter is disconnected.
 * @property {string} INITIALIZE The event that returns whether the scooter is initialized.
 * @property {string} IOT_INFO The event that contains condition about the scooter's IoT information.
 * @property {string} VEHICLE_INFO The event that contains condition about the scooter's vehicle information.
 * @property {string} LOCK The event that returns whether the scooter is locked.
 * @property {string} UNLOCK The event that returns whether the scooter is unlocked.
 * @property {string} OPEN_COVER The event that returns whether the scooter's cover is opened.
 * @property {string} OPEN_SADDLE The event that returns whether the scooter's saddle is opened.
 * @property {string} OPEN_TAIL_BOX The event that returns whether the scooter's tail box is opened.
 */
export enum EventType {
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
 * EventListener type of the supported events what returns the scooter's information.
 */
export type EventListener<T extends EventType> = (
  data: T extends EventType.IOT_INFO ? IoTInfo : T extends EventType.VEHICLE_INFO ? VehicleInfo : OnSuccess
) => void;
