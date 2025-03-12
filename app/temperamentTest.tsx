import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

const Temperament = {
    Melancholic: "melancholic",
    Phlegmatic: "phlegmatic",
    Sanguine: "sanguine",
    Choleric: "choleric",
}

const questions = [
    { text: "Ви швидко приймаєте рішення?", type: Temperament.Choleric },
    { text: "Ви схильні до частих змін настрою?", type: Temperament.Melancholic },
    { text: "Ви легко заводите нові знайомства?", type: Temperament.Sanguine },
    { text: "Вам комфортніше працювати самостійно?", type: Temperament.Phlegmatic },
    { text: "Ви енергійні та активні?", type: Temperament.Choleric },
    { text: "Ви часто замислюєтесь над своїми емоціями?", type: Temperament.Melancholic },
    { text: "Ви зазвичай позитивні та життєрадісні?", type: Temperament.Sanguine },
    { text: "Ви терплячі та спокійні?", type: Temperament.Phlegmatic }
];

const answer = {
    [Temperament.Melancholic]: "меланхолік",
    [Temperament.Phlegmatic]: "флегматик",
    [Temperament.Sanguine]: "сангвінік",
    [Temperament.Choleric]: "холерик",
};

export default function TemperamentTest() {
    const [index, setIndex] = useState(0);

    const [scores, setScores] = useState({
        [Temperament.Choleric]: 0,
        [Temperament.Melancholic]: 0,
        [Temperament.Sanguine]: 0,
        [Temperament.Phlegmatic]: 0
    });

    const handleAnswer = (answer: boolean) => {
        const tmp = questions[index];

        setScores((prevScores) => ({
            ...prevScores,
            [tmp.type]: prevScores[tmp.type] + (answer ? 1 : 0),
        }));

        if (index + 1 < questions.length) setIndex(index + 1);
        else showResult();

    };

    const showResult = () => {
        const type = Object.entries(scores).reduce((prev, curr) =>
            curr[1] > prev[1] ? curr : prev
        )[0];

        Alert.alert(`Ваш темперамент: ${answer[type]}`, '', [
            {
                text: "OK",
                onPress: () => router.push('../'),
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.question}>
                <Text style={styles.questionText}>{questions[index].text}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => handleAnswer(true)}>
                    <Text style={styles.buttonText}>Так</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => handleAnswer(false)}>
                    <Text style={styles.buttonText}>Ні</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dce7f7",
        padding: 20,
    },
    question: {
        width: 300,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#edf2fa',
        borderWidth: 1,
        borderColor: '#5c76a1',
        minHeight: 100,
    },
    questionText: {
        fontSize: 18,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#9bbfbd",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
    },
});
