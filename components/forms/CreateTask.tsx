import { Alert, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Controller, useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateTaskForm() {

    const {
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            lang: "",
            email: "",
            accept: false
        },
    })

    const onSubmit = (data : any) => {
        console.log(data);
        if (data.accept)
            Alert.alert(
                "Data",
                `Lang: ${data.lang}\nEmail: ${data.email}`
            )
        else
            Alert.alert("Error", "Please accept private policy to use service!")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create New Product</Text>

            <Text>Your email:</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{ ...styles.input, ...styles.text }}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <DateTimePicker value={new Date()} mode="date" />
            <DateTimePicker value={new Date()} mode="time" />

            <Text>Select your favourite lang:</Text>
            <Controller
                control={control}
                name="lang"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                        <Picker.Item label="Python" value="py" />
                        <Picker.Item label="Ruby" value="rb" />
                        <Picker.Item label="Perl" value="pl" />
                        <Picker.Item label="Kotlin" value="kot" />
                        <Picker.Item label="PHP" value="php" />
                    </Picker>
                )}
            />
            <Text>Accept policy:</Text>
            <Controller
                control={control}
                name="accept"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Switch
                        onValueChange={onChange}
                        value={value} />
                )}
            />

            <Button title='Submit' onPress={handleSubmit(onSubmit)}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10
    },
    text: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center'
    },
    input: {
        backgroundColor: "lightgray",
        padding: 10,
        minWidth: 200,
        color: 'white',
        fontSize: 18,
    }
})