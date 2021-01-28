import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
var {width} = Dimensions.get('window');
import * as _ from 'lodash';
import MyImage from './images';

const InstaGrid = ({
  data,
  columns,
  onEndReachedThreshold,
  onEndReached,
  loading = false,
  onItemClick,
}) => {
  const groupEveryNthRow = 3;
  const {mainContainer, groupedGridContainer} = styles;
  var currentRow = 0;
  const rowsArray = _.chunk(data, columns);
  var bigImageSide = 'right';

  const renderGroupedItem = (row, index) => {
    const smallImage1 = row[0];
    const smallImage2 = row[1];
    const largeImage = row[2];

    if (bigImageSide === 'right') {
      bigImageSide = 'left';
      return (
        <View style={{flexDirection: 'row'}} key={index}>
          <View style={groupedGridContainer}>
            <View style={styles.gridStyle}>
              <MyImage
                //style={styles.imageThumbnail} //1
                styleWidth={width / 3}
                styleHeight={width / 3}
                sourceObj={smallImage1}
                onPress={() => {
                  onItemClick(smallImage1);
                }}
              />
            </View>
            <View style={styles.gridStyle}>
              <MyImage
                //style={styles.imageThumbnail} //2
                styleWidth={width / 3}
                styleHeight={width / 3}
                sourceObj={smallImage2}
                onPress={() => {
                  onItemClick(smallImage2);
                }}
              />
            </View>
          </View>
          <View style={styles.gridStyle}>
            <MyImage
              //style={styles.imageThumbnailLarge} //3
              styleWidth={width * 0.66}
              styleHeight={width * 0.66 + 4}
              sourceObj={largeImage}
              onPress={() => {
                onItemClick(largeImage);
              }}
            />
          </View>
        </View>
      );
    } else {
      bigImageSide = 'right';
      return (
        <View style={{flexDirection: 'row'}}>
          <View style={styles.gridStyle}>
            <MyImage
              //style={styles.imageThumbnailLarge} //4
              styleWidth={width * 0.67 + 1}
              styleHeight={width * 0.66 + 4}
              sourceObj={largeImage}
              onPress={() => {
                onItemClick(largeImage);
              }}
            />
          </View>
          <View style={groupedGridContainer}>
            <View style={styles.gridStyle}>
              <MyImage
                //style={styles.imageThumbnail} // 5
                styleWidth={width / 3}
                styleHeight={width / 3}
                sourceObj={smallImage1}
                onPress={() => {
                  onItemClick(smallImage1);
                }}
              />
            </View>
            <View style={styles.gridStyle}>
              <MyImage
                //style={styles.imageThumbnail} //6
                styleWidth={width / 3}
                styleHeight={width / 3}
                sourceObj={smallImage2}
                onPress={() => {
                  onItemClick(smallImage2);
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  const renderSingleItem = (item, index) => {
    return (
      <View style={styles.gridStyle} key={index}>
        <MyImage
          //style={styles.imageThumbnail} //7
          styleWidth={width / 3}
          styleHeight={width / 3}
          sourceObj={item}
          onPress={() => {
            onItemClick(item);
          }}
        />
      </View>
    );
  };

  const renderCell = (row, index) => {
    if (row.length >= columns && currentRow % groupEveryNthRow === 0) {
      currentRow++;
      return <View key={index}>{renderGroupedItem(row, index)}</View>;
    }
    currentRow++;
    return (
      <View key={index} style={{flexDirection: 'row'}}>
        {row.map((item, index) => {
          return renderSingleItem(item, index);
        })}
      </View>
    );
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const renderFooter = () => {
    return (
      <View style={{marginBottom: 16, marginTop:16}}>
         <ActivityIndicator size="large" color="orangered" />
      </View>
    );
  };

  return (
    <ScrollView
      scrollEventThrottle={onEndReachedThreshold}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          onEndReached();
        }
      }}>
      <View style={mainContainer}>
        {rowsArray.map((row, index) => {
          return renderCell(row, index);
        })}
      </View>
      {loading && renderFooter()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginLeft:-1
  },
  groupedGridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  /*
  imageThumbnail: {
    height: width / 3 - 12,
    width: width / 3 - 12,
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor:'#fafafa'
  },
  imageThumbnailLarge: {
    height: width * 0.6 + 12,
    width: width * 0.6 + 12,
    marginLeft: 4,
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fefefe'
  },
  */
  gridStyle: {
    margin: 1,
  },
});

export default InstaGrid;
