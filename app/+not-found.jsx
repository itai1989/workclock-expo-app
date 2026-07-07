import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyBG from '../components/myBG';
import { useRouter } from 'expo-router';


export default function notFound() {
    let router = useRouter();
  return (
    <MyBG>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>דף זה לא קיים</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>router.back()}>
            <Text style={styles.txt}>חזור</Text>
        </TouchableOpacity>
        </View>
    </MyBG>
  )
}

const styles = StyleSheet.create({
      txt: {
    fontSize: 30,
    fontWeight: "bold"
  },
  btn: {
    backgroundColor: "#456",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:15,
    marginTop:20
  }
})