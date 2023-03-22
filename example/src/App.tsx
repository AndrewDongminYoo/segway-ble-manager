import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Section from './Section';
import { IoTInformation, Scooter } from '@gbike/segway-ble-manager';
import {
  // connect,
  disconnect,
  unLock,
  lock,
  openBatteryCover,
  openSaddle,
  openTailBox,
  queryVehicleInformation,
  queryIotInformation,
} from '@gbike/segway-ble-manager';

const App = () => {
  const [iotInformation] = React.useState<IoTInformation>();
  // const [vehicleInformation, setVehicleInformation] = React.useState<VehicleInfo>();
  const [scooter, setScooter] = React.useState<Scooter>({
    number: '356463',
    bleMac: 'FA:B7:08:B5:B5:46',
    bleKey: 'gBiKeWkd',
    iotImei: '861123056350117',
  });

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View>
        <View style={styles.buttonGroup}>
          <Button onPress={disconnect} title="Disconnect" />
          <Button onPress={queryVehicleInformation} title="Vehicle Info" />
          <Button onPress={queryIotInformation} title="IoT Info" />
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
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flex: 1 }}
        style={styles.backgroundStyle}
      >
        <View>
          <Section title="powerPercent">{iotInformation?.powerPercent}</Section>
          <Section title="speedMode">{iotInformation?.speedMode}</Section>
          <Section title="currentSpeed">{iotInformation?.currentSpeed}</Section>
          <Section title="totalRange">{iotInformation?.totalRange}</Section>
          <Section title="remainingRange">{iotInformation?.remainingRange}</Section>
        </View>
        <View style={{ height: 180, justifyContent: 'space-around' }}>
          <Button
            title="356463"
            color={scooter.number === '356463' ? Colors.green : Colors.black}
            onPress={() => {
              setScooter({
                number: '356463',
                bleMac: 'FA:B7:08:B5:B5:46',
                bleKey: 'gBiKeWkd',
                iotImei: '861123056350117',
              });
            }}
          />
          <Button
            title="361556"
            color={scooter.number === '361556' ? Colors.green : Colors.black}
            onPress={() => {
              setScooter({
                number: '361556',
                bleMac: '78:05:41:1C:37:86',
                bleKey: 'gBiKeWkd',
                iotImei: '866770052403186',
              });
            }}
          />
          <Button
            title="332884"
            color={scooter.number === '332884' ? Colors.green : Colors.black}
            onPress={() => {
              setScooter({
                number: '332884',
                bleMac: '78:05:41:07:B3:51',
                bleKey: 'gBiKeWkd',
                iotImei: '860517048911822',
              });
            }}
          />
          <Button
            title="356465"
            color={scooter.number === '356465' ? Colors.green : Colors.black}
            onPress={() => {
              setScooter({
                number: '356465',
                bleMac: '78:05:41:0A:1F:48',
                bleKey: 'gBiKeWkd',
                iotImei: '860517046421444',
              });
            }}
          />
          <Button
            title="356460"
            color={scooter.number === '356460' ? Colors.green : Colors.black}
            onPress={() => {
              setScooter({
                number: '356460',
                bleMac: 'E5:41:48:9E:41:CC',
                bleKey: 'gBiKeWkd',
                iotImei: '867584035499958',
              });
            }}
          />
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
    backgroundColor: Colors.lighter,
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
});

export default App;
