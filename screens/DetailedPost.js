import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { Ionicons } from '@expo/vector-icons'; 


const DetailedPost = ({route, navigation}) => {
  const item = route.params.item
  console.log(item)

  const inspiration = "I was inspired by the rain freezing along the gutter"
  const meaning = "It means to me what it means to you"
  const location = "Cambridge, Massachusetts, USA"
  
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1">
      {/* Header */}
      <TouchableOpacity className="m-2" onPress={() => { navigation.goBack() }}>
        <Ionicons name="arrow-back" size={24} color="black"/>
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://fastly.picsum.photos/id/876/1200/1200.jpg?hmac=JJdMG0dua07AvJ822EYYKRU2IafKRhKDMdGeQanwbKE'}}
        className="w-full h-[300px]"
      />
      {/* Profile blurb */}
      <View className="flex-row items-center pl-5 pt-2 pb-2">
        <Image
          className="w-10 h-10 rounded-full"
          source={{ uri: 'https://fastly.picsum.photos/id/876/1200/1200.jpg?hmac=JJdMG0dua07AvJ822EYYKRU2IafKRhKDMdGeQanwbKE'}}
        />
        <View className="flex-col pl-2">
          <Text className="text-[#EA4335] text-lg">Andrea M.</Text>
          <Text className="text-[#A7A7A7]">1/13/2023</Text>
        </View>
      </View>

      {/* Piece description */}
      <View className="flex-1 w-full h-full items-start px-5 pt-3 space-y-3" >

        <View className="flex-row justify-center items-center">
          <Image source={require('../assets/icons/pattern.png')} className="w-[40px] h-[40px] mr-2" />
          <Text className="text-black flex-1 flex-wrap">{inspiration}</Text>
        </View>

        <View className="flex-row justify-center items-center">
          <Image source={require('../assets/icons/lightbulb.png')} className="w-[40px] h-[40px] mr-2" />
          <Text className="text-black flex-1 flex-wrap">{meaning}</Text>
        </View>

        <View className="flex-row justify-center items-center">
          <Image source={require('../assets/icons/location.png')} className="w-[40px] h-[40px] mr-2" />
          <Text className="text-black flex-1 flex-wrap">{location}</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default DetailedPost