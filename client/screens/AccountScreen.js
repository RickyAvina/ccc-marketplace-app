import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input'
import useAuth from '../hooks/useAuth';
import IsLoadingHOC from '../components/IsLoadingHOC';
import { useEffect } from 'react';


export async function sendChangePasswordEmail(email, setError, logout) {
  const body = {
    client_id: "Gwr6p98ErOSQtJXBqMXGZ8XRzBRsPQY3",
    email: email,
    connection: "Username-Password-Authentication"
  }

  // TODO: Check to see if user exists before sending this request 
  const result = await fetch("https://dev-86rvru3cjw5ztru0.us.auth0.com/dbconnections/change_password", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .catch((error) => {
    setError(error);
    return false;
  })

  if (!result.ok) {
    setError("Error sending reset password email")
    return false;
  }

  // Not an error, just a message
  setError("Successfully sent reset password email, check your inbox.", "If you do not see an email, please check your spam.")
  
  // logout if resetting password from accounts screen 
  if (logout !== null && logout !== undefined) {
    logout();
  }
  return true;
}


const AccountScreen = ({setLoading, setError}) => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const phoneInput = useRef(null);
  const [bio, setBio] = useState(user.bio);

  useEffect(() => {
    setLoading(false);
    console.log(user);
  }, [])


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
            <Text className="text-xl font-semibold">{user.name ?? "User"}</Text>
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

            {/* Buttons */}
            <View className="space-y-3 mt-3">
              {/* Save Button */}
              <TouchableOpacity
                className="bg-[#FFE146] mx-20 items-center border-[1px] border-[#757575] rounded-md"
                onPress={async () => {
                  // save
                }}
              >
                <Text className="font-bold my-3 ">Save Profile</Text>
              </TouchableOpacity>
              
              {/* Change Password Button */}
              <TouchableOpacity
                className="bg-[#FFE146] mx-20 items-center border-[1px] border-[#757575] rounded-md"
                onPress={async () => {
                  // save
                  setLoading(true);
                  await sendChangePasswordEmail(user.email, setError, logout);
                  setLoading(false);
                }}
              >
                <Text className="font-bold my-3 text-center">Send Change Password Email</Text>
              </TouchableOpacity>

              {/* Logout Button */}
              <TouchableOpacity
                className="bg-[#FFE146] mx-20 items-center border-[1px] border-[#757575] rounded-md"
                onPress={async () => {
                  // display loader
                  setLoading(true);
                  await logout();
                  setLoading(false);
                }}
              >
                <Text className="font-bold my-3 ">Logout</Text>
              </TouchableOpacity>
              
            </View>

          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}


export default IsLoadingHOC(AccountScreen);