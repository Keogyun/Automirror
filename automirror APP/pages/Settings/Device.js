import axios from "axios";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { useState } from "react";
import { userId } from "../Splash/Login.js";

export default function Device() {
    const navigation = useNavigation();
    const [deviceId, setDeviceId] = useState("");
    var domain = "";

    function sendDevice(){
      if(deviceId.trim() == ""){
          Alert.alert("시리얼번호", "기기의 시리얼번호를 입력해주세요.");
      }
      else{
          axios.post("http://ceprj.gachon.ac.kr:60004/device/find-url", 
              {
                      "deviceId": deviceId
              }).then(function(resp){
                  console.log(resp.data);
                  if(resp.data.status === 200) {
                      console.log("시리얼번호 전송");
                      console.log(resp.data);
                      domain = resp.data.deviceAddress;
      
                      axios.get(`${domain}/api/saveMessage?message=${userId}`)
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("기기 등록 성공.");
                          // Alert.alert("기기등록", "기기등록 성공했습니다. 다시 로그인해주세요.");
                          Alert.alert( 
                            '기기등록', '기기등록 성공했습니다. 다시 로그인해주세요.', [ 
                                  {text: '확인', onPress: () => navigation.navigate("Splash")
                                }, 
                            ]
                          );
                      
                        } else {
                          console.error("기기등록 중 오류 발생:", response.status);
                          Alert.alert("기기등록", "기기등록 실패했습니다.");
                        }
                        navigation.navigate('Settings');
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                      });
                      navigation.navigate('Settings');
                    }
                  else{
                      Alert.alert("시리얼번호", "시리얼번호를 확인하세요.");
                  }

              }).catch(function(err){
                  Alert.alert("deviceId error", err.message);
              })
      }
  };

    return (
      <View style={styles.container}>            

      <View style={styles.inputView}>
          <TextInput
              style={styles.textInput}
              placeholder="시리얼 번호"
              placeholderTextColor="#003f5c"
              onChangeText={(deviceId)=>setDeviceId(deviceId)} />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={()=>sendDevice()}>
          <Text style={{color: "white"}}>기기등록</Text>
      </TouchableOpacity>     

  </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff3bd",
      alignItems: "center",
      justifyContent: "center"
  },
  image: {
      marginBottom: 40
  },
  inputView: {
      backgroundColor: "white",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center"
  },
  textInput:{
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 5
  },
  forgot_button: {
      height: 30,
      marginBottom: 30
  },
  loginBtn: {
      width: "40%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "black"
  }
})