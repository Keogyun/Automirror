import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function BottomBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Ionicons
          name="partly-sunny-sharp"
          size={32}
          color="black"
          onPress={() => navigation.reset({ routes: [{ name: "WeatherInfo" }] })}
        />
        <Text
          style={{ color: "#555555", fontWeight: "600", marginTop: 4 }}
          onPress={() => navigation.reset({ routes: [{ name: "WeatherInfo" }] })}
        >
          날씨
        </Text>
      </View>
      <View style={styles.box}>
        <Ionicons
          name="calendar-outline"
          size={32}
          color="black"
          onPress={() =>
            navigation.reset({ routes: [{ name: "CalendarDetails" }] })
          }
        />
        <Text
          style={{ color: "#555555", fontWeight: "600", marginTop: 4 }}
          onPress={() =>
            navigation.reset({ routes: [{ name: "CalendarDetails" }] })
          }
        >
          일정
        </Text>
      </View>
      <View style={styles.box}>
        <FontAwesome5
          name="bus"
          size={30}
          color="black"
          onPress={() => navigation.navigate("BusDetails")}
        />
        <Text
          style={{ color: "#555555", fontWeight: "600", marginTop: 4 }}
          onPress={() => navigation.navigate("BusDetails")}
        >
          버스
        </Text>
      </View>
      <View style={styles.box}>
        <Ionicons
          name="newspaper-outline"
          size={32}
          color="black"
          onPress={() =>
            navigation.reset({ routes: [{ name: "NewsDetails" }] })
          }
        />
        <Text
          style={{ color: "#555555", fontWeight: "600", marginTop: 4 }}
          onPress={() =>
            navigation.reset({ routes: [{ name: "NewsDetails" }] })
          }
        >
          뉴스
        </Text>
      </View>
      <View style={styles.box}>
        <Ionicons
          name="settings"
          size={32}
          color="black"
          onPress={() => navigation.navigate("Settings")}
        />
        <Text
          style={{ color: "#555555", fontWeight: "600", marginTop: 4 }}
          onPress={() => navigation.navigate("Settings")}
        >
          설정
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
