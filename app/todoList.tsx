import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable } from "react-native";
import { BottomPanel } from "../components/BottomPanel";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
import IToDoItem from "@/interfaces/ToDoList";
import { TodoItem } from "@/components/ToDoItem";
import { SwipeListView } from "react-native-swipe-list-view";
import { getTasks, addTask, deleteTask, updateTask } from "@/services/tasksService";
import * as SQLite from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo);

export default function ToDoList() {
  const { success } = useMigrations(db, migrations);
  const [tasks, setTasks] = useState<IToDoItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const _date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  useEffect(() => {
    if (!success) return;
    loadTasks();
  }, [success]);

  const loadTasks = async () => {
    const resp = await getTasks();
    setTasks(resp);
  };

  const addNewTask = async (newTask: IToDoItem) => {
    await addTask(newTask);
    toggleModal();
    loadTasks();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleComplete = async (rowMap: { [key: number]: any }, id: number, status: string) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
    const newStatus = status == "completed" ? "in progress" : "completed";
    await  updateTask(id, newStatus);
    loadTasks();
  };

  const fixTime = (date: string) => {
    let d = new Date(date);
    d.setHours(d.getHours() + 2);
    return d.toLocaleTimeString("en-US", { hour: "2-digit" });
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
            date={fixTime(item.date)}
            completed={item.status == "completed"}
            id={item.id}
            priority={item.priority}
            status={item.status}
          />
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <View style={styles.rowBack}>
            <Pressable onPress={() => handleComplete(rowMap, item.id, item.status)}
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
