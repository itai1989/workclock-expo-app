import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Stack } from 'expo-router'

export default function _layout() {
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <Stack screenOptions={{headerShown:false}}></Stack>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({})