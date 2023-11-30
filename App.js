import React from "react";

import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./pages/Splash/Splash.js";
import Home from "./pages/Home/Home.js";
import Settings from "./pages/Settings/Settings.js";
import WeatherInfo from "./pages/Info/WeatherInfo.js";
import Device from "./pages/Settings/Device.js";
import Register from "./pages/Splash/Register.js";
import Login from "./pages/Splash/Login.js";
import MemberInfo from "./pages/Settings/MemberInfo.js";
import FindId from "./pages/Settings/FindId.js";
import FindPw from "./pages/Splash/FindPw.js";
import CheckInfo from "./pages/Settings/CheckInfo.js";
import ChangePw from "./pages/Splash/ChangePw.js";
import Unregister from "./pages/Settings/Unregister.js";
import BusInfo from "./pages/Info/BusInfo.js";
import Gesture from "./pages/Gesture/Gesture.js";
import WeatherGesture from "./pages/Gesture/WeatherGesture.js";
import TodoGesture from "./pages/Gesture/TodoGesture.js";
import BusGesture from "./pages/Gesture/BusGesture.js";
import NewsGesture from "./pages/Gesture/NewsGesture.js";
import WeatherGestureCapture from "./pages/Gesture/WeatherGestureCapture.js";
import TodoGestureCapture from "./pages/Gesture/TodoGestureCapture.js";
import BusGestureCapture from "./pages/Gesture/BusGestureCapture.js";
import NewGestureCapture from "./pages/Gesture/NewsGestureCapture.js";
import NewsInfo from "./pages/Info/NewsInfo.js";
import Todo from "./pages/Info/Todo.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
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
        <Stack.Screen name="Device" component={Device} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="WeatherInfo" component={WeatherInfo} />
        <Stack.Screen name="BusInfo" component={BusInfo} />
        <Stack.Screen name="Gesture" component={Gesture} />
        <Stack.Screen name="WeatherGesture" component={WeatherGesture} />
        <Stack.Screen name="TodoGesture" component={TodoGesture} />
        <Stack.Screen name="BusGesture" component={BusGesture} />
        <Stack.Screen name="NewsGesture" component={NewsGesture} />
        <Stack.Screen name="WeatherGestureCapture" component={WeatherGestureCapture} />
        <Stack.Screen name="TodoGestureCapture" component={TodoGestureCapture} />
        <Stack.Screen name="BusGestureCapture" component={BusGestureCapture} />
        <Stack.Screen name="NewsGestureCapture" component={NewGestureCapture} />
        <Stack.Screen name="NewsInfo" component={NewsInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
