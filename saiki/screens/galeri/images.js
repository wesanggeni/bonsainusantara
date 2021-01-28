import React, {useState} from 'react';
import {
  Image,
  Pressable
} from 'react-native';

const MyImage = ({styleWidth, styleHeight, sourceObj, onPress}) => {
  const [imageError, setImageError] = useState(false);
  //const [loading, setLoading] = useState(true);

  return (
    <Pressable onPress={onPress}>
      {imageError || !sourceObj.photo1.medium ? (
        <Image
          source={require('../../assets/dummy/2.jpg')}
          //style={style}
          style={{width:styleWidth, height:styleHeight}}
          //onLoadEnd={() => setLoading(false)}
        />
      ) : (
        <Image
          //style={style}
          //style={{width:100, height:100}}
          source={{uri: sourceObj.photo1.medium, width: styleWidth, height: styleHeight}}
          //source={require('../../assets/dummy/2.jpg')}
          onError={(e) => {
            //setLoading(false);
            setImageError(true);
          }}
          //onLoadEnd={() => setLoading(false)}
        />
      )}
    </Pressable>
  );
};

export default MyImage;
