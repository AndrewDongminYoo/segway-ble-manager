import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import InfoSection from './Section';
import type { IoTInformation, Scooter, VehicleInfo } from '@gbike/segway-ble-manager';
import {
  connect,
  disconnect,
  init,
  unLock,
  lock,
  openBatteryCover,
  openSaddle,
  openTailBox,
  queryVehicleInformation,
  queryIoTInformation,
} from '@gbike/segway-ble-manager';
import ScooterButton from './Scooter';
import scooters from './data/devices.json';
import { getRequiredPermissions } from './permission';

const BLE_OPERATION_CODE: string = process.env.BLE_OPERATION_CODE as string;
const BLE_SECRET_KEY: string = process.env.BLE_SECRET_KEY as string;

const App = () => {
  const [iotInformation, setIoTInformation] = React.useState<IoTInformation>();
  const [vehicleInformation, setVehicleInformation] = React.useState<VehicleInfo>();
  const [scooter, setScooter] = React.useState<Scooter>({
    number: '356463',
    deviceMac: 'FA:B7:08:B5:B5:46',
    deviceKey: 'gBiKeWkd',
    iotImei: '861123056350117',
  });

  // lifecycle
  React.useEffect(() => {
    // instance 생성
    init(BLE_SECRET_KEY, BLE_OPERATION_CODE, true);
    // get required permissions
    getRequiredPermissions();
  }, []);

  const getVehicleInformation = () => {
    queryVehicleInformation((data) => {
      setVehicleInformation(data);
      console.log(JSON.stringify(vehicleInformation));
    });
  };

  const getIoTInformation = () => {
    queryIoTInformation((data) => {
      setIoTInformation(data);
    });
  };

  // ui renderer
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View>
        <View style={styles.buttonGroup}>
          <Button onPress={() => connect(scooter.deviceMac, scooter.deviceKey, scooter.iotImei)} title="Connect" />
          <Button onPress={() => disconnect()} title="Disconnect" />
        </View>
        <View style={styles.buttonGroup}>
          <Button onPress={unLock} title="UnLock" />
          <Button onPress={lock} title="Lock" />
          <Button onPress={openBatteryCover} title="Open Battery Cover" />
        </View>
        <View style={styles.buttonGroup}>
          <Button onPress={openSaddle} title="Open Saddle" />
          <Button onPress={openTailBox} title="Open Tail Box" />
        </View>
        <View style={styles.buttonGroup}>
          <Button onPress={getVehicleInformation} title="Vehicle Info" />
          <Button onPress={getIoTInformation} title="IoT Info" />
        </View>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flex: 1 }}
        style={styles.backgroundStyle}
      >
        <InfoSection iotInformation={iotInformation} />
        <View style={styles.scooterGroup}>
          {scooters.map((gco, _) => {
            return (
              <ScooterButton
                selected={gco.number === scooter.number}
                setScooter={setScooter}
                scooter={gco}
                style={undefined}
                key={gco.number}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  backgroundStyle: {
    backgroundColor: '#F3F3F3',
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  highlight: {
    fontWeight: '700',
  },
  scooterGroup: {
    height: 180,
    justifyContent: 'space-around',
  },
});

export default App;
