import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView
} from 'react-native';

const data = [
  {id:1,  image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
  {id:2,  image:"https://bootdey.com/img/Content/avatar/avatar2.png"},
  {id:3,  image:"https://bootdey.com/img/Content/avatar/avatar3.png"},
  {id:4,  image:"https://bootdey.com/img/Content/avatar/avatar4.png"},
  {id:5,  image:"https://bootdey.com/img/Content/avatar/avatar5.png"},
  {id:6,  image:"https://bootdey.com/img/Content/avatar/avatar6.png"},
  {id:7,  image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
  {id:8,  image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
  {id:9,  image:"https://bootdey.com/img/Content/avatar/avatar2.png"},
  {id:10, image:"https://bootdey.com/img/Content/avatar/avatar3.png"},
];

const Screen = ({navigation}) => {

  const [numColumns, setNumColumns] = useState(3);

  const renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    var itemDimension = Dimensions.get('window').width / numColumns;
    return (
      <TouchableOpacity style={[styles.item, {height: itemDimension}]} onPress={() => { }}>
        <Image style={{height:itemDimension - 2, width:itemDimension - 2}} source={{uri: item.image}}/>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.containerContent}>
      <FlatList
      ListHeaderComponent={
      <>
      <View>

        <View style={styles.postContent}>
            <View style={styles.profile}>
              <Image style={styles.avatar}
                source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>

              <Text style={styles.name}>
                  Johan Doe
              </Text>
            </View>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Like</Text>
            </TouchableOpacity>
        </View>
      </View>
      </>}
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      numColumns={numColumns}/>
    </View>
  );
}

export default Screen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ffff'
  },
  postContent: {
    flex: 1,
    padding:30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  name:{
    fontSize:22,
    color:"#00BFFF",
    fontWeight:'600',
    alignSelf:'center',
    marginLeft:10
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  //----------
  containerContent: {
    flex: 1,
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },

 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 20
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
});
