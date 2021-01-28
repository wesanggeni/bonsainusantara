import React, {useEffect, useState, useRef} from 'react'
import { ScrollView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ImageEdit from 'react-native-imageedit';

const Screen = ({route}) => {
  const myInput = useRef();
  const [dataMedia, setDataMedia] = useState([]);
  const [dataKey, setDataKey] = useState([]);
  const [selMedia, setSelMedia] = useState('');

  useEffect(() => {
    initialMedia();
  }, []);

  const initialMedia = () => {
    setDataMedia(route.params.media);
    setDataKey(route.params.keys);

    //console.log(route.params.media);
    let newArr = Array.from(route.params.media);
    let newKey = Array.from(route.params.keys);
    let newSelected = [];
    newKey.map((item, index) => {
      newSelected.push(newArr[item]);
    });
    setDataMedia(newSelected);
    setSelMedia(newSelected[0].node.image);
    //console.log(newSelected);
  }


    return (
        <View style={styles.screen}>

        <View style={{position: 'absolute', top:0}}>

        <ImageEdit
            showEditButton={false}
            showSaveButtons={false}
            image={selMedia}
            ref={myInput}
        >
            <TouchableOpacity onPress={info => console.log(info)}>
                <Text>Custom Button</Text>
            </TouchableOpacity>
        </ImageEdit>
        </View>

        <ScrollView horizontal={true} style={{position: 'absolute', bottom:30}}>

        {dataMedia.map((item, index) => (
          <TouchableOpacity
          key={index}
          //style={ }
          onPress={() => {
            setSelMedia(item.node.image.uri);
          }}
          >
          <Image
          style={styles.photosHr}
          source={{
            uri: item.node.image.uri
          }} />
          </TouchableOpacity>
        ))}

        </ScrollView>
        </View>
    )
}

export default Screen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
    button:{
        backgroundColor:'#0275d8',
        paddingVertical: 5,
        paddingHorizontal: 10

    },
    buttonText:{
        color:'#fff',
        fontSize:25
    },
    photosHr: {
      width:100,
      height:100,
      backgroundColor: 'gray'
    }
})
