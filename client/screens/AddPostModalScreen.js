import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Foundation } from '@expo/vector-icons';
// import { RNS3 } from 'react-native-aws3';
import useAuth, { AWSURL, sendXmlHttpRequest } from '../hooks/useAuth';
import { UploadFile } from '../components/S3Util'
import IsLoadingHOC from '../components/IsLoadingHOC';


const env = require("../env.json");

const AddPostModalScreen = ({ route, navigation, setLoading, setError }) => {
  // const [image, setImage] = React.useState(route.params.uri)
  const { uri, fileName, type } = route.params;
  const [inspiration, setInspiration] = React.useState("")
  const [meaning, setMeaning] = React.useState("")
  const [location, setLocation] = React.useState("")
  const { user } = useAuth();

  const prepareProps = () => {
    const clean = (str) => {
      return str.replace(/^\s+|\s+$/g, '');
    }

    return {
      inspiration: clean(inspiration),
      meaning: clean(meaning),
      location: clean(location),
      imageUri: uri,
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [])

  const createPost = async (uri, user_id) => {
    // delegate error handling to higher level

    const fileKey = await UploadFile(uri, user_id); // upload file to S3, get key (user_id/fileName),
    const post = {
      user_id,
      fileKey,
      questions: {
        inspiration,
        meaning,
        location
      }
    }

    sendXmlHttpRequest("/create-post", "POST", JSON.stringify(post)).then(postId => {
      // successfully created post!
      console.log("Succesfully created post with id: " + postId);
      postId.id = postId.id;
      return post;
    });
  }
  
  return (
    <View className="flex-1 items-center justify-start bg-[#14141A]">
      <View className="flex-row w-full justify-between items-center p-4">
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Foundation name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg ml-[20px]">New Post</Text>
        {/* Next Button */}
        <TouchableOpacity onPress={async () => {
          setLoading(true);
          try {
            const post = await createPost(uri, user.id); // upload file to S3, get location
            navigation.navigate("DesignsScreen", post); // pass in postID as props
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
          // navigation.navigate("Home", prepareProps())
        }}>
          <Text className="text-[#00A1B7] font-semibold text-lg">Next</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: uri }}
        className="w-full h-80"
      />

      {/* Questions */}
      <View className="flex-1 w-full h-full items-start px-5 pt-3 space-y-3" >
        <View className="flex-row justify-center items-center">
          <Image source={require('../assets/icons/lightbulb.png')} className="w-[40px] h-[40px] mr-2" />
          <TextInput
            className="flex-1 text-white text-lg"
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="What or who inpired you?"
            placeholderTextColor="gray"
            multiline={true}
            maxHeight={60}
            numberOfLines={3}
            value={inspiration}
            onChangeText={setInspiration}
          />
        </View>

        <View className="flex-row justify-center items-center">
          <Image source={require('../assets/icons/pattern.png')} className="w-[40px] h-[40px] mr-2" />
          <TextInput
            className="flex-1 text-white text-lg"
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="What does this pattern mean to you?"
            placeholderTextColor="gray"
            value={meaning}
            onChangeText={setMeaning}
          />
        </View>

        <View className="flex-row justify-center items-center">
          <Image source={require('../assets/icons/location.png')} className="w-[40px] h-[40px] mr-2" />
          <TextInput
            className="flex-1 text-white text-lg"
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Where did you design this?"
            placeholderTextColor="gray"
            value={location}
            onChangeText={setLocation}
          />
        </View>
      </View>
    </View>
  )
}

// 247 247 245

export default IsLoadingHOC(AddPostModalScreen);