import { useEffect, useState, type ReactNode } from 'react';
import { type EmitterSubscription } from 'react-native';
import type { IoTInfo, Scooter, VehicleInfo } from './BleResType';
import { SubEventList, eventReceiver } from './BleModule';
import { EventType } from './BleResType';
import { EventContext } from './BleContext';

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
  const [subList, setSubscriptions] = useState<EmitterSubscription[]>([]);
  const [scooter, setScooter] = useState({} as Scooter);
  const [iotInfo, setIoTInformation] = useState({} as IoTInfo);
  const [vehicle, setVehicleInformation] = useState({} as VehicleInfo);
  useEffect(() => {
    const temp = SubEventList.map((eventType) => {
      return eventReceiver.addListener(eventType, (data) => {
        console.debug(`${eventType} Event: ${data}`);
        switch (eventType) {
          case EventType.CONNECT:
            return setScooter(data);
          case EventType.IOT_INFO:
            return setIoTInformation(data);
          case EventType.VEHICLE_INFO:
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
