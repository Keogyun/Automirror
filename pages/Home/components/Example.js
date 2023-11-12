import { StyleSheet, Text, View } from "react-native";

export default function Example() {
  return (
    <View style={styles.ex}>
      <Text style={styles.exText}>{`"FRIDAY, 오늘 날씨 알려줘"`}</Text>
      <Text
        style={{ ...styles.exText, fontSize: 18, fontWeight: "600" }}
      >{`와 같이 말씀해보세요.`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ex: {
    backgroundColor: "#eeeeee",
    borderRadius: 25,
    height: 70,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 6,
  },
  exText: {
    color: "#A3C1C6",
    fontWeight: "800",
    fontSize: 24,
  },
});
