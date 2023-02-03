import { View, Text, ImageBackground, Image, TextInput } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'


const RegisterScreen = () => {
  const [name, setName] = React.useState('')
  const [number, setNumber] = React.useState('')

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        resizeMode='cover'
        className="flex-1 absolute top-0 w-full h-full ml-10"
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
        <View className="flex-1 pt-5 mx-10 bg-green-400">
          <TextInput
            value={name}
            className=" text-xl pb-2 border-[#EA4335] border-b-2 pl-2"
            placeholder='Name'
          />
          <TextInput
            value={name}
            className=" text-xl pb-2 border-[#EA4335] border-b-2 pl-2"
            placeholder='Name'
          />
        </View>
      </View>
    </View>
    </View>
  )
}

export default RegisterScreen