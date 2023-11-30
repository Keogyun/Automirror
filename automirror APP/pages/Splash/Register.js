import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, Text, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

var password = "";

export default function Register() {
    const navigation = useNavigation();
    const [id,setId]= useState("");
    const [msg,setMsg]=useState("아이디 사용 가능 여부");
    const [pwdFirst, setPwdFirst] = useState("");
    const [pwdSecond, setPwdSecond] = useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");

    function idCheck(){
        console.log('idCheck');
        console.log(`${id}`);

        if(id.trim()===""){
            Alert.alert("아이디","아이디를 입력해 주십시오.");
            setId("");
        } 
        else{
        axios.post("http://ceprj.gachon.ac.kr:60004/member/member-available", {"userId":id})
        .then(function(resp){
            console.log(resp.data);
            
            if(resp.data=="OK"){
                setMsg("사용 가능한 아이디입니다.");
            }else{
                setMsg("이미 사용중인 아이디입니다.");
                setId("");
            }
        })
        .catch(function(err){
            console.log(err);
            })
        }
    };

    function regi(){
        console.log(pwdFirst);
        console.log(pwdSecond);
        password = pwdFirst;
        if (id.trim()===""){
            Alert.alert("아이디","아이디를 입력해주세요.");
        }
        else if (pwdFirst.trim()===""){
            Alert.alert("비밀번호","비밀번호를 입력해주세요.");
        }
        else if (name.trim()===""){
            Alert.alert("이름","이름을 입력해주세요.");
        }
        else if (email.trim()===""){
            Alert.alert("이메일","이메일을 입력해주세요.");
        }
        else if (pwdFirst !== pwdSecond) {
            Alert.alert("비밀번호", "비밀번호가 일치하지 않습니다.");
            password = "";
        }
        else if (password.trim() === "") {
            Alert.alert("비밀번호", `비밀번호가 ""입니다.`);
        }
        else {
            axios.post("http://ceprj.gachon.ac.kr:60004/member/member-info", 
               {
                    "userId":id,
                    "userPassword":password,
                    "name":name,
                    "email":email,
                }
            ).then(function(resp){
                console.log(resp.data);

                if(resp.data=="OK"){
                   
                    Alert.alert('회원가입',
                                '회원가입 되었습니다.',
                                [{
                                   text:'확인',
                                   onPress:()=>navigation.navigate('Splash')    
                                }]);
                }
                else{
                    Alert.alert("회원가입","회원가입에 실패했습니다.");
                }

            }).catch(function(err){
                console.log(err);
            })
        }
    };

    return(
        <View style={styles.container}>

            <View style={styles.inputView}>                
                <TextInput
                    style={styles.textInput}
                    placeholder="아이디"
                    value={id}
                    underlineColorAndroid="transparent"
                    onChangeText={(id)=>setId(id)}/>
            </View>


            <View style={styles.idTextContainer}>
                <Text style={styles.idText}>{msg}</Text>
           
                <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} 
                                    onPress={()=>idCheck()}>
                    <Text style={styles.buttonText}>아이디 확인</Text>
                </TouchableHighlight>
            </View>


            <View style={styles.inputView}>                
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="비밀번호"
                    underlineColorAndroid="transparent"
                    onChangeText={(pwdFirst)=>setPwdFirst(pwdFirst)} /> 
            </View>

            <View style={styles.inputView}>                
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="비밀번호 확인"
                    underlineColorAndroid="transparent"
                    onChangeText={(pwdSecond)=>setPwdSecond(pwdSecond)} />
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

            <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={()=>regi()} >
                <Text style={styles.buttonText}>회원가입</Text>
            </TouchableHighlight>



        </View>

        
    )

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