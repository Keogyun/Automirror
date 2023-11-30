import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BottomBar from "../Home/components/BottomBar.js";
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { userId } from '../Splash/Login.js';
import * as React from 'react';

const STORAGE_KEY = "@toDos";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Todo() {
    const navigation = useNavigation();
  const [working, setWorking] = useState(true);
  const travle = () => setWorking(false);
  const work = () => setWorking(true);
  const [checked, setChecked] = React.useState(false);

  //todolist obj
  const [toDos, setToDos] = useState({});
  //텍스트인풋
  const [text, setText] = useState("");
  const onChangeText = (payload) => setText(payload);
  var input = "";
  var task = "";

  //async스토리지
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave)) //Object to String 
  }
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY)
      console.log(s);
      //String to Object
      setToDos(JSON.parse(s))
      console.log(toDos);

    } catch (e) {
      console.log(e)
    }
  }

  //Submit
  const addToDo = async () => { 
    console.log("addToDo");

    if (text === "") {
        console.log("no text");
        return
    }
    //todo 저장 Object.assign 오브젝트 합치기
    const newToDos = { ...toDos, [Date.now()]: { text, working, checked } }
    console.log(newToDos);
    setToDos(newToDos)
    //스토리지에 저장
    saveToDos(newToDos)
    console.log(toDos);
    //텍스트 초기화
    setText("")
  }

  const addToDoApi = async () => {
    if (text === "") {
      return
    }
    //todo 저장 Object.assign 오브젝트 합치기
    const newToDos = { ...toDos, [Date.now()]: { text, working, checked } }
    // console.log(`newToDos : ${newToDos}`);
    setToDos(newToDos)
    //스토리지에 저장
    saveToDos(newToDos)
    console.log(toDos);
    postTodo(text);
    //텍스트 초기화
    setText("")
  }

  //Todo 삭제
  //삭제하기 위해 원래 오브젝트 복제하고 삭제하고 set
  const deleteToDo = (key) => {
    Alert.alert("일정 삭제", "일정을 삭제하시겠습니까?", [
      { text: "취소" },
      {
        text: "삭제", onPress: async () => {
          const newToDos = { ...toDos }
          const deleteText =newToDos[key].text;
          delete newToDos[key]
          setToDos(newToDos)
          deleteTodo(deleteText)
          await saveToDos(newToDos)
        }
      }
    ]);
  }

  //Todo 체크
  const checkToDo = async (key) => {
    const newToDos = { ...toDos }
    const temp = newToDos[key].checked

    newToDos[key].checked = !temp

    setToDos(newToDos)
    await saveToDos(newToDos)
  }

  const getTodo = async () => {
    await axios.post("http://ceprj.gachon.ac.kr:60004/todo/get",
             {
                  "userId": userId
              }
          ).then(function(resp){
              if(resp.data.status === 200) {
                console.log("todo 정보 가져오기");
                console.log(resp.data);
                var array = resp.data.todos;
                console.log(array);

                const len = Object.keys(array).length;
                console.log(len);
                for (var i = 0; i < len; i++) {
                    task = array[i].todoTask;
                    
                    console.log(task);
                    setText(task)
                    console.log(`text: ${text}`);
                    addToDo();
                }
                /*array.forEach((data) => {
                    setText(data.todoTask);
                    console.log(`text: ${text}`);
                    addToDo();
                  });*/
            
                /*Alert.alert('todo 정보',
                            "저장된 todo정보를 받아왔습니다.",
                            [{
                                text:'확인',   
                            }]);*/
              }
              else{
                  Alert.alert("todo 정보","등록된 todo 정보가 없거나 불러오기에 실패했습니다.");
              }

          }).catch(function(err){
              console.log("getTodo error", err);
          })
    };

    const postTodo = (text) => {
        axios.post("http://ceprj.gachon.ac.kr:60004/todo/add", 
                 {
                      "userId": userId,
                      "todoTask": text
                  }
              ).then(function(resp){
                  console.log(resp.data);
                  console.log("todo정보 전송")
                  if(resp.data.status === 200) {
                      Alert.alert('todo 정보',
                                  "todo 정보 전송 성공했습니다.",
                                  [{
                                     text:'확인',   
                                  }]);
                  }
                  else{
                      Alert.alert("todo 정보","todo 정보 전송 실패했습니다.");
                  }
  
              }).catch(function(err){
                  console.log("postTodo error", err);
              })
    };

    const deleteTodo = (text) => {
        // var todo = "";
        /*Todos.map(Todo =>
          Todo.id === id ? deleteId = id : deleteId = ""
        );*/
        /*Todos.map(Todo =>
          Todo.id === id ? todo = Todo.textValue : todo = ""
        );*/
        axios.delete("http://ceprj.gachon.ac.kr:60004/todo/delete", 
                {
                  data: {
                      "userId": userId,
                      "todoTask": text
                  }
              }
              ).then(function(resp){
                  console.log(resp.data);
                  if(resp.data.status === 200) {
                    console.log("일정 삭제");
                      /*Alert.alert('todo 정보',
                                  "todo 정보 삭제 성공했습니다.",
                                  [{
                                     text:'확인',   
                                  }]);*/
                      // navigation.navigate("TodoInfo");
                  }
                  else{
                      Alert.alert("todo 정보","todo 정보 삭제 실패했습니다.");
                  }
              }).catch(function(err){
                  console.log("deleteTodo error", err);
              })
    };

    useEffect(() => {
        loadToDos()
        //getTodo();
      }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>TODO</Text>
          <Ionicons
            name="home"
            style={styles.home}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View style={styles.body}>
            <TextInput
                returnKeyType='done'
                onSubmitEditing={addToDoApi}
                onChangeText={onChangeText}
                placeholder={"일정을 추가하세요."}
                style={styles.input}>
            </TextInput>

            <ScrollView>
                {
                Object.keys(toDos || {}).map((key) => (
                    toDos[key].working === working ?  
                    <View style={styles.toDo} key={key}>
                        <Text style={{...styles.toDoText, 
                        textDecorationLine: toDos[key].checked? 'line-through' : null,
                        color : toDos[key].checked ? '#fff3bd': 'white'}} >
                        {toDos[key].text}
                        </Text>

                        <View style={styles.btnView}>
                        <Checkbox key = {key}
                            status={toDos[key].checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                            checkToDo(key);
                            }}
                            color="#fff3bd"
                        />

                        <TouchableOpacity onPress={() => deleteToDo(key)}>
                            <Fontisto name="trash" size={18} color="white" />
                        </TouchableOpacity>
                        </View>

                    </View>
                    : null
                ))}
            </ScrollView>
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
    backgroundColor: "#f6ac4b",
    paddingHorizontal: 20,
  },
  header: {
    flex: 0.2,
    backgroundColor: "#f6ac4b",
    color: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
  },
  body: {
    flex: 2.0,
    backgroundColor: "#f6ac4b",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 35,
    marginTop: 30,
  },
  btnText: {
    fontSize: 44,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginRight: 41,
    fontSize: 18,
    marginBottom: 15,
  },
  toDo: {
    flex:1,
    backgroundColor: "#3A3D40",
    marginBottom: 10,
    marginRight: 41,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toDoText: {
    flex:0.7,
    fontSize: 16,
    fontWeight: "500",
  },
  btnView:{
    flex:0.3,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-around',
  },
  footer: {
    flex: 0.3,
    backgroundColor: "#f6ac4b",
    width: SCREEN_WIDTH,
    marginLeft: -18
  },
  title: {
    fontSize: 35,
    fontWeight: "800",
    color: "black",
    marginTop: 20,
    marginRight: 85,
  },
  home: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "800",
    color: "black",
    marginRight: -20
  },
});