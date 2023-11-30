import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, Text, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userId, userName, userEmail } from "../Splash/FindPw";


export default function ChangePw() {
    const navigation = useNavigation();
    const [pwdFirst, setPwdFirst] = useState("");
    const [pwdSecond, setPwdSecond] = useState("");
    var password = "";

    function changePw() {
        password = pwdFirst;
        if (password.trim()===""){
            Alert.alert("새로운 비밀번호","새로운 비밀번호를 입력해주세요.");
        }
        else if (pwdFirst !== pwdSecond) {
            Alert.alert("새로운 비밀번호가 일치하지 않습니다.");
            password = "";
        }
        else if (password.trim() === "") {
            Alert.alert("새로운 비밀번호", `새로운 비밀번호가 ""입니다.`);
        }
        else {
            axios.put("http://ceprj.gachon.ac.kr:60004/member/find-pw", 
               {
                    "userId":userId,
                    "userPassword": password,
                    "name":userName,
                    "email":userEmail
                }
            ).then(function(response){
                console.log(response.data);

                if(response.data.status === 200) {
                    check = false;
                    Alert.alert('비밀번호 수정',
                                "비밀번호가 수정되었습니다.",
                                [{
                                   text:'확인',
                                   onPress:()=>navigation.navigate('Splash')    
                                }]);
                }
                else{
                    Alert.alert("비밀번호 수정","비밀번호 수정에 실패했습니다.");
                }

            }).catch(function(err){
                console.log("changePw error", err);
            })
        }
    };
    
    return (
        <View style={styles.container}>

        <View style={styles.inputView}>                
            <TextInput
                style={styles.textInput}
                placeholder="새로운 비밀번호"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(pwdFirst)=>setPwdFirst(pwdFirst)}/>
        </View>

        <View style={styles.inputView}>                
            <TextInput
                style={styles.textInput}
                placeholder="새로운 비밀번호 확인"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(pwdSecond)=>setPwdSecond(pwdSecond)}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={()=>changePw()} >
            <Text style={styles.buttonText}>비밀번호 수정</Text>
        </TouchableHighlight>

    </View>

    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff3bd"
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