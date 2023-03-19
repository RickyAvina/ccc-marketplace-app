import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import SafeViewAndroid from '../components/SafeViewAndroid'
import PhotoGrid from '../components/PhotoGrid';
import * as ImagePicker from 'expo-image-picker';
import { data } from '../photoData'
import { Ionicons } from '@expo/vector-icons';
import usePosts from '../hooks/usePosts';
import useAuth from '../hooks/useAuth';

const DesignsScreen = ({route, navigation}) => {
  
//   if (route != null && route.params != null) {
//     // launch async request to upload photo, use placeholder in the meantime
//     /* (alias) const data: {
//       id: number;
//       title: string;
//       url: string;
//       time_created: string;
//     }[]
//     import data
// */ 
//   }
  // console.log(route.params, JSON.stringify(route.params));

  const { user } = useAuth();
  const {posts, getPosts}  = usePosts();


  useEffect(() => {
    if (posts === null) {
      getPosts(user.id);
    }
  }, [posts]);

  // console.log("posts: ", posts);

  const addPhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      const _file = result.assets[0];
      
      if (!result.canceled) {
        navigation.navigate('AddPostModal', { 
          uri: _file.uri,
          fileName: _file.fileName ,
          type: _file.type
        })
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }
  
  return (
    <View className="flex-1">
      <LinearGradient colors={['#FFE146', '#FFFFFF']} start={[0, 0]} end={[0, 0.3]} style={{flex: 1}}>
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1">
        {/* Navbar */}
        <View className="flex-row items-end ml-2 mt-2">
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <Ionicons name="arrow-back" size={24} color="#5F5F5F" />
          </TouchableOpacity>
          <Text className="font-semibold text-lg text-[#5F5F5F] ml-2">Designs</Text>
        </View>

          {/* Stats */}
          <View className="flex-row justify-between px-10 mt-5">
            <View className="items-center">
              <Text className="text-2xl font-extrabold">15</Text>
              <Text className="font-semibold text-[#AAAAAA]">Designs</Text>
            </View>

            <View className="items-center">
              <Text className="text-2xl font-extrabold">4</Text>
              <Text className="font-semibold text-[#AAAAAA]">Purchased</Text>
            </View>

            <View className="items-center">
              <Text className="text-2xl font-extrabold text-[#309B0B]">$520</Text>
              <Text className="font-semibold text-[#AAAAAA]">Earnings</Text>
            </View>
          </View>

          {/* photo grid */}
          <PhotoGrid data={data} navigation={navigation}/>

          {/* Photo Picker Button */}
          <View className="absolute bottom-[20px] items-center w-full">
            <TouchableOpacity
              className="items-center justify-center bg-red-600 w-[80px] h-[80px] rounded-full"
              onPress={addPhoto}
              >
              <Text className="items-center justify-center pt-[2px] text-5xl text-white">+</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  )
}



export default DesignsScreen