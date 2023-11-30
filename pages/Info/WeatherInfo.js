import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import BottomBar from "../Home/components/BottomBar.js";
import * as Location from "expo-location";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { userId } from "../Splash/Login.js";


/*const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts", 
  Snow: "snowflake",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lighting",
};*/

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
        
        if (city != "Loading...") {
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
         } 
        } catch (error) {
        console.log("weather error", error);
      }
  };

  useEffect(() => {
    setLocation();
  }, []);

  const reloadWeather = () => {
    setLocation();
  };

  const getDateInfo = (dt, timezone) => {
    const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utc_milliseconds = utc_seconds * 1000;
    const local_date = new Date(utc_milliseconds).toUTCString();
    return local_date;
  };

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
              onPress={() => reloadWeather()}
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
    backgroundColor: '#f6ac4b',
  },
  header: {
    flex: 0.2,
    backgroundColor: "#f6ac4b",
    color: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
  },
  body: {
    flex: 2.0,
    backgroundColor: "#f6ac4b",
    width: SCREEN_WIDTH,
    marginTop: 60,
  },
  footer: {
    flex: 0.3,
    backgroundColor: "#f6ac4b",
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
