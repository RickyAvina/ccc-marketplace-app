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

  useEffect(()=> {
    if (user !== null && user != undefined) {
      console.log(user);
    } else {
      console.log("null user")
    }
  }, user);

  const memoedValue = useMemo(()=> ({
    login
  }), [login])

  return (
      <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}