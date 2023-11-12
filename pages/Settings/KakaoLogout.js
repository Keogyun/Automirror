import React from "react";
import axios from 'axios';

const REDIRECT_URI = 'http://172.30.1.89:8081/';
let accessToken = "none";

export async function KakaoLogout(token){
    setAccessToken(token);
    var answer = await requestUserInfo();
    return answer;
}

function setAccessToken(token){
    accessToken = token;
}

async function requestUserInfo(){
    const instance = axios.create();
    instance.defaults.headers.common['Authorization'] = accessToken;
    var returnValue;

    await instance.get(url, {
      }).then(function (response){
          console.log("logout :: "+response['data']);
          returnValue = response['data'];
      }).catch(function(error){
          // TODO :: set returnValue by error code
          console.log(error);
          returnValue = null;
      })
      return returnValue;
}

function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: "https://kapi.kakao.com/v1/user/logout",
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
      Kakao.Auth.setAccessToken(undefined);
    }
  }

/*const logout = async (access_token) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v1/user/logout',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      if (response.status === 200) {
        console.log('로그아웃 성공');
        setLoggedIn(false);
        setResult(null);
      } else {
        console.log('로그아웃 실패');
      }
    } catch (error) {
      console.error(error);
    }
  }
  */