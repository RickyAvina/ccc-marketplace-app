import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect } from 'react'
import PostPhoto from './PostPhoto'


const PhotoGrid = ({data: _data}) => {
  const numColumns = 2;
  const [data, setData] = React.useState(_data);

  useEffect(() => {
    formatData(data, numColumns);
  }, [data])

  return (
    <View className="pt-5 mx-1">
      <FlatList
        numColumns={numColumns}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
      />
     </View>
  )
}

const renderItem = ({item, index}) => {
  if (item.empty) {
    return <View className="flex-1 m-[3px] h-[180px] w-[90px] bg-transparent"/>
  }
  return <PostPhoto item={item}/>
};

const formatData = (data, numColumns) => {
  const amountFullRows = Math.floor(data.length / numColumns);
  let amountItemsLastRow = data.length - amountFullRows * numColumns;

  while (amountItemsLastRow < numColumns && amountItemsLastRow !== 0) {
    data.push({key: `empty-${amountItemsLastRow}`, empty: true});
    amountItemsLastRow++;
  }
  return data;
};


export default PhotoGrid