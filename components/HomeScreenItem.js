import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreenItem = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity className="flex-1 mx-2" onPress={()=> {navigation.navigate(props.dest)}}>
      {props && 
      <ImageBackground
        source={props.image}
        resizeMode="cover"
        className="flex-1"
        imageStyle={{ borderRadius: 12}}
      >
        <Text className="text-white font-bold text-3xl p-4">
          {props.title}
        </Text>
      </ImageBackground>
      }
    </TouchableOpacity>
  )
}

export default HomeScreenItem