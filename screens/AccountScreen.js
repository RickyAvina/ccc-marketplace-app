import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input'


const AccountScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef(null);
  const [bio, setBio] = useState("");

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
          <Text className="font-semibold text-lg text-[#5F5F5F] ml-2">Account</Text>
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
            <View className="border-b-[1px] border-[#747474]">
              <TextInput
                value={name}
                onChangeText={setName}  // auto save?
                className="m-2"
                placeholder='First Name, Last Name'
              />
            </View>

            <View className="border-b-[1px] border-[#747474]">
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="US"
                layout='second'
                onChangeText={setPhoneNumber}
                containerStyle={{
                  marginLeft: -18,
                  backgroundColor: "transparent",
                }}
                codeTextStyle={{
                  color: "#747474"
                }}
                textInputStyle={{
                  color: "#747474"
                }}
                textContainerStyle={{
                  backgroundColor: "white",
                  paddingLeft: -10,
                  paddingVertical: 5,
                }}
              />
            </View>

            {/* Password Field */}
            <TouchableOpacity
              className="flex-row justify-between border-b-[1px] border-[#747474] items-center p-2"
              onPress={() => { navigation.navigate("PasswordDetails") }}>
              <Text className="text-[#747474]">Password</Text>
              <AntDesign
                name="rightcircleo"
                className=""
                size={24}
                color="#747474" />
            </TouchableOpacity>

            {/* Bio  */}
            <View className="border-b-[1px] border-[#747474]">
              <TextInput
                value={bio}
                onChangeText={setBio}  // auto save?
                multiline={true}
                maxHeight={60}
                numberOfLines={3}
                className="m-2"
                placeholder='Bio'
              />
            </View>

            {/* Logout Button */}
            <TouchableOpacity className="bg-[#FFE146] mx-20 items-center border-[1px] border-[#757575] mt-5 rounded-md">
              <Text className="font-bold my-3 ">Logout</Text>
            </TouchableOpacity>

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