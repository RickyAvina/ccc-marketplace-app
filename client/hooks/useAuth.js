import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { createContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { AsyncStorage } from 'react-native';

const AuthContext = createContext({});

const AWSURL = "https://398k2guqig.execute-api.us-east-1.amazonaws.com/Prod/";

export function sendXmlHttpRequest(endpoint, reqType, data) {
  // REQ type is HTTP request type, ex: POST, GET, PUT
  const xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = e => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.responseText);
      }
    };

    if (reqType in ['GET', 'POST', 'PUT', 'DELETE']) {
      console.error('Invalid request type');
      return;
    }

    xhr.open(reqType, AWSURL + endpoint);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
  });
}

export const AuthProvider = ({ children }) => {
  const { authorize, clearSession, authedUser } = useAuth0();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const setCachedUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        setUser(JSON.parse(user));
      }
    }

    setCachedUser()
      .catch(console.error);

  }, [user])

  const setUserState = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  const login = async (email, password) => {
    // Documentation: https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-resource-owner-password-flow
    const formData = JSON.stringify({ username: email, password});

    return new Promise((resolve, reject) => {
      try {
        sendXmlHttpRequest("/login", "POST", formData)
          .then(_user => {
            console.log(_user)
            // Set user (don't save access token for now)
            const {access_token, ...u} = _user
            setUserState(u);
            resolve(_user);
          })
          .catch((err) => {
            console.error(err)
            reject("Incorrect login");
          });
      } catch (error) {
        console.error(error)
        reject("Error signing in");
      }
    })
  }


  const register = async (email, password, name, phone_number, bio = "") => {
    // Send POST request to https://dev-86rvru3cjw5ztru0.us.auth0.com/dbconnections/signup
    // Here's the documentation: https://auth0.com/docs/api/authentication?_ga=2.217599249.66623984.1676506519-2053214347.1676506518&_gl=1*vzj5jx*rollup_ga*MjA1MzIxNDM0Ny4xNjc2NTA2NTE4*rollup_ga_F1G3E656YZ*MTY3NjUwODk5Ny4yLjAuMTY3NjUwODk5Ny42MC4wLjA.#signup:~:text=Passwordless-,Signup,-Change%20Password

    // Start server using npx react-native start
    // Run using npx react-native run-android      

    const body = {
      email: email,
      password: password,
      name: name,
      phone_number: phone_number
    }

    const formData = JSON.stringify(body);

    return new Promise((resolve, reject) => {
      try {
        sendXmlHttpRequest(AWSURL + "/create-user", "POST", formData)
          .then((_user) => {
            console.log("success!", _user);
            // set user
            setUserState(_user);
            resolve();
          }).catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    })
  }

  const logout = async () => {
    try {
      await clearSession();
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (e) {
      console.error('Log out cancelled, error: ' + e);
    }
  }

  const memoedValue = useMemo(() => ({
    user,
    login,
    register,
    logout
  }), [user, login, register, logout])

  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}