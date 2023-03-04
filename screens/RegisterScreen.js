import { View, Text, ImageBackground, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import PhoneInput from 'react-native-phone-number-input'
import useAuth from '../hooks/useAuth'
import IsLoadingHOC from '../components/IsLoadingHOC'


const RegisterScreen = ({ navigation, setLoading, setError }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const phoneInput = useRef(null);
  const { register } = useAuth();

  const passwordRegex = new RegExp(/^(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/)
  const numberRegex = new RegExp(/^[0-9]*$/);

  const validator = require('validator');

  const errorStates = {
    name: {
      state: useState(true),
      rule: "Name must be non-empty",
    },
    number: {
      state: useState(true),
      rule: "Phone number must be non-empty and contain only numbers"
    },
    email: {
      state: useState(true),
      rule: "email must be of the format user@email.com"
    },
    password: {
      state: useState(true),
      rule: "Password must be >8 character in length, and contain uppercase letters, lowercase letters, and numbers."
    },
    confirmPassword: {
      state: useState(true),
      rule: "Both passwords must match"
    }
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
    return err;
  }


  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        resizeMode='cover'
        className="flex-1 absolute top-[-10] w-full h-full ml-10"
        source={require('../assets/flower-bg-2.jpg')}
      >
      </ImageBackground>
      {/* Logo  */}
      <View className="absolute left-[20px] top-[40]">
        <Image
          source={require('../assets/ccc-logo.png')}
          className="w-40 h-40"
        />
        <Text className="text-center text-2xl font-bold text-[#EA4335] mt-[-40]">Creator Studio</Text>
      </View>

      {/* Main Form */}
      <View className="flex-1 bg-clear mt-[80%] mx-[20px]">
        <View className="flex-1">
          <Text className="font-semibold text-4xl text-[#EA4335]">Create an account</Text>
          <Text className="text-lg text-[#787878]">{"Let's get you started"}</Text>
          <View className="pt-5 mx-10 mb-10">
            <TextInput
              value={name}
              onChangeText={(val) => {
                errorStates.name.state[1](val.length==0);
                setName(val);
              }}
              className=" text-xl pb-2 border-[#EA4335] border-b-2 pl-2"
              placeholder='Name'
            />
            <TextInput
              value={email}
              onChangeText={(val) => {
                // email validation
                val = val.toLowerCase().trim();

                errorStates.email.state[1](!validator.isEmail(val));
                setEmail(val)              
              }}  
              className=" text-xl pb-2 border-[#EA4335] border-b-2 pl-2"
              placeholder='email'
            />
            <View className="border-[#EA4335] border-b-2">
              <PhoneInput
                ref={phoneInput}
                defaultValue={number}
                defaultCode="US"
                layout="first"
                onChangeText={(val) => {
                  val = val.trim();
                  errorStates.number.state[1](!numberRegex.test(val));

                  setNumber(val)
                }}
                onChangeFormattedText={() => { }}
                containerStyle={{
                  backgroundColor: "white",
                  paddingHorizontal: -4,
                  marginLeft: -10
                }}
                textContainerStyle={{
                  backgroundColor: "white",
                  paddingLeft: -10,
                  paddingVertical: 10,
                  highlighted: {
                    backgroundColor: 'yellow',
                  },
                }}
                textInputStyle={{
                  fontSize: 17,
                  fontWeight: "400",
                }}
              />
            </View>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(val) => {
                val = val.trim();
                errorStates.password.state[1](!passwordRegex.test(val));
                setPassword(val)
              }}
              className="text-xl pb-2 border-[#EA4335] border-b-2 pl-2 py-2"
              placeholder='Password'
            />
            {/* Confirm Password */}
            <TextInput
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={(val) => {
                val = val.trim();

                errorStates.confirmPassword.state[1](val != password);
                setConfirmPassword(val);
              }}
              className="text-xl pb-2 border-[#EA4335] border-b-2 pl-2 py-2"
              placeholder='Confirm password'
            />
          </View>
          <View className="flex-1 items-center mx-[40px]">
            {/* Register Button */}
            <TouchableOpacity
              className={`w-full items-center py-3 rounded-xl ${inputInvalid ? "bg-[#CDCDCD]" : "bg-[#EA4335]"}`}
              onPress={async () => {
                if (inputInvalid) {
                  setError("Error Registering", getErrorString());
                } else {
                  // Try to register
                  setLoading(true);
                  try {
                    await register(email, password, name, number)
                      .then(() => { console.log("Register success!") })
                      .catch((message) => {
                        console.error(message);
                        setError(message)
                      })
                      .finally(() => setLoading(false));
                  } catch (err) {
                    setError(err);
                  }
                }
              }}
            >
              {/* email, password, name, phone_number */}
              <Text className="text-white font-semibold text-lg">Create an account</Text>
            </TouchableOpacity>
            {/* <Text className="text-gray-700 text-xl my-1">or</Text>
          <TouchableOpacity style={{elevation: 1}} className="w-full items-center py-2 rounded-xl bg-white flex-row border-[1.5px] border-[#CCCCCC] ">
            <Image
              source={require('../assets/google-icon.png')}
              className="w-10 h-10 mx-3"
            />
            <Text className="text-black font-semibold text-lg">Sign in with Google</Text>
          </TouchableOpacity> */}
            <View className="flex-row mt-5">
              <Text style={{ fontSize: 15 }} className="font-medium">Already have an account? </Text>
              <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                <Text style={{ fontSize: 15 }} className="text-[#35BAD8]">Login Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default IsLoadingHOC(RegisterScreen);