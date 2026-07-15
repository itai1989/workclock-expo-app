import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';

export default function _layout() {
  return (
     <Drawer screenOptions={{drawerPosition:"right",headerTransparent:true}}>
      <Drawer.Screen name='(tabs)' options={{title:"שעון נוכחות",drawerLabel:"בית"}}/>
      <Drawer.Screen name='profile' options={{title:"הפרופיל שלי"}}/>
      <Drawer.Screen name='about' options={{title:"אודות"}}/>
    </Drawer>
  )
}

const styles = StyleSheet.create({})