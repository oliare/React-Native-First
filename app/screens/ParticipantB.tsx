import { StyleSheet, ScrollView, View, TextInput, Text, Image, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ParticipantB() {
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            dob: new Date().toLocaleDateString("uk-UA"),
            phone: "",
            carModel: "",
            carNumber: "",
        },
    });

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
            setValue("dob", selectedDate.toLocaleDateString("uk-UA"), { shouldValidate: true });
        }
        setShowDatePicker(false);
    };

    const submitHandler = (data: any) => {
        console.log(`data`, data);
        router.push('./DamageDetails');
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={true}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Participant B Information</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
                            <Controller name="name" control={control} rules={{ required: 'The name is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput style={[styles.input, errors.name && styles.inputError]} value={value} onChangeText={onChange} />
                                )} />
                            {errors.name?.message && <Text style={styles.error}>{errors.name.message.toString()}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Surname <Text style={styles.required}>*</Text></Text>
                            <Controller name="surname" control={control}
                                rules={{ required: 'The surname is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput style={[styles.input, errors.surname && styles.inputError]} value={value} onChangeText={onChange} />)} />
                            {errors.surname?.message && <Text style={styles.error}>{errors.surname.message.toString()}</Text>}
                        </View>


                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Birthday <Text style={styles.required}>*</Text></Text>
                            <View style={styles.dateContainer}>
                                <TextInput style={[styles.input, errors.dob && styles.inputError, { flex: 1 }]}
                                    value={date.toLocaleDateString("uk-UA")} editable={false} />
                                <Pressable onPress={() => setShowDatePicker(true)}>
                                    <Image source={require("../../assets/images/calendar.png")} style={{ width: 40, height: 40, marginLeft: 5 }} />
                                    <DateTimePicker style={styles.hiddenPicker} value={date}
                                        onChange={onChangeDate} mode="date" display="default" />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone <Text style={styles.required}>*</Text></Text>
                            <Controller name="phone" control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[styles.inputPhone, errors.phone && styles.inputError]}
                                        value={value}
                                        onChangeText={(text) => {
                                            let phone = text.replace(/[^0-9]/g, '');

                                            onChange(phone);
                                        }}
                                        keyboardType="phone-pad" maxLength={10} />
                                )}
                                rules={{ required: "Phone number is required" }} />
                            {errors.phone?.message && <Text style={styles.error}>{errors.phone.message.toString()}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Car model<Text style={styles.required}>*</Text></Text>
                            <Controller name="carModel" control={control}
                                rules={{ required: 'Car model is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput style={[styles.input, errors.carModel && styles.inputError]}
                                        value={value} onChangeText={onChange} />)} />
                        </View>
                        {errors.carModel?.message && <Text style={styles.error}>{errors.carModel.message.toString()}</Text>}

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Car number  <Text style={styles.required}>*</Text></Text>
                            <Controller name="carNumber" control={control}
                                rules={{ required: 'Car number is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput style={[styles.input, errors.carNumber && styles.inputError]}
                                        value={value} onChangeText={onChange} />)} />
                            {errors.carNumber?.message && <Text style={styles.error}>{errors.carNumber.message.toString()}</Text>}
                        </View>

                        <Pressable onPress={handleSubmit(submitHandler)}>
                            <View style={styles.containerButton}>
                                <Image style={styles.addBtn} source={require("../../assets/images/next.png")} />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 20,
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 5,
    },
    inputContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    required: {
        color: '#ba3838',
    },
    input: {
        height: 45,
        borderColor: "rgb(165, 165, 165)",
        borderWidth: 0.2,
        borderRadius: 8,
        marginTop: 5,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputPhone: {
        height: 45,
        borderColor: "rgb(165, 165, 165)",
        borderWidth: 0.2,
        borderRadius: 8,
        marginTop: 5,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    inputError: {
        borderColor: '#ba3838',
        borderWidth: 0.5,
    },
    error: {
        color: '#ba3838',
        fontSize: 12,
        marginTop: 3,
    },
    containerButton: {
        flex: 1,
        alignSelf: "center",
        marginTop: 20,
    },
    addBtn: {
        width: 50,
        height: 50,
        opacity: 0.5,
    },
    hiddenPicker: {
        position: 'absolute',
        paddingRight: 5,
        opacity: 0.1
    },

});
