import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, StatusBar, Pressable, Button } from 'react-native';

import { connect } from 'react-redux';
import axios from 'axios';
import { setMember } from '../../redux/actions/authActions';

import { Endpoint, Color } from '../../config';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomStatusBar from '../../components/statusbar';
import styles from '../../components/styles';

const Item = ({ status, member }) => (
  <View style={styles.cardWrap}>
    <View style={styles.cardHeader}>
      <View style={styles.cardHeaderLeft}>
        <Image
          style={styles.cardAvatar}
          source={{ uri: member.avatar }}
        />
        <Text style={styles.cardTitle}>{member.username}</Text>
      </View>
      <View style={styles.cardHeaderRight}>
        <Pressable>
          <Ionicons name="ellipsis-vertical" color="gray" size={18} />
        </Pressable>
      </View>
    </View>
    <View style={styles.cardBody}>
      <Image
        style={styles.cardImage}
        source={{ uri: status.photo1.large }}
      />
    </View>
    <View style={styles.cardFooter}>
      <View style={styles.cardFooterLeft}>
        <Pressable>
          <Ionicons name="heart-outline" color="gray" size={24} />
        </Pressable>
        <Pressable style={{paddingLeft:15}}>
          <Ionicons name="chatbubble-outline" color="gray" size={22} />
        </Pressable>
        <Pressable style={{paddingLeft:15, marginTop:-2}}>
          <Ionicons name="arrow-redo-outline" color="gray" size={24} />
        </Pressable>
      </View>
      <View style={styles.cardFooterRight}>
        <Pressable>
          <Ionicons name="cafe-outline" color="gray" size={24} />
        </Pressable>
      </View>
    </View>
    <View style={styles.cardFooterComment}>
      <Text>Disukai oleh Punapa dan 10rb lainnya</Text>
    </View>
  </View>
);

const Screen = (props: mapStateToProps) => {

  const [dataStatus, setDataStatus] = useState([]);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = (): void => {
      axios.get(Endpoint.Main+'api/social/status', {
        headers: {
          'Content-Type': 'application/json',
          //'Content-Type': 'multipart/form-data',
          'x-access-token': props.dataMember.token
        }
      })
      .then(response => {
        if (response) {
          setDataStatus(response.data);
        } else {
          props.setMember([]);
          props.navigation.navigate('Masuk');
        }
      })
      .catch(error => {
        props.setMember([]);
        props.navigation.navigate('Masuk');
      });
  }

  const renderItem = ({ item }) => (
    <Item status={item} member={props.dataMember} />
  );

  const getHeader = ({ item }) => (
    <View style={styles.uploadCard}>
    <Pressable
    onPress={()=>props.navigation.navigate('Unggah',{msg:"This param"})}
    style={styles.uploadBtn}
    >
      <Ionicons name="camera-outline" color="gray" size={18} />
      <Text> BUAT KONTEN</Text>
    </Pressable>
    </View>
  );

    return (
      <SafeAreaView style={styles.screen}>
        <CustomStatusBar/>

        <FlatList
          style={{marginTop:-25}}
          data={dataStatus}
          renderItem={renderItem}
          ListHeaderComponent={getHeader}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    )
}

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
