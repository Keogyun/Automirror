import React from "react";

import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Splash from "../automirror APP/pages/Splash/Splash.js";
import Home from "../automirror APP/pages/Home/Home.js";
import Settings from "../automirror APP/pages/Settings/Settings.js";
import Guide from "../automirror APP/pages/Guide/Guide.js";
import Calendar from "../automirror APP/pages/Home/components/Calendar.js";
import CalendarDetails from "../automirror APP/pages/Details/CalendarDetails.js";
import Weather from "../automirror APP/pages/Home/components/Weather.js";
import WeatherDetails from "../automirror APP/pages/Details/WeatherDetails.js";
import WeatherInfo from "../automirror APP/pages/Details/WeatherInfo.js";
import Bus from "../automirror APP/pages/Home/components/Bus.js";
import BusDetails from "../automirror APP/pages/Details/BusDetails.js";
import News from "../automirror APP/pages/Home/components/News.js";
import NewsDetails from "../automirror APP/pages/Details/NewsDetails.js";
import KakaoLogin from "./pages/Splash/KakaoLogin.js";
import Device from "./pages/Settings/Device.js";
import Register from "./pages/Splash/Register.js";
import Login from "./pages/Splash/Login.js";
import MemberInfo from "./pages/Settings/MemberInfo.js";
import FindId from "./pages/Settings/FindId.js";
import FindPw from "./pages/Splash/FindPw.js";
import CheckInfo from "./pages/Settings/CheckInfo.js";
import ChangePw from "./pages/Splash/ChangePw.js";
import Unregister from "./pages/Settings/Unregister.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="FindId" component={FindId} />
        <Stack.Screen name="FindPw" component={FindPw} />
        <Stack.Screen name="ChangePw" component={ChangePw} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="MemberInfo" component={MemberInfo} />
        <Stack.Screen name="CheckInfo" component={CheckInfo} />
        <Stack.Screen name="Unregister" component={Unregister} />
        <Stack.Screen name="Guide" component={Guide} />
        <Stack.Screen name="Device" component={Device} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="CalendarDetails" component={CalendarDetails} />
        <Stack.Screen name="WeatherInfo" component={WeatherInfo} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
        <Stack.Screen name="Bus" component={Bus} />
        <Stack.Screen name="BusDetails" component={BusDetails} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
