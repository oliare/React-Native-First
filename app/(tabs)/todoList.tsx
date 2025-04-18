import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable, Alert } from "react-native";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
import IToDoItem from "@/interfaces/ToDoList";
import { TodoItem } from "@/components/ToDoItem";
import { SwipeListView } from "react-native-swipe-list-view";
import { getTasks, addTask, deleteTask, updateTask, getTask } from "@/services/tasksService";
import { useDispatch, useSelector } from "react-redux";
import { setItems, updateItem, deleteItem, addItem } from '../../redux/slices/todoSlice';
import { RootState } from "@/redux/store";

export default function ToDoList() {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const tasksCount = useSelector((state: RootState) => state.todo.tasks.filter(task => task.status != 'completed').length);
  
  const _date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  useEffect(() => {
    loadTasks();
  }, []);
  
  const loadTasks = async () => {
    const resp = await getTasks();
    dispatch(setItems(resp));
  };
  
  const addNewTask = async (newTask: IToDoItem) => {
    try {
      await addTask(newTask);
      console.log("Task after adding: ", newTask);
      dispatch(addItem(newTask));
      toggleModal();
      loadTasks();
    }
    catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDelete = async (id: number, notificationId: string) => {
    await deleteTask(id);
    dispatch(deleteItem(id));
    loadTasks();
  };

  const handleComplete = async (rowMap: { [key: number]: any }, id: number, status: string) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }
    const newStatus = status == "completed" ? "in progress" : "completed";
    await updateTask(id, newStatus);
    dispatch(updateItem({ id, status: newStatus }));
    loadTasks();
  };

  const fixTime = (date: string) => {
    let d = new Date(date);
    return d.toLocaleTimeString("en-US", { hour: "2-digit" });
  };


  return (
    <View style={styles.container} >
      <Text style={styles.title}>ODOT List</Text>
      <Text style={styles.date}>{_date}</Text>

      <SwipeListView style={styles.listView}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item.todo}
            date={fixTime(item.date)}
            deadline={fixTime(item.date)}
            completed={item.status == "completed"}
            id={item.id}
            priority={item.priority}
            status={item.status}
            notificationId={item.notificationId}
          />
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <View style={styles.rowBack}>
            <Pressable onPress={() => handleComplete(rowMap, item.id, item.status)}
              style={[item.status === 'completed' ? styles.undoBtn : styles.doneBtn, styles.swipe]}>
              <Image source={item.status === 'completed' ? require("../../assets/images/undo.png")
                : require("../../assets/images/ok.png")}
                style={item.status === 'completed' ? styles.undoImg : styles.doneImg} />
            </Pressable>

            <Pressable style={[styles.trashBtn, styles.swipe]} onPress={() => handleDelete(item.id, item.notificationId ?? '')}>
              <View style={styles.trashView}>
                <Image style={styles.trashImg} source={require("../../assets/images/trash.png")} />
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
            <Image style={styles.addBtn} source={require("../../assets/images/plus.png")} />
          </View>
        </View>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CreateTaskForm onAddTask={addNewTask} onClose={toggleModal} />
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 13,
    paddingTop: 10
  },
  date: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  listView: {
    padding: 20,
  },
  containerButton: {
    flex: 1,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  addBtnBg: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 50,
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
