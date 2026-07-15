import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MyBG from '../../../components/myBG';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function history() {
  let myAnim = useRef(null);
  let [myData, setMyData] = useState([]);
  let [isRef,setIsRef] = useState(false);
  async function load() {
    let myP = await AsyncStorage.getItem("myP");
    myP = JSON.parse(myP);
    setMyData(myP||[]);   
    
    if(myAnim){
      myAnim.current?.play() 
    }
  }
  async function clearItem(entry){
    let newData = myData.filter((i)=>i.entry!=entry);
    setMyData(newData);
    let myTxtP = JSON.stringify(newData);
    await AsyncStorage.setItem("myP",myTxtP);
  }
  useEffect(() => {
    load();
    return ()=> myAnim.current?.pause();
  }, [])
  return (
    <MyBG>
      <View style={styles.screen}>
        <FlatList
          ListEmptyComponent={<LottieView ref={myAnim} style={{width:200,height:200}} autoPlay source={require("../../../assets/animations/load.json")}/>}
          showsVerticalScrollIndicator={false}
          refreshing={isRef}
          onRefresh={load}
          contentContainerStyle={{flexGrow:1,justifyContent:"center"}}
          style={{marginVertical:70}}
          data={myData}
          keyExtractor={(item) => item.entry}
          renderItem={({item})=>
            <Pressable onLongPress={()=>Alert.alert("מחיקה","האם ברצונך למחוק",[{text:"כן",onPress:()=>clearItem(item.entry)},{text:"לא"}])}>
            <View style={styles.item}>
              <Text><Text style={{fontWeight:"bold"}}>Entry: </Text>{item.entry}</Text>
              <Text><Text style={{fontWeight:"bold"}}>Out:   </Text>{item.out}</Text>
              <Text><Text style={{fontWeight:"bold"}}>Total: </Text>{item.total}</Text>
            </View>
            </Pressable>} />
      </View>
    </MyBG>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent:"center",
    flex: 1
  },
  item:{
    paddingVertical:20,
    paddingHorizontal:70,
    borderRadius:20,
    backgroundColor:"rgba(250, 250, 250, 0.5)",
    justifyContent:"center",
    marginVertical:15
  }
})