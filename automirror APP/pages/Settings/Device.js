import axios from "axios";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { loginData } from "../Splash/Login.js";

export default function Device() {
    const [deviceID, inputDeviceId] = useState("");
    const userData = loginData();

    const sendDevice = async () => {
        axios ({
        method: 'get',
        url: 'ceprj.gachon.ac.kr:60004/',
        params: {
            device_id: deviceID
        },
        }).then((response) => {  
          console.log("deviceID sent");
          console.log(response);
          axios ({
            method: 'post',
            url: 'ceprj.gachon.ac.kr:60004/',
            params: {
              userId: userData.id
            }, 
          }).then((resp) => {
            console.log("userId sent");      
          }).catch(function (error) {
            console.log("userId error", error);
          })
        }).catch(function (error) {
          console.log('deviceId error', error);
        })
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>DEVICE</Text>
                <Ionicons
                name="home"
                style={styles.home}
                onPress={() => navigation.navigate("Home")}
                />
            </View>
            <View style={styles.body}>
                <View style={styles.busContainer}>
                    <View style={styles.searchBox}>
                        <TextInput
                        style={styles.inputBox}
                        onChangeText={(text) => inputDeviceId(text)}
                        onSubmitEditing={sendDevice}
                        placeholder="등록할 기기의 시리얼 번호를 입력해주세요."
                        returnKeyType="done"
                        />
                        <FontAwesome5
                        name="search"
                        size={28}
                        color="#555555"
                        onPress={() => {
                            getBusData();
                        }}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <BottomBar />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flex: 0.3,
      backgroundColor: "#fff3bd",
      color: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingHorizontal: 10,
    },
    body: {
      flex: 2.0,
      backgroundColor: "#fff3bd",
    },
    footer: {
      flex: 0.3,
      backgroundColor: "#fff3bd",
    },
    title: {
      fontSize: 44,
      fontWeight: "800",
      color: "#e5e5e5",
      marginTop: 40,
      marginRight: 106,
    },
    home: {
      marginTop: 44,
      fontSize: 30,
      fontWeight: "800",
      color: "#e5e5e5",
    },
  
    busContainer: {
      backgroundColor: "#eeeeee",
      borderRadius: 25,
      height: 70,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 6,
      marginTop: 10,
    },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      paddingVertical: 10,
    },
    inputBox: {
      width: 290,
      height: 30,
      backgroundColor: "#e2e2e2",
      marginRight: 10,
      fontSize: 24,
      fontWeight: "600",
    },
    busNumList: {
      backgroundColor: "#eeeeee",
      borderRadius: 25,
      height: 70,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 6,
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    busNumItem: {
      fontSize: 18,
      fontWeight: "600",
    },
    busStationContainer: {
      paddingHorizontal: 30,
      marginHorizontal: 6,
      backgroundColor: "#eeeeee",
      borderRadius: 10,
    },
    busStationList: {
      position: "relative",
      backgroundColor: "#eeeeee",
      paddingHorizontal: 40,
      paddingVertical: 14,
      marginHorizontal: 6,
      borderLeftWidth: 2,
      borderLeftColor: "red",
      borderBottomWidth: 1,
      borderBottomColor: "#e2e2e2",
  
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    busStationItem: { fontSize: 18, fontWeight: "600" },
  });