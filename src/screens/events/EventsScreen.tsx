import React, { useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { SegmentedTabs } from '../../components/SegmentedTabs';
import { Reveal, Stagger } from '../../components/Reveal';
import { EmptyState } from '../../components/EmptyState';
import { EventCard } from '../../components/EventCard';
import { EventDetailSheet } from '../../components/EventDetailSheet';
import {
  eventFilters,
  EventFilter,
  filterEvents,
  groupEventsByDay,
  isLiveNow,
} from '../../data/events';
import { usePlans } from '../../context/PlansContext';
import { colors, fontSize, hitSlop, layout, scale, typography } from '../../theme';
import { ClubEvent } from '../../types';
import type { EventsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<EventsStackParamList, 'EventsHome'>;

export function EventsScreen({ navigation }: Props): React.JSX.Element {
  const { planFor, toggleGoing, toggleInterested, planCount } = usePlans();
  const [filter, setFilter] = useState<EventFilter>('Upcoming');
  const [selected, setSelected] = useState<ClubEvent | null>(null);

  const sections = useMemo(() => {
    const events = filterEvents(filter);
    return groupEventsByDay(events).map(group => ({
      title: group.label,
      data: group.data,
    }));
  }, [filter]);

  return (
    <Screen>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Reveal delay={40} style={styles.header}>
              <Text style={[typography.title, styles.screenTitle]}>What’s on</Text>
              <Pressable
                accessibilityRole="button"
                hitSlop={hitSlop}
                onPress={() => navigation.navigate('MyPlans')}
                style={({ pressed }) => [styles.plansLink, pressed && styles.pressed]}>
                <Text style={[typography.button, styles.plansLabel]}>My plans</Text>
                {planCount > 0 ? (
                  <View style={styles.plansCount}>
                    <Text style={[typography.tiny, styles.plansCountText]}>{planCount}</Text>
                  </View>
                ) : null}
              </Pressable>
            </Reveal>

            <Reveal delay={90}>
              <SegmentedTabs
                options={eventFilters}
                value={filter}
                onChange={setFilter}
                style={styles.tabs}
              />
            </Reveal>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={[typography.smallStrong, styles.dayLabel]}>{section.title}</Text>
        )}
        renderItem={({ item, index }) => (
          <Stagger index={index} base={150} step={55} style={styles.cardWrap}>
            <View style={styles.timelineRow}>
              <View style={styles.timeline}>
                <View style={[styles.timelineDot, isLiveNow(item) && styles.timelineDotLive]} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.cardColumn}>
                <EventCard
                  event={item}
                  plan={planFor(item.id)}
                  onPress={() => setSelected(item)}
                  onPrimary={() => toggleGoing(item.id)}
                  onSecondary={() => toggleInterested(item.id)}
                />
              </View>
            </View>
          </Stagger>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="calendar"
            title="Nothing scheduled here"
            message={
              filter === 'Tournaments'
                ? 'No tournaments are listed at the moment. Check the upcoming tab for club nights and live music.'
                : 'No events fall inside this period. Switch to Upcoming to see the full club calendar.'
            }
            style={styles.empty}
          />
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

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(layout.gutter),
    paddingBottom: scale(layout.tabBarHeight + 46),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scale(12),
    marginBottom: scale(16),
  },
  screenTitle: {
    flex: 1,
  },
  plansLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(7),
  },
  plansLabel: {
    color: colors.primary,
    fontSize: fontSize(14),
  },
  plansCount: {
    minWidth: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    paddingHorizontal: scale(5),
    backgroundColor: 'rgba(59,130,246,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plansCountText: {
    color: '#8CB8FF',
    fontWeight: '700',
    fontSize: fontSize(10),
  },
  pressed: {
    opacity: 0.65,
  },
  tabs: {
    marginBottom: scale(6),
  },
  dayLabel: {
    marginTop: scale(16),
    marginBottom: scale(10),
    color: colors.textSecondary,
  },
  cardWrap: {
    marginBottom: scale(10),
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timeline: {
    width: scale(16),
    alignItems: 'center',
    paddingTop: scale(16),
  },
  timelineDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  timelineDotLive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  timelineLine: {
    flex: 1,
    width: 1,
    backgroundColor: colors.borderSoft,
    marginTop: scale(4),
  },
  cardColumn: {
    flex: 1,
    paddingLeft: scale(8),
  },
  empty: {
    marginTop: scale(40),
  },
});
