import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { withBasicScreen } from '../components/withBasicScreen';


const MyView = () => {
  return (
    <View>
      <Text>Hello, world</Text>
    </View>
  )
}

const WithBasicMyView = withBasicScreen(MyView, "MyTitle");

const AccountDetailsScreen = () => {
  return (
   <WithBasicMyView />
  )
}


export default AccountDetailsScreen