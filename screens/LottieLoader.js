import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import { useEffect } from 'react';
import { useRef } from 'react';


const LottieLoader = () => {
  /* Loader icon
   *
   * Using "onLayout" due to this issue https://github.com/expo/expo/issues/16858#issuecomment-1237882579
   */

  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <>
      <Lottie
        ref={animationRef}
        onLayout={() => { animationRef.current?.play() }}
        loop
        autoPlay
        source={require("../assets/anims/98195-loader.json")}
      />
    </>
  )
}

export default LottieLoader