import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, radius, scale, shadow, typography, fontSize } from '../theme';
import { Icon, IconName } from './Icon';

export type ButtonVariant = 'primary' | 'light' | 'gold' | 'success' | 'danger' | 'ghost' | 'neutral';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  glow?: boolean;
}

const variantGradients: Record<ButtonVariant, string[]> = {
  primary: gradients.primary,
  light: gradients.light,
  gold: gradients.gold,
  success: gradients.success,
  danger: gradients.danger,
  ghost: gradients.ghost,
  neutral: gradients.neutral,
};

const variantLabelColor: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  light: '#0A1120',
  gold: '#20160A',
  success: '#04150E',
  danger: '#FFFFFF',
  ghost: colors.primary,
  neutral: colors.textPrimary,
};

const sizeStyle: Record<ButtonSize, { height: number; padding: number; font: number }> = {
  sm: { height: 38, padding: 14, font: 13 },
  md: { height: 48, padding: 18, font: 15 },
  lg: { height: 56, padding: 22, font: 16 },
};

export function GradientButton({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  fullWidth = true,
  iconLeft,
  iconRight,
  style,
  labelStyle,
  glow = false,
}: GradientButtonProps): React.JSX.Element {
  const pressed = useRef(new Animated.Value(0)).current;

  const animate = (toValue: number) =>
    Animated.spring(pressed, {
      toValue,
      useNativeDriver: true,
      speed: 34,
      bounciness: 0,
    }).start();

  const dimensions = sizeStyle[size];
  const palette = disabled ? gradients.primaryDisabled : variantGradients[variant];
  const labelColor = disabled ? colors.textFaint : variantLabelColor[variant];

  return (
    <Animated.View
      style={[
        fullWidth && styles.fullWidth,
        {
          transform: [
            {
              scale: pressed.interpolate({ inputRange: [0, 1], outputRange: [1, 0.972] }),
            },
          ],
        },
        style,
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => animate(1)}
        onPressOut={() => animate(0)}>
        <View
          style={[
            styles.button,
            {
              height: scale(dimensions.height),
              paddingHorizontal: scale(dimensions.padding),
              borderRadius: radius.pill,
            },
            variant === 'ghost' && styles.ghostBorder,
            glow && !disabled && styles.glow,
          ]}>
          <LinearGradient
            colors={palette}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, styles.fill]}
          />
          {iconLeft ? (
            <View style={styles.iconLeft}>
              <Icon name={iconLeft} size={scale(18)} color={labelColor} />
            </View>
          ) : null}
          <Text
            numberOfLines={1}
            style={[
              typography.button,
              { color: labelColor, fontSize: fontSize(dimensions.font) },
              labelStyle,
            ]}>
            {label}
          </Text>
          {iconRight ? (
            <View style={styles.iconRight}>
              <Icon name={iconRight} size={scale(18)} color={labelColor} />
            </View>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

interface GradientIconButtonProps {
  name: IconName;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: number;
  iconSize?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  round?: boolean;
}

export function GradientIconButton({
  name,
  onPress,
  variant = 'primary',
  size = 48,
  iconSize,
  disabled = false,
  style,
  round = true,
}: GradientIconButtonProps): React.JSX.Element {
  const pressed = useRef(new Animated.Value(0)).current;

  const animate = (toValue: number) =>
    Animated.spring(pressed, {
      toValue,
      useNativeDriver: true,
      speed: 34,
      bounciness: 0,
    }).start();

  const palette = disabled ? gradients.primaryDisabled : variantGradients[variant];
  const iconColor = disabled ? colors.textFaint : variantLabelColor[variant];
  const box = scale(size);

  return (
    <Animated.View
      style={[
        {
          transform: [
            { scale: pressed.interpolate({ inputRange: [0, 1], outputRange: [1, 0.94] }) },
          ],
        },
        style,
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => animate(1)}
        onPressOut={() => animate(0)}>
        <View
          style={[
            styles.iconButton,
            {
              width: box,
              height: box,
              borderRadius: round ? box / 2 : radius.md,
            },
            variant === 'ghost' && styles.ghostBorder,
          ]}>
          <LinearGradient
            colors={palette}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, styles.fill]}
          />
          <Icon name={name} size={iconSize ? scale(iconSize) : box * 0.46} color={iconColor} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    alignSelf: 'stretch',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radius.pill,
  },
  ghostBorder: {
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.38)',
  },
  glow: {
    ...shadow(8),
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
  },
  iconLeft: {
    marginRight: scale(8),
  },
  iconRight: {
    marginLeft: scale(8),
  },
});
