/**
 * Segway ble library example project
 */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// ui renderer
function Section({ children, title }: { children?: React.ReactNode; title: string }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{children}</Text>
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

export default Section;
