import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { BASE_IP, getAppId } from "../../../service";
import axios from "axios";

export default function Calendar() {
  const [appId, setAppId] = useState("");
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const updateToDoAPI = async (toDos) => {
    const res = await axios.post(`${BASE_IP}/todo/updateToDo`, {
      appId,
      toDos: JSON.stringify(toDos),
    });
    const json = JSON.parse(res.data.savedTodos.todos);
    setToDos(json);
  };

  const getToDoAPI = async (toDos) => {
    if (appId === "") {
      return;
    }
    const res = await axios.get(`${BASE_IP}/todo/getToDo?appId=${appId}`);
    console.log(res.data.todoInfo.todos);
    console.log(typeof res.data.todoInfo.todos);
    const convertDoubleQoute = res.data.todoInfo.todos.replaceAll("'", '"');
    const convertBoolFalse = convertDoubleQoute.replaceAll("False", "false");
    const convertBoolTrue = convertBoolFalse.replaceAll("True", "true");
    console.log(convertBoolTrue);
    const json = JSON.parse(convertBoolTrue);

    console.log(json);
    console.log(typeof json);

    setToDos(json);
    console.log(Object.keys(json)[0]);
    console.log(typeof Object.keys(json)[0]);
  };

  useEffect(() => {
    getAppId(setAppId);
    const todoInterval = setInterval(() => {
      getToDoAPI();
    }, 2000);
    return () => clearInterval(todoInterval);
  }, []);

  useEffect(() => {
    getToDoAPI();
  }, [appId]);

  const addToDo = () => {
    if (!text) {
      return;
    }

    const newToDos = { ...toDos, [Date.now()]: { text, isCompleted: false } };
    updateToDoAPI(newToDos);
    setText("");
  };

  const completeToDo = (key) => {
    const newToDos = { ...toDos };
    newToDos[key].isCompleted = !newToDos[key].isCompleted;
    updateToDoAPI(newToDos);
  };

  const deleteToDos = (key) => {
    const newToDos = { ...toDos };
    delete newToDos[key];
    updateToDoAPI(newToDos);
  };

  return (
    <View style={styles.calendar}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ ...styles.title, paddingHorizontal: 10 }}
          onPress={() => navigation.navigate("CalendarDetails")}
        >
          <FontAwesome5 name="calendar-alt" size={20} color="#464646" />
          {` 박재균 님의 일정`}
        </Text>
        <TextInput
          style={styles.inputTodo}
          placeholder="+ 할 일을 입력해주세요!"
          value={text}
          onChangeText={setText}
          returnKeyType="done"
          onSubmitEditing={addToDo}
        />
      </View>

      <ScrollView style={styles.flexbox}>
        {Object.keys(toDos).length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 160,
            }}
          >
            <Text style={styles.todoItem}>
              {`                   일정이 없네요. 
오늘은 편하게 쉬어보시는건 어떨까요 ?`}
            </Text>
          </View>
        ) : (
          <View>
            {Object.keys(toDos).map((key, idx) => (
              <View key={idx} style={styles.todoList}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => completeToDo(key)}>
                    <Feather
                      name={toDos[key].isCompleted ? "check-square" : "square"}
                      color="#A3C1C6"
                      style={{ fontSize: 22, marginRight: 8, marginTop: -4 }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...styles.todoItem,
                      color: toDos[key].isCompleted ? "#c0c0c0" : "#555555",
                      textDecorationLine: toDos[key].isCompleted
                        ? "line-through"
                        : "none",
                      textDecorationColor: "#A3C1C6",
                    }}
                  >
                    {toDos[key].text}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => deleteToDos(key)}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      color="#464646"
                      style={{ fontSize: 24 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  calendar: {
    backgroundColor: "#eeeeee",
    borderRadius: 25,
    height: 210,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginHorizontal: 6,
  },
  title: {
    color: "#A3C1C6",
    fontSize: 20,
    fontWeight: "900",
  },

  flexbox: {
    marginTop: 8,
    marginVertical: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: "100%",
  },
  inputTodo: {
    backgroundColor: "#e2e2e2",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 60,
    width: "50%",
  },
  todoList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: "#e2e2e2",
  },
  todoItem: { fontSize: 15, fontWeight: "700", color: "#555555" },
});
