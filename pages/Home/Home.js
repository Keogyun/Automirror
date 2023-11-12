import React from "react";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "./components/BottomBar.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.appname}>AUTO MIRROR</Text>
        <Ionicons
          name="home"
          size={32}
          style={styles.home}
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      <View style={styles.body}>
        <Image
          source={require("automirror/assets/images/mirror.png")}
        />
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
  },
  header: {
    flex: 0.2,
    backgroundColor: "#fff3bd",
    color: "black",
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  body: {
    flex: 2.0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff3bd",
  },
  footer: {
    flex: 0.3,
    backgroundColor: "#fff3bd",
  },
  home: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
  appname: {
    fontSize: 35,
    fontWeight: "800",
    color: "black",
    marginRight: 54
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
});
