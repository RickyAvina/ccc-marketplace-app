import { View, Text, ImageBackground, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useRef } from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import PhoneInput from 'react-native-phone-number-input'
import useAuth from '../hooks/useAuth'
import IsLoadingHOC from '../components/IsLoadingHOC'
import { useEffect } from 'react'
import { useState } from 'react'


const LoginScreen = ({ navigation, setLoading, setError }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const phoneInput = useRef(null);
  const { login } = useAuth();

  const validator = require('validator');
  const passwordRegex = new RegExp(/^(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)
  
  const errorStates = {
    email: {
      state: useState(true),
      rule: "email must be of the format user@email.com"
    },
    password: {
      state: useState(true),
      rule: "Password must be >8 character in length, and contain uppercase letters, lowercase letters, and numbers."
    },
  }

  const inputInvalid = Object.values(errorStates)
    .map(obj => obj.state[0])
    .some(error => error == true);

  const getErrorString = () => {
    let err = ""
    for (const [field, obj] of Object.entries(errorStates)) {
      if (obj.state[0]) {
        err += "•" + obj.rule + "\n"
      }
    }

    if (err.length > 0 && err.slice(-1) == "\n") {
      err = err.slice(0, -1);
    }

    return err;
  }


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
              onChangeText={(val) => {
                // email validation
                val = val.toLowerCase().trim();

                errorStates.email.state[1](!validator.isEmail(val));
                setEmail(val)
              }}
              className="text-xl pb-2 border-[#EA4335] border-b-2 pl-2 py-2"
              placeholder='Email'
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(val) => {
                // password must be 8+ characters and contain upper lower AND numbers
                val = val.trim();

                // set error state if password is not valid
                errorStates.password.state[1](!passwordRegex.test(val));
                setPassword(val);
              }}
              className="text-xl pb-2 border-[#EA4335] border-b-2 pl-2 py-2"
              placeholder='Password'
            />
          </View>
          <View className="flex-1 items-center mx-[40px]">
            {/* Login Button */}
            <TouchableOpacity
              className={`w-full items-center py-3 rounded-xl ${inputInvalid ? "bg-[#CDCDCD]" : "bg-[#EA4335]"}`}
              onPress={async () => {
                if (inputInvalid) {
                  setError("Error logging in", getErrorString());
                } else {
                  // email, password, name, phone_number
                  try {
                    setLoading(true);
                    await login(email, password);
                  } catch (err) {
                    setError(err);
                  } finally {
                    setLoading(false);
                  }
                }
              }}
            >
              <Text className="text-white font-semibold text-lg">Login</Text>
            </TouchableOpacity>

            {/* Don't have an account? */}
            <View className="flex-row mt-5">
              <Text style={{ fontSize: 15 }} className="font-medium">{"Don't have an account?"} </Text>
              <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                <Text style={{ fontSize: 15 }} className="text-[#35BAD8]">Register Here</Text>
              </TouchableOpacity>
            </View>

            {/* Forgot password? */}
            <View className="flex-row mt-3">
              <Text style={{ fontSize: 15 }} className="font-medium">Forgot your password? </Text>
              <TouchableOpacity onPress={() => { navigation.navigate("ForgotPassword") }}>
                <Text style={{ fontSize: 15 }} className="text-[#35BAD8]">Click Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}



/*
 * [Fields] -> [Field states]
  <>
    <el>
    <el>
    <button disabled={!valid} />
  <>
*/

export default IsLoadingHOC(LoginScreen)