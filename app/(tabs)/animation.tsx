import { useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';

export default function Animation() {
    const progress = useSharedValue(0);
    const [percent, setPercent] = useState(0);

    const handleNext = () => {
        const tmp = percent >= 100 ? 0 : percent + 25;
        progress.value = withTiming(tmp / 100);
        setPercent(tmp);
    };

    const progressBarStyle = useAnimatedStyle(() => ({
        width: `${progress.value * 100}%`,
        backgroundColor: interpolateColor(
            progress.value, [0, 1],
            ['#30c758', '#e33030']),
    }));

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Animated.View style={[styles.progressBar, progressBarStyle]} />
                <Text style={styles.percentText}>{percent}%</Text>
            </View>
            <Button onPress={handleNext} title="Next" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressContainer: {
        width: 350,
        height: 30,
        backgroundColor: '#ddd',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        borderRadius: 10
    },
    percentText: {
        color: 'black',
        fontWeight: 'bold',
        zIndex: 1
    },
});
