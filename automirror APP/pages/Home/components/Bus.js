import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { getAppId } from "../../../service";
import { BASE_IP } from "../../../service";

export default function Bus() {
  const [appId, setAppId] = useState("");
  const navigation = useNavigation();

  const [busStationName, setBusStationName] = useState([]);
  const [busLineNumber, setBusLineNumber] = useState("");
  const [busArrivalTime, setBusArrivalTime] = useState("");

  const getBusArrivalAPI = async () => {
    if (appId === "") {
      return;
    }
    const res = await axios.get(`${BASE_IP}/bus/busArrival?appId=${appId}`);
    const json = res.data;
    if (json.arrivalInfo.length === 0) {
      setBusArrivalTime("버스 도착 정보가 없습니다!");
      return;
    }
    setBusArrivalTime(`${json.arrivalInfo[0].predictTime1} 분 후`);
    setBusStationName(json.stationName);
    setBusLineNumber(json.lineNumber);
    console.log(json.stationName);
  };

  useEffect(() => {
    console.log("use effect");
    getAppId(setAppId);
    const busInterval = setInterval(() => {
      getBusArrivalAPI();
    }, 2000);
    return () => clearInterval(busInterval);
  }, []);

  useEffect(() => {
    getBusArrivalAPI();
  }, [appId]);

  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 6,
      }}
    >
      <View style={{ ...styles.bus, marginRight: 8, width: "49%" }}>
        <View style={styles.day}>
          <View style={styles.header}>
            <Text
              style={styles.title}
              onPress={() => navigation.navigate("BusDetails")}
            >
              <Ionicons name="bus-sharp" size={20} color="#464646" />
              즐겨찾는 버스
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.station}>{busStationName}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.info}>
              <Ionicons name="bus-sharp" size={20} color="red" />
              {busLineNumber}
            </Text>
            <Text
              style={{
                ...styles.info,
                fontSize:
                  busArrivalTime === "버스 도착 정보가 없습니다!" ? 14 : 16,
              }}
            >
              {busArrivalTime}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.bus, width: "49%" }}>
        <View style={styles.day}>
          <View style={styles.header}>
            <Text
              style={styles.title}
              onPress={() => navigation.navigate("BusDetails")}
            >
              <Ionicons name="bus-sharp" size={20} color="#464646" />
              즐겨찾는 버스
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.station}>정보과학도서관</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.info}>
              <Ionicons name="bus-sharp" size={20} color="green" />
              11-3
            </Text>
            <Text style={styles.info}>6 분 후</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bus: {
    width: "50%",
    backgroundColor: "#eeeeee",
    borderRadius: 25,
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  day: {},
  header: {},
  body: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "left",
    marginTop: 13,
  },
  footer: {
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "left",
    marginTop: 6,
  },

  title: {
    color: "#A3C1C6",
    fontSize: 20,
    fontWeight: "800",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  station: { color: "#555555", fontSize: 16, fontWeight: "800", marginTop: 2 },
  info: { color: "#555555", fontSize: 20, fontWeight: "800", marginTop: 1 },
});
