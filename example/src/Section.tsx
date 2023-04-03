/**
 * Segway ble library example project.
 */

import { type ButtonProps, StyleSheet, Text, View } from 'react-native';
import React, { type PropsWithChildren } from 'react';
import { IoTInformation, VehicleInfo } from '@dongminyu/segway-ble-manager';

// ui renderer
function Section({ children, title }: PropsWithChildren<ButtonProps>) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <Text style={styles.sectionDescription}>{children}</Text>
    </View>
  );
}

function InfoSection({
  iotInformation,
  vehicleInformation,
}: {
  iotInformation?: IoTInformation;
  vehicleInformation?: VehicleInfo;
}) {
  return (
    <View>
      <View style={styles.columnStyle}>
        <Section title={'is locked'}>{iotInformation?.isLocked}</Section>
        <Section title={'voltage'}>{iotInformation?.voltage}</Section>
        <Section title={'high battery voltage'}>{iotInformation?.highBatteryVoltage}</Section>
        <Section title={'update times'}>{iotInformation?.updateTimes}</Section>
        <Section title={'major version number'}>{iotInformation?.majorVersionNumber}</Section>
        <Section title={'minor version number'}>{iotInformation?.minorVersionNumber}</Section>
      </View>
      <View style={styles.columnStyle}>
        <Section title={'power percent'}>{vehicleInformation?.powerPercent}</Section>
        <Section title={'speed mode'}>{vehicleInformation?.speedMode}</Section>
        <Section title={'current speed'}>{vehicleInformation?.currentSpeed}</Section>
        <Section title={'total range'}>{vehicleInformation?.totalRange}</Section>
        <Section title={'remaining range'}>{vehicleInformation?.remainingRange}</Section>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  columnStyle: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    textTransform: 'uppercase',
  },
  sectionDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
});

export default InfoSection;
