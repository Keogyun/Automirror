import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import BottomBar from "../Home/components/BottomBar.js";

import { deviceAddress } from "../Splash/Login.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Settings() {
  const navigation = useNavigation();


  const gesturePage = () => {
    axios.get(`${deviceAddress}/api/gesture?message=config-start`)
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("제스처 설정");
                          // Alert.alert("제스처 설정", "제스처 설정 페이지로 이동");
                          navigation.navigate('Gesture');
                        } else {
                          console.error("제스처 설정 페이지 오류:", response.status);
                          Alert.alert("제스처 설정", "제스처 설정 페이지 불러오기 실패.");
                        }
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                        navigation.navigate('Settings');
                      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SETTINGS</Text>
        <Ionicons
          name="home"
          style={styles.home}
          onPress={() => navigation.navigate("Home")}
        />
      </View>

  
      <View style={styles.body}>
      <View style={styles.flexbox}>
          <Text style={styles.function}>{`기기 등록`}</Text>
          <AntDesign
            name="rightcircleo"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Device")
            }
          />
        </View>
        <View style={styles.flexbox}>
          <Text style={styles.function}>{`제스처 설정`}</Text>
          <AntDesign
            name="rightcircleo"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("Gesture");
              // gesturePage();
            }}
          />
        </View>
        <View style={{ ...styles.flexbox, marginTop: 6 }}>
          <Text style={styles.function}>{`회원정보 수정`}</Text>
          <AntDesign
            name="rightcircleo"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("CheckInfo");
            }}
          />
        </View>
        <View style={{ ...styles.flexbox, marginTop: 6 }}>
          <Text style={styles.function}>{`로그아웃`}</Text>
          <AntDesign
            name="rightcircleo"
            size={24}
            color="black"
            onPress={() => 
              navigation.navigate("Splash")
            }
          />
        </View>
        <View style={{ ...styles.flexbox, marginTop: 6 }}>
          <Text style={styles.function}>{`회원탈퇴`}</Text>
          <AntDesign
            name="rightcircleo"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("Unregister");
            }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <BottomBar />
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
    flex: 0.2,
    backgroundColor: "#f6ac4b",
    // color: "#A3C1C6",
    color: "white",
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
  },
  body: {
    flex: 2.0,
    backgroundColor: "#f6ac4b",
    width: SCREEN_WIDTH,
  },
  footer: {
    flex: 0.3,
    backgroundColor: "#f6ac4b",
    width: SCREEN_WIDTH,
  },
  title: {
    fontSize: 35,
    fontWeight: "800",
    // color: "#A3C1C6",
    color: "black",
    marginTop: 20,
    marginRight: 54,
  },
  home: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
  flexbox: {
    backgroundColor: "#f6ac4b",
    borderRadius: 20,
    height: 60,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  function: {
    color: "black",
    fontWeight: "800",
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  keyword: {
    flex: 0.6,
    backgroundColor: "#B9CFDF",
    borderRadius: 10,
    marginTop: 200,
    marginHorizontal: 40,
  },
  keywordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    height: 280,
  },
  category: {
    width: "24%",
    borderRightWidth: 2,
    borderColor: "#555555",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  contents: {
    width: "60%",
    justifyContent: "space-evenly",
    alignItems: "left",
    paddingHorizontal: 10,
  },
});
