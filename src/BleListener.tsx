import { EventType, IoTInfo, VehicleInfo, OnSuccess } from './BleResType';

/**
 * EventListener type of the supported events what returns the scooter's information.
 */

export type EventListener<T extends EventType> = (
  data: T extends EventType.IOT_INFO ? IoTInfo : T extends EventType.VEHICLE_INFO ? VehicleInfo : OnSuccess
) => void;
