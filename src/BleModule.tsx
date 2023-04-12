import { NativeEventEmitter, NativeModules } from 'react-native';
import SegwayBleManager from './NativeSegwayBleManager';
import { EventType } from './BleResType';
import LINKING_ERROR from './LinkingError';

// @ts-expect-error
export const isTurboModuleEnabled = global.__turboModuleProxy != null;
/**
 * This is very important part.
 * If new architecture is enabled, we should use the turbo module.
 * Otherwise, we should get the module from NativeModules.
 *
 * @see [NativeModule](../example/node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter.d.ts)
 */
export const SegwayBleManagerModule = isTurboModuleEnabled
  ? require('./NativeSegwayBleManager').default
  : NativeModules.SegwayBleManager;

/**
 * @description This is a proxy that throws an error when SegwayBleManagerModule is accessed.
 * This is used to prevent SegwayBleManagerModule from being accessed in a
 * context where it is not defined, such as during static analysis.
 * @throws Linking Error when accessed without import module.
 */
export const Spec = (
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
export const eventReceiver = new NativeEventEmitter(Spec);

/**
 * @description The enumeration values of supported event names.
 * @typedef {EventType[]} SupportedEvents
 */
export const SubEventList = Object.values(EventType);
