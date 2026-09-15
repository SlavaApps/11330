import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, radius, scale } from '../theme';

interface ProgressBarProps {
  progress: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  palette?: string[];
  trackColor?: string;
  animated?: boolean;
  rounded?: boolean;
}

export function ProgressBar({
  progress,
  height = 6,
  style,
  palette,
  trackColor,
  animated = true,
  rounded = true,
}: ProgressBarProps): React.JSX.Element {
  const clamped = Math.max(0, Math.min(1, progress));
  const value = useRef(new Animated.Value(animated ? 0 : clamped)).current;

  useEffect(() => {
    if (!animated) {
      value.setValue(clamped);
      return;
    }
    const animation = Animated.timing(value, {
      toValue: clamped,
      duration: 620,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [clamped, value, animated]);

  const width = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.track,
        {
          height: scale(height),
          borderRadius: rounded ? radius.pill : 0,
          backgroundColor: trackColor ?? colors.surfaceAlt,
        },
        style,
      ]}>
      <Animated.View style={[styles.fillWrap, { width }]}>
        <LinearGradient
          colors={palette ?? ['#5A9BFF', '#2563EB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: rounded ? radius.pill : 0 }]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    overflow: 'hidden',
    width: '100%',
  },
  fillWrap: {
    height: '100%',
  },
});
