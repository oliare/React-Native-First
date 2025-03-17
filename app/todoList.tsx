import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable, Alert } from "react-native";
import axios from "axios";
import { BottomPanel } from "../components/BottomPanel";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
import IToDoItem from "@/interfaces/ToDoList";
import { TodoItem } from "@/components/ToDoItem";
import { SwipeListView } from "react-native-swipe-list-view";

const api = "https://dummyjson.com/todos";

export default function ToDoList() {
  const [tasks, setTasks] = useState<IToDoItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const _date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const _time = new Date().toLocaleTimeString("en-US", { hour: "2-digit" });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const resp = await axios.get(`${api}`);
    const info = resp.data.todos.map((task: IToDoItem) => ({
      ...task,
      date: _time,
      priority: "low",
      status: task.completed ? "completed" : "in progress",
    }));
    setTasks(info);
  };

  const addNewTask = (newTask: IToDoItem) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    Alert.alert("Task deleted", "The task has been deleted");
  };

  const handleComplete = (rowMap: { [key: number]: any }, id: number) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "completed" ? "in progress" : "completed" } : task
      )
    );
  };

  return (
    <View style={styles.container} >
      <Text style={styles.title}>ODOT List</Text>
      <Text style={styles.date}>{_date}</Text>

      <SwipeListView
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item.todo}
            date={item.date}
            completed={item.status == "completed"}
            id={item.id}
            priority={item.priority}
            status={item.status}
          />
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <View style={styles.rowBack}>
            <Pressable onPress={() => handleComplete(rowMap, item.id)}
              style={[item.status === 'completed' ? styles.undoBtn : styles.doneBtn, styles.swipe]}>
              <Image source={item.status === 'completed' ? require("../assets/images/undo.png")
                : require("../assets/images/ok.png")}
                style={item.status === 'completed' ? styles.undoImg : styles.doneImg} />
            </Pressable>

            <Pressable style={[styles.trashBtn, styles.swipe]} onPress={() => handleDelete(item.id)}>
              <View style={styles.trashView}>
                <Image style={styles.trashImg} source={require("../assets/images/trash.png")} />
              </View>
            </Pressable>
          </View>
        )}
        leftOpenValue={60}
        rightOpenValue={-60}
        stopLeftSwipe={75}
        stopRightSwipe={-100}
      />

      <Pressable onPress={toggleModal}>
        <View style={styles.containerButton}>
          <View style={styles.addBtnBg}>
            <Image style={styles.addBtn} source={require("../assets/images/plus.png")} />
          </View>
        </View>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CreateTaskForm onAddTask={addNewTask} onClose={toggleModal} />
        </View>
      </Modal>

      <BottomPanel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 13,
  },
  date: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  containerButton: {
    flex: 1,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginTop: 10,
  },
  addBtnBg: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 40
  },
  addBtn: {
    width: 60,
    height: 60,
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(227, 227, 227)",
  },
  rowBack: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  swipe: {
    justifyContent: "center",
    flex: 1,
    height: 55,
    borderRadius: 10,
    borderWidth: 0.2,
  },
  trashBtn: {
    backgroundColor: "rgba(243, 216, 216, 0.48)",
    marginRight: 5,
    borderColor: 'rgb(220, 176, 176)',
  },
  trashImg: {
    width: 25,
    height: 25,
    opacity: 0.5,
  },
  trashView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 20,
  },
  doneBtn: {
    backgroundColor: "rgb(221, 238, 224)",
    marginLeft: 5,
    borderColor: 'rgb(153, 210, 163)',
  },
  doneImg: {
    width: 25,
    height: 25,
    marginLeft: 15
  },
  undoBtn: {
    backgroundColor: "rgb(221, 233, 238)",
    marginLeft: 5,
    borderColor: 'rgb(177, 174, 215)',
  },
  undoImg: {
    width: 25,
    height: 25,
    marginLeft: 15
  },

});
