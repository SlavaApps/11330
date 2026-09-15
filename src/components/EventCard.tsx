import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Badge } from './Badge';
import { Icon } from './Icon';
import { isLiveNow } from '../data/events';
import { colors, fontSize, radius, scale, typography } from '../theme';
import { ClubEvent, PlanState } from '../types';

interface EventCardProps {
  event: ClubEvent;
  plan?: PlanState;
  onPress: () => void;
  onPrimary: () => void;
  onSecondary: () => void;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
}

export function EventCard({
  event,
  plan,
  onPress,
  onPrimary,
  onSecondary,
  style,
  compact = false,
}: EventCardProps): React.JSX.Element {
  const going = plan === 'going';
  const interested = plan === 'interested';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${event.title}, ${event.dateLabel}`}
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}>
      <View style={[styles.card, going && styles.cardGoing]}>
        <LinearGradient
          colors={going ? ['#1B2E4E', '#101B2E'] : ['#16233B', '#0E1727']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.head}>
          <Badge label={event.category} tone={badgeTone(event)} />
          {isLiveNow(event) ? (
            <Badge label="Live now" tone="live" dot uppercase={false} />
          ) : event.badge ? (
            <Text numberOfLines={1} style={[typography.tiny, styles.badgeText]}>
              {event.badge}
            </Text>
          ) : null}
        </View>

        <Text numberOfLines={2} style={[typography.subheading, styles.title]}>
          {event.title}
        </Text>

        {!compact ? (
          <Text numberOfLines={2} style={[typography.small, styles.detail]}>
            {event.detail}
          </Text>
        ) : null}

        <View style={styles.metaRow}>
          <Icon name="clock" size={scale(13)} color={colors.textFaint} />
          <Text numberOfLines={1} style={[typography.tiny, styles.metaTime]}>
            {event.timeLabel}
          </Text>
          <View style={styles.metaDivider} />
          <Icon name="pin" size={scale(13)} color={colors.textFaint} />
          <Text numberOfLines={1} style={[typography.tiny, styles.meta]}>
            {event.venue}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: going }}
            onPress={onPrimary}
            style={({ pressed }) => [
              styles.action,
              going ? styles.actionOn : styles.actionOff,
              pressed && styles.pressed,
            ]}>
            {going ? (
              <Icon name="check" size={scale(14)} color="#8CB8FF" strokeWidth={2.4} />
            ) : null}
            <Text
              numberOfLines={1}
              style={[
                typography.smallStrong,
                going ? styles.actionLabelOn : styles.actionLabelOff,
              ]}>
              {going ? 'Added to plans' : 'Add to plans'}
            </Text>
          </Pressable>

          {!going ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: interested }}
              onPress={onSecondary}
              style={({ pressed }) => [
                styles.interested,
                interested && styles.interestedOn,
                pressed && styles.pressed,
              ]}>
              <Text
                numberOfLines={1}
                style={[
                  typography.smallStrong,
                  interested ? styles.interestedLabelOn : styles.interestedLabel,
                ]}>
                {interested ? 'Interested' : 'I’m interested'}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

function badgeTone(event: ClubEvent): 'primary' | 'gold' | 'success' | 'neutral' {
  switch (event.category) {
    case 'Tournament':
      return 'primary';
    case 'Finale':
    case 'Promotion':
      return 'gold';
    case 'Club night':
    case 'Social':
      return 'success';
    default:
      return 'neutral';
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    padding: scale(14),
  },
  cardGoing: {
    borderColor: 'rgba(59,130,246,0.38)',
  },
  pressed: {
    opacity: 0.8,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(8),
  },
  badgeText: {
    color: colors.textMuted,
    flexShrink: 1,
  },
  title: {
    marginTop: scale(11),
  },
  detail: {
    marginTop: scale(7),
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    marginTop: scale(11),
  },
  metaTime: {
    color: colors.textMuted,
    flexShrink: 0,
  },
  meta: {
    color: colors.textMuted,
    flex: 1,
  },
  metaDivider: {
    width: 1,
    height: scale(10),
    backgroundColor: colors.borderStrong,
    marginHorizontal: scale(4),
  },
  actions: {
    flexDirection: 'row',
    gap: scale(8),
    marginTop: scale(14),
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    height: scale(40),
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: scale(10),
  },
  actionOn: {
    borderColor: 'rgba(59,130,246,0.42)',
    backgroundColor: 'rgba(59,130,246,0.14)',
  },
  actionOff: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceAlt,
  },
  actionLabelOn: {
    color: '#8CB8FF',
    fontSize: fontSize(13),
  },
  actionLabelOff: {
    color: colors.textPrimary,
    fontSize: fontSize(13),
  },
  interested: {
    height: scale(40),
    paddingHorizontal: scale(14),
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestedOn: {
    borderColor: 'rgba(214,168,78,0.42)',
    backgroundColor: 'rgba(214,168,78,0.12)',
  },
  interestedLabel: {
    color: colors.textMuted,
    fontSize: fontSize(13),
  },
  interestedLabelOn: {
    color: colors.gold,
    fontSize: fontSize(13),
  },
});
