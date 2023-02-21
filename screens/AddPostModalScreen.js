import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Foundation } from '@expo/vector-icons';
// import { RNS3 } from 'react-native-aws3';
import useAuth from '../hooks/useAuth';
import AWS from "aws-sdk"
import fs from 'react-native-fs'
import * as mime from 'react-native-mime-types';
import { Buffer } from "buffer";


const env = require("../env.json");

const AddPostModalScreen = ({ route, navigation }) => {
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

  const s3Bucket = new AWS.S3({
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretAccessKey,
    Bucket: 'image-blobs',
    signatureVersion: 'v4'
  });

  const getMimeType = (type) => {
    switch (type) {
      case "image":
        return "image/jpeg";
      case "video":
        return "video/mp4";
      default:
        throw new Error("Unknown mime type for type " + type);
    }
  }

  const uploadFile = async () => {
    try {
      if (uri == undefined || uri == null || uri.length == 0) {
        Alert.alert('Please select image first');
        return;
      }

      const base64 = await fs.readFile(uri, 'base64');
      const contentType = mime.lookup(uri);
      const fn = fileName || Math.random().toString(36).slice(2);
      const contentDisposition = 'inline;filename=' + fn + '"';

      // console.log(Base)
      // const arrayBuffer = Base64Binary.decode(base64);
      const arrayBuffer = Buffer.from(base64, 'base64');
      
      const params = {
        Bucket: 'image-blobs/posts',
        Key: `${user.id}/${fn}`,
        Body: arrayBuffer,
        ContentDisposition: contentDisposition,
        ContentType: contentType
      }

      s3Bucket.upload(params, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Success!" + JSON.stringify(data));
        }
      });

      // const s3_obj = {
      //   uri,
      //   keyPrefix: `posts/${user.id}/`,
      //   name: fileName ?? uri.split("/").pop(),
      //   type: getMimeType(type)
      // }

      

      return;

      s3Bucket.upload()

      await RNS3.put(
        {
          // `uri` is a file system path (i.e. file://)
          uri: s3_obj.uri,
          name: s3_obj.name,
          type: s3_obj.type,  // MIME type, ie. image/jpeg
        },
        {
          keyPrefix: s3_obj.keyPrefix, //  posts/user_id/
          bucket: 'image-blobs', 
          region: 'us-east-1', 
          accessKey: env.awsAccessKey,
          secretKey: env.awsSecretAccessKey,
          successActionStatus: 201,
        },
      )
      .progress((progress) => { console.log("Progress: " + JSON.stringify(progress)) })
      .then((response) => {
        if (response.status !== 201)
          Alert.alert('Failed to upload image to S3');
        console.log("SUCECSS uploading", response.body);
        let {
          bucket,
          etag,
          key,
          location
        } = response.body.postResponse;

        console.log(bucket, etag, key, location);
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://bucket.s3.amazonaws.com/**.png"
         *   }
         * }
         */
      }).catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View className="flex-1 items-center justify-start bg-[#14141A]">
      <View className="flex-row w-full justify-between items-center p-4">
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Foundation name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg ml-[20px]">New Post</Text>
        <TouchableOpacity onPress={async () => {
          await uploadFile();
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

export default AddPostModalScreen