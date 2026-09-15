import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { ballColors, colors, fontSize, radius, scale, typography } from '../theme';

export type BadgeTone = 'neutral' | 'primary' | 'gold' | 'success' | 'danger' | 'live';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  uppercase?: boolean;
  dot?: boolean;
}

const tones: Record<BadgeTone, { background: string; border: string; text: string }> = {
  neutral: {
    background: colors.surfaceAlt,
    border: colors.border,
    text: colors.textSecondary,
  },
  primary: {
    background: 'rgba(59,130,246,0.16)',
    border: 'rgba(59,130,246,0.42)',
    text: '#8CB8FF',
  },
  gold: {
    background: colors.goldSoft,
    border: 'rgba(214,168,78,0.42)',
    text: colors.gold,
  },
  success: {
    background: colors.successSoft,
    border: 'rgba(52,201,138,0.42)',
    text: colors.success,
  },
  danger: {
    background: colors.dangerSoft,
    border: 'rgba(229,84,79,0.42)',
    text: colors.danger,
  },
  live: {
    background: 'transparent',
    border: 'transparent',
    text: colors.success,
  },
};

export function Badge({
  label,
  tone = 'neutral',
  style,
  labelStyle,
  uppercase = true,
  dot = false,
}: BadgeProps): React.JSX.Element {
  const palette = tones[tone];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: palette.background,
          borderColor: palette.border,
        },
        tone === 'live' && styles.bare,
        style,
      ]}>
      {dot ? <View style={[styles.dot, { backgroundColor: palette.text }]} /> : null}
      <Text
        numberOfLines={1}
        style={[
          typography.tiny,
          styles.label,
          { color: palette.text },
          uppercase && styles.uppercase,
          labelStyle,
        ]}>
        {uppercase ? label.toUpperCase() : label}
      </Text>
    </View>
  );
}

interface BallBadgeProps {
  ball: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function BallBadge({ ball, size = 16, style }: BallBadgeProps): React.JSX.Element {
  const box = scale(size);
  return (
    <View
      style={[
        styles.ball,
        {
          width: box,
          height: box,
          borderRadius: box / 2,
          backgroundColor: ballColors[ball] ?? colors.surfaceAlt,
        },
        style,
      ]}
    />
  );
}

interface SectionLabelProps {
  label: string;
  style?: StyleProp<TextStyle>;
}

export function SectionLabel({ label, style }: SectionLabelProps): React.JSX.Element {
  return <Text style={[typography.label, style]}>{label.toUpperCase()}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: scale(24),
    paddingHorizontal: scale(9),
    borderRadius: radius.xs,
    borderWidth: 1,
  },
  bare: {
    paddingHorizontal: 0,
    borderWidth: 0,
  },
  label: {
    fontSize: fontSize(10),
    fontWeight: '700',
  },
  uppercase: {
    letterSpacing: 0.8,
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    marginRight: scale(6),
  },
  ball: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
});
