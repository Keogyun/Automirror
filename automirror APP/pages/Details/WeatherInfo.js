import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, Alert } from "react-native";
import BottomBar from "../Home/components/BottomBar.js";
import * as Location from "expo-location";
import { MaterialCommunityIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAppId, BASE_IP } from "../../service";
import { useNavigation } from "@react-navigation/native";
import { userId } from "../Splash/Login.js";


const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snowflake",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lighting",
};

const WeatherGroup = {
  0: {
    icon: 'weather-sunny'
  },
  2: {
    icon: 'weather-lightning'
  },
  3: {
    icon: 'weather-rainy'
  },
  5: {
    icon: 'weather-pouring'
  },
  6: {
    icon: 'weather-snowy'
  },
  7: {
    icon: 'weather-fog'
  },
  8: {
    icon: 'weather-cloudy'
  }
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const API_KEY = "bcc497cb0261e3c5677b538f5ae23d24";

export default function WeatherInfo() {
  const navigation = useNavigation();
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("");
  const [ok, setOk] = useState(true);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [condition, setCondition] = useState('');
  const [weatherId, setWeatherId] = useState(0);
/*
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
        setOk(false);
    }
    Location.setGoogleApiKey('AIzaSyCs1A56E-KzeeA0JHUl_le1XTawTzGV-vc');
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    setCity(location[0].region);
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };*/
  
  /*const weatherAPI = async () => {
    const res = await axios.get(`${BASE_IP}/weather/getWeather?appId=${appId}`);

    const json = await JSON.parse(res.data.weatherInfo);
    const current = parseFloat(json.current.temp).toFixed(1);
    setCurrentTemp(current);
    const convertData = convertUTCToTime(json.daily);

    setDays(convertData);
    setCity(res.data.city);
  }; */

  const setLocation = async () => {
    try {
        //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
        //권한 얻기
        await Location.requestForegroundPermissionsAsync();
        
        //현재 위치 정보 얻기
        var locationData= await Location.getCurrentPositionAsync();
        var latitude = locationData['coords']['latitude']		// 위도
        var longitude = locationData['coords']['longitude']		// 경도
        var latitudeApi = String(latitude);
        var longitudeApi = String(longitude);
        //날씨 정보 얻기
        const API_KEY = "bcc497cb0261e3c5677b538f5ae23d24";
        var result = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        // const json = await result.json();
        var temp = result.data.main.temp.toFixed(1);
        var condition = result.data.weather[0].main;
        var id = result.data.weather[0].id;
        var weatherIconId = id === 800 ? WeatherGroup[0] : WeatherGroup[parseInt(id / 100)];
        var currentDate = getDateInfo(result.data.dt, result.data.timezone);
        console.log(currentDate);
        console.log(temp);
        console.log(condition);
        
        // 위도 경도로 지역 확인
        var response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${'AIzaSyCs1A56E-KzeeA0JHUl_le1XTawTzGV-vc'}`,
        );
        var responseJson = await response.json();
        var addressArr = responseJson.results[0].formatted_address.split(
          ' ',
        );
        console.log(addressArr);
        
        setDays(result.daily);
        setDay(currentDate);
        setCity(`${addressArr[2]} ${addressArr[3]}`);
        console.log(city);
        setCurrentTemp(temp);
        setCondition(condition);
        setWeatherId(weatherIconId);

        axios.post("http://ceprj.gachon.ac.kr:60004/weather/create", 
               {
                    "longitude": longitudeApi,
                    "latitude": latitudeApi,
                    "city": city,
                    "userId": userId
                }
            ).then(function(resp){
                console.log(resp.data);
                if(resp.data.status === 200) {
                    Alert.alert('날씨정보',
                                "날씨정보 전송 성공했습니다.",
                                [{
                                   text:'확인',   
                                }]);
                }
                else{
                    Alert.alert("날씨정보","날씨정보 전송 실패했습니다.");
                }

            }).catch(function(err){
                console.log("weatherInfo error", err);
            })
      } catch (error) {
        console.log("weather error", error);
      }
    /*
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      console.log(latitude, longitude);
      createWeatherAPI(latitude, longitude, location[0].city);
    }
    setTimeout(() => weatherAPI(), 2000);
    */
  };

  /* useEffect(() => {
    getAppId(setAppId);
    setLocation();
  }, []); */

  const reloadWeather = () => {
    setDays([]);
    setLocation();
  };

  /*const createWeatherAPI = async (latitude, longitude, city) => {
    console.log("create weather");
    const res = await axios.post(`${BASE_IP}/weather/createWeather`, {
      appId: appId,
      latitude,
      longitude,
      city,
    });
  }; */

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Id", value);
    } catch (e) {
      // saving error
    }
  };

  /*const convertUTCToTime = (weatherData) => {
    const data = weatherData;
    data.map((value) => {
      const convertData = value;
      convertData.dt = new Date(value.dt * 1000);
      return convertData;
    });
    return data;
  }; */

  const getDateInfo = (dt, timezone) => {
    const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utc_milliseconds = utc_seconds * 1000;
    const local_date = new Date(utc_milliseconds).toUTCString();
    return local_date;
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WEATHER</Text>
        <Ionicons
              name="home"
              style={styles.home}
              onPress={() => navigation.navigate("Home")}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.main}>{city}</Text>
          <MaterialCommunityIcons size={150} name={weatherId.icon}/>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.main}>{condition}</Text>
          <Text style={styles.temp}>{currentTemp}℃</Text>
          <Ionicons
              name="reload-circle-outline"
              style={styles.home}
              size={32}
              color="#555555"
              onPress={() => setLocation()}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <BottomBar />
      </View>
    </View> 
  );
 
  /*
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
        {city == "Loading..." ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text>
                  {new Date(day.dt * 1000).toString().substring(0, 10)}
              </Text>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.des}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: "tomato",
  },
  city:{
    flex: 1.2,
    justifyContent: 'center',
    alignItems:'center',
  },  
  cityName:{
    fontSize: 68,
    fontWeight: "500",
  },
  weather:{
  
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems:'center',
    
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  desc: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
}); */
  /*
  return (
    <View>
      <View style={styles.weather}> 
        {days.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ color: "#555555", fontSize: 16, fontWeight: "800" }}>
              날씨를 불러오는중...
            </Text>
          </View>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={styles.title}
              onPress={() => AsyncStorage.clear()} // 사용금지
            >
              <MaterialCommunityIcons
                name="weather-partly-cloudy"
                size={22}
                color="#464646"
              />
              {`${days[0]?.currentDate.getMonth() + 1}월 ${days[0]?.currentDate.getDate()}일 ${
                date[days[0]?.currentDate.getDay()]
              }`}{" "}
              날씨
            </Text>
            <Ionicons
              name="reload-circle-outline"
              size={16}
              color="#555555"
              onPress={() => reloadWeather()}
            />
          </View>
        )}

        {days?.length === 0 ? null : (
          <View>
            <View style={styles.container}>
              <View style={styles.flexbox1}>
                <Fontisto
                  name={icons[days[0].weather[0].main]}
                  size="50"
                  color="#555555"
                />
                <View>
                  <Text style={styles.city}>{city}</Text>
                  <Text style={styles.temp}>{currentTemp}º</Text>
                </View>
                <View>
                  <Text style={styles.feels_like}>{`  체감온도`}</Text>
                  <Text style={{ ...styles.feels_like, marginTop: 10 }}>
                    {`아침: ${days[0].feels_like.day}º
저녁: ${days[0].feels_like.night}º`}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.uviBox}>
                    <Text style={styles.uvi}>자외선</Text>
                    <Ionicons name="sunny-sharp" size={24} color="#555555" />
                    <Text style={styles.uvi}>
                      {parseFloat(days[0].uvi).toFixed(1)}
                    </Text>
                  </View>
                  <View style={styles.humidityBox}>
                    <Text style={styles.uvi}>습도</Text>
                    <Ionicons name="water-sharp" size={24} color="#555555" />
                    <Text style={styles.humidity}>{days[0].humidity}%</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.flexbox2}>
              <Text style={styles.description}>
                {days[0].weather[0].description}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  ); */
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3bd',
  },
  header: {
    flex: 0.2,
    backgroundColor: "#fff3bd",
    color: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
  },
  body: {
    flex: 2.0,
    backgroundColor: "#fff3bd",
    width: SCREEN_WIDTH,
    marginTop: 60,
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
    marginRight: 52,
  },
  home: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  main: {
    fontSize: 50,
    marginBottom:10,
    fontWeight: '600'
  },
  temp: {
    fontSize: 30
  }
});
/*
const styles = StyleSheet.create({
  container: {},
  weather: {
    backgroundColor: "#eeeeee",
    borderRadius: 25,
    height: 130,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 10,
    marginHorizontal: 6,
  },
  flexbox1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  flexbox2: { flexDirection: "row", paddingHorizontal: 4 },

  title: {
    color: "#A3C1C6",
    fontSize: 20,
    fontWeight: "900",
    alignItems: "center",
  },

  city: { color: "#555555", fontSize: 20, fontWeight: "800", marginTop: -1 },
  temp: { color: "#555555", fontSize: 30, fontWeight: "800", marginTop: 4 },
  feels_like: {
    justifyContent: "center",
    alignItems: "center",
    color: "#555555",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 1,
  },
  uvi: { color: "#555555", fontSize: 16, fontWeight: "800" },
  humidity: { color: "#555555", fontSize: 16, fontWeight: "800" },

  uviBox: { justifyContent: "center", alignItems: "center", marginRight: 10 },
  humidityBox: {},

  description: {
    color: "#555555",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 6,
  },
});
*/