import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import { useEffect } from 'react';
import { useRef } from 'react';


const LottieLoader = () => {
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