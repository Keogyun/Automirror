import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NewsTab() {
  const [news, setNews] = useState([
    "오늘 뉴스",
    "뉴스 알려줘",
    "뉴스 브리핑",
    "뉴스 헤드라인",
    "주요뉴스",
    "오늘 뉴스 소식",
    "뉴스 소식",
  ]);
  return (
    <View>
      {news.map((newses, index) => {
        return (
          <View key={index} style={styles.contextBox}>
            <Text style={styles.contentText}>{newses}</Text>
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
