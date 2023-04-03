import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import InfoSection from './Section';
import type { IoTInformation, Scooter, VehicleInfo } from '@dongminyu/segway-ble-manager';
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
} from '@dongminyu/segway-ble-manager';
import ScooterButton from './Scooter';
import scooters from './data/devices.json';
import { getRequiredPermissions } from './permission';
import { BLE_INIT_OPERATION_CODE, BLE_INIT_SECRET_KEY } from '@env';

const App = () => {
  const [ioTInformation, setIoTInformation] = React.useState<IoTInformation>();
  const [vehicleInformation, setVehicleInformation] = React.useState<VehicleInfo>();
  const [scooter, setScooter] = React.useState<Scooter>(scooters[0] as Scooter);
  const [timer, setTimer] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    init(BLE_INIT_SECRET_KEY, BLE_INIT_OPERATION_CODE, true);
    // get required permissions
    getRequiredPermissions();
  }, []);

  React.useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => {
      setLoading(false);
      return clearInterval(intervalId);
    };
  }, [timer]);

  function getVehicleInformation() {
    queryVehicleInformation((data) => {
      setVehicleInformation(data);
      console.log(JSON.stringify(data));
    });
  }

  function getIoTInformation() {
    queryIoTInformation((data) => {
      setIoTInformation(data);
      console.log(JSON.stringify(data));
    });
  }

  function connectWithDevice() {
    if (timer > 0 || loading) {
      return;
    } else {
      setTimer(60);
      setLoading(true);
      const { deviceKey, deviceMac, iotImei } = scooter;
      connect(deviceMac, deviceKey, iotImei);
    }
  }

  // ui renderer
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View>
        <View style={styles.buttonGroup}>
          <Button onPress={connectWithDevice} disabled={loading || timer > 0} title="Connect" />
          <Button onPress={disconnect} title="Disconnect" />
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
        contentInsetAdjustmentBehavior="scrollableAxes"
        // contentContainerStyle={{ flex: 1 }}
        style={styles.backgroundStyle}
      >
        <InfoSection iotInformation={ioTInformation} vehicleInformation={vehicleInformation} />
        <View style={styles.scooterGroup}>
          {scooters.map((gco, _) => {
            return (
              <ScooterButton
                selected={gco.number === scooter.number}
                setScooter={setScooter}
                scooter={gco}
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
  backgroundStyle: {
    backgroundColor: '#F3F3F3',
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  scooterGroup: {
    height: 180,
    justifyContent: 'space-around',
  },
});

export default App;
