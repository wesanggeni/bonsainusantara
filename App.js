import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ApplicationProvider, Layout } from "react-native";
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';
import MainNavigator from './Navigator';
import { store, persistor } from './saiki/redux/store/store';

export const App = (props) => {

  return (
    <Provider store={store}>
      <PersistGate
        loading={(<View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#48C752" /></View>)}
        persistor={persistor}
        >
          <MainNavigator/>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App;
