import Card from '@/components/CardGesture';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

export default function App () {
  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);

  const cards = [
    { id: 1, priority: firstPriority },
    { id: 2, priority: secondPriority },
    { id: 3, priority: thirdPriority },
  ];

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <View style={styles.container}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            priority={card.priority}
            firstPriority={firstPriority}
            secondPriority={secondPriority}
            thirdPriority={thirdPriority}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});