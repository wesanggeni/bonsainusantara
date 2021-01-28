import { StyleSheet, Dimensions } from 'react-native';
import * as DefVar from './common';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  screen:{
      flex:1,
      display:'flex',
      backgroundColor:'#ffffff',
  },
  searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  searchIcon: {
      paddingLeft: 10,
  },
  searchInput: {
      flex: 1,
      paddingTop: 3,
      paddingRight: 10,
      paddingBottom: 3,
      paddingLeft: 10,
      backgroundColor: '#f2f2f2',
      color: DefVar.COLOR_FONT_PRIMARY,
      height: 35,
      borderColor: '#eeeeee',
      borderWidth: 1,
      borderRadius: 5
  },
  //-
  cardWrap: {
    alignItems: 'stretch',
    backgroundColor: '#EEE',
    minHeight:300,
    //marginBottom: 5,
    marginHorizontal: 0,
    //borderColor:'#DDD',
    //borderWidth:1,
  },
  cardHeader: {
    backgroundColor: '#ffffff',
    padding:7,
    paddingLeft:10,
    paddingRight:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeaderRight: {
    paddingTop:5
  },
  cardAvatar: {
    width:30,
    height:29,
    borderRadius:20,
    borderWidth:1,
    borderColor:'#DDD',
    justifyContent: 'flex-start',
  },
  cardTitle: {
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5
  },
  cardBody: {

  },
  cardImage: {
    width: screenWidth,
    height: 430
  },
  cardFooter: {
    backgroundColor: '#ffffff',
    padding:7,
    paddingLeft:10,
    paddingRight:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooterLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooterComment: {
    backgroundColor: '#ffffff',
    padding:7
  },


  uploadCard: {
    backgroundColor: '#fafafa',
    width:screenWidth,
  },
  uploadBtn: {
    backgroundColor: '#BBB',
    width:screenWidth,
    height:40,
    //marginTop:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
