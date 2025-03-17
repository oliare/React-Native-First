import IToDoItem from "@/interfaces/ToDoList";
import { View, Text, StyleSheet, Image } from "react-native";
import { priorityColors } from "../constants";

export const TodoItem = ({ todo, date, completed, priority }: IToDoItem) => {
  const icon = completed ? require("../assets/images/done.png") : null;
    
  const priorityColor = priorityColors[priority];

  return (
    <View style={[styles.container, styles.item, completed && styles.completed]}>
      <View style={styles.row}>
        {icon && <Image source={icon} style={styles.statusIcon} />}
        <Text style={[styles.text, completed && styles.completedText]}>
          {todo.length > 30 ? todo.substring(0, 29) + "..." : todo}
        </Text>
      </View>
      <Text style={styles.time}>{date}</Text>
      <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 5,
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "lightgray",
    borderWidth: 0.2
  },
  completed: {
    backgroundColor: "#e6f7e6",
  },
  text: {
    fontWeight: "bold",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  time: {
    color: "#555",
  },
  statusIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});
