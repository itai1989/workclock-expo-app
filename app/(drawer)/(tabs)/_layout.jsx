import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function _layout() {
  return (
     <Tabs screenOptions={{headerShown:false,
      tabBarStyle:{position:"absolute",backgroundColor:"transparent",borderTopWidth:0,elevation:0},
     }}>
     <Tabs.Screen name='presence' options={{title:"נוכחות",tabBarIcon:({color,size})=>(<FontAwesome5 name="user-clock" size={size} color={color} />)}}/>
      <Tabs.Screen name='history' options={{title:"היסטוריה",tabBarIcon:({color,size})=>(<FontAwesome5 name="history" size={size} color={color} />)}}/>
     </Tabs>
  )
}

const styles = StyleSheet.create({})