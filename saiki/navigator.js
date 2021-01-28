import React from "react";
import { View, Image, StyleSheet, TextInput, Icon, Pressable, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './components/styles';

import ScreenBeranda from "./screens/beranda";
import ScreenNotif from "./screens/beranda/notif";

import ScreenGaleri from "./screens/galeri";
import ScreenPesan from "./screens/pesan";
import ScreenJualBeli from "./screens/jualbeli";
import ScreenAkun from "./screens/akun";

import ScreenDummy from "./screens/dummy";

const Stack = createStackNavigator();

const TitleBeranda = () => {
  return (
    <Image
      style={{ width: 200, height: 30, marginTop:-7 }}
      source={require('./assets/logo.png')}
    />
  );
}

const TitleGaleri = () => {
  return (
    <View style={styles.searchSection}>
    <TextInput
        style={styles.searchInput}
        placeholder="Pencarian"
        //underlineColorAndroid="transparent"
        inlineImageLeft='search'
        inlineImagePadding={10}
    />
    <Ionicons style={styles.searchIcon} name="menu-outline" color="gray" size={22} />
    </View>
  );
}

const NavigatorBeranda = () => {
  return (
    <Stack.Navigator
        screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
        }
      }}>
       <Stack.Screen
        name="Bonsai Nusantara"
        component={ScreenBeranda}
        options={({route, navigation}) => ({
          headerTitle: props => <TitleBeranda {...props} />,
          headerRight: () => (
            <Pressable style={{marginRight:15}} onPress={()=>navigation.navigate('Pemberitahuan',{msg:"This param"})}>
              <Ionicons name="notifications-outline" color="gray" size={22} />
            </Pressable>
          )
        })}
      />
       <Stack.Screen
        name="Pemberitahuan"
        component={ScreenNotif}
      />
    </Stack.Navigator>
  );
}

export {NavigatorBeranda};

const NavigatorGaleri = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
          }
        }}>
          <Stack.Screen
            name="Galeri"
            component={ScreenGaleri}
            options={{
              headerTitle: props => <TitleGaleri {...props} />
            }}
        />
         <Stack.Screen
          name="Screen Dummy"
          component={ScreenDummy}
        />
      </Stack.Navigator>
    );
  }

  export {NavigatorGaleri};

  const NavigatorPesan = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
          }
        }}>
          <Stack.Screen
            name="Pesan"
            component={ScreenPesan}
        />
         <Stack.Screen
          name="Screen Dummy"
          component={ScreenDummy}
        />
      </Stack.Navigator>
    );
  }

  export {NavigatorPesan};

  const NavigatorJualBeli = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
          }
        }}>
          <Stack.Screen
            name="Jual Beli"
            component={ScreenJualBeli}
        />
         <Stack.Screen
          name="Screen Dummy"
          component={ScreenDummy}
        />
      </Stack.Navigator>
    );
  }

  export {NavigatorJualBeli};

  const NavigatorAkun = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
          }
        }}>
          <Stack.Screen
            name="Akun"
            component={ScreenAkun}
        />
         <Stack.Screen
          name="ScreenDummy"
          component={ScreenDummy}
        />
      </Stack.Navigator>
    );
  }

  export {NavigatorAkun};
