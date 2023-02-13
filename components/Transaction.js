import { View, Text, Image } from 'react-native'
import React from 'react'


const Transaction = ({transaction}) => {
  return (
    <View className="flex-row items-center px-5 py-4 mx-5 border-b-[1.4px] border-gray-200">
      <Image
        className="w-[60px] h-[60px] ml-[-15px] rounded-full"
        source={{
          uri: 'https://fastly.picsum.photos/id/700/800/800.jpg?hmac=_L54KN0UFsvYiEOzsSfxaPWNCE9lgrKjTbNaPB0si20',
        }}
      />

      <View className="pl-2">
        <Text className="text-base font-semibold">Congo Clothing Co.</Text>
        <Text className="text-[#5F5F5F]">01/22/2023 4:23</Text>
      </View>

      <Text className="ml-auto text-lg font-bold text-[#309B0B]">$15</Text>
      
    </View>
  )
}

export default Transaction