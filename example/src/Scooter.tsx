import React from 'react';
import type { ColorValue, StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { Scooter } from '@dongminyu/segway-ble-manager';

const rnColor: Record<string, ColorValue> = {
  primary: '#1292B4',
  white: '#FFF',
  lighter: '#F3F3F3',
  light: '#DAE1E7',
  dark: '#444',
  darker: '#222',
  black: '#000',
};

export default function ScooterButton({
  style,
  scooter,
  setScooter,
  selected,
  ...props
}: {
  style?: StyleProp<ViewStyle | TextStyle>;
  selected: boolean;
  scooter: Scooter;
  setScooter: React.Dispatch<React.SetStateAction<Scooter>>;
} & Omit<TouchableOpacityProps, 'children'>) {
  const primeColor = selected ? rnColor.primary : rnColor.dark;
  const containerStyle: StyleProp<ViewStyle | TextStyle> = [
    {
      ...(Platform.OS === 'ios'
        ? { color: primeColor, backgroundColor: rnColor.lighter }
        : { backgroundColor: primeColor, color: rnColor.white }),
    },
    style,
  ];

  return (
    <TouchableOpacity style={[containerStyle, styles.container]} onPress={() => setScooter(scooter)} {...props}>
      <Text>SCOOTER_DEVICE_NUMBS: {scooter.number}</Text>
      <Text>DEVICE_BLUETOOTH_KEY: {scooter.deviceKey}</Text>
      <Text>DEVICE_MAC_ADDRESSES: {scooter.deviceMac}</Text>
      <Text>DEVICE_IOT_IMEI_NUMB: {scooter.iotImei}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    margin: 10,
    alignSelf: 'stretch',
    overflow: 'scroll',
  },
});
