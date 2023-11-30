import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Splash() {


  const navigation = useNavigation(); 

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6ac4b",
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
