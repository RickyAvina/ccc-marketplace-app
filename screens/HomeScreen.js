import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import SafeViewAndroid from '../components/SafeViewAndroid'
import PhotoGrid from '../components/PhotoGrid';
import PostPhoto from '../components/PostPhoto';

// import LinearGradient from 'react-native-linear-gradient'
const data = [
  {
    id: 1,
    title: 'Photo1',
    url: 'https://fastly.picsum.photos/id/700/800/800.jpg?hmac=_L54KN0UFsvYiEOzsSfxaPWNCE9lgrKjTbNaPB0si20',
    time_created: '1001782829'
  },
  {
    id: 2,
    title: 'This is a really long title, like 2 lines long...',
    url: 'https://fastly.picsum.photos/id/946/800/800.jpg?hmac=-s6wSIHLcLQsBfhm-9ILWCUH1LqShBHG27dHd_mS9VU',
    time_created: '1244962010'
  },
  {
    id: 3,
    title: 'Photo3',
    url: 'https://fastly.picsum.photos/id/892/800/800.jpg?hmac=7fNAnqvaIIx098OkpQ1uzgxvmHxVP5bsiX-OFuqYJx8',
    time_created: '1131779874'
  },
  {
    id: 4,
    title: 'Photo4',
    url: 'https://fastly.picsum.photos/id/91/800/800.jpg?hmac=QRUzJX9f5neDgqHRRp2WIB7jIRLVL9gFDzJ993hBwHk',
    time_created: '1259247122',
  },
  {
    id: 5,
    title: 'Photo5',
    url: 'https://fastly.picsum.photos/id/430/800/800.jpg?hmac=wTqxPNdlkJlsDuo9EV6ojBwUXSAA0SWZVs2ikXBvzek',
    time_created: '1891089086',
  },
  {
    id: 6,
    title: 'Photo6',
    url: 'https://fastly.picsum.photos/id/103/800/800.jpg?hmac=By259DaARlR7-we5RGA9DvJ2oy1epp42iZTO-zS9O-Q',
    time_created: '1678637857',
  },
  {
    id: 7,
    title: 'Photo7',
    url: 'https://fastly.picsum.photos/id/156/800/800.jpg?hmac=Zmsl_BXhufelcy3t3uekDFTKHhUv_21pQDnh6oAb5Ec',
    time_created: '1190613022',
  }
]

const HomeScreen = () => {
  return (
    <View className="flex-1">
      <LinearGradient colors={['#FFE146', '#FFFFFF']} start={[0, 0]} end={[0, 0.3]} style={{flex: 1}}>
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1">
          {/* Header */}
          <View className="ml-5">
            <Text className="text-4xl font-bold">Uploads</Text>
            <Text className="text-2xl font-semibold text-[#AAAAAA]">Welcome, user!</Text>
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
          <PhotoGrid data={data}/>
          {/* <PostPhoto imageUri={data[0].url} /> */}
        </SafeAreaView>
      </LinearGradient>
    </View>
  )
}

export default HomeScreen