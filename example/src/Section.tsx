/**
 * Segway ble library example project
 */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { IoTInformation, VehicleInfo } from '@gbike/segway-ble-manager';

// ui renderer
function Section({ children, title }: { children?: React.ReactNode; title: string }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
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
      <View>
        <Section title="highBatteryVoltage">{iotInformation?.highBatteryVoltage}</Section>
        <Section title="isLocked">{iotInformation?.isLocked}</Section>
        <Section title="majorVersionNumber">{iotInformation?.majorVersionNumber}</Section>
        <Section title="minorVersionNumber">{iotInformation?.minorVersionNumber}</Section>
        <Section title="updateTimes">{iotInformation?.updateTimes}</Section>
        <Section title="voltage">{iotInformation?.voltage}</Section>
      </View>
      <View>
        <Section title="powerPercent">{vehicleInformation?.powerPercent}</Section>
        <Section title="speedMode">{vehicleInformation?.speedMode}</Section>
        <Section title="currentSpeed">{vehicleInformation?.currentSpeed}</Section>
        <Section title="totalRange">{vehicleInformation?.totalRange}</Section>
        <Section title="remainingRange">{vehicleInformation?.remainingRange}</Section>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black,
  },
});

export default InfoSection;
