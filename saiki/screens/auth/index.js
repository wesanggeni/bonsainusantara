import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setMember } from '../../redux/actions/authActions';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { Endpoint, Color } from '../../config';

export const Auth = (props: mapStateToProps) => {

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    //var test = Object.keys(props.dataMember).length;
    //console.log(test);
  }, []);

  const onLoginSubmit = (): void => {
    setIsLoading(true);

      axios.post(Endpoint.Main+'api/auth/signin', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response) {

          //console.log(response);
          props.setMember(response.data);
          props.navigation.navigate('Home');
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });

        } else {
          Alert.alert('Gagal!', 'Data gagal diproses. mohon periksa kembali',
          [{text: 'OK'},]
          ,{ cancelable: false });
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Gagal!', 'Data gagal diproses. mohon periksa kembali',
          [{text: 'OK'},]
          ,{ cancelable: false })
      });

      setIsLoading(false);
  }

  const onForgotPasswordButtonPress = (): void => {
    props.navigation.navigate('Forget');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

    return (

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://img.icons8.com/ios/24/3498db/envelope.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={email}
              onChangeText={setEmail}
              />
        </View>

        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://img.icons8.com/ios/24/3498db/password.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Kata Sandi"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value={password}
              onChangeText={setPassword}
              />
        </View>

        <TouchableOpacity style={styles.restoreButtonContainer}>
            <Text>Lupa sandi? </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
        onPress={()=> { onLoginSubmit(); }}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}
        onPress={()=> { props.navigation.navigate('Daftar') }}>
            <Text>Buat akun</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]}>
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/24/ffffff/facebook.png'}}/>
            <Text style={styles.loginText}> Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]}>
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/24/ffffff/google.png'}}/>
            <Text style={styles.loginText}>Google</Text>
          </View>
        </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
  },
  container: {
    paddingTop:100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cceeff',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:40,
      marginBottom:15,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:40,
      marginLeft:7,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  icon:{
    width:20,
    height:20,
    marginRight:5
  },
  inputIcon:{
    marginLeft:20,
    marginRight:0,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  fabookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#ff0000",
  },
  loginText: {
    color: 'white',
  },
  restoreButtonContainer:{
    width:250,
    marginBottom:15,
    alignItems: 'flex-end'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon:{
    color: "#FFFFFF",
    marginRight:5
  }
});

const mapStateToProps = (state) => {
  return {
    dataMember: state.authReducer.dataMember,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setMember:(payload) => dispatch(setMember(payload)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
