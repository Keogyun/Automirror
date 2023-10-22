import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const REST_API_KEY = '62a3899c9fe62dfd7f18d070ca2e509c';
const REDIRECT_URI = 'http://172.30.1.24:8081/';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoLogin = () => {

  const navigation = useNavigation();

  function KakaoLoginWebView (data) {
    const exp = "code=";
    var condition = data.indexOf(exp);    
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      //console.log(authorize_code);
      requestToken(authorize_code);
    };
  }
 
  const requestToken = async (authorize_code) => {
    var accessToken = "none";
    axios ({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authorize_code,
      },
    }).then((response) => {
      accessToken = response.data.access_token;
      //console.log(accessToken);
      //requestUserInfo(accessToken);
      storeData(accessToken);
      console.log("login success");
    }).catch(function (error) {
      console.log('login error', error);
    })
    navigation.navigate("Home", { screen: "Home" } );
  };

  /*const Logout = async () => {
    axios ({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/user/logout',
      params: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => {
      console.log('logout success');
      setLoggedIn(false);
      setResult(null);
    }).catch(function (error) {
      console.log('logout error', error);
    })
    navigation.navigate("Splash", { screen: "Splash" } );
  }; */
  
  // function requestUserInfo(AccessToken)  {
  //   axios ({
  //     method: 'GET',
  //     url: 'https://kapi.kakao.com/v2/user/me',
  //     headers: {
  //       Authorization : `Bearer ${AccessToken}`
  //     },
  //   }).then((response) => {
  //     var user_emil = response.data.kakao_account.email;
  //     var user_range = response.data.kakao_account.age_range;
  //     var user_gender = response.data.kakao_account.gender;
  //     console.log("user_emil", user_emil);
  //     console.log("user_range", user_range);
  //     console.log("user_gender", user_gender);
  //   }).catch(function (error) {
  //     console.log('error', error);
  //   })
  //   return;
  // }

  const storeData = async (returnValue) => {
    try {
      await AsyncStorage.setItem('userAccessToken', returnValue);
    } catch (error) {
    }
  }

  return (
    <View style={Styles.container}>      
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => { KakaoLoginWebView(event.nativeEvent["url"]); }}
      />
    </View>
  )
}

export default KakaoLogin;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },    
});