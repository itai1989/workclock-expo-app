import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyBG from '../../components/myBG'

export default function about() {
  return (
    <MyBG>
      <View style={styles.screen}>
        <Text style={styles.header}>
          אפליקציית שעון נוכחות
        </Text>
        <Text style={styles.txt}>
          במערכת זו ניתן להחתים כניסה ויציאה{"\n"} וכן לראות את הסטוריית ההחתמות{"\n"} בנוסף ניתן לשלוט בפרטי המשתמש
        </Text>
        <View style={styles.footer}>
          <Text style={{color:"red"}}>
            נבנה על ידי איתי תורג'מן
          </Text>
          <Text style={{color:"rgb(62, 149, 235)"}} onPress={() => Linking.openURL("https://github.com/itai1989/workclock-expo-app")}>קישור לגיטהב</Text>
        </View>
      </View>
    </MyBG>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center"
  },
  header:{
     fontSize:30,
     fontWeight:"bold"
  },
  txt:{
    fontSize:20,
    textAlign:"center"
  },
  footer:{
    alignItems:"center"
  }
})
  