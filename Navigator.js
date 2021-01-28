import React, { useState, useEffect } from 'react';
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import {NavigatorBeranda, NavigatorGaleri, NavigatorPesan, NavigatorJualBeli, NavigatorAkun} from './saiki/navigator'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text, View, Image, StyleSheet, TextInput, Icon, Pressable, Button } from 'react-native';

import { connect } from 'react-redux';

import ScreenTester from "./saiki/screens/tester";
import ScreenUnggah from "./saiki/screens/unggah";
import ScreenCamera from "./saiki/screens/unggah/camera";
import ScreenSimpan from "./saiki/screens/unggah/simpan";
import ScreenPesanDetail from "./saiki/screens/pesan/detail";
import ScreenMasuk from "./saiki/screens/auth";
import ScreenDaftar from "./saiki/screens/auth/register";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const pesanTabBar = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Pesan';
  switch (routeName) {
    case 'Pesan':
      return true;
    case 'Pesan Detail':
      return false;
  }
}

const HomeTabs = () => {
  return (
        <Tab.Navigator
          tabBarOptions={{
            labelStyle:{marginTop:-10},
            activeTintColor: '#606060',
            inactiveTintColor: '#606060',
            showLabel: false,
            style: {
              //backgroundColor: '#171F33'
              paddingBottom:4,
              elevation: 0,
              shadowOpacity: 0,
            }
          }}
        >
          <Tab.Screen
            name="Beranda"
            component={NavigatorBeranda}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "home" : "home-outline"} color={color} size={22} />
              ),
            }}
          />
          <Tab.Screen
            name="Galeri"
            component={NavigatorGaleri}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "image" : "image-outline"} color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Pesan"
            component={NavigatorPesan}
            options={({ route }) => ({
            //options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} color={color} size={24} />
              ),
              tabBarVisible: pesanTabBar(route)
            })}
          />
          <Tab.Screen
            name="Jual Beli"
            component={NavigatorJualBeli}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "receipt" : "receipt-outline"} color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Akun"
            component={NavigatorAkun}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "options" : "options-outline"} color={color} size={24} />
              ),
            }}
          />
        </Tab.Navigator>
  );
}

const App: () => Saiki = (props: mapStateToProps) => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
        {Object.keys(props.dataMember).length > 0 ? (
          <>
            <Stack.Screen name="Home" component={HomeTabs} options={{headerShown: false}} />
            <Stack.Screen name="Pesan Detail" component={ScreenPesanDetail} />
            <Stack.Screen name="Masuk" component={ScreenMasuk} options={{headerShown: false}} />
            <Stack.Screen name="Daftar" component={ScreenDaftar} options={{headerShown: false}} />
            <Stack.Screen name="Kamera" component={ScreenCamera} options={{headerShown: false}} />
            <Stack.Screen name="Simpan" component={ScreenSimpan} />
            <Stack.Screen name="Unggah" component={ScreenUnggah} options={ScreenUnggah.navigationOptions} />
          </>
        ) : (
          <>
            <Stack.Screen name="Masuk" component={ScreenMasuk} options={{headerShown: false}} />
            <Stack.Screen name="Daftar" component={ScreenDaftar} options={{headerShown: false}} />
            <Stack.Screen name="Home" component={HomeTabs} options={{headerShown: false}} />
            <Stack.Screen name="Pesan Detail" component={ScreenPesanDetail} />
            <Stack.Screen name="Kamera" component={ScreenCamera} options={{headerShown: false}} />
            <Stack.Screen name="Simpan" component={ScreenSimpan} />
            <Stack.Screen name="Unggah" component={ScreenUnggah} options={ScreenUnggah.navigationOptions} />

          </>
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dataMember: state.authReducer.dataMember,
  };
};

export default connect(mapStateToProps)(App);
