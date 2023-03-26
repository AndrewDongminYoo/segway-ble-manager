import React from 'react';
import { ColorValue, Platform, Pressable, PressableProps, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { Scooter } from '@gbike/segway-ble-manager';

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
  style: StyleProp<ViewStyle | TextStyle>;
  selected: boolean;
  scooter: Scooter;
  setScooter: React.Dispatch<React.SetStateAction<Scooter>>;
} & Omit<PressableProps, 'children'>) {
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
    <Pressable style={containerStyle} onPress={() => setScooter(scooter)} {...props}>
      <Text>{scooter.number}</Text>
    </Pressable>
  );
}
