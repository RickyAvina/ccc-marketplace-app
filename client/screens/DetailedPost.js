import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { Ionicons } from '@expo/vector-icons'; 


const DetailedPost = ({route, navigation}) => {
  const item = route.params.item

  const timestampToDate = (ts) => {
    let date = new Date(ts * 1000)
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear().toString().slice(-2) 
      + " " + date.getHours() + ":" + (date.getMinutes().toString().length == 1 ? "0" : "") + date.getMinutes().toString()
  }  

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1">
      {/* Header */}
      <TouchableOpacity className="m-2" onPress={() => { navigation.goBack() }}>
        <Ionicons name="arrow-back" size={24} color="black"/>
      </TouchableOpacity>

      <Image
        source={{ uri: item.url ?? ""}}
        className="w-full h-[300px]"
      />
      {/* Profile blurb */}
      <View className="flex-row items-center pl-5 pt-2 pb-2">
        <Image
          className="w-10 h-10 rounded-full"
          source={{ uri: 'https://fastly.picsum.photos/id/876/1200/1200.jpg?hmac=JJdMG0dua07AvJ822EYYKRU2IafKRhKDMdGeQanwbKE'}}
        />
        <View className="flex-col pl-2">
          {/* TODO: Create global user state */}
          <Text className="text-[#EA4335] text-lg">Andrea M.</Text> 
          <Text className="text-[#A7A7A7]">{timestampToDate(item.time_created)}</Text>
        </View>
      </View>

      {/* Piece description */}
      <View className="flex-1 w-full h-full items-start px-5 pt-3 space-y-3" >

        {item.inspiration && 
        <View className="flex-row justify-center items-center">
          <Image source={require('../assets/icons/pattern.png')} className="w-[40px] h-[40px] mr-2" />
          <Text className="text-black flex-1 flex-wrap">{item.inspiration}</Text>
        </View>
        }

        {item.meaning && 
        <View className="flex-row justify-center items-center">
          <Image source={require('../assets/icons/lightbulb.png')} className="w-[40px] h-[40px] mr-2" />
          <Text className="text-black flex-1 flex-wrap">{item.meaning}</Text>
        </View>
        }

        {item.location && 
          <View className="flex-row justify-center items-center">
            <Image source={require('../assets/icons/location.png')} className="w-[40px] h-[40px] mr-2" />
            <Text className="text-black flex-1 flex-wrap">{item.location}</Text>
          </View>
        }
        

      </View>
    </SafeAreaView>
  )
}

export default DetailedPost