import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import InstaGrid from './instaGrid';

import { connect } from 'react-redux';
import axios from 'axios';
import { setMember } from '../../redux/actions/authActions';
import { Endpoint } from '../../config';

const Screen = (props: mapStateToProps) => {
  const [loading, setLoading] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [details, setDetails] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(Endpoint.Main+'api/social/status', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': props.dataMember.token
      }
    })
    .then(response => {
      //console.log('getting data from axios', response.data.data);
      //console.log(response.data);
      setDetails(response.data);
    })
    .catch(error => {
      //console.log(error);
    });
  }

  const moreData = () => {
    axios.get(Endpoint.Main+'api/social/status', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': props.dataMember.token
      }
    })
    .then(response => {

      //setDetails(response.data);
      setDetails([...details, ...response.data]);
      //console.log(details);
      //setPage(page+1)
    })
    .catch(error => {
      //console.log(error);
    });
  }

    return (
        <InstaGrid
        data={details}
        columns={3}
        loading={loading}
        onItemClick={(item) => {
          console.log('Got the Item:' + JSON.stringify(item));
        }}
        onEndReachedThreshold={300}
        onEndReached={() => (offset !== -1 ? moreData() : null)}
        />
    )
}

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

const mapStateToProps = (state) => {
  return {
    dataMember: state.authReducer.dataMember,
  };
};

export default connect(mapStateToProps)(Screen);
