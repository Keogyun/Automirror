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
import { BASE_IP, getAppId } from "../../service.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function BusDetails() {
  const navigation = useNavigation();
  const [appId, setAppId] = useState("");
  const [inputBus, setInputBus] = useState("");
  const [numOfBus, setNumOfBus] = useState([]);
  const [busStations, setBusStations] = useState([]);

  useEffect(() => {
    getAppId(setAppId);
  }, []);

  const [lineNumber, setLineNumber] = useState("");
  const [routeId, setRouteId] = useState("");

  const getBusListAPI = async () => {
    const res = await axios.get(
      `${BASE_IP}/bus/busList?lineNumber=${inputBus}`
    );
    const busNum = res.data.busList[0].routeName;
    const busStation = res.data.busList[0].routeId;
    setNumOfBus(res.data.busList);
    setRouteId(busStation.toString());
    setLineNumber(inputBus.toString());
  };

  const getStationListAPI = async (routeId) => {
    const res = await axios.get(`${BASE_IP}/bus/busStation?routeId=${routeId}`);
    console.log("================");
    console.log(res.data.busStationList);
    // console.log(res.data.busList[0].routeName);
    // console.log(res.data.busList[0].routeId);
    console.log("================");
    setBusStations(res.data.busStationList);
  };

  const createBusInfo = async (stationName, stationId, staOrder) => {
    const res = await axios.post(`${BASE_IP}/bus/updateBus`, {
      appId,
      lineNumber: lineNumber.toString(),
      stationName: stationName.toString(),
      stationId: stationId.toString(),
      routeId: routeId.toString(),
      staOrder: staOrder.toString(),
    });
  };

  const getBusData = () => {
    getBusListAPI();
    getStationListAPI();
  };

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
        <View>
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
              {busStations.map((busStation, index) => {
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
