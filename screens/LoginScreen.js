// import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native'
// import React from 'react'
// import SafeViewAndroid from '../components/SafeViewAndroid'
// import { useNavigation } from '@react-navigation/native'


// const LoginScreen = ({navigation}) => {
  
//   return (
//     <View className="flex-1">
//       <ImageBackground
//         resizeMode='cover'
//         className='flex-1'
//         source={require('../assets/flower-bg.jpg')}
//       >
//         <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1 items-center">
//           <Image
//             source={require('../assets/ccc-logo.png')}
//             className="w-40 h-40"/>
//           <Text className="text-center text-4xl font-bold mt-[-20] text-[#EA4335]">Creator Studio</Text>
//           {/* <View className="flex-1"> */}
//           <View className="absolute bottom-64 items-center">
//             <TouchableOpacity className= "w-[150] shadow-xl p-3 bg-white rounded-full" style={{elevation: 1}}>
//               <Text className="text-[#EA4335] text-2xl font-semibold text-center">Login</Text>
//             </TouchableOpacity>
//             <View className="flex-row mt-5">
//             <Text style={{fontSize: 15}} className="font-medium">Don't have an account? </Text>
//               <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
//                 <Text style={{fontSize: 15}} className="text-[#35BAD8]">Register Here</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* </View> */}
//         </SafeAreaView>
//       </ImageBackground>
//     </View>
//   )
// }

// export default LoginScreen


import { View, Text, ImageBackground, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import PhoneInput from 'react-native-phone-number-input'


const LoginScreen = ({navigation}) => {
  const [name, setName] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const phoneInput = useRef(null);
  
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
    <View className="flex-1 bg-clear mt-[80%] mx-[30px]">
      <View className="flex-1">
        <Text className="font-semibold text-4xl text-[#EA4335]">Login</Text>
        <Text className="text-lg text-[#787878]">{"Welcome back. We missed you."}</Text>
        <View className="pt-5 mx-10 mb-10">
          <View className="border-[#EA4335] border-b-2">
          <PhoneInput
             ref={phoneInput}
             defaultValue={number}
             defaultCode="US"
             layout="first"
             onChangeText={setNumber}
             onChangeFormattedText={()=>{}}
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
            onChangeText={setPassword}
            className="text-xl pb-2 border-[#EA4335] border-b-2 pl-2 py-2"
            placeholder='Password'
          />
        </View>
        <View className="flex-1 items-center mx-[40px]">
          <TouchableOpacity className="w-full items-center py-3 rounded-xl bg-[#EA4335]">
            <Text className="text-white font-semibold text-lg">Login</Text>
          </TouchableOpacity>
          <Text className="text-gray-700 text-xl my-1">or</Text>
          <TouchableOpacity style={{elevation: 1}} className="w-full items-center py-2 rounded-xl bg-white flex-row border-[1.5px] border-[#CCCCCC] ">
            <Image
              source={require('../assets/google-icon.png')}
              className="w-10 h-10 mx-3"
            />
            <Text className="text-black font-semibold text-lg">Sign in with Google</Text>
          </TouchableOpacity>
          <View className="flex-row mt-5">
            <Text style={{fontSize: 15}} className="font-medium">{"Don't have an account?"} </Text>
            <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
              <Text style={{fontSize: 15}} className="text-[#35BAD8]">Register Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </View>
  )
}




export default LoginScreen