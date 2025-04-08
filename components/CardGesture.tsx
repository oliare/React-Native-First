import { Dimensions, StyleSheet, Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const cards_images: { [key: number]: string } = {
  1: 'https://deckofcardsapi.com/static/img/AS.png',
  2: 'https://deckofcardsapi.com/static/img/KH.png',
  3: 'https://deckofcardsapi.com/static/img/QD.png'
};

export default function Card ({ id, priority, firstPriority, secondPriority, thirdPriority }: any) {
  const swipe = Math.max(width * 0.2, height * 0.2);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const isRightFlick = useSharedValue(true);

  const animatedStyle = useAnimatedStyle(() => {
    const position = interpolate(
      priority.value,
      [0.8, 1],
      [height * 0.16, height * 0.2]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        {
          rotate: `${interpolate(
            rotation.value,
            isRightFlick.value ? [0, height] : [0, -height],
            [0, 4]
          )}rad`,
        },
      ],
      bottom: withTiming(position, { duration: 300 }),
      zIndex: Math.round(priority.value * 100),
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(({ x }) => {
      if (x < width / 2) {
        isRightFlick.value = false;
      }
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = translationX;
      translateY.value = translationY;
      rotation.value = translationX * 0.1;
    })
    .onEnd(() => {
      const shouldSwipe = Math.abs(translateX.value) > swipe;

      if (shouldSwipe) {
        const directionX = translateX.value > 0 ? width : -width;
        const directionY = translateY.value > 0 ? height : -height;

        translateX.value = withTiming(directionX, { duration: 300 });
        translateY.value = withTiming(directionY, { duration: 300 });
        rotation.value = withTiming(
          isRightFlick.value ? 360 : -360,
          { duration: 300 },
          () => {
            const priorities = [
              firstPriority.value,
              secondPriority.value,
              thirdPriority.value,
            ];

            const lastItem = priorities[priorities.length - 1];
            priorities.pop();
            priorities.unshift(lastItem);

            firstPriority.value = priorities[0];
            secondPriority.value = priorities[1];
            thirdPriority.value = priorities[2];

            translateX.value = 0;
            translateY.value = 0;
            rotation.value = 0;
          }
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image
          source={{ uri: cards_images[id] }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
    card: {
      width: 200,
      height: 300,
      borderRadius: 10,
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
  });