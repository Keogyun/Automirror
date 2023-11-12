import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import BottomBar from "../Home/components/BottomBar.js";

import axios from "axios";
import { BASE_IP, getAppId } from "../../service.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = `bcc497cb0261e3c5677b538f5ae23d24`;

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snowflake",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lighting",
};

export default function WeatherDetails() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(0);
  const navigation = useNavigation();
  const [appId, setAppId] = useState("");

  const convertUTCToTime = (weatherData) => {
    const data = weatherData;
    data.map((value) => {
      const convertData = value;
      convertData.dt = new Date(value.dt * 1000);
      return convertData;
    });
    return data;
  };

  const date = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const weatherAPI = async () => {
    const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await JSON.parse(res.data.weatherInfo);
    const current = parseFloat(json.current.temp).toFixed(1);
    setCurrentTemp(current);
    const convertData = convertUTCToTime(json.daily);

    setDays(convertData);
    setCity(res.data.city);
  };

  const setLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      createWeatherAPI(latitude, longitude, location[0].city);
    }
    weatherAPI();
  };

  const createWeatherAPI = async (latitude, longitude, city) => {
    const res = await axios.post(`${BASE_IP}/weather/createWeather`, {
      appId: appId,
      latitude,
      longitude,
      city,
    });
  };

  const reloadWeather = () => {
    setDays([]);
    setLocation();
  };
  
  useEffect(() => {
    getAppId(setAppId);
    weatherAPI();
  }, []);

  useEffect(() => {
    weatherAPI();
  }, [appId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WEATHER</Text>
        <Ionicons
              name="reload-circle-outline"
              size={16}
              color="#555555"
              onPress={() => reloadWeather()}
        />
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.weather}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          ></View>
          {days?.length === 0 && appId !== ""
            ? null
            : days?.map((day, index) => (
                <View key={index}>
                  <Text style={styles.today}>
                    {`${day.dt.getMonth() + 1}월 ${day.dt.getDate()}일 ${
                      date[day.dt.getDay()]
                    }`}
                  </Text>
                  <View>
                    <View style={styles.flexbox1}>
                      <Fontisto
                        name={icons[day.weather[0].main]}
                        size="50"
                        color="#555555"
                      />
                      <View>
                        <Text style={styles.city}>{city}</Text>
                        <Text style={styles.temp}>
                          {parseFloat(day.temp.day).toFixed(1)}º
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.feels_like}>{`  체감온도`}</Text>
                        <Text style={{ ...styles.feels_like, marginTop: 10 }}>
                          {`아침: ${day.feels_like.day}º
저녁: ${day.feels_like.night}º`}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.uviBox}>
                          <Text style={styles.uvi}>자외선</Text>
                          <Ionicons
                            name="sunny-sharp"
                            size={24}
                            color="#555555"
                          />
                          <Text style={styles.uvi}>
                            {parseFloat(day.uvi).toFixed(1)}
                          </Text>
                        </View>
                        <View style={styles.humidityBox}>
                          <Text style={styles.uvi}>습도</Text>
                          <Ionicons
                            name="water-sharp"
                            size={24}
                            color="#555555"
                          />
                          <Text style={styles.humidity}>{day.humidity}%</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.flexbox2}>
                    <Text style={styles.description}>
                      {day.weather[0].description}
                    </Text>
                  </View>
                </View>
              ))}
        </ScrollView>
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
    flex: 0.3,
    backgroundColor: "#fff3bd",
    color: "black",
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
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
    marginTop: 40,
    marginRight: 52,
  },
  home: {
    marginTop: 44,
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
  flexbox1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  flexbox2: {
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#e2e2e2",
  },
  weather: {
    backgroundColor: "#eeeeee",
    borderRadius: 25,
    height: 1000,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 10,
    marginHorizontal: 6,
  },
  today: { color: "#555555", fontSize: 20, fontWeight: "600", marginTop: 6 },
  city: { color: "#555555", fontSize: 20, fontWeight: "600", marginTop: -1 },
  temp: { color: "#555555", fontSize: 30, fontWeight: "600", marginTop: 4 },
  feels_like: {
    justifyContent: "center",
    alignItems: "center",
    color: "#555555",
    fontSize: 16,
    fontWeight: "600",
  },
  uvi: { color: "#555555", fontSize: 16, fontWeight: "600" },
  humidity: { color: "#555555", fontSize: 16, fontWeight: "600" },

  uviBox: { justifyContent: "center", alignItems: "center", marginRight: 10 },
  humidityBox: {},

  description: {
    color: "#555555",
    fontSize: 16,
    fontWeight: "600",
  },
});
