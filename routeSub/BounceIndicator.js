import React, {useEffect, useRef, useMemo} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const BAR_COUNT = 3;
const BAR_WIDTH = 64;
const BAR_HEIGHT = 4;
const BAR_GAP = 10;
const BAR_DURATION = 700;
const BAR_STAGGER = 180;

const BLUE = '#3B82F6';
const GOLD = '#D6A84E';

function createSweepAnimation(anim) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: BAR_DURATION,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: BAR_DURATION,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]),
  );
}

const Bar = React.memo(({anim, color}) => {
  const scaleX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 1],
  });
  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <Animated.View
      style={[
        styles.bar,
        {backgroundColor: color, transform: [{scaleX}], opacity},
      ]}
    />
  );
});

const BounceIndicator = ({containerStyle}) => {
  const anims = useRef(
    Array.from({length: BAR_COUNT}, () => new Animated.Value(0)),
  ).current;

  const colors = useMemo(
    () => Array.from({length: BAR_COUNT}, (_, i) => (i === 1 ? GOLD : BLUE)),
    [],
  );

  useEffect(() => {
    const running = [];

    anims.forEach((anim, i) => {
      const loop = createSweepAnimation(anim);
      const timeout = setTimeout(() => loop.start(), i * BAR_STAGGER);
      running.push({loop, timeout});
    });

    return () => {
      running.forEach(({loop, timeout}) => {
        clearTimeout(timeout);
        loop.stop();
      });
    };
  }, [anims]);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[styles.container, containerStyle]}>
      <View style={styles.stack}>
        {anims.map((anim, i) => (
          <Bar key={i} anim={anim} color={colors[i]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  stack: {
    alignItems: 'center',
    gap: BAR_GAP,
  },
  bar: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    borderRadius: BAR_HEIGHT / 2,
  },
});

export default React.memo(BounceIndicator);
