import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet, 
    View, 
    TextInput, 
    Text, 
    TouchableOpacity,    
    Alert
} from "react-native";

export var userId = "";
export var userPassword = "";
export var userName = "";
export var userEmail = "";
export var deviceAddress = "";

export default function Login() {
    const navigation = useNavigation();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    
    function login(){
        if(id.trim() == ""){
            Alert.alert("아이디", "아이디를 입력해주세요.");
        }
        else if(password.trim() == ""){
            Alert.alert("비밀번호", "비밀번호를 입력해주세요.");
        }
        else{
            axios.post("http://ceprj.gachon.ac.kr:60004/member/login",
                {
                        "userId": id,
                        "userPassword": password
                }).then(function(resp){
                    console.log(resp.data);
                    if(resp.data.status === 200) {
                        console.log("로그인 되었습니다");
                        console.log(resp.data);
                    
                        userId = resp.data.userId;
                        userPassword = resp.data.userPassword;
                        userName = resp.data.name;
                        userEmail = resp.data.email;
                       
                        if (resp.data.deviceAddress != null) {
                            deviceAddress = resp.data.deviceAddress;
                            console.log(deviceAddress);
                        }
                        console.log(userId);
                        navigation.navigate('Home');
                        
                    }
                    else{
                        Alert.alert("로그인", "아이디나 비밀번호를 확인하세요.");
                    }

                }).catch(function(err){
                    Alert.alert("login error", err);
                })
        }
    };

    const loginData = async () =>{
        try {
                let user = await AsyncStorage.getItem('login');
                console.log("login 정보:" + user);
        } catch(err){
            console.log("login data error", err);
        }
    };

    return (
        <View style={styles.container}>            

            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="아이디"
                    placeholderTextColor="#003f5c"
                    onChangeText={(id)=>setId(id)} />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="비밀번호"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password)=>setPassword(password)} />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>login()}>
                <Text style={{color: "white"}}>로그인</Text>
            </TouchableOpacity>     

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6ac4b",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        marginBottom: 40
    },
    inputView: {
        backgroundColor: "white",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center"
    },
    textInput:{
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 5
    },
    forgot_button: {
        height: 30,
        marginBottom: 30
    },
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "black"
    }
})