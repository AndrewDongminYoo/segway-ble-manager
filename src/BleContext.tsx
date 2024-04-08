import { createContext } from 'react';
import type { IoTInfo, Scooter, VehicleInfo } from './BleResType';

/**
 * @description The `React Context` that is used to pass data from the App component
 * to the children components. The `EventContext` is used to provide the `Scooter`,
 * `IoTInformation`, and `VehicleInfo` objects to the event component. The event component
 * uses these objects to display the current status of the scooter.
 * @example
 * import React, { useContext } from 'react';
 * import { View, Text } from 'react-native';
 * import { EventContext } from './ContextProvider';
 *
 * function ScooterInfo() {
 *   const { scooter, ioTInformation, vehicleInformation } = useContext(EventContext);
 *   return (
 *     <View>
 *       <Text>Scooter Info</Text>
 *       <Text>ScooterNumber {scooter.number}</Text>
 *       <Text>IoT Device is Locked {ioTInformation.isLocked}</Text>
 *       <Text>Vehicle Battery Level {vehicleInformation.powerPercent}</Text>
 *     </View>
 *   );
 * }
 */
export const EventContext = createContext<{
  scooter: Scooter;
  ioTInformation: IoTInfo;
  vehicleInformation: VehicleInfo;
}>({
  scooter: {} as Scooter,
  ioTInformation: {} as IoTInfo,
  vehicleInformation: {} as VehicleInfo,
});
