import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DesignsScreen from './screens/DesignsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddPostModalScreen from './screens/AddPostModalScreen';
import DetailedPost from './screens/DetailedPost';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const user = "ricky";

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="DesignsScreen" component={DesignsScreen} />
            <Stack.Screen name="DetailedPost" component={DetailedPost} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name='AddPostModal' component={AddPostModalScreen}/>
          </Stack.Group>
        </>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      )}

    </Stack.Navigator>
  )
}

export default StackNavigator