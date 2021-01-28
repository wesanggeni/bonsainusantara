import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { setMember } from '../../redux/actions/authActions';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const Screen = (props) => {
  const [mounted, setMounted] = React.useState(true);

  useEffect(() => {
    if (mounted == true) {
      props.setMember([]);
      props.navigation.navigate('Splash');
      setMounted(false);
    }
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(Screen);