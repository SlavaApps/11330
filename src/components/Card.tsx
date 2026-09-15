import React, { PropsWithChildren } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, radius, scale, shadow } from '../theme';

interface CardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  palette?: string[];
  onPress?: () => void;
  highlight?: boolean;
  padded?: boolean;
  borderColor?: string;
  elevated?: boolean;
}

export function Card({
  children,
  style,
  contentStyle,
  palette,
  onPress,
  highlight = false,
  padded = true,
  borderColor,
  elevated = false,
}: CardProps): React.JSX.Element {
  const body = (
    <View
      style={[
        styles.card,
        { borderColor: borderColor ?? (highlight ? colors.borderStrong : colors.border) },
        padded && styles.padded,
        elevated && styles.elevated,
        contentStyle,
      ]}>
      <LinearGradient
        colors={palette ?? (highlight ? gradients.cardHighlight : gradients.card)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );

  if (!onPress) {
    return <View style={style}>{body}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}>
      {body}
    </Pressable>
  );
}

export function Divider({ style }: { style?: StyleProp<ViewStyle> }): React.JSX.Element {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  padded: {
    padding: scale(16),
  },
  elevated: {
    ...shadow(6),
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSoft,
  },
});
