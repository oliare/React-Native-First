import { StyleSheet, View, TextInput, Text, Pressable, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-native-signature-canvas";
import { Link } from "expo-router";

export default function DamageDetails() {
    const canvasRef = useRef<any>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [signatureError, setSignatureError] = useState(false);
    const [isEraserMode, setIsEraserMode] = useState(false);

    const { control, handleSubmit, formState: { errors }, trigger } = useForm({
        defaultValues: {
            side: "",
            description: "",
        },
    });

    const validateAndSubmit = async (data: any) => {
        const isValid = await trigger(); 
        if (!isValid) return;

        if (!signature) {
            setSignatureError(true);
            return;
        }

        Alert.alert("Success", "Damage details saved successfully!");
        console.log("Form Data:", data);
        console.log("Saved Sketch:", signature);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Damage Description</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Side of Damage <Text style={styles.required}>*</Text></Text>
                <Controller name="side" control={control} rules={{ required: 'Side of damage is required' }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput style={[styles.input, errors.side && styles.inputError]}
                            value={value} onChangeText={onChange} />)} />
                {errors.side?.message && <Text style={styles.error}>{errors.side.message.toString()}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Damage Description <Text style={styles.required}>*</Text></Text>
                <Controller name="description" control={control} rules={{ required: 'Description is required' }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput style={[styles.input, errors.description && styles.inputError]}
                            value={value} onChangeText={onChange} />)} />
                {errors.description?.message && <Text style={styles.error}>{errors.description.message.toString()}</Text>}
            </View>

            <Text style={[styles.label, { marginTop: 20, marginBottom: 5 }]}>Draw a sketch of the accident <Text style={styles.required}>*</Text></Text>
            <View style={[styles.canvasContainer, signatureError && styles.canvasError]}>
                <SignatureCanvas ref={canvasRef} style={styles.canvas}
                    onOK={(s) => {
                        setSignature(s);
                        setSignatureError(false);
                    }}
                    penColor={isEraserMode ? "#FFFFFF" : "#000000"}
                    descriptionText=""
                    webStyle={`
                        .m-signature-pad {
                            border: none;
                            box-shadow: none;
                        }
                        .button {
                            font-size: 16px !important;
                            background-color: #ededed !important;
                            border: 0.8px solid gray !important;
                            color: black !important;
                        }`
                    }
                />
            </View>
            {signatureError && <Text style={styles.error}>Sketch is required</Text>}

            <Pressable onPress={handleSubmit(validateAndSubmit)}>
                <View style={styles.containerButton}>
                    <Link href={'/'}>
                        <Text style={styles.addBtn}>Finish and Save</Text>
                    </Link>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 20,
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginTop: 15,
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
        marginTop: 10,
        alignSelf: "center",
    },
    addBtn: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#95c7bf',
        color: 'white',
        textAlign: 'center',
        borderRadius: 8,
        fontSize: 18,
    },
    canvasError: {
        borderColor: '#ba3838',
        borderWidth: 0.6,
    },
    canvasContainer: {
        height: 360,
        borderWidth: 0.2,
        borderColor: "rgb(165, 165, 165)",
        borderRadius: 10,
        overflow: "hidden",
    },
    canvas: {
        flex: 1,
    }
});
