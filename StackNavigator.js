import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DesignsScreen from './screens/DesignsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddPostModalScreen from './screens/AddPostModalScreen';
import DetailedPost from './screens/DetailedPost';
import HomeScreen from './screens/HomeScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import AccountScreen from './screens/AccountScreen';
import PasswordDetailsScreen from './screens/PasswordDetailsScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const user = null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DesignsScreen" component={DesignsScreen} />
            <Stack.Screen name="DetailedPost" component={DetailedPost} />
            <Stack.Group>
              <Stack.Screen name="AccountScreen" component={AccountScreen} />
              <Stack.Screen name="PasswordDetails" component={PasswordDetailsScreen} />          
            </Stack.Group>
            <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
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