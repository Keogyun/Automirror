import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Linking, Alert, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../Home/components/BottomBar.js";
import axios from "axios";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { userId } from "../Splash/Login.js"; 

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


export default function NewsInfo() {
    const [news, setNews] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getNewsAPI();
  }, []);

  const getNewsAPI = async () => {
    axios.post("http://ceprj.gachon.ac.kr:60004/news/get",
         {
          "userId": userId
         } 
            ).then(function(res) {
                console.log("뉴스 조회");
                // console.log(res.data);
                res.data.articles.forEach(value => {
                    value.url;
                });
                setNews(res.data.articles);
                Alert.alert("뉴스 정보", "뉴스 정보 불러오기 성공했습니다.");
            }).catch(function(err){
                Alert.alert("newAPI error", err.message);
            })
    /*const res = await axios.get(`${BASE_IP}/news/getNews?category=all`);
    const json = JSON.parse(res.data.result);
    json.articles.forEach((value) => {
      value.url;
    });
    setNews(json.articles);*/
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>NEWS</Text>
            <Ionicons
            name="home"
            style={styles.home}
            onPress={() => navigation.navigate("Home")}
            />
        </View>
        <View style={styles.body}>
            <View style={styles.news}>
                <Text style={{ ...styles.newstitle, paddingHorizontal: 8 }}>
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
        justifyContent: "center",
        alignItems: "center",
      },
      header: {
        flex: 0.2,
        backgroundColor: "#fff3bd",
        color: "black",
        width: SCREEN_WIDTH,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 30,
      },
      body: {
        flex: 2.0,
        backgroundColor: "#fff3bd",
        width: SCREEN_WIDTH,
      },
      footer: {
        flex: 0.3,
        backgroundColor: "#fff3bd",
        width: SCREEN_WIDTH,
      },
      title: {
        fontSize: 35,
        fontWeight: "800",
        color: "black",
        marginTop: 20,
        marginRight: 80,
      },
      home: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: "800",
        color: "black",
      },
    news: {
      backgroundColor: "#eeeeee",
      borderRadius: 25,
      height: 550,
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginTop: 60,
      marginHorizontal: 6,
    },
    newstitle: { 
        color: "black", 
        fontSize: 20, 
        fontWeight: "800" 
    },
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
  