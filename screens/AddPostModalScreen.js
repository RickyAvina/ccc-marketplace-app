import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';


const AddPostModalScreen = ({route, navigation}) => {
  const [image, setImage] = React.useState(route.params)

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white">AddPostModalScreen</Text>
      {image && <Image source = {{ uri: image }} style={{ width: 200, height: 200}} /> }
    </View>
  )
}

export default AddPostModalScreen