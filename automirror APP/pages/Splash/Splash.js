import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_IP } from "../../service";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

export default function Splash() {
  // const [appId, setAppId] = useState("");
  // const [userId, setUserId] = useState(false);

  const navigation = useNavigation(); 

  {/*function LogInProgress(data) {

    // access code는 url에 붙어 장황하게 날아온다.

    // substringd으로 url에서 code=뒤를 substring하면 된다.




  
  const getData = async () => {
    const value = await AsyncStorage.getItem("@storage_Id");

    if (value == null) {
    } else {
      setAppId(value);
      const setHome = setTimeout(() => {
        navigation.reset({ routes: [{ name: "Home" }] });
      }, 5000);
    }
    // console.log(value);
  };

  useEffect(() => {
    getData();
  }, []);

  const sendData = async () => {
    const date = Date.now().toString();
    const res = await axios.post(`${BASE_IP}/user/addUser`, {
      macId: null,
      appId: date,
    });

    await AsyncStorage.setItem("@storage_Id", date);
  };
*/}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {`AUTO MIRROR`}
        </Text>
      </View>
      <View style={styles.body}>
        <Image
          source={require("automirror/assets/images/mirror.png")}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
            <Text style={styles.text}>로그인</Text>      
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Register")}>
            <Text style={styles.text}>회원가입</Text>      
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("FindId")}>
            <Text style={styles.text}>아이디 찾기</Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("FindPw")}>
            <Text style={styles.text}>비밀번호 찾기</Text>  
        </TouchableOpacity>
        {/*<TouchableOpacity
          onPress={() => navigation.navigate("KakaoLogin", { screen: "KakaoLogin" })}
          style={styles.NextBottom}
        >
          <Image 
          source={require("automirror/assets/images/login.png")}
          />   
  </TouchableOpacity>*/}
      </View>
      {/*{appId !== "" ? (
        <View style={styles.footer}>
          <Text style={styles.text}>
            비서를 호출하는 중입니다. 잠시만 기다려주세요...
          </Text>
          <Button title="ID가 없으신가요 ?" onPress={() => setId(false)} />
        </View>
      ) : (
        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="- 표시를 포함해서 작성해주세요."
            onSubmitEditing={() => sendData()}
          />
          <TextInput
            style={styles.input}
            placeholder="- 표시를 포함해서 작성해주세요."
            onSubmitEditing={() => sendData()}
          />
          <Button title="로그인" onPress={() => sendData()} />
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff3bd",
    width: SCREEN_WIDTH,
  },
  header: {
    flex: 0.8,
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  body: {
    flex: 1.6,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    marginBottom: 40
  },
  title: { fontSize: 36, color: "black", fontWeight: "800"},
  image: { height: 200, width: 200, marginBottom: 60},
  appName: {
    marginBottom: 40,
    fontSize: 56,
    color: "white",
    fontWeight: "700",
  },
  text: { 
    marginTop: 10, 
    color: "black", 
    fontWeight: "800", 
    fontSize: 16 },
  input: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginTop: 4,
    fontSize: 14,
  },
});
