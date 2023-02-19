import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { createContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { authorize, clearSession, authedUser } = useAuth0();
  const [user, setUser] = useState(null);
  const AWSURL = "https://ky3czg4fza.execute-api.us-east-1.amazonaws.com/Prod";

  const login = async (email, password) => {  
    // Returns true if login was successful, false otherwise
    // Documentation: https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-resource-owner-password-flow

    const body = `grant_type=password&username=${email}&password=${password}&audience=https://dev-86rvru3cjw5ztru0.us.auth0.com/api/v2/&scope=email&client_id=Gwr6p98ErOSQtJXBqMXGZ8XRzBRsPQY3&client_secret=ARxNu23OgnnISH_5Yl6BrAS6ouX2zrwbITDbgaACd3lnjmP2heV4TRjiMObyyYIE`
    
    const response = await fetch('https://dev-86rvru3cjw5ztru0.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: body
    });

    const data = response.json()

    if (!response.ok || response.error != null) {
      console.error(data)
      return false
    }

    // query DynamoDB for full user profile
    

    // set user
    const user = 
    {
      id: 2,
      name: "Name",
      email: "Email",
      phone_number: "Phone Number"

    }

    console.log(success)
    return success
  }

  function sendXmlHttpRequest(endpoint, data) {
    const xhr = new XMLHttpRequest();
  
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = e => {
        if (xhr.readyState !== 4) {
          return;
        }
  
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("Request Failed: " + xhr.responseText);
        }
      };

      xhr.open("POST", endpoint);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(data);
    });
  }

  const register = async (email, password, name, phone_number, bio="") => {
    // Send POST request to https://dev-86rvru3cjw5ztru0.us.auth0.com/dbconnections/signup
    // Here's the documentation: https://auth0.com/docs/api/authentication?_ga=2.217599249.66623984.1676506519-2053214347.1676506518&_gl=1*vzj5jx*rollup_ga*MjA1MzIxNDM0Ny4xNjc2NTA2NTE4*rollup_ga_F1G3E656YZ*MTY3NjUwODk5Ny4yLjAuMTY3NjUwODk5Ny42MC4wLjA.#signup:~:text=Passwordless-,Signup,-Change%20Password

    // Start server using npx react-native start
    // Run using npx react-native run-android      

    const body = {
      client_id: "IiFlcfW3cILDV65BrUepNXygMpAyRJfq",
      email: email,
      password: password,
      connection: "Username-Password-Authentication",
      name: name,
      phone_number: phone_number
    }

    const formData = JSON.stringify(body);

    sendXmlHttpRequest("https://ky3czg4fza.execute-api.us-east-1.amazonaws.com/Prod/create-user", formData)
      .then((successResp) => {
        console.log("success!", successResp);
      }, (errResp) => {
        console.error("error AWS", errResp)
      }).catch((err) => {
        console.error(err);
      });
  }

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  }


  const memoedValue = useMemo(() => ({
    user,
    login,
    register,
    logout
  }), [user, login, register, logout])

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