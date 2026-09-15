import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { NavHeader } from '../../components/NavHeader';
import { SegmentedTabs } from '../../components/SegmentedTabs';
import { EventCard } from '../../components/EventCard';
import { EventDetailSheet } from '../../components/EventDetailSheet';
import { GradientButton } from '../../components/GradientButton';
import { Card } from '../../components/Card';
import { Icon } from '../../components/Icon';
import { Reveal, Stagger } from '../../components/Reveal';
import { SectionLabel } from '../../components/Badge';
import { usePlans } from '../../context/PlansContext';
import { colors, fontSize, layout, radius, scale, typography } from '../../theme';
import { ClubEvent } from '../../types';
import type { EventsStackParamList } from '../../navigation/types';

const tabs = ['Going', 'Interested', 'Past'] as const;
type PlanTab = (typeof tabs)[number];

type Props = NativeStackScreenProps<EventsStackParamList, 'MyPlans'>;

export function MyPlansScreen({ navigation }: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { eventsFor, planFor, toggleGoing, toggleInterested, popularThisWeek } = usePlans();
  const [tab, setTab] = useState<PlanTab>('Going');
  const [selected, setSelected] = useState<ClubEvent | null>(null);

  const data = useMemo(() => {
    if (tab === 'Going') {
      return eventsFor('going');
    }
    if (tab === 'Interested') {
      return eventsFor('interested');
    }
    return eventsFor('past');
  }, [tab, eventsFor]);

  return (
    <Screen edges={{ top: true }}>
      <NavHeader backLabel="What’s on" onBack={() => navigation.goBack()} />

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: scale(36) + insets.bottom },
        ]}
        ListHeaderComponent={
          <View>
            <Reveal delay={40}>
              <Text style={[typography.title, styles.screenTitle]}>My plans</Text>
            </Reveal>
            <Reveal delay={90}>
              <SegmentedTabs options={tabs} value={tab} onChange={setTab} style={styles.tabs} />
            </Reveal>
          </View>
        }
        renderItem={({ item, index }) => (
          <Stagger index={index} base={140} step={55} style={styles.cardWrap}>
            <EventCard
              event={item}
              plan={planFor(item.id)}
              onPress={() => setSelected(item)}
              onPrimary={() => toggleGoing(item.id)}
              onSecondary={() => toggleInterested(item.id)}
            />
          </Stagger>
        )}
        ListEmptyComponent={
          <Reveal delay={150}>
            <View style={styles.empty}>
              <View style={styles.emptyBadge}>
                <Icon name="events" size={scale(26)} color={colors.textMuted} />
              </View>
              <Text style={[typography.heading, styles.emptyTitle]}>
                {tab === 'Past' ? 'No past events yet' : `Nothing in your ${tab.toLowerCase()} list`}
              </Text>
              <Text style={[typography.body, styles.emptyBody]}>
                {tab === 'Past'
                  ? 'Events you planned will move here once their date has passed.'
                  : tab === 'Going'
                    ? 'Tap Add to plans on any event and it will appear here, with a reminder an hour before it starts.'
                    : 'Mark an event as interested and it will be kept here while you decide.'}
              </Text>

              <GradientButton
                label="Browse this week"
                glow
                style={styles.emptyAction}
                onPress={() => navigation.goBack()}
              />

              {popularThisWeek.length > 0 ? (
                <Card contentStyle={styles.popularCard} style={styles.popularWrap}>
                  <SectionLabel label="Popular this week" style={styles.popularLabel} />
                  {popularThisWeek.map((event, index) => (
                    <Pressable
                      key={event.id}
                      accessibilityRole="button"
                      onPress={() => setSelected(event)}
                      style={({ pressed }) => [
                        styles.popularRow,
                        index === popularThisWeek.length - 1 && styles.popularRowLast,
                        pressed && styles.pressed,
                      ]}>
                      <Text numberOfLines={1} style={[typography.smallStrong, styles.popularName]}>
                        {event.title}
                      </Text>
                      <Text numberOfLines={1} style={[typography.tiny, styles.popularTime]}>
                        {shortWhen(event)}
                      </Text>
                    </Pressable>
                  ))}
                </Card>
              ) : null}
            </View>
          </Reveal>
        }
      />

      <EventDetailSheet
        event={selected}
        plan={selected ? planFor(selected.id) : undefined}
        onClose={() => setSelected(null)}
        onToggleGoing={() => selected && toggleGoing(selected.id)}
        onToggleInterested={() => selected && toggleInterested(selected.id)}
      />
    </Screen>
  );
}

function shortWhen(event: ClubEvent): string {
  const date = new Date(event.isoDate);
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'short' });
  const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${weekday} ${time}`;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(layout.gutter),
    paddingTop: scale(6),
  },
  screenTitle: {
    marginBottom: scale(16),
  },
  tabs: {
    marginBottom: scale(16),
  },
  cardWrap: {
    marginBottom: scale(10),
  },
  empty: {
    alignItems: 'center',
    paddingTop: scale(30),
  },
  emptyBadge: {
    width: scale(74),
    height: scale(74),
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(18),
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyBody: {
    textAlign: 'center',
    marginTop: scale(8),
    fontSize: fontSize(14),
    maxWidth: scale(300),
  },
  emptyAction: {
    alignSelf: 'stretch',
    marginTop: scale(22),
  },
  popularWrap: {
    alignSelf: 'stretch',
    marginTop: scale(18),
  },
  popularCard: {
    paddingHorizontal: scale(15),
    paddingTop: scale(14),
    paddingBottom: scale(4),
  },
  popularLabel: {
    marginBottom: scale(4),
  },
  popularRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(12),
    paddingVertical: scale(11),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  popularRowLast: {
    borderBottomWidth: 0,
  },
  popularName: {
    flex: 1,
  },
  popularTime: {
    color: colors.textMuted,
  },
  pressed: {
    opacity: 0.65,
  },
});
