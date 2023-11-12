import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  Alert
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function BusGestureCapture() {
    const navigation = useNavigation();

    const busCaptureOk = () => {
        axios.get("http://automirror00001.duckdns.org:8080/api/gesture?message=bus-capture-ok")
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("버스 제스처 촬영 확인");
                          Alert.alert("버스 제스처 촬영 확인", "버스 제스처 촬영 사진 확인");
                        } else {
                          console.error("버스 제스처 촬영 확인 오류:", response.status);
                          Alert.alert("버스 제스처 촬영 확인", "버스 제스처 촬영 확인 실패");
                        }
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                        navigation.navigate('BusGesture');
                      });
    }

    const busCaptureNo = () => {
        axios.get("http://automirror00001.duckdns.org:8080/api/gesture?message=bus-capture-no")
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("버스 제스처 촬영 사진 반려");
                          Alert.alert("버스 제스처 촬영", "버스 제스처 촬영 사진 반려");
                        } else {
                          console.error("버스 제스처 촬영 반려 오류:", response.status);
                          Alert.alert("버스 제스처 촬영 반려", "버스 제스처 촬영 사진 반려 실패");
                        }
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                        navigation.navigate('BusGesture');
                      });
    }

    return (
      <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>GESTURE</Text>
                <Ionicons
                name="home"
                style={styles.home}
                onPress={() => quitGesture()}
                />
            </View>
            <View style={styles.body}>
              <View stsyle={styles.top}>
                <Text style={styles.main}>버스 제스처 사진</Text>
                <Ionicons
                  name="camera-outline"
                  justifyContent="center"
                  alignItems="center"
                  size={150}
                  color="black"
                  marginLeft={60}
                  marginBottom={20}
                />
                <View style={styles.top}>
                  <TouchableOpacity onPress={()=> busCaptureOk()
                  }>
                    <Text style={styles.text}>버스 제스처 사진 설정</Text>      
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> busCaptureNo()}> 
                      <Text style={styles.text}>날씨 제스처 사진 반려</Text>      
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> navigation.navigate("BusGesture")}> 
                      <Text style={styles.text}>돌아가기</Text>      
                  </TouchableOpacity>
                </View>
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
      backgroundColor: '#fff3bd',
    },
    header: {
      flex: 0.2,
      backgroundColor: "#fff3bd",
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
      backgroundColor: "#fff3bd",
      width: SCREEN_WIDTH,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40
    },
    footer: {
      flex: 0.3,
      backgroundColor: "#fff3bd",
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
      backgroundColor: "#fff3bd",
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
    top: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      fontSize: 45,
      marginBottom: 0,
      fontWeight: '600',
      marginTop: -100
    },
    text: {
      fontSize: 30,
      marginTop: 20,
      fontWeight: '600',
    }
  });
  