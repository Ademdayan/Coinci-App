import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState} from 'react'
import { styles } from '../style';
import IconIo from 'react-native-vector-icons/Ionicons';

export default Loading = () => {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center',}}>
     <ActivityIndicator size="large" color="#00f" />
    </View>
  )
}
