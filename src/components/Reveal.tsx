import React, { useEffect, useMemo, useRef, PropsWithChildren } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps extends PropsWithChildren {
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  scaleFrom?: number;
  style?: StyleProp<ViewStyle>;
  enabled?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  duration = 420,
  distance = 18,
  direction = 'up',
  scaleFrom,
  style,
  enabled = true,
}: RevealProps): React.JSX.Element {
  const progress = useRef(new Animated.Value(enabled ? 0 : 1)).current;

  useEffect(() => {
    if (!enabled) {
      progress.setValue(1);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, delay, duration, enabled]);

  const transform = useMemo(() => {
    const list: Animated.WithAnimatedArray<
      { translateY: Animated.AnimatedInterpolation<number> } |
      { translateX: Animated.AnimatedInterpolation<number> } |
      { scale: Animated.AnimatedInterpolation<number> }
    > = [];

    if (direction === 'up' || direction === 'down') {
      list.push({
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [direction === 'up' ? distance : -distance, 0],
        }),
      });
    }

    if (direction === 'left' || direction === 'right') {
      list.push({
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [direction === 'left' ? distance : -distance, 0],
        }),
      });
    }

    if (scaleFrom !== undefined) {
      list.push({
        scale: progress.interpolate({ inputRange: [0, 1], outputRange: [scaleFrom, 1] }),
      });
    }

    return list;
  }, [progress, direction, distance, scaleFrom]);

  return (
    <Animated.View style={[style, { opacity: progress, transform }]}>{children}</Animated.View>
  );
}

interface StaggerProps extends PropsWithChildren {
  index?: number;
  step?: number;
  base?: number;
  style?: StyleProp<ViewStyle>;
  direction?: Direction;
  distance?: number;
  max?: number;
}

export function Stagger({
  children,
  index = 0,
  step = 55,
  base = 60,
  style,
  direction = 'up',
  distance = 16,
  max = 8,
}: StaggerProps): React.JSX.Element {
  return (
    <Reveal
      delay={base + Math.min(index, max) * step}
      direction={direction}
      distance={distance}
      style={style}>
      {children}
    </Reveal>
  );
}
