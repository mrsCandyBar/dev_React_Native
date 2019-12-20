import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg from './components/svg';

export default function App() {

  return (
    <View style={styles.container}>
      <View style={{ flex: 8, flexDirection: 'row' }}>
        <Svg />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        
        <View style={{ flex: 1, backgroundColor: '#FF0000' }} />
        <View style={{ flex: 1, backgroundColor: '#00FF00' }} />
        <View style={{ flex: 1, backgroundColor: '#FF0000' }} />
        <View style={{ flex: 1, backgroundColor: '#00FF00' }} />
        <View style={{ flex: 1, backgroundColor: '#FF0000' }} />
        <View style={{ flex: 1, backgroundColor: '#00FF00' }} />

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
