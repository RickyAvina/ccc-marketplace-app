import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';
import { useAuth0, Auth0Provider } from 'react-native-auth0';


export default function App() {
  // const LoginButton = () => {
  //   const { authorize } = useAuth0();

  //   const onPress = async () => {
  //     try {
  //       await authorize();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   return <Button onPress={onPress} title="Log in" />
  // }

  return (
    <NavigationContainer>
      <Auth0Provider domain={"dev-86rvru3cjw5ztru0.us.auth0.com"} clientId={"Gwr6p98ErOSQtJXBqMXGZ8XRzBRsPQY3"}>
        {/* <LoginButton /> */}
        <AuthProvider>

        <StackNavigator />
        </AuthProvider>
      </Auth0Provider>
    </NavigationContainer>
  );
}