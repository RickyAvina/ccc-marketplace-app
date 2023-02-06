import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'


const PostPhoto = ({item}) => {
  return (
    <View style={styles.item}>
      <View className="flex-1 w-full h-full bg-blue-500">
        <Text>Hey</Text>
      </View>
      <Text>{item.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#A1A1A1',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 120,
    width: 90
  },
  // infoContainer: {
  //   width: '100%'
  //   backgroundColor: 'red',
  // },
});

export default PostPhoto