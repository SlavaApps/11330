import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, radius, scale, typography } from '../theme';
import { Icon, IconName } from './Icon';
import { Reveal } from './Reveal';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  message: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  message,
  style,
  children,
}: EmptyStateProps): React.JSX.Element {
  return (
    <Reveal style={[styles.root, style]} delay={80}>
      <View style={styles.badge}>
        <LinearGradient
          colors={['#1A2942', '#121D31']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Icon name={icon} size={scale(28)} color={colors.textMuted} />
      </View>
      <Text style={[typography.heading, styles.title]}>{title}</Text>
      <Text style={[typography.body, styles.message]}>{message}</Text>
      {children ? <View style={styles.children}>{children}</View> : null}
    </Reveal>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingVertical: scale(24),
    paddingHorizontal: scale(8),
  },
  badge: {
    width: scale(74),
    height: scale(74),
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(18),
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginTop: scale(8),
    maxWidth: scale(300),
  },
  children: {
    alignSelf: 'stretch',
    marginTop: scale(20),
  },
});
