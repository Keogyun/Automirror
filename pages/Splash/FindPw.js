import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, Text, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export var userId;
export var userName;
export var userEmail;

export default function FindPw() {
    const navigation = useNavigation();
    const [id,setId]= useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");

    function checkInfo() {
        if (id.trim()===""){
            Alert.alert("아이디","아이디를 입력해주세요.");
        }
        else if (name.trim()===""){
            Alert.alert("이름","이름을 입력해주세요.");
        }
        else if (email.trim()===""){
            Alert.alert("이메일","이메일을 입력해주세요.");
        }
        else {
            userId = id;
            userName = name;
            userEmail = email;
            axios.post("http://ceprj.gachon.ac.kr:60004/member/find-pw", 
               {
                    "userId": id,
                    "name":name,
                    "email":email
                }
            ).then(function(resp){
                console.log(resp.data);

                if(resp.data.status === 200) {
                    Alert.alert('비밀번호 찾기',
                                "비밀번호 수정 화면으로 이동합니다.",
                                [{
                                   text:'확인',   
                                   onPress:()=>navigation.navigate('ChangePw')
                                }]);
                }
                else{
                    Alert.alert("비밀번호 찾기","비밀번호 찾기에 실패했습니다.");
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
                placeholder="이름"
                underlineColorAndroid="transparent"
                onChangeText={(name)=>setName(name)}/>
        </View>

             
        <View style={styles.inputView}>                
            <TextInput
                style={styles.textInput}
                placeholder="이메일"
                underlineColorAndroid="transparent"
                onChangeText={(email)=>setEmail(email)}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={()=>checkInfo()} >
            <Text style={styles.buttonText}>비밀번호 찾기</Text>
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

