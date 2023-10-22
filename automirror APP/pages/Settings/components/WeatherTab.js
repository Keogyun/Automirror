import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WeatherTab() {
  const [weather, setWeather] = useState([
    "오늘 날씨알려줘",
    "오늘 날씨",
    "날씨",
    "오늘 날씨 어때",
    "웨더",
    "WEATHER",
  ]);
  return (
    <View>
      {weather.map((weathers, index) => {
        return (
          <View key={index} style={styles.contextBox}>
            <Text style={styles.contentText}>{weathers}</Text>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  contextBox: {
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  contentText: {
    marginBottom: 6,
    fontSize: 18,
    color: "#666666",
    fontWeight: "700",
  },
});
