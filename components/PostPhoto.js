import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';


const PostPhoto = ({item}) => {
  const DEFAULT_PRICE = 10;

  return (
    <View className="flex-1 m-[3px] items-center justify-center h-[180px] w-[90px] border-[#A1A1A1] border-[1px]">
      <Image source={{ uri: item.url }} className='bg-gray-300 p-4 w-full h-[60%]' />
      <View className="flex-1 w-full bg-white p-2">
        <Text>{item.title}</Text>
        <View className="flex-row justify-between mt-auto">
          <Text className="mt-auto font-bold">{`$${item.price ?? DEFAULT_PRICE}`}</Text>
          <View className="flex-row items-center">
            <AntDesign name="shoppingcart" size={20} color="#747474" />
            <Text className="ml-1 text-[#747474]">{item.numPurchased ?? 0}</Text>
          </View>
        </View>
      </View>
     </View>
  )
}


export default PostPhoto