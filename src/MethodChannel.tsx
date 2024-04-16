import { logger, validateKeyCode, validateScooter } from './utils';
import { type EmitterSubscription } from 'react-native';
import { EventType, type EventListener } from './BleResType';
import { eventReceiver, Spec } from './BleModule';

/**
 * Function that takes an event type and a listener,
 * check the listener count to have only single subscription,
 * and returns a event emitter subscription.
 * @see EmitterSubscription {@link https://reactnative.dev/docs/emittersubscription}
 * @param {EventType} eventType - The event type to listen for.
 * @param {EventListener<EventType>} listener - The function to be called when the event is emitted.
 * @returns {EmitterSubscription} A function that takes a single argument of type T and returns void.
 * @example
 *     registerListener(EventType.INITIALIZE, (data) => {
 *        console.debug(data)
 *     })
 */
export function registerListener<T extends EventType>(eventType: T, listener: EventListener<T>): EmitterSubscription {
  if (eventReceiver.listenerCount(eventType) > 0) {
    eventReceiver.removeAllListeners(eventType);
  }
  return eventReceiver.addListener(eventType, listener);
}
/**
 * Function that calls the initializing method named `SegwayBleManagerModule.init` and then calls the
 * `registerListener` function with the `EventType.INITIALIZE` parameter.
 * @param {string} secretKey - The secret key you received from the Spec.ai team.
 * @param {string} operatorCode - The operator code you received from the Spec team.
 * @param {boolean} isDebug - If true, the SDK will log all the events to the console.
 * @example
 *     init(e0382c1944874be7a1ed7f4546e0f412, B40006, true);
 */
export function initialize(secretKey: string, operatorCode: string, isDebug: boolean) {
  validateKeyCode(operatorCode, secretKey, isDebug);
  registerListener(EventType.INITIALIZE, function (data) {
    logger.debug(JSON.stringify(data));
    return data?.result;
  });
  Spec.init(secretKey, operatorCode, isDebug);
}
/**
 * Function that calls the `SegwayBleManagerModule.connect` function and then calls the
 * `registerListener` function with the `EventType.CONNECT` parameter.
 * @param {string} deviceMac - The MAC address of the scooter.
 * @param {string} deviceKey - The device key is a unique identifier for the scooter.
 * It is a 16-character string.
 * @param {string} iotImei - The IMEI number of the scooter.
 * @example
 */
export function ioTConnect(deviceMac: string, deviceKey: string, iotImei: string) {
  validateScooter(deviceMac, deviceKey, iotImei);
  registerListener(EventType.CONNECT, function (data) {
    logger.debug(JSON.stringify(data));
    return data?.result;
  });
  Spec.connect(deviceMac, deviceKey, iotImei);
}
/**
 * Function that calls the `SegwayBleManagerModule.disconnect` function and then calls the
 * `registerListener` function with the `EventType.DISCONNECT` parameter.
 * @example
 *     registerListener();
 */
export function ioTDisconnect() {
  registerListener(EventType.DISCONNECT, function (data) {
    logger.debug(JSON.stringify(data));
    return data?.result;
  });
  Spec.disconnect();
}
/**
 * Function that calls the `SegwayBleManagerModule.unLock` function and then calls the
 * `registerListener` function with the `EventType.UNLOCK` parameter.
 * @example
 *     registerListener();
 */
export function unLockScooter() {
  registerListener(EventType.UNLOCK, function (data) {
    logger.debug(JSON.stringify(data));
    return data?.result;
  });
  Spec.unLock();
}
/**
 * Function that calls the `SegwayBleManagerModule.lock` function and then calls the
 * `registerListener` function with the `EventType.LOCK` parameter.
 * @example
 *     lockScooter();
 */
export function lockScooter() {
  registerListener(EventType.LOCK, function (data) {
    logger.debug(JSON.stringify(data));
    return data?.result;
  });
  Spec.lock();
}
/**
 * Function that calls the `SegwayBleManagerModule.openBatteryCover` function and then calls the
 * `registerListener` function with the `EventType.OPEN_COVER` parameter.
 * @example
 *     onBatteryCover();
 */
export function openBatteryCover() {
  registerListener(EventType.OPEN_COVER, function (data) {
    logger.debug(JSON.stringify(data));
    return data?.result;
  });
  Spec.openBatteryCover();
}
/**
 * Function that calls the `SegwayBleManagerModule.openSaddle` function and then calls the
 * `registerListener` function with the `EventType.OPEN_SADDLE` parameter.
 * @example
 *     openSaddle();
 */
export function openSaddle() {
  registerListener(EventType.OPEN_SADDLE, function (data) {
    logger.debug(JSON.stringify(data));
    return data?.result;
  });
  Spec.openSaddle();
}
/**
 * Function that calls the `SegwayBleManagerModule.openTailBox` function and then calls the
 * `registerListener` function with the `EventType.OPEN_TAIL_BOX` parameter.
 * @example
 *     openTailBox();
 */
export function openTailBox() {
  registerListener(EventType.OPEN_TAIL_BOX, function (data) {
    logger.debug(JSON.stringify(data));
    return data?.result;
  });
  Spec.openTailBox();
}
/**
 * Function that calls the `SegwayBleManagerModule.queryVehicleInformation` function and then calls the
 * `registerListener` function with the `EventType.VEHICLE_INFO` parameter.
 * @param {EventListener<EventType.VEHICLE_INFO>} listener - The function to be called when the event is emitted.
 * @example
 *     queryVehicleInfo((data) => console.debug(data));
 */
export function queryVehicleInfo(listener: EventListener<EventType.VEHICLE_INFO>) {
  Spec.queryVehicleInformation();
  return registerListener(EventType.VEHICLE_INFO, listener);
}
/**
 * Function that calls the `SegwayBleManagerModule.queryIoTInformation` function and then calls the
 * `registerListener` function with the `EventType.IOT_INFO` parameter.
 * @param {EventListener<EventType.IOT_INFO>} listener - The function to be called when the event is emitted.
 * @example
 *     queryIoTInfo((data) => console.debug(data));
 */
export function queryIoTInfo(listener: EventListener<EventType.IOT_INFO>) {
  Spec.queryIoTInformation();
  return registerListener(EventType.IOT_INFO, listener);
}
