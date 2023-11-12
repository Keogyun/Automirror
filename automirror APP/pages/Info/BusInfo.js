import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import BottomBar from "../Home/components/BottomBar.js";
import axios from "axios";
import { userId } from "../Splash/Login.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function BusInfo() {
    const navigation = useNavigation();
  const [inputBus, setInputBus] = useState("");
  const [numOfBus, setNumOfBus] = useState([]);
  const [busStations, setBusStations] = useState([]);
  const [lineNumber, setLineNumber] = useState("");
  const [routeId, setRouteId] = useState("");
  const [predictTime, setPredictTime] = useState("");
  const [stName, setStName] = useState("");
  const [busNum, setBusNum] = useState("");

  const getBusListAPI = async () => {
    if(inputBus.trim() == ""){
        Alert.alert("버스번호", "버스번호를 입력해주세요.");
    }
    else{
         axios.post("http://ceprj.gachon.ac.kr:60004/bus/getBus",
         {
          "busNum": inputBus
         } 
            ).then(function(res) {
                console.log("버스 조회");
                console.log(res.data);
                const busNum = res.data.busRouteList[0].routeName;
                const busStation = res.data.busRouteList[0].routeId;
                setNumOfBus(res.data.busRouteList);
                setRouteId(busStation.toString());
                setLineNumber(inputBus.toString());
            }).catch(function(err){
                Alert.alert("busInput error", err.message);
            })
    }
    /*const res = await axios.get(
      `http://apis.data.go.kr/641000/busrouteservice/getBusRouteList?serviceKey=${API_KEY}&keyword=${inputBus}`
    );
    const result = converter.xml2json(res);
    const busNum = result.data.busList[0].routeName;
    const busStation = result.data.busList[0].routeId;
    setNumOfBus(result.data.busList);
    setRouteId(busStation.toString());
    setLineNumber(inputBus.toString());*/
  };

  const getStationListAPI = async () => {
     axios.post("http://ceprj.gachon.ac.kr:60004/bus/getStation",
            {
              "busId": routeId
            } 
            ).then(function(res) {
                console.log("정류장 조회");
                console.log(res.data);
                console.log("================");
                // console.log(res.data.busStationList);
                // console.log(res.data.busList[0].routeName);
                // console.log(res.data.busList[0].routeId);
                // console.log("================");
                setBusStations(res.data.busRouteStationList);
            }).catch(function(err){
                Alert.alert("busStation error", err.message);
        })
    /*const res = await axios.get(`http://apis.data.go.kr/641000/busrouteservice/getBusRouteInfoItem?serviceKey=${API_KEY}&keyword=${routeId}`);
    console.log("================");
    console.log(res.data.busStationList);
    // console.log(res.data.busList[0].routeName);
    // console.log(res.data.busList[0].routeId);
    console.log("================");
    setBusStations(res.data.busStationList);*/
  };

  const createBusInfo = async (stationName, stationId, staOrder) => {
    axios.post("http://ceprj.gachon.ac.kr:60004/bus/create",
            {
              "userId": userId,
              "stationId": stationId.toString(),
              "stationName": stationName,
              "stationOrder": staOrder.toString(),
              "routeId": routeId,
              "routeName": inputBus
            } 
            ).then(function(resp) {
              if(resp.data.status === 200) {
                console.log("버스 정보 저장");
                console.log(resp.data);
              }
              else{
                Alert.alert("버스 정보", "버스 정보 저장에 실패했습니다.");
              }
            }).catch(function(err){
                Alert.alert("createBus error", err.message);
        })
  };

  const getBusInfo = async () => {
    axios.post("http://ceprj.gachon.ac.kr:60004/bus/getArrival",
            {
              "userId": userId,
            } 
            ).then(function(resp) {
              if(resp.data.status === 200) {
                console.log("버스 정보 불러오기");
                console.log(resp.data);
                if (resp.data.predictTime.length === 0) {
                  setPredictTime("버스 도착 정보가 없습니다.");
                  
                }
                else {
                  setPredictTime(`${resp.data.predictTime}분 후 도착`);
                }
                setStName(resp.data.stationName);
                setBusNum(resp.data.routeName);
                Alert.alert("버스 정보", "버스 정보 불러오기 성공했습니다.");
              }
              else{
                Alert.alert("버스 정보", "버스 정보 불러오기 실패했거나 저장된 정보가 없습니다.");
              }
            }).catch(function(err){
                Alert.alert("getBusInfo error", err.message);
        })
  };

  const getBusData = () => {
    getBusListAPI();
    getStationListAPI();
  };

  useEffect(() => {
    getBusInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BUS</Text>
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
              onChangeText={(text) => setInputBus(text)}
              onSubmitEditing={getBusData}
              placeholder="버스 번호를 검색해주세요."
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
        <ScrollView>
          {numOfBus.map((value, index) => {
            return (
              <View key={index} style={styles.busNumList}>
                <Text
                  style={{ ...styles.busNumItem, color: "red" }}
                  onPress={() => getStationListAPI(value.routeId)}
                >
                  <FontAwesome5 name="bus" size={20} color="red" />
                  {value.routeName}
                </Text>
                <Text
                  style={styles.busNumItem}
                  onPress={() => getStationListAPI(value.routeId)}
                >
                  {value.regionName}
                </Text>
                <Text
                  style={styles.busNumItem}
                  onPress={() => getStationListAPI(value.routeId)}
                >
                  {value.routeTypeName}
                </Text>
              </View>
            );
          })}
          <ScrollView style={{ marginTop: 10, marginBottom: 160 }}>
            <View style={styles.busStationContainer}>
              {busStations && busStations.map((busStation, index) => {
                return (
                  <View key={index} style={styles.busStationList}>
                    <View>
                      <Text
                        style={styles.busStationItem}
                        onPress={() => {
                          createBusInfo(
                            busStation.stationName,
                            busStation.stationId,
                            busStation.stationSeq
                          );
                          Alert.alert(
                            `${busStation.stationName}\n선택이 완료되었습니다.`,
                            "",
                            [
                              {
                                text: "확인",
                              },
                            ]
                          );
                          navigation.reset({ routes: [{ name: "Home" }] });
                        }}
                      >
                        {busStation.stationName}
                      </Text>
                    </View>
                    <Feather
                      style={{
                        position: "absolute",
                        left: -10,
                        backgroundColor: "#eeeeee",
                        color: "red",
                      }}
                      name="arrow-down-circle"
                      size={18}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </ScrollView>
        {busNum && 
          <View style={{ ...styles.bus, marginLeft: 35, width: "80%" }}>
            <View>
              <View>
                <Text
                  style={styles.bustitle}
                >
                  <Ionicons name="bus-sharp" size={20} color="#464646" />
                  즐겨찾는 버스
                </Text>
              </View>
              <View style={styles.busbody}>
                <Text style={styles.station}>{stName}</Text>
              </View>
              <View style={styles.busfooter}>
                <Text style={styles.info}>
                  <Ionicons name="bus-sharp" size={20} color="red" />
                  {busNum}
                </Text>
                <Text
                  style={{
                    ...styles.info,
                    fontSize:
                      predictTime === "버스 도착 정보가 없습니다." ? 14 : 16,
                  }}
                >
                  {predictTime}
                </Text>
            </View>
          </View>
      
        </View>}
      </View>
      <View style={styles.footer}>
        <BottomBar />
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
      color: "black",
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
      color: "black",
      marginTop: 20,
      marginRight: 106,
    },
    home: {
      marginTop: 30,
      fontSize: 30,
      fontWeight: "800",
      color: "black",
    },
    bustitle: {
      color: "black",
      fontSize: 20,
      fontWeight: "800",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    busbody: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "left",
      marginTop: 13,
    },
    busfooter: {
      paddingHorizontal: 10,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "left",
      marginTop: 6,
    },
    bus: {
      width: "50%",
      backgroundColor: "#eeeeee",
      borderRadius: 25,
      height: 120,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      marginBottom: 30,
      justifyContent: "center",
    },
    station: { 
      color: "#555555", 
      fontSize: 16, fontWeight: "800",
      marginTop: 2 
    },
    info: { color: "#555555", 
      fontSize: 20, 
      fontWeight: "800", 
      marginTop: 1 
    },
    busContainer: {
      backgroundColor: "#eeeeee",
      borderRadius: 25,
      height: 70,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 6,
      marginTop: 20,
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
      // justifyContent: "space-between",
      // alignItems: "center",
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
  