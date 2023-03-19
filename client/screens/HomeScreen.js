import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import HomeScreenItem from '../components/HomeScreenItem'

const HomeScreen = () => {
  const images = {
    designs: require('../assets/home/designs.jpg')
  }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-white">
      {/* Header */}
      <View className="flex-row">
        <Image
          source={require('../assets/ccc-logo.png')}
          className="w-40 h-40 my-[-25] ml-[-10px]" />
      </View>

      <View className="flex-1 flex-col gap-y-4 mx-2 mb-[20%] pt-[-40px]">
        <View className="flex-row flex-1 justify-between">
          {/* Designs */}
          <HomeScreenItem
            image={require('../assets/home/designs.jpg')}
            title="Designs"  
            dest="DesignsScreen"
          />

          {/* Payments  */}
          <HomeScreenItem 
            image={require('../assets/home/payments.jpg')}
            title="Payments"
            dest="PaymentsScreen"
            />
        </View>

        {/* Account */}
        <View className="flex-row flex-1 justify-between">
          <HomeScreenItem
            image={require('../assets/home/profile.png')}
            title="Account"
            dest="AccountScreen"
            />
          <HomeScreenItem/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen