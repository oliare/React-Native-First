import { Alert, Pressable, StyleSheet, Text, TextInput, View, Image } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import IToDoItem from "@/interfaces/ToDoList";
import { priorityColors } from "../../constants";

interface CreateTaskFormProps {
  onAddTask: (newTask: IToDoItem) => void;
  onClose: () => void;
}

export default function CreateTaskForm({ onAddTask, onClose }: CreateTaskFormProps) {
  const [priority, setPriority] = useState<string>("medium");
  const [date, setDate] = useState(new Date());

  const priorityColor = priorityColors[priority];
  const formattedDate = date.toISOString().slice(0, 16).replace("T", " ");

  const { control, handleSubmit, formState: { errors } } = useForm<IToDoItem>({
    defaultValues: {
      todo: "",
      priority: priority,
      status: "to-do",
    },
  });

  const onSubmit = (data: IToDoItem) => {
    const newTask: IToDoItem = {
      id: Date.now(),
      todo: data.todo,
      date: formattedDate,
      priority: data.priority,
      status: data.status,
      completed: false,
    };
    onAddTask(newTask);
    onClose();
  };

  const onChangeDate = (e: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const formattedDate = currentDate.toISOString().slice(0, 16).replace("T", " ");
    console.log(formattedDate);
  };


  return (
    <View>
      <Pressable onPress={onClose} style={styles.closeBtn}>
        <Image source={require("../../assets/images/close.png")} style={styles.closeImg} />
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.title}>Create Task</Text>

        <Text style={styles.field}>Task: <Text style={{ color: '#ba3838' }}>*</Text></Text>
        <Controller control={control} name="todo" rules={{ required: 'Task is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
          )} />
        {errors.todo && <Text style={styles.errorText}>{errors.todo.message}</Text>}

        <View style={styles.priorityRow}>
          <Text style={[styles.field, { marginTop: 20 }]}>Priority:</Text>
          <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
        </View>

        <Controller control={control} name="priority"
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={(item) => { onChange(item); setPriority(item); }} itemStyle={styles.pickerItem}>
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>
          )} />

        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.field}>Date: </Text>
            <DateTimePicker value={date} onChange={onChangeDate} mode="date" />
          </View>
          <View>
            <Text style={styles.field}>Time: </Text>
            <DateTimePicker value={date} onChange={onChangeDate} mode="time" />
          </View>
        </View>

        <Pressable style={styles.addBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.addBtnText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 345,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 25,
    fontWeight: 'bold',
  },
  field: {
    paddingLeft: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  input: {
    backgroundColor: "rgb(230,230,230)",
    padding: 10,
    marginBottom: 5,
    fontSize: 14,
    borderRadius: 8,
    width: 280,
    marginLeft: 10,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  pickerItem: {
    color: 'black',
    fontSize: 14,
    height: 100,
    width: 300,
  },
  dateContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginRight: 15
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    width: 24,
    height: 24,
    opacity: 0.8
  },
  closeImg: {
    width: 24,
    height: 24,
  },
  addBtn: {
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#a9c1d1",
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: '#ba3838',
    fontSize: 12,
    marginLeft: 10,
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 10,
  },
});
