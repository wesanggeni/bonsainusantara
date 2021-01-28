import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,

  Pressable,

  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

var {width} = Dimensions.get('window');

import CameraRoll from "@react-native-community/cameraroll";

const Unggah = ({ navigation }) => {

  const [media, setMedia] = useState([]);
  const [mediaDefault, setMediaDefault] = useState('');
  const [itemCount, setItemCount] = useState();
  const [selected, setSelected] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [singleSelect, setSingleSelect] = useState(false);

  useEffect(() => {
    showImages();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { alignSelf: 'center' },
      headerTitle: () => (
        <Pressable style={{marginRight:15, alignSelf: 'center'}} onPress={()=>navigation.navigate('Kamera')}>
          <Ionicons style={{marginLeft:10}} name="camera-outline" color="gray" size={30} />
        </Pressable>
      ),
      headerRight: () => (
      <Pressable style={{marginRight:15, flexDirection: 'row'}}
        onPress={()=>navigation.navigate('Simpan',{media:media, keys: selected})}>
        <Text style={{color:'gray'}}>Simpan </Text>
        <Ionicons name="arrow-forward-outline" color="gray" size={22} />
      </Pressable>)
    });
  }, [navigation, selected, media]);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const showImages = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }

    //CameraRoll.save(tag, { type, album })

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    })
    .then(r => {
      //this.setState({ photos: r.edges });
      setMedia(r.edges);
    })
    .catch((err) => {
      //Error Loading Images
    });
  };

  const mediaHeader = () => {
    let defImage;
    if (Object.keys(media).length > 0) {
      defImage = <Image style={styles.mediaDefImage} source={mediaDefault ? {uri: mediaDefault} : {uri: media[0].node.image.uri}} />;
    }

    return (
      <>
        <View style={styles.mediaDef}>
          {defImage}
        </View>
      </>
    )
  }

  const selectImage = (index) => {
    let newSelected = Array.from(selected);
    let newSelectedImage = Array.from(selectedMedia);
    const maxVideoLen = 0;

    if (newSelected.indexOf(index) === -1) {
      const selected = media[index];
      if (Platform.Version <= 18
        && Platform.OS == "android"
        && maxVideoLen > 0
        && selected.node.image.playableDuration > maxVideoLen) {
          console.log('error 1');
          return;
      }
      newSelected.push(index);
      newSelectedImage.push(media[index]);
      if (4 === 1 && newSelected.length > 1) {
        newSelected.splice(0, 1);
        newSelectedImage.splice(0, 1);
      }
    } else {
      const deleteIndex = newSelected.indexOf(index);
      const deleteIndexMedia = newSelectedImage.indexOf(index);
      if (media[newSelected[deleteIndex]].node.image.filename == mediaDefault.filename) {
        newSelected.splice(deleteIndex, 1)
      } else {
        setMediaDefault(media[newSelected[deleteIndex]].node.image);
        return;
      }
    }

    if (newSelected.length > 4 && 4 != 1) return

    if (newSelected.length === 0) newSelected = []
    const inx = newSelected.length - 1;
    if (!media[newSelected[inx]]) return;
    setSelected(newSelected);
    setMediaDefault(media[newSelected[inx]].node.image.uri);
    setItemCount(selected.length);
    //--------------
  }

  const renderImages = ({ item, index }) => {
    let selectedItemCount = selected.indexOf(index) + 1
    if (4 == 1) {
      selectedItemCount = "";
    }

    return (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1
            }}
            onPress={() => { selectImage(index) }}
            >
            <ImageBackground
            style={styles.imageThumbnail}
            source={{
              uri: item.node.image.uri
            }} >

              <View style={selectedItemCount > 0 ? styles.countBadgeGreen : styles.countBadge}>
              <Text style={styles.countBadgeText}>{selectedItemCount > 0 ? selectedItemCount : null}</Text>
              </View>
              {item.node.image.playableDuration > 0 && <View style={styles.duration}>
              <Icon name="play" size={24} color="white" />
              </View>}

            </ImageBackground>
          </TouchableOpacity>
    )
  }

  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={mediaHeader}
        data={media}
        renderItem={renderImages}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}



export default Unggah;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  mediaDef: {
    width:width,
    height:300,
    backgroundColor: '#ccc'
  },
  mediaDefImage: {
    width:width,
    height:300
  },


    countBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        position: 'absolute',
        left: 3,
        top: 3,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center'
    },
    countBadgeGreen: {
        width: 24,
        height: 24,
        borderRadius: 12,
        position: 'absolute',
        left: 3,
        top: 3,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,134,4,0.9)',
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center'
    },
    duration: {
        color: 'white',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        right: 3
    },
    countBadgeText: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        textAlign: 'center',
        fontSize: 10,
        width: '100%'
    }

});
