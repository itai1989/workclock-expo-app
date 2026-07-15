import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import MyBG from '../../../components/myBG'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function presence() {
  let [btnTxt, setBtnTxt] = useState("כניסה");
  let [myColor, setMyColor] = useState("green");
  let [isPressed, setIsPressed] = useState(false);
  let [myTime, setMyTime] = useState("");
  let [myPresece, setMyPresece] = useState({});
  let myAnim = useRef(new Animated.Value(1)).current;
  
  function btnIn() {
    Animated.spring(myAnim, { toValue: 0.5, useNativeDriver: true }).start();
  }
  
  async function btnOut() {
    Animated.spring(myAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    let now = new Date();
    now.setMilliseconds(0);
    let myDate = now.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    if (!isPressed) {
      setBtnTxt("יציאה");
      setMyColor("red");
      setIsPressed(true);
      setMyTime(now);
      setMyPresece({ entry: myDate });
    } else {
      setBtnTxt("כניסה");
      setMyColor("green");
      setIsPressed(false);
      let diffMilliseconds = now - myTime;

      let hours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
      let minutes = Math.floor((diffMilliseconds / (1000 * 60)) % 60);
      let seconds = Math.floor((diffMilliseconds / 1000) % 60);

      let formattedDiff =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

      const updatedPresence = { ...myPresece, out: myDate, total: formattedDiff };
      setMyPresece(updatedPresence);
      
      let myP = await AsyncStorage.getItem("myP");
      if (myP == null) {
        let myStrP = JSON.stringify([updatedPresence]);
        await AsyncStorage.setItem("myP", myStrP);
      } else {
        myP = JSON.parse(myP);
        let newMyP = [...myP, updatedPresence];
        let newStrMyP = JSON.stringify(newMyP);
        await AsyncStorage.setItem("myP", newStrMyP);
      }
      
      myP = await AsyncStorage.getItem("myP");
      console.log(myP);
    }
  }
  
  return (
    <MyBG>
      <View style={styles.screen}>
        <Pressable onPressIn={btnIn} onPressOut={btnOut}>
          <Animated.View style={[styles.btn, { backgroundColor: myColor, transform: [{ scale: myAnim }] }]}>
            <Text style={styles.txt}>{btnTxt}</Text>
          </Animated.View>
        </Pressable>
      </View>
    </MyBG>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 10
  },
  txt: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white"
  }
})