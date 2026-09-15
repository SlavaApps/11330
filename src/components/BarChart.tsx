import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, radius, scale, typography } from '../theme';

export interface BarDatum {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarDatum[];
  height?: number;
  style?: StyleProp<ViewStyle>;
  highlightLast?: boolean;
  showLabels?: boolean;
  placeholderCount?: number;
}

export function BarChart({
  data,
  height = 86,
  style,
  highlightLast = true,
  showLabels = true,
  placeholderCount = 6,
}: BarChartProps): React.JSX.Element {
  const isEmpty = data.length === 0;
  const padding = Math.max(0, placeholderCount - data.length);

  const bars = isEmpty
    ? Array.from({ length: placeholderCount }, (_, index) => ({
        label: '',
        value: 0,
        index,
        filler: true,
      }))
    : [
        ...Array.from({ length: padding }, (_, index) => ({
          label: '',
          value: 0,
          index,
          filler: true,
        })),
        ...data.map((item, index) => ({ ...item, index: padding + index, filler: false })),
      ];

  const max = Math.max(...bars.map(bar => bar.value), 1);

  return (
    <View style={style}>
      <View style={[styles.plot, { height: scale(height) }]}>
        {bars.map(bar => (
          <Bar
            key={`${bar.label}-${bar.index}`}
            ratio={bar.filler ? 0 : bar.value / max}
            active={highlightLast && !bar.filler && bar.index === bars.length - 1}
            delay={bar.index * 70}
            empty={bar.filler}
          />
        ))}
      </View>
      {showLabels ? (
        <View style={styles.labels}>
          {bars.map(bar => (
            <View key={`label-${bar.label}-${bar.index}`} style={styles.labelSlot}>
              {bar.label ? (
                <Text numberOfLines={1} style={[typography.tiny, styles.label]}>
                  {bar.label}
                </Text>
              ) : (
                <View style={styles.labelPlaceholder} />
              )}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

interface BarProps {
  ratio: number;
  active: boolean;
  delay: number;
  empty: boolean;
}

function Bar({ ratio, active, delay, empty }: BarProps): React.JSX.Element {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 560,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, delay, ratio]);

  const barHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['6%', `${Math.max(8, Math.round(ratio * 100))}%`],
  });

  return (
    <View style={styles.barSlot}>
      <Animated.View style={[styles.bar, { height: empty ? '14%' : barHeight }]}>
        <LinearGradient
          colors={
            empty
              ? [colors.surfaceAlt, colors.surfaceMuted]
              : active
                ? ['#5A9BFF', '#2563EB']
                : ['#2B4472', '#1C2E4E']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill, styles.barFill]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  plot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: scale(8),
  },
  barSlot: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: radius.xs,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: radius.xs,
  },
  labels: {
    flexDirection: 'row',
    gap: scale(8),
    marginTop: scale(8),
  },
  labelSlot: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: colors.textFaint,
    letterSpacing: 0.6,
  },
  labelPlaceholder: {
    width: '62%',
    height: scale(3),
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
});
