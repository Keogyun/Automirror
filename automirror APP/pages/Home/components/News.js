import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_IP } from "../../../service";
import { FontAwesome } from "@expo/vector-icons";

export default function News() {
  const [news, setNews] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getNewsAPI();
  }, []);

  const getNewsAPI = async () => {
    const res = await axios.get(`${BASE_IP}/news/getNews?category=all`);
    const json = JSON.parse(res.data.result);
    json.articles.forEach((value) => {
      value.url;
    });
    setNews(json.articles);
  };

  return (
    <View style={styles.news}>
      <Text style={{ ...styles.title, paddingHorizontal: 8 }}>
        <FontAwesome name="newspaper-o" size={22} color="#464646" />
        주요 뉴스 헤드라인
      </Text>
      <ScrollView style={styles.flexbox}>
        {news.map((article, index) => (
          <View key={index} style={styles.articleBox}>
            <Text
              style={styles.article}
              onPress={() => Linking.openURL(article.url)}
            >
              {article.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  news: {
    backgroundColor: "#eeeeee",
    borderRadius: 25,
    height: 240,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    marginHorizontal: 6,
  },
  title: { color: "#A3C1C6", fontSize: 20, fontWeight: "800" },
  flexbox: {
    marginTop: 8,
    marginBottom: 10,
    width: "100%",
  },
  articleBox: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#e2e2e2",
    marginBottom: 8,
  },
  article: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
    color: "#555555",
  },
});
