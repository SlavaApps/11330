import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSize, radius, scale, typography } from '../theme';

interface SegmentedTabsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  compact?: boolean;
}

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  style,
  scrollable = false,
  compact = false,
}: SegmentedTabsProps<T>): React.JSX.Element {
  const items = options.map(option => {
    const active = option === value;
    return (
      <Pressable
        key={option}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        onPress={() => onChange(option)}
        style={[
          styles.item,
          compact && styles.itemCompact,
          scrollable ? styles.itemScroll : styles.itemFlex,
        ]}>
        {active ? (
          <LinearGradient
            colors={['#2A3D5E', '#1B2A44']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, styles.activeFill]}
          />
        ) : null}
        <Text
          numberOfLines={1}
          style={[
            typography.smallStrong,
            styles.label,
            { fontSize: fontSize(compact ? 12 : 13) },
            active ? styles.labelActive : styles.labelIdle,
          ]}>
          {option}
        </Text>
      </Pressable>
    );
  });

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, style]}>
        {items}
      </ScrollView>
    );
  }

  return <View style={[styles.track, style]}>{items}</View>;
}

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Chip({ label, active = false, onPress, style }: ChipProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipIdle, style]}>
      <Text
        numberOfLines={1}
        style={[typography.smallStrong, active ? styles.labelActive : styles.labelIdle]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: scale(4),
  },
  scrollContent: {
    flexDirection: 'row',
    gap: scale(8),
    paddingRight: scale(18),
  },
  item: {
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    overflow: 'hidden',
    paddingHorizontal: scale(12),
  },
  itemCompact: {
    height: scale(32),
  },
  itemFlex: {
    flex: 1,
  },
  itemScroll: {
    minWidth: scale(72),
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  activeFill: {
    borderRadius: radius.sm,
  },
  label: {
    textAlign: 'center',
  },
  labelActive: {
    color: colors.textPrimary,
  },
  labelIdle: {
    color: colors.textMuted,
  },
  chip: {
    height: scale(30),
    paddingHorizontal: scale(12),
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: 'rgba(59,130,246,0.2)',
    borderColor: 'rgba(59,130,246,0.5)',
  },
  chipIdle: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderSoft,
  },
});
