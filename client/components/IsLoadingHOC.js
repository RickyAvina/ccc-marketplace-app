import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Lottie from 'lottie-react-native';
import LottieLoader from '../screens/LottieLoader';


const IsLoadingHOC = (WrappedComponent) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    };

    const setErrorState = (title, subtext="") => {
      setError({title, subtext});
    }

    return (
      <>
        {(error != null) && Alert.alert(error.title, error.subtext ?? "", [
          {
            text: 'OK',
            onPress: () => {
              setError(null);
            }
          }
        ])}
        
        <WrappedComponent {...props} setLoading={setLoadingState} setError={setErrorState} />
        {isLoading && <LottieLoader/>}
      </>
    )
  };

  return HOC;
};

export default IsLoadingHOC