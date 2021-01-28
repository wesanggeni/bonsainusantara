import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Icon, Button, Layout, Text, Avatar, Card,
TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
 
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

import {
  IconSignIn,
  IconSignUp,
  BackIcon,
} from './../component/icon';

import CustomHeaderBack from './../component/layout/header-back';
import CustomFooter from './../component/layout/footer';
import { Endpoint, Color } from './../config';

const SplashScreen = (props) => {

  const renderLeftMenu = () => (
    <TopNavigationAction icon={BackIcon} onPress={()=> { props.navigation.goBack(null) }}/>
  );

  const renderTitle = (props) => (
    <React.Fragment>
    <Image style={{width:25, height:24}}
      source={require('./../asset/logo-kemenag.png')}
    />
    <Text
    category='s2' style={{color:'#ffffff'}}>SiHokki</Text>
    </React.Fragment>
  );

  const renderItemHeader = (): React.ReactElement => (
    <ImageBackground
      style={styles.postHeader}
      source={require('./../asset/icon/profile.png')}
    />
  );

  return (
  <ScrollView>
  <LinearGradient
  start={{x: 0, y: 0.5}}
  end={{x: 0, y: 0}}
  colors={[Color.First, Color.Second]}
  style={styles.containerWrap}>
  
    <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 0.7, y: 0}}
    colors={[Color.First, Color.Second]}
    >

    <TopNavigation
      style={{
      backgroundColor:'transparent',
      elevation: 2
    }}
      title={renderTitle}
      alignment='center'
      accessoryLeft={renderLeftMenu}
    />
    </LinearGradient>

  <View style={styles.container}>

    <ImageBackground source={require('./../asset/welcome-dashboard.png')} style={styles.imageBg}>
      <View
        style={styles.post}>
        <View style={styles.postBody}>
          <Avatar
          size='small'
          source={require('./../asset/icon/profile.png')} />
          <View style={styles.postAuthorContainer}>
            <Text
              style={styles.postText}
              //appearance='hint'
              category='c1'>
              Selamat Datang
            </Text>
            <Text
              style={styles.postTitle}
              category='s2'>
              Ade Haryanto
            </Text>
            <Text
              style={styles.postText}
              //appearance='hint'
              category='c1'>
              <Text style={styles.postTextW}>No Porsi :</Text> Belum Tersedia
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>



    <CustomFooter/>
    </View>
  </LinearGradient>
  </ScrollView>
  );
};

const styles = StyleSheet.create({

  //---

  containerWrap: {
    flex: 1,
    minHeight:DeviceHeight-24
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width:180,
    height:160,
    marginBottom:10,
    marginTop:10
  },
  marginBottom: {
    marginBottom:10
  },
  text: {
    marginBottom: 0,
    color: '#f1f1f1'
  },
  textLogo: {
    color: '#ffff',
    fontWeight:'bold'
  },
  button: {
    marginTop: 10,
    paddingHorizontal:80
  },

  imageBg: {
    //flex: 1,
    marginTop: 20,
    width: 270,
    height: 89,
    //resizeMode: "cover",
    justifyContent: "center"
  },
  postTitle: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold"
  },
  postText: {
    color: "#f1f1f1",
    fontSize: 11,
    marginTop:-3,
    marginBottom:-3,
  },
  postTextW: {
    color: "#ffffff",
    fontSize: 11,
  },
  post: {
    marginHorizontal: 10,
    marginTop:20
  },
  postHeader: {
    height: 220,
  },
  postBody: {
    flexDirection: 'row',
    marginHorizontal: 0,
  },
  postAuthorContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 7,
  },
  iconButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },

});

export default SplashScreen;