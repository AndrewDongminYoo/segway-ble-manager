import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import InfoSection from './Section';
import type { IoTInfo, Scooter, VehicleInfo } from '@dongminyu/segway-ble-manager';
import {
  ioTConnect,
  ioTDisconnect,
  initialize,
  unLockScooter,
  lockScooter,
  openBatteryCover,
  openSaddle,
  openTailBox,
  queryVehicleInfo,
  queryIoTInfo,
} from '@dongminyu/segway-ble-manager';
import ScooterButton from './Scooter';
import scooters from './data/devices.json';
import { getRequiredPermissions } from './permission';
import { BLE_INIT_OPERATION_CODE, BLE_INIT_SECRET_KEY } from '@env';

const App = () => {
  const [ioTInformation, setIoTInformation] = React.useState<IoTInfo>();
  const [vehicleInformation, setVehicleInfo] = React.useState<VehicleInfo>();
  const [scooter, setScooter] = React.useState<Scooter>(scooters[0] as Scooter);
  const [timer, setTimer] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    initialize(BLE_INIT_SECRET_KEY, BLE_INIT_OPERATION_CODE, true);
    // get required permissions
    getRequiredPermissions();
  }, []);

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;
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
    queryVehicleInfo((info: React.SetStateAction<VehicleInfo | undefined>) => {
      setVehicleInfo(info);
      console.log(JSON.stringify(info));
    });
  }

  function getIoTInformation() {
    queryIoTInfo((info: React.SetStateAction<IoTInfo | undefined>) => {
      setIoTInformation(info);
      console.log(JSON.stringify(info));
    });
  }

  function connectWithDevice() {
    if (timer > 0 || loading) {
      return;
    } else {
      setTimer(60);
      setLoading(true);
      const { deviceKey, deviceMac, iotImei } = scooter;
      ioTConnect(deviceMac, deviceKey, iotImei);
    }
  }

  // ui renderer
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View>
        <View style={styles.buttonGroup}>
          <Button onPress={connectWithDevice} disabled={loading || timer > 0} title="Connect" />
          <Button onPress={ioTDisconnect} title="Disconnect" />
        </View>
        <View style={styles.buttonGroup}>
          <Button onPress={unLockScooter} title="UnLock" />
          <Button onPress={lockScooter} title="Lock" />
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
      <ScrollView contentInsetAdjustmentBehavior="scrollableAxes" style={styles.backgroundStyle}>
        <InfoSection iotInformation={ioTInformation} vehicleInfo={vehicleInformation} />
        <View style={styles.scooterGroup}>
          {scooters.map((sco: any) => {
            return (
              <ScooterButton
                selected={sco.number === scooter.number}
                setScooter={setScooter}
                scooter={sco}
                key={sco.number}
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
