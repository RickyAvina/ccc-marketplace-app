import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect } from 'react'
import PostPhoto from './PostPhoto'
import { AntDesign } from '@expo/vector-icons'; 


const PhotoGrid = ({data: _data}) => {
  const spacing = 10;
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
        style={styles.container}
        columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
      />
     </View>
  )
}

const renderItem = ({item, index}) => {
  if (item.empty) {
    return <View style={[styles.itemTransparent]}/>
  }
  return (
    <View style={styles.item}>
      <Image source={{ uri: item.url }} className='bg-gray-300 p-4 w-full h-[60%]' />
      <View className="flex-1 w-full bg-white p-2">
        <Text>{item.title}</Text>
        <View className="flex-row justify-between mt-auto">
          <Text className="mt-auto font-bold">{"$10"}</Text>
          <View className="flex-row items-center">
            <AntDesign name="shoppingcart" size={20} color="#747474" />
            <Text className="ml-1 text-[#747474]">2</Text>
          </View>
        </View>
        {/* <ShoppingCartIcon /> */}
      </View>
     </View>
  )
};

const styles = StyleSheet.create({
  itemTransparent: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 180,
    width: 90
  },
  image: {
    width: '100%',
    height: '100%',
  },
  containerView: {
    height: 100,
    width: '100%',
    backgroundColor: "blue",
  },
  item: {
    backgroundColor: '#A1A1A1',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: 180,
    width: 90,
    borderColor: "#A1A1A1",
    borderWidth: 0.5,
  },
});

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