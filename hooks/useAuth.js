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
  const {authorize, clearSession, authedUser} = useAuth0();
  const [user, setUser] = useState(null);

  // const login = async () => {
  //   try {
  //     await authorize({scope: 'openid profile email'});

  //     if (authedUser !== null && authedUser !== undefined) {
  //       // query db
  //       console.log('time to query db')
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const login = async (email, password, name, phone_number) => {
    // Send POST request to https://dev-86rvru3cjw5ztru0.us.auth0.com/dbconnections/signup
    // Here's the documentation: https://auth0.com/docs/api/authentication?_ga=2.217599249.66623984.1676506519-2053214347.1676506518&_gl=1*vzj5jx*rollup_ga*MjA1MzIxNDM0Ny4xNjc2NTA2NTE4*rollup_ga_F1G3E656YZ*MTY3NjUwODk5Ny4yLjAuMTY3NjUwODk5Ny42MC4wLjA.#base-url
    
    // Start server using npx react-native start
    // Run using npx react-native run-android      
    
    //  LOG  {"_id": "63eed9f009b12c77b8d352c2", "email": "bob@jonesy.com", "email_verified": false, "name": "Bob Jones 2", "user_metadata": {"phone_number": "165020650953"}}
    //  LOG  {"code": "invalid_signup", "description": "Invalid sign up", "name": "BadRequestError", "statusCode": 400}
    
    const body = {
      client_id: "IiFlcfW3cILDV65BrUepNXygMpAyRJfq",
      email: email,
      password: password,
      connection: "Username-Password-Authentication",
      name: name,
      user_metadata: {
        phone_number: phone_number 
      }
    }
    
    const response = await fetch('https://dev-86rvru3cjw5ztru0.us.auth0.com/dbconnections/signup',
      {method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      });

    const data = await response.json();
    console.log(data);
  }


  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  }


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