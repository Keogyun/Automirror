import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Tab({ activeTab, setActiveTab }) {
  return (
    <View>
      <View style={styles(activeTab).categoryText11}>
        <Text
          style={styles(activeTab).categoryText1}
          isActive={activeTab === "C"}
          onPress={() => setActiveTab("C")}
        >
          일정
        </Text>
      </View>
      <View style={styles(activeTab).categoryText22}>
        <Text
          style={styles(activeTab).categoryText2}
          isActive={activeTab === "W"}
          onPress={() => setActiveTab("W")}
        >
          날씨
        </Text>
      </View>
      <View style={styles(activeTab).categoryText33}>
        <Text
          style={styles(activeTab).categoryText3}
          isActive={activeTab === "B"}
          onPress={() => setActiveTab("B")}
        >
          버스
        </Text>
      </View>
      <View style={styles(activeTab).categoryText44}>
        <Text
          style={styles(activeTab).categoryText4}
          isActive={activeTab === "N"}
          onPress={() => setActiveTab("N")}
        >
          뉴스
        </Text>
      </View>
    </View>
  );
}

const styles = (activeTab) =>
  StyleSheet.create({
    categoryText1: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      paddingTop: 15,
      fontSize: 18,
      color: "#666666",
      fontWeight: "700",
    },
    categoryText11: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      width: 50,
      borderWidth: activeTab === "C" ? 1 : null,
      borderColor: activeTab === "C" ? "#e2e2e2" : null,
      borderRadius: activeTab === "C" ? "50" : null,
      backgroundColor: activeTab === "C" ? "#e2e2e2" : null,
    },
    categoryText2: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      paddingTop: 15,
      fontSize: 18,
      color: "#666666",
      fontWeight: "700",
    },
    categoryText22: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      width: 50,
      borderWidth: activeTab === "W" ? 1 : null,
      borderColor: activeTab === "W" ? "#e2e2e2" : null,
      borderRadius: activeTab === "W" ? "50" : null,
      backgroundColor: activeTab === "W" ? "#e2e2e2" : null,
    },
    categoryText3: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      paddingTop: 15,
      fontSize: 18,
      color: "#666666",
      fontWeight: "700",
    },
    categoryText33: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      width: 50,
      borderWidth: activeTab === "B" ? 1 : null,
      borderColor: activeTab === "B" ? "#e2e2e2" : null,
      borderRadius: activeTab === "B" ? "50" : null,
      backgroundColor: activeTab === "B" ? "#e2e2e2" : null,
    },
    categoryText4: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      paddingTop: 15,
      fontSize: 18,
      color: "#666666",
      fontWeight: "700",
    },
    categoryText44: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      width: 50,
      borderWidth: activeTab === "N" ? 1 : null,
      borderColor: activeTab === "N" ? "#e2e2e2" : null,
      borderRadius: activeTab === "N" ? "50" : null,
      backgroundColor: activeTab === "N" ? "#e2e2e2" : null,
    },
  });
