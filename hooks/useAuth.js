import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { createContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import {useAuth0, Auth0Provider} from 'react-native-auth0';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const {authorize, clearSession, user} = useAuth0();

  const login = async () => {
    try {
      await authorize({scope: 'openid profile email'});
    } catch (e) {
      console.log(e);
    }
  }

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  }

  useEffect(()=> {
    if (user !== null && user != undefined) {
      console.log(user);
    } else {
      console.log("null user")
    }
  }, [user]);

  const memoedValue = useMemo(()=> ({
    user,
    login,
    logout
  }), [user, login, logout])

  return (
    <Auth0Provider domain={"dev-86rvru3cjw5ztru0.us.auth0.com"} clientId={"Gwr6p98ErOSQtJXBqMXGZ8XRzBRsPQY3"}>
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
    </Auth0Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}