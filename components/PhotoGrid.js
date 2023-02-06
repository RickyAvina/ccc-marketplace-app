import { View, Text, FlatList, StyleSheet, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import PostPhoto from './PostPhoto'
import SafeViewAndroid from './SafeViewAndroid';


const PhotoGrid = ({data: _data}) => {
  const numColumns = 2;

  const [data, setData] = React.useState({});
  useLayoutEffect(()=> {
    setData(formatData(_data, numColumns))
  })

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="pt-5 mx-1">
      <FlatList
        numColumns={numColumns}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: 150
        }}
      />
      <View className="absolute bottom-[20px] items-center w-full">
        <TouchableOpacity
          className="items-center justify-center bg-red-600 w-[80px] h-[80px] rounded-full"
          onPress={() => {console.log("Press")}}
          >
          <Text className="items-center justify-center pt-[2px] text-5xl text-white">+</Text>
      </TouchableOpacity>
      </View>
     </SafeAreaView>
  )
}

const renderItem = ({item, index}) => {
  if (item.empty) {
    return <View className='bg-transparent items-center m-[3px] flex-1 h-[180px] w-[180px]'/>
  }
  return <PostPhoto item={item} />

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