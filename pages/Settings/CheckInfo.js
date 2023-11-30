import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, Text, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export var userId = "";
export var userPassword = "";
export var userName = "";
export var userEmail = "";

export default function CheckInfo() {
    const navigation = useNavigation();
    const [id,setId]= useState("");
    const [password,setPassword]=useState("");

    function checkInfo() {
        if (id.trim()===""){
            Alert.alert("아이디","아이디를 입력해주세요.");
        }
        else if (password.trim()===""){
            Alert.alert("비밀번호","비밀번호를 입력해주세요.");
        }
        else {
            axios.post("http://ceprj.gachon.ac.kr:60004/member/change-info", 
               {
                    "userId": id,
                    "userPassword": password
                }
            ).then(function(resp){
                console.log(resp.data);
                if(resp.data.status === 200) {
                    userId = resp.data.userId;
                    userPassword = resp.data.userPassword;
                    userName = resp.data.name;
                    userEmail = resp.data.email;
                    Alert.alert('회원정보',
                                "회원정보 수정 화면으로 이동합니다.",
                                [{
                                   text:'확인',   
                                   onPress:()=>navigation.navigate('MemberInfo')
                                }]);
                }
                else{
                    Alert.alert("회원정보","아이디와 비밀번호를 확인해주세요.");
                }

            }).catch(function(err){
                console.log("checkInfo error", err);
            })
        }
    };

    return (
        <View style={styles.container}>

        <View style={styles.inputView}>                
            <TextInput
                style={styles.textInput}
                placeholder="아이디"
                underlineColorAndroid="transparent"
                onChangeText={(id)=>setId(id)}/>
        </View>

        <View style={styles.inputView}>                
            <TextInput
                style={styles.textInput}
                placeholder="비밀번호"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(password)=>setPassword(password)}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={()=>checkInfo()} >
            <Text style={styles.buttonText}>확인</Text>
        </TouchableHighlight>

    </View>

     );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#f6ac4b"
    },
    logo: {
        justifyContent:"center",
        marginBottom:60
    },
    inputView:{
        borderBottomColor:"#f5fcff",
        backgroundColor:"white",
        borderRadius:30,
        borderBottomWidth:1,
        width:300,
        height:45,
        marginBottom:20,
        flexDirection:'row',
        alignItems:"center"
    },
    textInput:{
        height:45,
        marginLeft:16,
        borderBottomColor:"#fff",
        flex:1
    },
    buttonContainer:{
        height:45,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20,
        width:100,
        borderRadius:30
    },
    sendButton:{
        backgroundColor:"black"
    },
    idTextContainer:{
        height:45,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:100,
        borderRadius:30
    },
    idText:{
        marginLeft:20,
        marginBottom:20,
        width:180
    },
    buttonText:{
        color:'white'
    }
});

