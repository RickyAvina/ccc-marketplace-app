import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { createContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "844247946871-3hs1t766n5qgbnbs4gl3ufkk3571ccmb.apps.googleusercontent.com"
  })

  useEffect(() => {
    console.log('resp', response)
    if (response?.type === "success") {
      const { authentication } = response
    }
  }, [response])

  const memoedValue = useMemo(() => ({
    request,
    promptAsync
  }), [request, promptAsync])

  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}