import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ImageEdit from 'react-native-imageedit';

const Screen = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>I am screen1</Text>

            <ImageEdit
              image="https://source.unsplash.com/daily" //Image/Video uri
              onSave={info => console.log(info)}
            />

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
    }
})
