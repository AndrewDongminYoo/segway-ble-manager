import { createContext, useEffect, useState, type ReactNode } from 'react';
import { type EmitterSubscription } from 'react-native';
import type { IoTInformation, Scooter, VehicleInfo } from './.';
import { Events, SupportedEvents, eventEmitter } from './.';

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
 *       <Text>IoT Device is Locked {ioTInformation.isLocked}</Text>
 *       <Text>Vehicle Battery Level {vehicleInformation.powerPercent}</Text>
 *     </View>
 *   );
 * }
 */
export const EventContext = createContext<{
  scooter: Scooter;
  ioTInformation: IoTInformation;
  vehicleInformation: VehicleInfo;
}>({
  scooter: {} as Scooter,
  ioTInformation: {} as IoTInformation,
  vehicleInformation: {} as VehicleInfo,
});

/**
 * Function that connects to a scooter and stores the connection information in the scooter state.
 * This returns a provider that will be contains context when the connection is established
 * It also listens for specific events and updates the context when those events are triggered.
 *
 * @param {ProviderExoticComponent<ProviderProps<T>>} props - The props are used to pass the children to the provider.
 * @param {ReactElement} props.children - The children are the components that will be rendered when the connection is established.
 * @property emitter - The event emitter is used to communicate with the native code.
 * @property mEvents - The list of events is used to update the context when those events are triggered.
 * @property BLEContext - The context is used to store information that is shared between components.
 * @example
 * import React from 'react';
 * import { View, Text } from 'react-native';
 * import { BLEProvider } from './ContextProvider';
 *
 * export default function App() {
 *   return (
 *     <BLEProvider>
 *       <View>
 *         <Text>Hello, world!</Text>
 *         <ScooterInfo />
 *       </View>
 *     </BLEProvider>
 *   );
 * }
 */
export function BLEProvider({ children }: { children: ReactNode }) {
  const [emitter] = useState(eventEmitter);
  const [mEvents] = useState(SupportedEvents);
  const [subList, setSubscriptions] = useState<EmitterSubscription[]>([]);
  const [scooter, setScooter] = useState({} as Scooter);
  const [iotInfo, setIoTInformation] = useState({} as IoTInformation);
  const [vehicle, setVehicleInformation] = useState({} as VehicleInfo);
  useEffect(() => {
    const temp = mEvents.map((event) => {
      return emitter.addListener(event, (data) => {
        console.debug(`${event} Event: ${data}`);
        switch (event) {
          case Events.CONNECT:
            return setScooter(data);
          case Events.IOT_INFO:
            return setIoTInformation(data);
          case Events.VEHICLE_INFO:
            return setVehicleInformation(data);
          default:
            if ('result' in data) {
              return data.result;
            }
            return data;
        }
      });
    });
    setSubscriptions(temp);
    return () => {
      subList.forEach((sub) => sub.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EventContext.Provider
      value={{
        scooter,
        ioTInformation: iotInfo,
        vehicleInformation: vehicle,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
