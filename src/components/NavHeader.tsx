import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fontSize, hitSlop, layout, scale, typography } from '../theme';
import { Icon, IconName } from './Icon';

interface NavHeaderAction {
  icon: IconName;
  onPress: () => void;
  accessibilityLabel: string;
  tint?: string;
}

interface NavHeaderProps {
  title?: string;
  backLabel?: string;
  onBack?: () => void;
  actions?: NavHeaderAction[];
  rightLabel?: { text: string; onPress: () => void };
  style?: StyleProp<ViewStyle>;
  center?: boolean;
}

export function NavHeader({
  title,
  backLabel,
  onBack,
  actions,
  rightLabel,
  style,
  center = false,
}: NavHeaderProps): React.JSX.Element {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={backLabel ?? 'Back'}
            hitSlop={hitSlop}
            onPress={onBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <Icon name="chevron-left" size={scale(20)} color={colors.primary} />
            {backLabel ? (
              <Text numberOfLines={1} style={[typography.button, styles.backLabel]}>
                {backLabel}
              </Text>
            ) : null}
          </Pressable>
        ) : null}
      </View>

      {title ? (
        <Text
          numberOfLines={1}
          style={[typography.subheading, styles.title, center && styles.titleCenter]}>
          {title}
        </Text>
      ) : (
        <View style={styles.title} />
      )}

      <View style={[styles.side, styles.sideRight]}>
        {rightLabel ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={hitSlop}
            onPress={rightLabel.onPress}
            style={({ pressed }) => pressed && styles.pressed}>
            <Text style={[typography.button, styles.rightLabel]}>{rightLabel.text}</Text>
          </Pressable>
        ) : null}
        {actions?.map(action => (
          <Pressable
            key={action.icon + action.accessibilityLabel}
            accessibilityRole="button"
            accessibilityLabel={action.accessibilityLabel}
            hitSlop={hitSlop}
            onPress={action.onPress}
            style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
            <Icon name={action.icon} size={scale(21)} color={action.tint ?? colors.textSecondary} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scale(44),
    paddingHorizontal: scale(layout.gutter),
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: scale(60),
  },
  sideRight: {
    justifyContent: 'flex-end',
    gap: scale(14),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -scale(4),
  },
  backLabel: {
    color: colors.primary,
    marginLeft: scale(2),
    fontSize: fontSize(16),
    maxWidth: scale(120),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: scale(8),
  },
  titleCenter: {
    textAlign: 'center',
  },
  rightLabel: {
    color: colors.primary,
    fontSize: fontSize(15),
  },
  action: {
    padding: scale(2),
  },
  pressed: {
    opacity: 0.6,
  },
});
