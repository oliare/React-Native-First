import { View, Text, StyleSheet, FlatList, Button, Image } from "react-native";
import { TodoItem } from "../components/ToDoItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { BottomPanel } from "../components/BottomPanel";

const api = "https://dummyjson.com/todos";

export default function App() {

    const [tasks, setTasks] = useState<IToDoItem[]>([]);

    const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit" });

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        const resp = await axios.get(`${api}`);
        const info = resp.data.todos.map((task: IToDoItem) => ({
            ...task,
            time: time,
            priority: "mid",
            status: "in progress",
        }));
        setTasks(info);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ODOT List</Text>
            <Text style={styles.date}>{date}</Text>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TodoItem todo={item.todo} time={item.time} completed={item.completed} />
                )} />
            <View style={styles.containerButton}>
                <View style={styles.buttonBg}>
                    <Image style={styles.addBtn} source={require("../assets/images/plus.png")} />
                </View>
            </View>
            <BottomPanel />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 13
    },
    date: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: 'bold',
    },
    containerButton: {
        flex: 1,
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: 'black'
    },
    buttonBg: {
        backgroundColor: "white",
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    addBtn: {
        width: 60,
        height: 60,
        opacity: 0.6,
    },
});
