import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, Dimensions, Platform, ScrollView, Alert } from 'react-native';
import BottomBar from "../Home/components/BottomBar.js";
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import uuid from "react-native-uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userId } from "../Splash/Login";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
export default function TodoInfo() {
    const navigation = useNavigation();
    const [Todos, setTodos] = useState([]);
  
    const addTodo = text => {
      setTodos([...Todos,
        {id: uuid.v4(), textValue: text, checked: false}, // check true면 완료 
      ]);
    };
    
    const addTodoApi = text => {
      setTodos([...Todos,
        {id: uuid.v4(), textValue: text, checked: false}, // check true면 완료 
      ]);
      setTodo(text);
    };

    const onRemove = deleteId => e => {
      var text = "";
      Todos.map(Todo =>
        Todo.id === deleteId ? text = Todo.textValue : text = ""
      );
      setTodos(Todos.filter((Todo) => {Todo.id !== deleteId}));

      console.log(Todos);
      console.log(text);
      deleteTodo(text);
    };
  
    const onToggle = id => e => {
      setTodos(
        Todos.map(Todo =>
          Todo.id === id ? {...Todo, checked: !Todo.checked} : Todo,
        ),
      );
    };
    
    const getTodo = () => {
      axios.post("http://ceprj.gachon.ac.kr:60004/todo/get",
               {
                    "userId": userId
                }
            ).then(function(resp){
                if(resp.data.status === 200) {
                  console.log(resp.data);
                  var array = resp.data.todos;
                  console.log(array);
                  console.log(Todos);
                  /*array.forEach((data) => {
                    addTodo(data.todoTask);
                  });*/
                  array.map((data) => {
                    addTodo(data.todoTask);
                  })
                  Alert.alert('todo 정보',
                              "저장된 todo정보를 받아왔습니다.",
                              [{
                                  text:'확인',   
                              }]);
                  

                }
                else{
                    Alert.alert("todo 정보","등록된 todo 정보가 없거나 불러오기에 실패했습니다.");
                }

            }).catch(function(err){
                console.log("getTodo error", err);
            })
    };

    const setTodo = (text) => {
      
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
                console.log("setTodo error", err);
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
                    Alert.alert('todo 정보',
                                "todo 정보 삭제 성공했습니다.",
                                [{
                                   text:'확인',   
                                }]);
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
      getTodo();
    }, []);

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
            <View style={styles.card}>
              <TodoInsert onAddTodo={addTodoApi} />
              <TodoList Todos={Todos} onRemove={onRemove} onToggle={onToggle} />
            </View>
        </View>
        <View style={styles.footer}>
          <BottomBar />
        </View>
      </View>
    );
    /*return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>오늘의 목표 😎</Text>
        <View style={styles.card}>
          <TodoInsert onAddTodo={addTodo} />
          <TodoList Todos={Todos} onRemove={onRemove} onToggle={onToggle} />
        </View>
      </View>
    );*/
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3bd',
  },
  header: {
    flex: 0.2,
    backgroundColor: "#fff3bd",
    color: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
  },
  body: {
    flex: 2.0,
    backgroundColor: "#fff3bd",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 35,
    marginTop: 60,
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
    marginRight: 85,
  },
  home: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "800",
    color: "black",
  },
  flexbox: {
    marginTop: 8,
    marginVertical: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    flex: 0.9,
    width: SCREEN_WIDTH - 35,
    marginLeft: 18,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
          height: 30,
          width:0
        }
      },
      android: {
        elevation: 3,
      }
    }),
  },
});
