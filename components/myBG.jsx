import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MyBG({children}) {
  return (
    <ImageBackground
    source={{uri:"https://img.joomcdn.net/a633e87e1f1dd4fc88c0a7d17c011507de940480_original.jpeg"}}
    imageStyle={{opacity:0.3}}
    style={{flex:1}}>
        {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})