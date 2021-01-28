import React from 'react';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const CustomStatusBar = () => (
  <View style={styles.statusBar}>
    <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});

export default CustomStatusBar;
