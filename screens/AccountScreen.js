import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const AccountScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  

  return (
    <ImageBackground
      resizeMode='cover'
      className="flex-1 w-full h-full"
      source={require('../assets/yellow-bg.jpg')}
    >
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1">
        {/* Navbar */}
        <View className="flex-row items-end ml-2 mt-2">
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Ionicons name="arrow-back" size={24} color="#5F5F5F" />
          </TouchableOpacity>
          <Text className="font-semibold text-lg text-[#5F5F5F] ml-2">Payments</Text>
        </View>

        {/* Profile Summary */}
        <View className="items-center pb-5 space-y-1">
          <View className="flex-row items-center space-x-2 mt-4 ml-2">
            <Image
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              className="w-[50px] h-[50px] rounded-full"
            />
            <Text className="text-xl font-semibold">Andrea M.</Text>
          </View>
          <Text className="text-[#3897F0] font-semibold">Change Profile Picture</Text>
        </View>

        {/* Profile Fields */}
        <View className="flex-1 mx-8">
          <Text className="font-bold text-lg">Profile Info</Text>
          <View className="flex-1">
            {/* Account details */}
            <TextInput
              value={name}
              onChangeText={setName}  // auto save?
              className="border-b-[1px] border-[#747474] my-2"
              placeholder='First Name, Last Name'
            />
            <TextInput
              value={name}
              onChangeText={setName}  // auto save?
              className="border-b-[1px] border-[#747474] my-2"
              placeholder='User name'
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default AccountScreen


     // <TouchableOpacity
            //   className="flex-row justify-between items-center bg-red-500 p-4"
            //   onPress={() => { navigation.navigate("AccountDetails") }}>
            //   <Text className="text-lg">Account info</Text>
            //   <AntDesign
            //     name="rightcircleo"
            //     className=""
            //     size={24}
            //     color="black" />
            // </TouchableOpacity>

            // {/* Payment Details */}
            // <TouchableOpacity
            //   className="flex-row justify-between items-center bg-red-500 p-4"
            //   onPress={() => { navigation.navigate("AccountDetails") }}>
            //   <Text className="text-lg">Account info</Text>
            //   <AntDesign
            //     name="rightcircleo"
            //     className=""
            //     size={24}
            //     color="black" />
            // </TouchableOpacity>