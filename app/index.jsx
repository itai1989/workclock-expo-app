import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MyBG from '../components/myBG'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
  let passRef = useRef(null);
  let[userName,setUserName] = useState('');
  let[pass,setPass] = useState('');
  let[myUserName,setMyUserName] = useState('');
  let[myPass,setMyPass] = useState('');

  async function loadDetails() {
    let uname = await AsyncStorage.getItem('userName');
    let pas = await AsyncStorage.getItem('password');
    if(!uname || !pas){
      await AsyncStorage.setItem('userName',"Kinneret");
      await AsyncStorage.setItem('password',"1234");
    }
    setUserName(uname);
    setPass(pas);
  }

  useEffect(()=>{
    loadDetails();
  },[])

  function checkUser(){
      if(userName == myUserName && pass == myPass){
        console.log("kkk");
      }
      else{
        Alert.alert("שם משתמש או סיסמא שגויים")
      }
      Keyboard.dismiss();
      setMyUserName('');
      setMyPass('');
  }
  return (
    <MyBG>
      <TouchableWithoutFeedback style={{flex:1}} onPress={()=>Keyboard.dismiss()}>
        <KeyboardAvoidingView style={{flex:1,justifyContent:"center",alignItems:"center"}} behavior={Platform.OS=='ios'?'padding':'height'}>
      <View style={styles.card}> 
        <Text style={styles.txt}>כניסה</Text>
        <TextInput value={myUserName} onChangeText={setMyUserName} returnKeyType='next' onSubmitEditing={()=>passRef.current.focus()} style={styles.input} placeholder='שם משתמש' />
        <TextInput value={myPass} onChangeText={setMyPass} onSubmitEditing={checkUser} secureTextEntry ref={passRef} style={styles.input} placeholder='סיסמא' />
        <TouchableOpacity onPress={checkUser} style={styles.btn}>
          <Text style={{color:"white"}}>התחבר</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </MyBG>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 400,
    backgroundColor: "rgb(59, 159, 252)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  input: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 15,
    padding:10
  },
  txt: {
    fontSize: 30,
    fontWeight: "bold"
  },
  btn: {
    backgroundColor: "#456",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:15
  }
})