import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, TouchableHighlight, Text, TextInput, Alert } from "react-native";
import { userId, userPassword, userName, userEmail } from "../Settings/CheckInfo";
import { useNavigation } from "@react-navigation/native";

export default function MemberInfo() {
    const navigation = useNavigation();
    const [pwdFirst, setPwdFirst] = useState("");
    const [pwdSecond, setPwdSecond] = useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    var password = "";
    var securityQuestion = "hi";
    var securityQuestionAnswer = "hello";

    function changeInfo() {
        password = pwdFirst;
        if (password.trim()===""){
            Alert.alert("새로운 비밀번호","새로운 비밀번호를 입력해주세요.");
        }
        else if (name.trim()===""){
            Alert.alert("이름","새로운 이름을 입력해주세요.");
        }
        else if (email.trim()===""){
            Alert.alert("이메일","새로운 이메일을 입력해주세요.");
        }
        else if (pwdFirst !== pwdSecond) {
            Alert.alert("새로운 비밀번호가 일치하지 않습니다.");
            password = "";
        }
        else if (password.trim() === "") {
            Alert.alert("새로운 비밀번호", `새로운 비밀번호가 ""입니다.`);
        }
        else {
            axios.put("http://ceprj.gachon.ac.kr:60004/member/change-info", 
               {
                    "userId":userId,
                    "userPassword": password,
                    "name":name,
                    "email":email,
                    "securityQuestion": securityQuestion,
                    "securityQuestionAnswer": securityQuestionAnswer
                }
            ).then(function(response){
                console.log(response.data);
                if(response.data.status === 200) {
                    Alert.alert('회원정보 수정',
                                "회원정보가 수정되었습니다.",
                                [{
                                   text:'확인',
                                   onPress:()=>navigation.navigate('Settings')    
                                }]);
                }
                else{
                    Alert.alert("회원정보 수정","회원정보 수정에 실패했습니다.");
                }

            }).catch(function(err){
                console.log("changeInfo error", err);
            })
        }
   };
    
    return(
        <View style={styles.container}>

            <Text style={styles.text}>비밀번호</Text>   
            <View style={styles.inputView}>              
                <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={userPassword}
                underlineColorAndroid="transparent"
                onChangeText={(pwdFirst)=>setPwdFirst(pwdFirst)}/> 
            </View>

            <Text style={styles.text}>비밀번호 확인</Text> 
            <View style={styles.inputView}>                 
                <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={userPassword}
                underlineColorAndroid="transparent"
                onChangeText={(pwdSecond)=>setPwdSecond(pwdSecond)} />
            </View>
            
            <Text style={styles.text}>이름</Text>  
            <View style={styles.inputView}>                
                <TextInput
                style={styles.textInput}
                placeholder={userName}
                underlineColorAndroid="transparent"
                onChangeText={(name)=>setName(name)}/>
            </View>

            <Text style={styles.text}>이메일</Text>   
            <View style={styles.inputView}>               
                <TextInput
                    style={styles.textInput}
                    placeholder={userEmail}
                    underlineColorAndroid="transparent"
                    onChangeText={(email)=>setEmail(email)}/>
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={()=>changeInfo()} >
                <Text style={styles.buttonText}>정보수정</Text>
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
    },
    text: {
        fontSize: 20,
        color: "black",
        marginBottom: 10
    }
});

