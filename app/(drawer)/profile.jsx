import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, View, Image, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyBG from '../../components/myBG'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function profile() {
  let [myImage, setMyImage] = useState("");
  let [myUname, setUname] = useState("");
  let [pass, setPass] = useState("");

  useEffect(() => {
    load();
  }, [])

  async function load() {
    let uname = await AsyncStorage.getItem("userName");
    let pas = await AsyncStorage.getItem("password");
    let img = await AsyncStorage.getItem("profileImage");
    
    setUname(uname || "");
    setPass(pas || "");
    if (img) {
      setMyImage(img);
    }
  }

  async function save() {
    await AsyncStorage.setItem("userName", myUname);
    await AsyncStorage.setItem("password", pass);
    if (myImage) {
      await AsyncStorage.setItem("profileImage", myImage);
    }
    Keyboard.dismiss();
  }

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('צריך הרשאה לגלריה');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setMyImage(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('צריך הרשאה למצלמה');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setMyImage(result.assets[0].uri);
    }
  }

  return (
    <MyBG>
      <KeyboardAvoidingView 
        style={{ flex: 1, width: "100%" }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: "100%" }}
        >
          {myImage ? (
            <Image source={{ uri: myImage }} style={styles.img} />
          ) : (
            <View style={styles.img} />
          )}

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <TouchableOpacity onPress={pickImage} style={styles.btn}><Text>ייבא מהגלריה</Text></TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={styles.btn}><Text>צלם</Text></TouchableOpacity>
          </View>

          <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "green", fontWeight: "bold", marginBottom: 15 }}>פרטי הכניסה</Text>
            
            <TextInput
              placeholder='שם משתמש'
              value={myUname}
              onChangeText={setUname}
              textAlign='right'
              placeholderTextColor="#888"
              style={styles.input} />
              
            <TextInput
              placeholder='סיסמה'
              onChangeText={setPass}
              value={pass}
              textAlign='right'
              secureTextEntry={true}
              placeholderTextColor="#888"
              style={styles.input} />
              
            <TouchableOpacity onPress={save} style={styles.btn}>
              <Text style={{ fontWeight: "bold" }}>שמור</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </MyBG>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50
  },
  img: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginBottom: 20
  },
  btn: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgb(101, 173, 245)",
    marginHorizontal: 10,
    marginTop: 10
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    marginVertical: 8,
    width: "85%",
    padding: 15,
    color: "black",
    fontSize: 16
  }
})