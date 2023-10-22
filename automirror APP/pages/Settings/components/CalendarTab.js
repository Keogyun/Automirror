import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CalendarTab() {
  const [calendar, setCalendar] = useState([
    "오늘 일정 알려줘",
    "오늘 할 일",
    "스케줄",
    "일정",
    "할 일",
    "플랜",
    "스케쥴",
    "나 오늘 뭐해",
    "오늘 할 일 알려줘",
  ]);
  return (
    <View>
      {calendar.map((calendars, index) => {
        return (
          <View key={index} style={styles.contextBox}>
            <Text style={styles.contentText}>{calendars}</Text>
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
