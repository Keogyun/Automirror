import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { deviceAddress } from "../Splash/Login.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Gesture() {
    const navigation = useNavigation();

    const weatherGesture = () => {
        axios.get(`${deviceAddress}/api/gesture?message=weather-gesture`)
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("날씨 제스처");
                          Alert.alert("날씨 제스처", "날씨 제스처 페이지로 이동");
                          navigation.navigate("WeatherGesture");
                        } else {
                          console.error("날씨 제스처 페이지 오류:", response.status);
                          Alert.alert("날씨 제스처", "날씨 제스처 페이지 불러오기 실패.");
                        }
                        navigation.navigate('WeatherGesture');
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                        navigation.navigate('Gesture');
                      });
    }

    const todoGesture = () => {
        axios.get(`${deviceAddress}/api/gesture?message=todo-gesture`)
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("일정 제스처");
                          Alert.alert("일정 제스처", "일정 제스처 페이지로 이동");
                          navigation.navigate("TodoGesture");
                        } else {
                          console.error("일정 제스처 페이지 오류:", response.status);
                          Alert.alert("일정 제스처", "일정 제스처 페이지 불러오기 실패.");
                        }
                        navigation.navigate('TodoGesture');
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                        navigation.navigate('Gesture');
                      });
    }

    const busGesture = () => {
        axios.get(`${deviceAddress}/api/gesture?message=bus-gesture`)
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("버스 제스처");
                          Alert.alert("버스 제스처", "버스 제스처 페이지로 이동");
                          navigation.navigate("BusGesture");
                        } else {
                          console.error("버스 제스처 페이지 오류:", response.status);
                          Alert.alert("버스 제스처", "버스 제스처 페이지 불러오기 실패.");
                        }
                        navigation.navigate('BusGesture');
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                        navigation.navigate('Gesture');
                      });
    }

    const newsGesture = () => {
        axios.get(`${deviceAddress}/api/gesture?message=news-gesture`)
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("뉴스 제스처");
                          Alert.alert("뉴스 제스처", "뉴스 제스처 페이지로 이동");
                          navigation.navigate("NewsGesture");
                        } else {
                          console.error("뉴스 제스처 페이지 오류:", response.status);
                          Alert.alert("뉴스 제스처", "뉴스 제스처 페이지 불러오기 실패.");
                        }
                        navigation.navigate('NewsGesture');
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                        navigation.navigate('Gesture');
                      });
    }
    
    const quitGesture = () => {
        axios.get(`${deviceAddress}/api/gesture?message=config-exit`)
                      .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                          console.log("제스처 설정 종료");
                          Alert.alert("제스처 설정", "메인 페이지로 이동");
                          navigation.navigate("Home");
                        } else {
                          console.error("제스처 설정 종료 오류:", response.status);
                          Alert.alert("제스처 설정", "제스처 설정 종류 실패");
                        }
                      })
                      .catch((error) => {
                        console.error("네트워크 오류 발생:", error);
                        navigation.navigate('Gesture');
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
            <View style={styles.flexbox}>
                <Text style={styles.function}>{`날씨 제스처`}</Text>
                <AntDesign
                    name="rightcircleo"
                    size={24}
                    color="black"
                    onPress={() =>
                      weatherGesture()
                    }
                />
            </View>
            <View style={styles.flexbox}>
                <Text style={styles.function}>{`일정 제스처`}</Text>
                <AntDesign
                    name="rightcircleo"
                    size={24}
                    color="black"
                    onPress={() => {
                      todoGesture();
                    }}
/>
            </View>
            <View style={{ ...styles.flexbox, marginTop: 6 }}>
                <Text style={styles.function}>{`버스 제스처`}</Text>
                <AntDesign
                    name="rightcircleo"
                    size={24}
                    color="black"
                    onPress={() => {
                      busGesture();
                    }}
                    />
            </View>
            <View style={{ ...styles.flexbox, marginTop: 6 }}>
                <Text style={styles.function}>{`뉴스 제스처`}</Text>
                <AntDesign
                    name="rightcircleo"
                    size={24}
                    color="black"
                    onPress={() => 
                      newsGesture()
                    }
                />
            </View>
            <View style={{ ...styles.flexbox, marginTop: 6 }}>
                <Text style={styles.function}>{`제스처 설정 종료`}</Text>
                <AntDesign
                    name="rightcircleo"
                    size={24}
                    color="black"
                    onPress={() => 
                        quitGesture()
                    }
                />
            </View>
            
        </View>
        
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
});
  