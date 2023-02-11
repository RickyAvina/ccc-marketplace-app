import { View, Text, FlatList, StyleSheet, Dimensions, Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import PostPhoto from './PostPhoto'
import SafeViewAndroid from './SafeViewAndroid';
import { AntDesign } from '@expo/vector-icons';



const PhotoGrid = ({ data: _data }) => {
  const numColumns = 2;

  const [data, setData] = React.useState({});
  useLayoutEffect(() => {
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
    </SafeAreaView>
  )
}

const renderItem = ({ item, index }) => {
  if (item.empty) {
    return <View className='bg-transparent items-center m-[3px] flex-1 h-[180px] w-[180px]' />
  }

  return (
    <TouchableWithoutFeedback onPress={() => { console.log("fyeee") }}>
      <View className="flex-1 m-[3px] items-center justify-center h-[180px] w-[180px] border-[#A1A1A1] border-[1px]">
        <Image source={{ uri: item.url }} className='bg-gray-300 p-4 w-full h-[60%]' />
        <View className="flex-1 w-full bg-white p-2">
          <Text>{item.title}</Text>
          <View className="flex-row justify-between mt-auto">
            <Text className="mt-auto font-bold">{`$${item.price ?? 10}`}</Text>
            <View className="flex-row items-center">
              <AntDesign name="shoppingcart" size={20} color="#747474" />
              <Text className="ml-1 text-[#747474]">{item.numPurchased ?? 0}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>

    // <TouchableOpacity>
    // <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
    // <PostPhoto item={item} />
    // </TouchableWithoutFeedback>
  )

};

const formatData = (data, numColumns) => {
  const amountFullRows = Math.floor(data.length / numColumns);
  let amountItemsLastRow = data.length - amountFullRows * numColumns;

  while (amountItemsLastRow < numColumns && amountItemsLastRow !== 0) {
    data.push({ key: `empty-${amountItemsLastRow}`, empty: true });
    amountItemsLastRow++;
  }

  return data;
};


export default PhotoGrid