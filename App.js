import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';
import { Auth0Provider } from 'react-native-auth0';

const env = require('./env.json');

export default function App() {
  return (
    <NavigationContainer>
      <Auth0Provider domain={"dev-86rvru3cjw5ztru0.us.auth0.com"} clientId={env.clientId}>
        <AuthProvider>
        <StackNavigator />
        </AuthProvider>
      </Auth0Provider>
    </NavigationContainer>
  );
}