import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { withBasicScreen } from '../components/withBasicScreen';
import { useState } from 'react';


const MyView = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <View className="py-[100px] mx-12 space-y-4">
      {/* Old password */}
      <View className="border-b-[1px] border-[#747474]">
        <Text className="font-bold text-[#747474]">Old Password</Text>
        <TextInput
          value={oldPassword}
          onChangeText={setOldPassword}
          className="my-1 text-lg"
          placeholder='**********'
        />
      </View>

      {/* New password */}
      <View className="border-b-[1px] border-[#747474]">
        <Text className="font-bold text-[#747474]">New Password</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          className="my-1 text-lg"
          placeholder='**********'
        />
      </View>
      
      {/* Confirm password */}
      <View className="border-b-[1px] border-[#747474]">
        <Text className="font-bold text-[#747474]">Confirm new password</Text>
        <TextInput
          value={newPassword}
          onChangeText={setConfirmNewPassword}
          className="my-1 text-lg"
          placeholder='**********'
        />
      </View>

      <TouchableOpacity className="bg-[#FFE146] mx-10 items-center border-[1px] border-[#757575] rounded-md">
        <Text className="font-bold my-3">Update Password</Text>
      </TouchableOpacity>
    </View>
  )
}

const WithBasicMyView = withBasicScreen(MyView, "Set New Password");

const PasswordDetailsScreen = () => {
  return (
    <WithBasicMyView />
  )
}

export default PasswordDetailsScreen