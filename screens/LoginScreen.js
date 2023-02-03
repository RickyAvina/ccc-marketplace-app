import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { useNavigation } from '@react-navigation/native'


const LoginScreen = ({navigation}) => {
  
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode='cover'
        className='flex-1'
        source={require('../assets/flower-bg.jpg')}
      >
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1 items-center">
          <Image
            source={require('../assets/ccc-logo.png')}
            className="w-40 h-40"/>
          <Text className="text-center text-4xl font-bold mt-[-20] text-[#EA4335]">Creator Studio</Text>
          {/* <View className="flex-1"> */}
          <View className="absolute bottom-64 items-center">
            <TouchableOpacity className= "w-[150] shadow-xl p-3 bg-white rounded-full" style={{elevation: 1}}>
              <Text className="text-[#EA4335] text-2xl font-semibold text-center">Login</Text>
            </TouchableOpacity>
            <View className="flex-row mt-5">
            <Text style={{fontSize: 15}} className="font-medium">Don't have an account? </Text>
              <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                <Text style={{fontSize: 15}} className="text-[#35BAD8]">Register Here</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen