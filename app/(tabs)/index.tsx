import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
} from "react-native";


const index = () => {

  return (
    <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
<Text>My task!! check the two tabs below to switch between old component and new improved component. the old component has multiple rerender issue so might need refreshing after you go to old component tab </Text>
    </View>
  );
}



export default index;