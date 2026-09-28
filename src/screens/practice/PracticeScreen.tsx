import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { NavHeader } from '../../components/NavHeader';
import { Card } from '../../components/Card';
import { GradientButton } from '../../components/GradientButton';
import { Chip } from '../../components/SegmentedTabs';
import { ProgressBar } from '../../components/ProgressBar';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { usePractice } from '../../context/PracticeContext';
import { practiceDrills } from '../../data/practice';
import { accuracy, drillStats, sessionsThisWeek } from '../../utils/practice';
import { colors, layout, scale, typography, radius } from '../../theme';
import type { LearnStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<LearnStackParamList, 'Practice'>;

export function PracticeScreen({ navigation }: Props): React.JSX.Element {
  const { state, hydrated, dispatch } = usePractice();
  const [selectedId, setSelectedId] = useState(practiceDrills[0].id);
  const [target, setTarget] = useState(10);
  const [note, setNote] = useState('');
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [historyFilter, setHistoryFilter] = useState('all');
  const [historyLimit, setHistoryLimit] = useState(10);
  const active = state.active;
  const drill =
    practiceDrills.find(item => item.id === (active?.drillId ?? selectedId)) ??
    practiceDrills[0];
  const stats = drillStats(state.history, drill.id, active?.target ?? target);
  const weekCount = sessionsThisWeek(state.history);
  const finished = !!active && active.shots.length === active.target;
  const history = state.history.filter(
    item => historyFilter === 'all' || item.drillId === historyFilter,
  );

  const start = () => {
    setNotice('');
    setNote('');
    dispatch({
      type: 'start',
      session: {
        id: `practice-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        drillId: drill.id,
        target,
        shots: [],
        startedAt: new Date().toISOString(),
      },
    });
  };

  return (
    <Screen edges={{ top: true, bottom: true }}>
      <NavHeader backLabel="Learn" onBack={() => navigation.goBack()} />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Text style={typography.title}>Practice</Text>
        <Text style={typography.body}>
          Build consistency, one set at a time.
        </Text>
        {!hydrated ? (
          <Text style={typography.body}>Loading your practice…</Text>
        ) : (
          <>
            {!!notice && (
              <Text accessibilityRole="alert" style={styles.notice}>
                {notice}
              </Text>
            )}
            {active ? (
              <>
                <Card highlight contentStyle={styles.card}>
                  <Text style={styles.eyebrow}>
                    {finished ? 'SET COMPLETE' : 'TRAINING IN PROGRESS'}
                  </Text>
                  <Text style={typography.heading}>{drill.title}</Text>
                  <Text style={typography.small}>
                    Progress is saved on this device. You can leave and return
                    to this set.
                  </Text>
                  <View style={styles.metrics}>
                    <Metric
                      label="Attempts"
                      value={`${active.shots.length}/${active.target}`}
                    />
                    <Metric
                      label="Successful"
                      value={String(active.shots.filter(Boolean).length)}
                    />
                    <Metric
                      label="Accuracy"
                      value={
                        active.shots.length ? `${accuracy(active.shots)}%` : '—'
                      }
                    />
                  </View>
                  <ProgressBar progress={active.shots.length / active.target} />
                  <View
                    style={styles.shots}
                    accessibilityLabel="Recent attempts"
                  >
                    {active.shots.map((success, index) => (
                      <View
                        key={index}
                        accessible
                        accessibilityLabel={`Attempt ${index + 1}: ${
                          success ? 'success' : 'miss'
                        }`}
                        style={[
                          styles.shot,
                          success ? styles.hit : styles.miss,
                        ]}
                      >
                        <Text style={styles.shotText}>
                          {success ? '✓' : '×'}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {!finished && (
                    <View style={styles.row}>
                      <GradientButton
                        label="Success"
                        variant="success"
                        style={styles.flex}
                        onPress={() =>
                          dispatch({ type: 'shot', success: true })
                        }
                      />
                      <GradientButton
                        label="Miss"
                        variant="neutral"
                        style={styles.flex}
                        onPress={() =>
                          dispatch({ type: 'shot', success: false })
                        }
                      />
                    </View>
                  )}
                  <GradientButton
                    label="Undo last attempt"
                    variant="ghost"
                    size="md"
                    disabled={!active.shots.length}
                    onPress={() => dispatch({ type: 'undo' })}
                  />
                  {finished && (
                    <>
                      <Text style={typography.bodyStrong}>
                        {stats.best !== null &&
                        accuracy(active.shots) > stats.best
                          ? 'New personal best for this set size!'
                          : 'Set complete — ready to save'}
                      </Text>
                      <Text style={typography.small}>
                        {stats.latest === null
                          ? 'This will be your first result for this exercise and set size.'
                          : `Previous: ${stats.latest}% · Best: ${stats.best}% (${active.target} attempts)`}
                      </Text>
                      <TextInput
                        value={note}
                        onChangeText={setNote}
                        maxLength={240}
                        multiline
                        accessibilityLabel="Practice notes"
                        placeholder="What worked? What will you try next? (optional)"
                        placeholderTextColor={colors.textMuted}
                        style={styles.input}
                      />
                      <GradientButton
                        label="Save result"
                        onPress={() => {
                          dispatch({
                            type: 'finish',
                            at: new Date().toISOString(),
                            note,
                          });
                          setSelectedId(active.drillId);
                          setTarget(active.target);
                          setNotice(
                            `${drill.title} saved · ${accuracy(
                              active.shots,
                            )}% accuracy`,
                          );
                          setNote('');
                        }}
                      />
                    </>
                  )}
                  <GradientButton
                    label="Discard set"
                    size="sm"
                    variant="ghost"
                    onPress={() => setConfirmation('discard')}
                  />
                </Card>
                <Instructions drillId={drill.id} />
              </>
            ) : (
              <>
                <Card contentStyle={styles.card}>
                  <Text style={styles.eyebrow}>YOUR WEEKLY GOAL · MON–SUN</Text>
                  <Text style={typography.heading}>
                    {weekCount} / {state.weeklyGoal} sets
                  </Text>
                  <ProgressBar
                    progress={Math.min(1, weekCount / state.weeklyGoal)}
                  />
                  <Text style={typography.small}>
                    {weekCount >= state.weeklyGoal
                      ? 'Goal reached. Keep practising at your own pace.'
                      : `${
                          state.weeklyGoal - weekCount
                        } more completed sets to reach your goal.`}
                  </Text>
                  <View style={styles.row}>
                    {[1, 3, 5, 7].map(goal => (
                      <Chip
                        key={goal}
                        label={`${goal} / week`}
                        active={state.weeklyGoal === goal}
                        onPress={() => dispatch({ type: 'goal', goal })}
                      />
                    ))}
                  </View>
                </Card>
                <Text style={typography.heading}>Choose your focus</Text>
                {practiceDrills.map(item => (
                  <Card
                    key={item.id}
                    highlight={selectedId === item.id}
                    borderColor={
                      selectedId === item.id ? colors.primary : undefined
                    }
                    onPress={() => {
                      setSelectedId(item.id);
                      setNotice('');
                    }}
                    contentStyle={styles.card}
                  >
                    <Text style={styles.eyebrow}>
                      {item.level.toUpperCase()} · {item.focus.toUpperCase()}
                    </Text>
                    <Text style={typography.subheading}>
                      {selectedId === item.id ? '✓ ' : ''}
                      {item.title}
                    </Text>
                  </Card>
                ))}
                <Instructions drillId={drill.id} />
                <Card contentStyle={styles.card}>
                  <Text style={typography.bodyStrong}>Set length</Text>
                  <View style={styles.row}>
                    {[10, 20, 30].map(size => (
                      <Chip
                        key={size}
                        label={`${size} attempts`}
                        active={target === size}
                        onPress={() => setTarget(size)}
                      />
                    ))}
                  </View>
                  <Text style={typography.small}>
                    {stats.count
                      ? `${stats.count} previous sets · Last ${stats.latest}% · Best ${stats.best}%`
                      : 'Your first set will establish a starting point.'}
                  </Text>
                  <Text style={typography.tiny}>
                    Comparisons use the same exercise and set length.
                  </Text>
                  <GradientButton
                    label={`Start ${drill.title.toLowerCase()}`}
                    onPress={start}
                  />
                </Card>
              </>
            )}
            <Text style={typography.heading}>Training journal</Text>
            <Text style={typography.small}>
              Completed sets and notes, saved on this device.
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {[{ id: 'all', title: 'All drills' }, ...practiceDrills].map(
                item => (
                  <Chip
                    key={item.id}
                    label={item.title}
                    active={historyFilter === item.id}
                    onPress={() => {
                      setHistoryFilter(item.id);
                      setHistoryLimit(10);
                    }}
                  />
                ),
              )}
            </ScrollView>
            {!history.length && (
              <Card contentStyle={styles.card}>
                <Text style={typography.bodyStrong}>No results yet</Text>
                <Text style={typography.small}>
                  Complete a set and save it to start tracking your progress.
                </Text>
              </Card>
            )}
            {history.slice(0, historyLimit).map(result => (
              <Card key={result.id} contentStyle={styles.card}>
                <Text style={styles.eyebrow}>
                  {new Date(result.completedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
                <Text style={typography.subheading}>
                  {practiceDrills.find(item => item.id === result.drillId)
                    ?.title ?? 'Practice'}
                </Text>
                <Text style={typography.bodyStrong}>
                  {accuracy(result.shots)}% accuracy ·{' '}
                  {result.shots.filter(Boolean).length}/{result.target}{' '}
                  successful
                </Text>
                {!!result.note && (
                  <Text style={typography.small}>{result.note}</Text>
                )}
                <GradientButton
                  label="Delete result"
                  variant="ghost"
                  size="sm"
                  onPress={() => setConfirmation(result.id)}
                />
              </Card>
            ))}
            {history.length > historyLimit && (
              <GradientButton
                label="Show more results"
                variant="ghost"
                onPress={() => setHistoryLimit(previous => previous + 10)}
              />
            )}
          </>
        )}
      </ScrollView>
      <ConfirmDialog
        visible={confirmation !== null}
        title={
          confirmation === 'discard'
            ? 'Discard this set?'
            : 'Delete this result?'
        }
        message={
          confirmation === 'discard'
            ? 'Your attempts in this unfinished set will be removed.'
            : 'This result and its note will be removed. Your statistics and weekly progress will update.'
        }
        confirmLabel={confirmation === 'discard' ? 'Discard' : 'Delete'}
        onCancel={() => setConfirmation(null)}
        onConfirm={() => {
          if (confirmation === 'discard') {
            dispatch({ type: 'discard' });
            setNote('');
          } else if (confirmation) {
            dispatch({ type: 'delete', id: confirmation });
          }
          setConfirmation(null);
        }}
      />
    </Screen>
  );
}

function Instructions({ drillId }: { drillId: string }): React.JSX.Element {
  const drill = practiceDrills.find(item => item.id === drillId)!;
  return (
    <Card contentStyle={styles.card}>
      <Text style={typography.subheading}>How to practise · {drill.title}</Text>
      <Text style={typography.bodyStrong}>Set up</Text>
      <Text style={typography.small}>{drill.setup}</Text>
      {drill.steps.map((step, index) => (
        <Text key={step} style={typography.small}>
          {index + 1}. {step}
        </Text>
      ))}
      <Text style={styles.success}>{drill.success}</Text>
      <Text style={typography.tiny}>
        Keep the same layout each session for a useful comparison.
      </Text>
    </Card>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <View style={styles.flex}>
      <Text style={typography.heading}>{value}</Text>
      <Text style={typography.tiny}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(layout.gutter),
    paddingBottom: scale(40),
    gap: scale(14),
  },
  card: { gap: scale(12) },
  eyebrow: { ...typography.tiny, color: colors.primary, fontWeight: '700' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(8) },
  filters: { gap: scale(8) },
  flex: { flex: 1 },
  metrics: { flexDirection: 'row', gap: scale(8) },
  shots: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(6) },
  shot: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  hit: { backgroundColor: colors.successSoft },
  miss: { backgroundColor: colors.dangerSoft },
  shotText: { color: colors.textPrimary, fontWeight: '700' },
  input: {
    ...typography.body,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: scale(12),
    minHeight: scale(96),
    textAlignVertical: 'top',
  },
  success: { ...typography.small, color: colors.success },
  notice: { ...typography.bodyStrong, color: colors.success },
});
