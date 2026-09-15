import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { GradientButton } from '../../components/GradientButton';
import { BarChart } from '../../components/BarChart';
import { Icon } from '../../components/Icon';
import { Reveal } from '../../components/Reveal';
import { SectionLabel } from '../../components/Badge';
import { useQuizStats } from '../../context/QuizContext';
import { colors, fontSize, layout, radius, scale, typography } from '../../theme';
import { formatClock, formatShortDate } from '../../utils/format';
import type { DictionaryStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<DictionaryStackParamList, 'QuizResult'>;

export function QuizResultScreen({ route, navigation }: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { stats } = useQuizStats();
  const {
    score,
    correct,
    total,
    accuracy,
    durationSeconds,
    isBest,
    previousBest,
    weakestTopic,
  } = route.params;

  const chartData = useMemo(
    () =>
      [...stats.attempts]
        .slice(0, 6)
        .reverse()
        .map(attempt => ({
          label: new Date(attempt.date)
            .toLocaleDateString('en-GB', { month: 'short' })
            .toUpperCase(),
          value: attempt.score,
        })),
    [stats.attempts],
  );

  const headline =
    accuracy >= 90
      ? 'Excellent round — your terminology is sharp.'
      : accuracy >= 70
        ? 'Strong round — your terminology is holding up.'
        : accuracy >= 45
          ? 'Solid effort — a few terms still need work.'
          : 'Worth another run — revisit the dictionary first.';

  const secondsPerRound = Math.round(durationSeconds / (total / 3));

  return (
    <Screen edges={{ top: true }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: scale(26) + insets.bottom },
        ]}>
        <Reveal delay={40} style={styles.head} scaleFrom={0.9}>
          <View style={styles.tick}>
            <Icon name="check" size={scale(26)} color={colors.success} strokeWidth={2.6} />
          </View>
          <Text style={[typography.title, styles.title]}>Quiz complete</Text>
          <Text style={[typography.body, styles.subtitle]}>
            {headline}
            {weakestTopic ? ` ${capitalise(weakestTopic)} still needs a look.` : ''}
          </Text>
        </Reveal>

        <Reveal delay={130}>
          <View style={styles.scoreCard}>
            <LinearGradient
              colors={['#1E3763', '#122343']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <SectionLabel label="This quiz" style={styles.scoreLabel} />
            <Text style={[typography.metric, styles.scoreValue]}>{score}</Text>
            <Text
              style={[
                typography.small,
                styles.scoreDelta,
                isBest ? styles.scoreDeltaGood : null,
              ]}>
              {isBest
                ? previousBest > 0
                  ? `+${score - previousBest} on your previous best`
                  : 'Your first recorded score'
                : `${previousBest - score} short of your best`}
            </Text>
          </View>
        </Reveal>

        <Reveal delay={190} style={styles.grid}>
          <MetricTile
            label="Best score"
            value={String(stats.bestScore)}
            sub={stats.bestScoreDate ? `Set ${formatShortDate(stats.bestScoreDate)}` : '—'}
          />
          <MetricTile
            label="Accuracy"
            value={`${accuracy}%`}
            sub={`${correct} of ${total} cards`}
          />
          <MetricTile
            label="Correct matches"
            value={String(correct)}
            sub={`${total - correct} missed`}
          />
          <MetricTile
            label="Time"
            value={formatClock(durationSeconds)}
            sub={`${secondsPerRound}s per round`}
          />
        </Reveal>

        <Reveal delay={250}>
          <Card contentStyle={styles.chartCard}>
            <View style={styles.chartHead}>
              <Text style={[typography.bodyStrong, styles.chartTitle]}>Last six quizzes</Text>
              <Text style={[typography.label, styles.chartMeta]}>SCORE</Text>
            </View>
            <BarChart data={chartData} height={74} style={styles.chart} />
          </Card>
        </Reveal>

        <Reveal delay={310}>
          <GradientButton
            label="Restart quiz"
            glow
            style={styles.action}
            onPress={() => navigation.replace('Quiz')}
          />
          <GradientButton
            label="Back to dictionary"
            variant="neutral"
            size="md"
            style={styles.action}
            onPress={() => navigation.navigate('DictionaryHome')}
          />
        </Reveal>
      </ScrollView>
    </Screen>
  );
}

function MetricTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}): React.JSX.Element {
  return (
    <View style={styles.tile}>
      <Text style={[typography.label, styles.tileLabel]}>{label.toUpperCase()}</Text>
      <Text numberOfLines={1} style={[typography.heading, styles.tileValue]}>
        {value}
      </Text>
      <Text numberOfLines={1} style={[typography.tiny, styles.tileSub]}>
        {sub}
      </Text>
    </View>
  );
}

function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(layout.gutter),
    paddingTop: scale(24),
  },
  head: {
    alignItems: 'center',
    marginBottom: scale(24),
  },
  tick: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: 'rgba(52,201,138,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(52,201,138,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: scale(8),
    maxWidth: scale(300),
    fontSize: fontSize(14),
  },
  scoreCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
    padding: scale(18),
    marginBottom: scale(12),
  },
  scoreLabel: {
    color: 'rgba(196,214,244,0.68)',
  },
  scoreValue: {
    marginTop: scale(4),
  },
  scoreDelta: {
    marginTop: scale(4),
    color: colors.textMuted,
  },
  scoreDeltaGood: {
    color: colors.success,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
    marginBottom: scale(14),
  },
  tile: {
    width: '48%',
    flexGrow: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    padding: scale(13),
  },
  tileLabel: {
    fontSize: fontSize(9),
    color: colors.textFaint,
  },
  tileValue: {
    marginTop: scale(5),
  },
  tileSub: {
    marginTop: scale(3),
    color: colors.textMuted,
  },
  chartCard: {
    padding: scale(15),
  },
  chartHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartTitle: {
    flex: 1,
  },
  chartMeta: {
    color: colors.textFaint,
  },
  chart: {
    marginTop: scale(14),
  },
  action: {
    marginTop: scale(14),
  },
});
