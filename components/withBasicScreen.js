import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'
import React, { useMemo } from 'react'
import SafeViewAndroid from './SafeViewAndroid';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Higher order component for creating basic screens
export const withBasicScreen = (Component, title) => {
  
  const NewComponent = () => {
    const navigation = useNavigation();

    return (
      <ImageBackground
        resizeMode='cover'
        className="flex-1 w-full h-full"
        source={require('../assets/yellow-bg.jpg')}
      >
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1">
          <View className="flex-row items-end ml-2 mt-2">
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
              <Ionicons name="arrow-back" size={24} color="#5F5F5F" />
            </TouchableOpacity>
            <Text className="font-semibold text-lg text-[#5F5F5F] ml-2">{title}</Text>
          </View>
          <Component />
        </SafeAreaView>
      </ImageBackground>
    )
  }

  return NewComponent
}
