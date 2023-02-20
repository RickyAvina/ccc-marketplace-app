import { View, Text, ImageBackground, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useRef } from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import PhoneInput from 'react-native-phone-number-input'
import useAuth from '../hooks/useAuth'
import IsLoadingHOC from '../components/IsLoadingHOC'
import { useEffect } from 'react'


const LoginScreen = ({ navigation, setLoading, setError }) => {
  const [name, setName] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const phoneInput = useRef(null);  
  const { login } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        resizeMode='cover'
        className="flex-1 absolute top-0 w-full h-full ml-10"
        source={require('../assets/flower-bg-2.jpg')}
      >
      </ImageBackground>
      {/* Logo  */}
      <View className="absolute left-[20px]">
        <Image
          source={require('../assets/ccc-logo.png')}
          className="w-40 h-40"
        />
        <Text className="text-center text-2xl font-bold text-[#EA4335] mt-[-40]">Creator Studio</Text>
      </View>

      {/* Main Form */}
      <View className="flex-1 bg-clear mt-[80%] mx-[30px]">
        <View className="flex-1">
          <Text className="font-semibold text-4xl text-[#EA4335]">Login</Text>
          <Text className="text-lg text-[#787878]">{"Welcome back. We missed you."}</Text>
          <View className="pt-5 mx-10 mb-10">
          <TextInput
              value={email}
              onChangeText={setEmail}
              className="text-xl pb-2 border-[#EA4335] border-b-2 pl-2 py-2"
              placeholder='Email'
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              className="text-xl pb-2 border-[#EA4335] border-b-2 pl-2 py-2"
              placeholder='Password'
            />
          </View>
          <View className="flex-1 items-center mx-[40px]">
            {/* Login Button */}
            <TouchableOpacity
              className="w-full items-center py-3 rounded-xl bg-[#EA4335]"
              onPress={async () => {
                // email, password, name, phone_number
                try {
                  setLoading(true);
                  await login(email, password);
                } catch (err) {
                  setError(err);
                } finally {
                  setLoading(false);
                }
                // login()
                // login("bob@jonesy.com", "V3RySecurePassword!")
                // login("bob@jonesy.com", "V3RySecurePassword!", "Bob Jones 2", "165020650953")
              }}
            >
              <Text className="text-white font-semibold text-lg">Login</Text>
            </TouchableOpacity>
           
            <View className="flex-row mt-5">
              <Text style={{ fontSize: 15 }} className="font-medium">{"Don't have an account?"} </Text>
              <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                <Text style={{ fontSize: 15 }} className="text-[#35BAD8]">Register Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}


export default IsLoadingHOC(LoginScreen)