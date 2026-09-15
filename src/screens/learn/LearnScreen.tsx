import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { SectionLabel } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { SegmentedTabs } from '../../components/SegmentedTabs';
import { GradientButton, GradientIconButton } from '../../components/GradientButton';
import { MembershipCard } from '../../components/MembershipCard';
import { Icon } from '../../components/Icon';
import { Reveal, Stagger } from '../../components/Reveal';
import { Sheet } from '../../components/Sheet';
import { QrBlock } from '../../components/QrBlock';
import { lessons, lessonFilters, LessonFilter } from '../../data/lessons';
import { useProfile } from '../../context/ProfileContext';
import { useLearn } from '../../context/LearnContext';
import { colors, fontSize, layout, radius, scale, typography } from '../../theme';
import { greeting, initials } from '../../utils/format';
import { Lesson } from '../../types';
import type { LearnStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<LearnStackParamList, 'LearnHome'>;

export function LearnScreen({ navigation }: Props): React.JSX.Element {
  const { profile, hasProfile, requestActivation, confirmActivation } = useProfile();
  const { statusFor, percentFor, completedCount, continueLesson } = useLearn();
  const [filter, setFilter] = useState<LessonFilter>('All');
  const [codeVisible, setCodeVisible] = useState(false);

  const filtered = useMemo(
    () => (filter === 'All' ? lessons : lessons.filter(lesson => lesson.tag === filter)),
    [filter],
  );

  const openLesson = useCallback(
    (lessonId: string) => navigation.navigate('Lesson', { lessonId }),
    [navigation],
  );

  const handleActivate = useCallback(() => {
    requestActivation();
    setCodeVisible(true);
  }, [requestActivation]);

  const overall = Math.round((completedCount / lessons.length) * 100);

  return (
    <Screen>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Reveal delay={40} style={styles.header}>
              <View style={styles.headerCopy}>
                <Text style={[typography.small, styles.greeting]}>{greeting()}</Text>
                <Text numberOfLines={1} style={[typography.title, styles.name]}>
                  {hasProfile ? profile.name : 'Welcome to the club'}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open your profile"
                onPress={() => navigation.navigate('Profile')}
                style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
                <LinearGradient
                  colors={['#2B4472', '#16233B']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                {hasProfile ? (
                  <Text style={[typography.smallStrong, styles.avatarText]}>
                    {initials(profile.name)}
                  </Text>
                ) : (
                  <Icon name="user" size={scale(18)} color={colors.textSecondary} />
                )}
              </Pressable>
            </Reveal>

            <Reveal delay={110} style={styles.block}>
              <MembershipCard
                profile={profile}
                onActivate={handleActivate}
                onShowCode={() => setCodeVisible(true)}
                onEdit={() => navigation.navigate('Profile')}
              />
            </Reveal>

            <Reveal delay={180} style={styles.block}>
              <Card onPress={() => openLesson(continueLesson.id)} highlight>
                <View style={styles.continueTop}>
                  <View style={styles.continueCopy}>
                    <SectionLabel label="Continue learning" style={styles.continueLabel} />
                    <Text numberOfLines={2} style={[typography.subheading, styles.continueTitle]}>
                      {String(continueLesson.index).padStart(2, '0')} · {continueLesson.title}
                    </Text>
                  </View>
                  <GradientIconButton
                    name="chevron-right"
                    size={42}
                    onPress={() => openLesson(continueLesson.id)}
                  />
                </View>

                <ProgressBar progress={overall / 100} style={styles.continueBar} />

                <View style={styles.continueMeta}>
                  <Text style={[typography.tiny, styles.metaText]}>
                    {completedCount} of {lessons.length} modules complete
                  </Text>
                  <Text style={[typography.tiny, styles.metaValue]}>{overall}%</Text>
                </View>
              </Card>
            </Reveal>

            <Reveal delay={240} style={styles.block}>
              <Text style={[typography.heading, styles.sectionTitle]}>Lessons</Text>
              <SegmentedTabs
                options={lessonFilters}
                value={filter}
                onChange={setFilter}
                scrollable
                style={styles.filters}
              />
            </Reveal>
          </View>
        }
        renderItem={({ item, index }) => (
          <Stagger index={index} base={280} step={45} style={styles.row}>
            <LessonRow
              lesson={item}
              status={statusFor(item.id)}
              percent={percentFor(item.id)}
              onPress={() => openLesson(item.id)}
            />
          </Stagger>
        )}
        ListEmptyComponent={
          <Text style={[typography.small, styles.emptyFilter]}>
            No modules in this category yet.
          </Text>
        }
      />

      <Sheet visible={codeVisible} onClose={() => setCodeVisible(false)}>
        <Text style={[typography.heading, styles.sheetTitle]}>Activate membership</Text>
        <Text style={[typography.body, styles.sheetBody]}>
          Show this code to a member of staff at the front desk. They will confirm your tier and
          unlock the digital card.
        </Text>

        <View style={styles.sheetCode}>
          <QrBlock
            value={profile.memberNumber || profile.name || 'shorelines-member'}
            size={150}
            quietZone={12}
          />
          <Text style={[typography.subheading, styles.sheetNumber]}>
            {profile.memberNumber
              ? profile.memberNumber.replace(/(\d{4})(?=\d)/g, '$1 · ')
              : 'Add your member number'}
          </Text>
        </View>

        <View style={styles.sheetStatus}>
          <Text style={[typography.small, styles.sheetStatusLabel]}>Status</Text>
          <Text style={[typography.smallStrong, styles.sheetStatusValue]}>
            {profile.activation === 'active' ? 'Activated' : 'Awaiting staff approval'}
          </Text>
        </View>

        {profile.activation !== 'active' ? (
          <GradientButton
            label="Staff confirmed · unlock card"
            variant="success"
            size="md"
            style={styles.sheetConfirm}
            onPress={() => {
              confirmActivation();
              setCodeVisible(false);
            }}
          />
        ) : null}

        <GradientButton
          label="Close"
          variant="light"
          style={styles.sheetClose}
          onPress={() => setCodeVisible(false)}
        />
      </Sheet>
    </Screen>
  );
}

interface LessonRowProps {
  lesson: Lesson;
  status: 'not-started' | 'in-progress' | 'completed';
  percent: number;
  onPress: () => void;
}

const tagTint: Record<string, string> = {
  Basics: '#E5767A',
  Technique: '#7FB2FF',
  Strategy: '#8CD9AE',
  Rules: '#D6A84E',
  Equipment: '#B69BE8',
  Training: '#5FC7C2',
  'Club guide': '#E8A33D',
};

function LessonRow({ lesson, status, percent, onPress }: LessonRowProps): React.JSX.Element {
  const tint = tagTint[lesson.tag] ?? colors.primary;

  return (
    <Card onPress={onPress} contentStyle={styles.lessonCard}>
      <View style={[styles.lessonIndex, { borderColor: `${tint}55` }]}>
        <Text style={[typography.smallStrong, { color: tint }]}>
          {String(lesson.index).padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.lessonBody}>
        <Text numberOfLines={1} style={[typography.bodyStrong, styles.lessonTitle]}>
          {lesson.listTitle}
        </Text>

        {status === 'in-progress' ? (
          <View style={styles.lessonProgress}>
            <ProgressBar progress={percent / 100} height={4} style={styles.lessonBar} />
            <Text style={[typography.tiny, styles.lessonStatus]}>In progress · {percent}%</Text>
          </View>
        ) : (
          <Text style={[typography.tiny, styles.lessonStatus]}>
            {status === 'completed' ? 'Completed' : 'Not started'}
          </Text>
        )}
      </View>

      {status === 'completed' ? (
        <View style={styles.lessonDone}>
          <Icon name="check" size={scale(13)} color="#04150E" strokeWidth={2.6} />
        </View>
      ) : (
        <Icon name="chevron-right" size={scale(18)} color={colors.textFaint} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: scale(layout.gutter),
    paddingBottom: scale(layout.tabBarHeight + 46),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(10),
    paddingBottom: scale(16),
  },
  headerCopy: {
    flex: 1,
    paddingRight: scale(12),
  },
  greeting: {
    color: colors.textMuted,
  },
  name: {
    marginTop: scale(2),
  },
  avatar: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(21),
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    color: colors.textPrimary,
  },
  pressed: {
    opacity: 0.7,
  },
  block: {
    marginBottom: scale(14),
  },
  continueTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueCopy: {
    flex: 1,
    paddingRight: scale(12),
  },
  continueLabel: {
    color: colors.textMuted,
  },
  continueTitle: {
    marginTop: scale(5),
  },
  continueBar: {
    marginTop: scale(16),
  },
  continueMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(8),
  },
  metaText: {
    color: colors.textMuted,
  },
  metaValue: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  sectionTitle: {
    marginBottom: scale(12),
  },
  filters: {
    marginBottom: scale(4),
  },
  row: {
    marginBottom: scale(10),
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
  },
  lessonIndex: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  lessonBody: {
    flex: 1,
    paddingHorizontal: scale(12),
  },
  lessonTitle: {
    fontSize: fontSize(15),
  },
  lessonProgress: {
    marginTop: scale(6),
  },
  lessonBar: {
    width: '58%',
  },
  lessonStatus: {
    marginTop: scale(4),
    color: colors.textMuted,
  },
  lessonDone: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFilter: {
    textAlign: 'center',
    paddingVertical: scale(28),
  },
  sheetTitle: {
    textAlign: 'center',
  },
  sheetBody: {
    textAlign: 'center',
    marginTop: scale(8),
    fontSize: fontSize(14),
  },
  sheetCode: {
    alignItems: 'center',
    marginTop: scale(22),
  },
  sheetNumber: {
    marginTop: scale(14),
    letterSpacing: 2,
  },
  sheetStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(20),
    paddingHorizontal: scale(14),
    height: scale(46),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  sheetStatusLabel: {
    color: colors.textMuted,
  },
  sheetStatusValue: {
    color: colors.gold,
  },
  sheetConfirm: {
    marginTop: scale(12),
  },
  sheetClose: {
    marginTop: scale(10),
    marginBottom: scale(4),
  },
});
