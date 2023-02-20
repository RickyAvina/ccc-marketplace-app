import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { withBasicScreen } from '../components/withBasicScreen'
import IsLoadingHOC from '../components/IsLoadingHOC'
import { useEffect } from 'react'
import { useState } from 'react'
import { sendChangePasswordEmail } from './AccountScreen'

const ForgotPasswordScreen = ({setLoading, setError}) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View className="flex-1 items-center mt-[20%]">
      <View className=" space-y-5">
      <Text className="text-2xl font-bold text-[#EA4335]">Forgot Password</Text>
      <TextInput
            value={email}
            onChangeText={setEmail}
            className="w-60 text-xl pb-2 border-[#EA4335] border-b-2 pl-2"
            placeholder='email'
          />
      <TouchableOpacity
        className="items-center py-3 rounded-xl bg-[#EA4335]"
        onPress={async () => {
          
          setLoading(true);
          try {
            await sendChangePasswordEmail(email, setError, null);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }}
      >
        <Text className="text-white text-lg px-2 text-center">{"Send Reset Password\nEmail"}</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default withBasicScreen(IsLoadingHOC(ForgotPasswordScreen), "Forgot Password");