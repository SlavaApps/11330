import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { GradientButton } from '../../components/GradientButton';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { CenterModal, Sheet } from '../../components/Sheet';
import { Chip } from '../../components/SegmentedTabs';
import { Icon } from '../../components/Icon';
import { Reveal } from '../../components/Reveal';
import { SectionLabel } from '../../components/Badge';
import { ballButtons, FOUL_POINTS, useMatch } from '../../context/MatchContext';
import { clubTables } from '../../data/menu';
import {
  ballColors,
  colors,
  fontSize,
  hitSlop,
  isSmallDevice,
  layout,
  radius,
  scale,
  typography,
} from '../../theme';
import { formatClock, formatDuration } from '../../utils/format';
import { SavedMatch } from '../../types';
import type { ScoreStackParamList } from '../../navigation/types';

const bestOfOptions = [1, 3, 5, 7, 9, 11];

type Props = NativeStackScreenProps<ScoreStackParamList, 'Scoreboard'>;

export function ScoreboardScreen({ navigation }: Props): React.JSX.Element {
  const {
    match,
    elapsedSeconds,
    setPlayerName,
    setBestOf,
    setTable,
    addPoints,
    addFoul,
    undoLast,
    awardFrame,
    resetMatch,
    saveMatch,
  } = useMatch();

  const [setupVisible, setSetupVisible] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [savedMatch, setSavedMatch] = useState<SavedMatch | null>(null);

  const nameOne = match.playerOne.trim() || 'Player 1';
  const nameTwo = match.playerTwo.trim() || 'Player 2';
  const lead = match.scoreOne - match.scoreTwo;
  const hasPlay =
    match.scoreOne > 0 || match.scoreTwo > 0 || match.framesOne > 0 || match.framesTwo > 0;

  const handleSave = () => {
    const saved = saveMatch();
    if (saved) {
      setSavedMatch(saved);
    }
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Reveal delay={40} style={styles.header}>
          <Text style={[typography.title, styles.screenTitle]}>Scoreboard</Text>
          <Pressable
            accessibilityRole="button"
            hitSlop={hitSlop}
            onPress={() => navigation.navigate('MatchHistory')}
            style={({ pressed }) => pressed && styles.pressed}>
            <Text style={[typography.button, styles.headerLink]}>History</Text>
          </Pressable>
        </Reveal>

        <Reveal delay={90} style={styles.namesRow}>
          <NameField
            value={match.playerOne}
            placeholder="Player 1"
            onChangeText={value => setPlayerName(1, value)}
          />
          <NameField
            value={match.playerTwo}
            placeholder="Player 2"
            onChangeText={value => setPlayerName(2, value)}
          />
        </Reveal>

        <Reveal delay={140}>
          <View style={styles.frameCard}>
            <LinearGradient
              colors={['#17253F', '#0D1626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.frameHead}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Match setup"
                hitSlop={hitSlop}
                onPress={() => setSetupVisible(true)}
                style={({ pressed }) => [styles.frameMeta, pressed && styles.pressed]}>
                <Text numberOfLines={1} style={[typography.label, styles.frameMetaText]}>
                  FRAME {match.frameNumber} · BEST OF {match.bestOf}
                </Text>
                <Icon name="chevron-down" size={scale(13)} color={colors.textFaint} />
              </Pressable>

              <View style={styles.frameRight}>
                <Text numberOfLines={1} style={[typography.label, styles.frameMetaText]}>
                  {match.table.toUpperCase()} · {formatClock(elapsedSeconds)}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Undo last entry"
                  hitSlop={hitSlop}
                  disabled={match.events.length === 0}
                  onPress={undoLast}
                  style={({ pressed }) => [
                    styles.undo,
                    match.events.length === 0 && styles.undoDisabled,
                    pressed && styles.pressed,
                  ]}>
                  <Icon name="undo" size={scale(15)} color={colors.textSecondary} />
                </Pressable>
              </View>
            </View>

            <View style={styles.scoreRow}>
              <ScoreColumn name={nameOne} score={match.scoreOne} leading={lead > 0} />
              <View style={styles.scoreDivider} />
              <ScoreColumn name={nameTwo} score={match.scoreTwo} leading={lead < 0} />
            </View>

            <View style={styles.leadPill}>
              <Text numberOfLines={1} style={[typography.smallStrong, styles.leadText]}>
                {lead === 0
                  ? match.scoreOne === 0
                    ? 'Frame not started'
                    : 'Scores level'
                  : `${lead > 0 ? nameOne : nameTwo} leads by ${Math.abs(lead)}`}
              </Text>
            </View>
          </View>
        </Reveal>

        <Reveal delay={200} style={styles.padsRow}>
          <BallPad
            name={nameOne}
            onBall={(points, label) => addPoints(1, points, label)}
            onFoul={() => addFoul(1)}
          />
          <BallPad
            name={nameTwo}
            onBall={(points, label) => addPoints(2, points, label)}
            onFoul={() => addFoul(2)}
          />
        </Reveal>

        <Reveal delay={250}>
          <Card contentStyle={styles.framesCard}>
            <View style={styles.framesCopy}>
              <SectionLabel label="Frames won" style={styles.framesLabel} />
              <Text style={[typography.subheading, styles.framesValue]}>
                Frames {match.framesOne} – {match.framesTwo}
              </Text>
            </View>
            <View style={styles.framesActions}>
              <FrameButton label="+P1" onPress={() => awardFrame(1)} />
              <FrameButton label="+P2" onPress={() => awardFrame(2)} />
            </View>
          </Card>
        </Reveal>

        <Reveal delay={300} style={styles.saveRow}>
          <GradientButton
            label="Save match"
            glow
            disabled={!hasPlay}
            style={styles.saveButton}
            onPress={handleSave}
          />
          <Pressable
            accessibilityRole="button"
            disabled={!hasPlay}
            onPress={() => setConfirmReset(true)}
            style={({ pressed }) => [
              styles.resetButton,
              !hasPlay && styles.resetDisabled,
              pressed && styles.pressed,
            ]}>
            <Text style={[typography.smallStrong, styles.resetLabel]}>Reset</Text>
          </Pressable>
        </Reveal>

        <Reveal delay={350}>
          <Card contentStyle={styles.breakCard}>
            <Text style={[typography.smallStrong, styles.breakTitle]}>This frame</Text>
            <View style={styles.breakRow}>
              <Text style={[typography.small, styles.breakLabel]}>Highest break</Text>
              <Text style={[typography.smallStrong, styles.breakValue]}>
                {match.highestBreak > 0
                  ? `${match.highestBreak} · ${
                      match.highestBreakPlayer === 1 ? nameOne : nameTwo
                    }`
                  : '—'}
              </Text>
            </View>
            <View style={[styles.breakRow, styles.breakRowLast]}>
              <Text style={[typography.small, styles.breakLabel]}>Current break</Text>
              <Text style={[typography.smallStrong, styles.breakValue]}>
                {match.currentBreak > 0
                  ? `${match.currentBreak} · ${
                      match.currentBreakPlayer === 1 ? nameOne : nameTwo
                    }`
                  : '—'}
              </Text>
            </View>
          </Card>
        </Reveal>

        <Reveal delay={400}>
          <Text style={[typography.tiny, styles.footnote]}>
            Tap a ball value to add points to that player. The {FOUL_POINTS}-point foul button
            awards the penalty to the opponent and ends the running break.
          </Text>
        </Reveal>
      </ScrollView>

      <Sheet visible={setupVisible} onClose={() => setSetupVisible(false)}>
        <Text style={[typography.heading, styles.sheetTitle]}>Match setup</Text>

        <SectionLabel label="Best of" style={styles.sheetLabel} />
        <View style={styles.sheetChips}>
          {bestOfOptions.map(option => (
            <Chip
              key={option}
              label={`Best of ${option}`}
              active={match.bestOf === option}
              onPress={() => setBestOf(option)}
            />
          ))}
        </View>

        <SectionLabel label="Table" style={styles.sheetLabel} />
        <View style={styles.sheetChips}>
          {clubTables.map(option => (
            <Chip
              key={option}
              label={option}
              active={match.table === option}
              onPress={() => setTable(option)}
            />
          ))}
        </View>

        <GradientButton
          label="Done"
          variant="light"
          style={styles.sheetDone}
          onPress={() => setSetupVisible(false)}
        />
      </Sheet>

      <ConfirmDialog
        visible={confirmReset}
        title="Clear current match?"
        message="Scores, frames and the running break for this match will be reset. Saved matches in your history are not affected."
        confirmLabel="Clear match"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetMatch();
          setConfirmReset(false);
        }}
      />

      <CenterModal visible={savedMatch !== null} onClose={() => setSavedMatch(null)}>
        <View style={styles.savedHead}>
          <View style={styles.savedTick}>
            <Icon name="check" size={scale(20)} color={colors.success} strokeWidth={2.6} />
          </View>
          <Text style={[typography.heading, styles.savedTitle]}>Match saved</Text>
          {savedMatch ? (
            <Text style={[typography.small, styles.savedBody]}>
              {savedMatch.playerOne} {savedMatch.scoreOne} – {savedMatch.scoreTwo}{' '}
              {savedMatch.playerTwo}, frames {savedMatch.framesOne}–{savedMatch.framesTwo},
              duration {formatDuration(savedMatch.durationMinutes)}. Added to your match history.
            </Text>
          ) : null}
        </View>

        <View style={styles.savedActions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setSavedMatch(null);
              navigation.navigate('MatchHistory');
            }}
            style={({ pressed }) => [styles.savedAction, pressed && styles.pressed]}>
            <Text style={[typography.button, styles.savedActionLabel]}>View history</Text>
          </Pressable>
          <View style={styles.savedDivider} />
          <Pressable
            accessibilityRole="button"
            onPress={() => setSavedMatch(null)}
            style={({ pressed }) => [styles.savedAction, pressed && styles.pressed]}>
            <Text style={[typography.button, styles.savedActionPrimary]}>New frame</Text>
          </Pressable>
        </View>
      </CenterModal>
    </Screen>
  );
}

function NameField({
  value,
  placeholder,
  onChangeText,
}: {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}): React.JSX.Element {
  return (
    <View style={styles.nameField}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        selectionColor={colors.primary}
        autoCapitalize="words"
        autoCorrect={false}
        maxLength={18}
        style={styles.nameInput}
      />
    </View>
  );
}

function ScoreColumn({
  name,
  score,
  leading,
}: {
  name: string;
  score: number;
  leading: boolean;
}): React.JSX.Element {
  return (
    <View style={styles.scoreColumn}>
      <Text numberOfLines={1} style={[typography.small, styles.scoreName]}>
        {name}
      </Text>
      <Text
        numberOfLines={1}
        style={[typography.metric, styles.scoreValue, leading && styles.scoreLeading]}>
        {score}
      </Text>
    </View>
  );
}

function BallPad({
  name,
  onBall,
  onFoul,
}: {
  name: string;
  onBall: (points: number, label: string) => void;
  onFoul: () => void;
}): React.JSX.Element {
  return (
    <View style={styles.pad}>
      <Text numberOfLines={1} style={[typography.tiny, styles.padName]}>
        {name}
      </Text>
      <View style={styles.padGrid}>
        {ballButtons.map(button => (
          <Pressable
            key={button.label}
            accessibilityRole="button"
            accessibilityLabel={`${name} pots ${button.points}`}
            onPress={() => onBall(button.points, button.label)}
            style={({ pressed }) => [
              styles.ballButton,
              { backgroundColor: ballColors[button.ball] },
              button.ball === 'black' && styles.ballButtonDark,
              pressed && styles.ballPressed,
            ]}>
            <Text
              style={[
                typography.smallStrong,
                styles.ballLabel,
                ['yellow', 'green', 'white'].includes(button.ball) && styles.ballLabelDark,
              ]}>
              {button.label}
            </Text>
          </Pressable>
        ))}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${name} commits a foul`}
          onPress={onFoul}
          style={({ pressed }) => [styles.foulButton, pressed && styles.ballPressed]}>
          <Text style={[typography.smallStrong, styles.foulLabel]}>-{FOUL_POINTS}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FrameButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Award frame to ${label === '+P1' ? 'player 1' : 'player 2'}`}
      onPress={onPress}
      style={({ pressed }) => [styles.frameButton, pressed && styles.ballPressed]}>
      <Text style={[typography.smallStrong, styles.frameButtonLabel]}>{label}</Text>
    </Pressable>
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
  headerLink: {
    color: colors.primary,
    fontSize: fontSize(14),
  },
  pressed: {
    opacity: 0.65,
  },
  namesRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: scale(12),
  },
  nameField: {
    flex: 1,
    height: scale(42),
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    justifyContent: 'center',
    paddingHorizontal: scale(12),
  },
  nameInput: {
    ...typography.smallStrong,
    color: colors.textPrimary,
    fontSize: fontSize(13),
    padding: 0,
  },
  frameCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
    padding: scale(14),
    marginBottom: scale(14),
  },
  frameHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(8),
  },
  frameMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    flexShrink: 1,
  },
  frameRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    flexShrink: 1,
  },
  frameMetaText: {
    color: colors.textMuted,
    fontSize: fontSize(9),
  },
  undo: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoDisabled: {
    opacity: 0.4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: scale(14),
  },
  scoreColumn: {
    flex: 1,
    alignItems: 'center',
  },
  scoreDivider: {
    width: 1,
    height: scale(50),
    backgroundColor: colors.borderSoft,
    marginHorizontal: scale(6),
  },
  scoreName: {
    color: colors.textMuted,
    maxWidth: '100%',
  },
  scoreValue: {
    marginTop: scale(2),
    fontSize: fontSize(isSmallDevice ? 38 : 44),
  },
  scoreLeading: {
    color: '#FFFFFF',
  },
  leadPill: {
    marginTop: scale(14),
    height: scale(34),
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(214,168,78,0.28)',
    backgroundColor: 'rgba(214,168,78,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  leadText: {
    color: colors.gold,
    fontSize: fontSize(12),
  },
  padsRow: {
    flexDirection: 'row',
    gap: scale(12),
    marginBottom: scale(14),
  },
  pad: {
    flex: 1,
  },
  padName: {
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: scale(8),
  },
  padGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(6),
    justifyContent: 'center',
  },
  ballButton: {
    width: scale(isSmallDevice ? 30 : 34),
    height: scale(isSmallDevice ? 30 : 34),
    borderRadius: scale(isSmallDevice ? 15 : 17),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  ballButtonDark: {
    borderColor: 'rgba(255,255,255,0.26)',
  },
  ballPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.92 }],
  },
  ballLabel: {
    color: '#FFFFFF',
    fontSize: fontSize(13),
    fontWeight: '700',
  },
  ballLabelDark: {
    color: '#181818',
  },
  foulButton: {
    width: scale(isSmallDevice ? 30 : 34),
    height: scale(isSmallDevice ? 30 : 34),
    borderRadius: scale(isSmallDevice ? 15 : 17),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceAlt,
  },
  foulLabel: {
    color: colors.textSecondary,
    fontSize: fontSize(12),
  },
  framesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(14),
  },
  framesCopy: {
    flex: 1,
  },
  framesLabel: {
    color: colors.textMuted,
  },
  framesValue: {
    marginTop: scale(4),
  },
  framesActions: {
    flexDirection: 'row',
    gap: scale(8),
  },
  frameButton: {
    minWidth: scale(50),
    height: scale(38),
    paddingHorizontal: scale(12),
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.4)',
    backgroundColor: 'rgba(59,130,246,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameButtonLabel: {
    color: '#8CB8FF',
    fontSize: fontSize(13),
  },
  saveRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: scale(14),
    marginBottom: scale(14),
  },
  saveButton: {
    flex: 1,
  },
  resetButton: {
    width: scale(92),
    height: scale(56),
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetDisabled: {
    opacity: 0.45,
  },
  resetLabel: {
    color: colors.textSecondary,
  },
  breakCard: {
    padding: scale(14),
  },
  breakTitle: {
    marginBottom: scale(4),
  },
  breakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(11),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
    gap: scale(10),
  },
  breakRowLast: {
    borderBottomWidth: 0,
    paddingBottom: scale(2),
  },
  breakLabel: {
    color: colors.textMuted,
  },
  breakValue: {
    color: colors.textPrimary,
    flexShrink: 1,
    textAlign: 'right',
  },
  footnote: {
    marginTop: scale(16),
    color: colors.textFaint,
    lineHeight: fontSize(16),
  },
  sheetTitle: {
    marginBottom: scale(18),
  },
  sheetLabel: {
    marginBottom: scale(10),
  },
  sheetChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginBottom: scale(20),
  },
  sheetDone: {
    marginBottom: scale(4),
  },
  savedHead: {
    alignItems: 'center',
  },
  savedTick: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    backgroundColor: 'rgba(52,201,138,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(52,201,138,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(14),
  },
  savedTitle: {
    textAlign: 'center',
  },
  savedBody: {
    textAlign: 'center',
    marginTop: scale(8),
    color: colors.textSecondary,
  },
  savedActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    marginHorizontal: -scale(22),
    marginTop: scale(20),
    marginBottom: -scale(22),
  },
  savedAction: {
    flex: 1,
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedDivider: {
    width: 1,
    backgroundColor: colors.borderSoft,
  },
  savedActionLabel: {
    color: colors.primary,
  },
  savedActionPrimary: {
    color: colors.primary,
    fontWeight: '700',
  },
});
