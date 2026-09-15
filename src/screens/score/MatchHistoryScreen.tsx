import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { NavHeader } from '../../components/NavHeader';
import { Card } from '../../components/Card';
import { Badge, SectionLabel } from '../../components/Badge';
import { BarChart } from '../../components/BarChart';
import { GradientButton } from '../../components/GradientButton';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { Icon } from '../../components/Icon';
import { Reveal, Stagger } from '../../components/Reveal';
import { useMatch } from '../../context/MatchContext';
import { colors, fontSize, hitSlop, layout, radius, scale, typography } from '../../theme';
import { formatDate, formatDuration } from '../../utils/format';
import { SavedMatch } from '../../types';
import type { ScoreStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ScoreStackParamList, 'MatchHistory'>;

export function MatchHistoryScreen({ navigation }: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { savedMatches, stats, deleteSavedMatch, clearHistory } = useMatch();
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <Screen edges={{ top: true }}>
      <NavHeader
        backLabel="Scoreboard"
        onBack={() => navigation.goBack()}
        actions={
          savedMatches.length > 0
            ? [
                {
                  icon: 'trash',
                  accessibilityLabel: 'Clear match history',
                  onPress: () => setConfirmClear(true),
                },
              ]
            : undefined
        }
      />

      <FlatList
        data={savedMatches}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: scale(36) + insets.bottom },
        ]}
        ListHeaderComponent={
          <View>
            <Reveal delay={40}>
              <Text style={[typography.title, styles.screenTitle]}>Match history</Text>
            </Reveal>

            <Reveal delay={90} style={styles.statsRow}>
              <StatTile label="Played" value={stats.hasData ? String(stats.played) : '—'} />
              <StatTile label="Won" value={stats.hasData ? String(stats.won) : '—'} />
              <StatTile
                label="Avg break"
                value={stats.averageBreak > 0 ? String(stats.averageBreak) : '—'}
              />
            </Reveal>

            <Reveal delay={150}>
              <Card contentStyle={styles.chartCard}>
                <View style={styles.chartHead}>
                  <Text style={[typography.bodyStrong, styles.chartTitle]}>Frame win rate</Text>
                  {stats.monthOverMonth !== null ? (
                    <Text
                      style={[
                        typography.tiny,
                        styles.chartDelta,
                        stats.monthOverMonth >= 0 ? styles.deltaUp : styles.deltaDown,
                      ]}>
                      {stats.monthOverMonth >= 0 ? '+' : ''}
                      {stats.monthOverMonth}% MoM
                    </Text>
                  ) : (
                    <Text style={[typography.label, styles.chartNoData]}>
                      {stats.hasData ? 'ONE MONTH' : 'NO DATA'}
                    </Text>
                  )}
                </View>
                <BarChart data={stats.frameWinRate} height={78} style={styles.chart} />
              </Card>
            </Reveal>

            {savedMatches.length > 0 ? (
              <Reveal delay={210}>
                <SectionLabel label="Saved matches" style={styles.listLabel} />
              </Reveal>
            ) : null}
          </View>
        }
        renderItem={({ item, index }) => (
          <Stagger index={index} base={230} step={50} style={styles.matchWrap}>
            <MatchRow match={item} onDelete={() => deleteSavedMatch(item.id)} />
          </Stagger>
        )}
        ListEmptyComponent={
          <Reveal delay={230}>
            <View style={styles.emptyWrap}>
              <View style={styles.emptyBadge}>
                <View style={styles.emptyTable} />
              </View>
              <Text style={[typography.heading, styles.emptyTitle]}>No matches saved yet</Text>
              <Text style={[typography.body, styles.emptyBody]}>
                Score your first frame on the scoreboard and tap Save match. Your win rate,
                average break and match durations will start building here.
              </Text>

              <View style={styles.emptyList}>
                <SectionLabel label="What you'll see here" style={styles.emptyListLabel} />
                <EmptyPoint text="Player names, final score and frames won" />
                <EmptyPoint text="Match date, duration and winner" />
                <EmptyPoint text="Season charts once two months are saved" />
              </View>

              <GradientButton
                label="Start a new match"
                glow
                style={styles.emptyAction}
                onPress={() => navigation.goBack()}
              />
            </View>
          </Reveal>
        }
      />

      <ConfirmDialog
        visible={confirmClear}
        title="Clear match history?"
        message="Every saved match, along with the win-rate and average-break statistics built from them, will be removed from this device."
        confirmLabel="Clear history"
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => {
          clearHistory();
          setConfirmClear(false);
        }}
      />
    </Screen>
  );
}

function MatchRow({
  match,
  onDelete,
}: {
  match: SavedMatch;
  onDelete: () => void;
}): React.JSX.Element {
  const oneWon = match.winner === match.playerOne;

  return (
    <Card contentStyle={styles.matchCard}>
      <View style={styles.matchHead}>
        <Text numberOfLines={1} style={[typography.tiny, styles.matchDate]}>
          {formatDate(match.playedAt)} · {formatDuration(match.durationMinutes)}
        </Text>
        <Badge label="Winner" tone="gold" />
      </View>

      <View style={styles.matchScoreRow}>
        <Text numberOfLines={1} style={[typography.bodyStrong, styles.matchName, oneWon && styles.matchNameWin]}>
          {match.playerOne}
        </Text>
        <Text style={[typography.subheading, styles.matchScore]}>
          {match.scoreOne} — {match.scoreTwo}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            typography.bodyStrong,
            styles.matchName,
            styles.matchNameRight,
            !oneWon && styles.matchNameWin,
          ]}>
          {match.playerTwo}
        </Text>
      </View>

      <View style={styles.matchFoot}>
        <Text style={[typography.tiny, styles.matchMeta]}>
          Frames {match.framesOne} – {match.framesTwo}
          {match.highestBreak > 0 ? ` · High break ${match.highestBreak}` : ''}
        </Text>
        <View style={styles.matchFootRight}>
          <Text numberOfLines={1} style={[typography.tiny, styles.matchWinner]}>
            {match.winner}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Delete this match"
            hitSlop={hitSlop}
            onPress={onDelete}
            style={({ pressed }) => pressed && styles.pressed}>
            <Icon name="trash" size={scale(15)} color={colors.textFaint} />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

function StatTile({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <View style={styles.statTile}>
      <Text style={[typography.label, styles.statLabel]}>{label.toUpperCase()}</Text>
      <Text numberOfLines={1} style={[typography.heading, styles.statValue]}>
        {value}
      </Text>
    </View>
  );
}

function EmptyPoint({ text }: { text: string }): React.JSX.Element {
  return (
    <View style={styles.emptyPoint}>
      <View style={styles.emptyDot} />
      <Text style={[typography.small, styles.emptyPointText]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(layout.gutter),
    paddingTop: scale(6),
  },
  screenTitle: {
    marginBottom: scale(16),
  },
  statsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: scale(14),
  },
  statTile: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    padding: scale(13),
  },
  statLabel: {
    fontSize: fontSize(9),
    color: colors.textFaint,
  },
  statValue: {
    marginTop: scale(5),
  },
  chartCard: {
    padding: scale(15),
    marginBottom: scale(20),
  },
  chartHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  chartTitle: {
    flex: 1,
  },
  chartDelta: {
    fontWeight: '700',
  },
  deltaUp: {
    color: colors.success,
  },
  deltaDown: {
    color: colors.danger,
  },
  chartNoData: {
    color: colors.textFaint,
  },
  chart: {
    marginTop: scale(14),
  },
  listLabel: {
    marginBottom: scale(10),
  },
  matchWrap: {
    marginBottom: scale(10),
  },
  matchCard: {
    padding: scale(14),
  },
  matchHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  matchDate: {
    flex: 1,
    color: colors.textMuted,
  },
  matchScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(12),
    gap: scale(8),
  },
  matchName: {
    flex: 1,
    fontSize: fontSize(14),
    color: colors.textSecondary,
  },
  matchNameRight: {
    textAlign: 'right',
  },
  matchNameWin: {
    color: colors.textPrimary,
  },
  matchScore: {
    letterSpacing: 0.4,
  },
  matchFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(12),
    paddingTop: scale(11),
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    gap: scale(10),
  },
  matchMeta: {
    flex: 1,
    color: colors.textMuted,
  },
  matchFootRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    flexShrink: 1,
  },
  matchWinner: {
    color: colors.gold,
    maxWidth: scale(90),
  },
  pressed: {
    opacity: 0.6,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingTop: scale(12),
  },
  emptyBadge: {
    width: scale(78),
    height: scale(78),
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(18),
  },
  emptyTable: {
    width: scale(40),
    height: scale(24),
    borderRadius: scale(5),
    borderWidth: 2,
    borderColor: 'rgba(63,168,96,0.7)',
    backgroundColor: 'rgba(63,168,96,0.16)',
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyBody: {
    textAlign: 'center',
    marginTop: scale(8),
    fontSize: fontSize(14),
  },
  emptyList: {
    alignSelf: 'stretch',
    marginTop: scale(22),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    padding: scale(15),
  },
  emptyListLabel: {
    marginBottom: scale(12),
  },
  emptyPoint: {
    flexDirection: 'row',
    marginBottom: scale(9),
  },
  emptyDot: {
    width: scale(5),
    height: scale(5),
    borderRadius: scale(3),
    backgroundColor: colors.primary,
    marginTop: scale(7),
    marginRight: scale(10),
  },
  emptyPointText: {
    flex: 1,
    color: colors.textSecondary,
  },
  emptyAction: {
    alignSelf: 'stretch',
    marginTop: scale(22),
  },
});
