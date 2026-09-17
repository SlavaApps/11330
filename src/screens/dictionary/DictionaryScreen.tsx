import React, { useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Chip } from '../../components/SegmentedTabs';
import { GradientButton } from '../../components/GradientButton';
import { Icon } from '../../components/Icon';
import { Reveal, Stagger } from '../../components/Reveal';
import { SectionLabel } from '../../components/Badge';
import {
  dictionary,
  dictionaryCategories,
  groupByLetter,
} from '../../data/dictionary';
import { useQuizStats } from '../../context/QuizContext';
import { colors, fontSize, layout, radius, scale, typography } from '../../theme';
import { DictionaryCategory, DictionaryTerm } from '../../types';
import type { DictionaryStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<DictionaryStackParamList, 'DictionaryHome'>;

export function DictionaryScreen({ navigation }: Props): React.JSX.Element {
  const { stats } = useQuizStats();
  const [category, setCategory] = useState<DictionaryCategory | 'All'>('All');

  const sections = useMemo(() => {
    const filtered =
      category === 'All' ? dictionary : dictionary.filter(term => term.category === category);
    return groupByLetter(filtered).map(section => ({
      title: section.letter,
      data: section.data,
    }));
  }, [category]);

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
            <Reveal delay={40}>
              <Text style={[typography.title, styles.screenTitle]}>Dictionary</Text>
            </Reveal>

            <Reveal delay={90}>
              <Pressable
                accessibilityRole="search"
                accessibilityLabel="Search the dictionary"
                onPress={() => navigation.navigate('DictionarySearch')}
                style={({ pressed }) => [styles.searchBar, pressed && styles.pressed]}>
                <Icon name="search" size={scale(17)} color={colors.textFaint} />
                <Text style={[typography.body, styles.searchPlaceholder]}>
                  Search {dictionary.length} terms
                </Text>
              </Pressable>
            </Reveal>

            <Reveal delay={150}>
              <View style={styles.quizCard}>
                <LinearGradient
                  colors={['#1E3763', '#132444']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <SectionLabel label="Match quiz · weekly" style={styles.quizLabel} />
                <Text style={[typography.heading, styles.quizTitle]}>
                  Match the term to the definition
                </Text>
                <Text style={[typography.body, styles.quizBody]}>
                  Ten rounds of three statements and four cards — one card is always a decoy. Drag
                  the right terms into place and beat your best score.
                </Text>

                <View style={styles.quizFooter}>
                  <GradientButton
                    label="Start quiz"
                    variant="light"
                    size="md"
                    fullWidth={false}
                    style={styles.quizButton}
                    onPress={() => navigation.navigate('Quiz')}
                  />
                  <View style={styles.quizBest}>
                    <Text style={[typography.label, styles.quizBestLabel]}>BEST</Text>
                    <Text style={[typography.subheading, styles.quizBestValue]}>
                      {stats.bestScore > 0 ? stats.bestScore : '—'}
                    </Text>
                  </View>
                </View>
              </View>
            </Reveal>

            <Reveal delay={210} style={styles.chipsWrap}>
              <View style={styles.chips}>
                {dictionaryCategories.map(option => (
                  <Chip
                    key={option}
                    label={option}
                    active={category === option}
                    onPress={() => setCategory(option)}
                  />
                ))}
              </View>
            </Reveal>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={[typography.heading, styles.letter]}>{section.title}</Text>
        )}
        renderItem={({ item, index }) => (
          <Stagger index={index} base={240} step={26} max={12} style={styles.termWrap}>
            <TermRow term={item} />
          </Stagger>
        )}
        ListEmptyComponent={
          <Text style={[typography.small, styles.empty]}>No terms in this category.</Text>
        }
      />
    </Screen>
  );
}

export function TermRow({ term }: { term: DictionaryTerm }): React.JSX.Element {
  return (
    <View style={styles.termCard}>
      <View style={styles.termHead}>
        <Text numberOfLines={2} style={[typography.bodyStrong, styles.termName]}>
          {term.term}
        </Text>
        <Text style={[typography.tiny, styles.termCategory]}>
          {term.category.toUpperCase()}
        </Text>
      </View>
      <Text style={[typography.small, styles.termDefinition]}>{term.definition}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(layout.gutter),
    paddingBottom: scale(layout.tabBarHeight + 46),
  },
  screenTitle: {
    paddingTop: scale(12),
    marginBottom: scale(16),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    height: scale(46),
    paddingHorizontal: scale(14),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    marginBottom: scale(16),
  },
  searchPlaceholder: {
    color: colors.textFaint,
    fontSize: fontSize(14),
  },
  pressed: {
    opacity: 0.7,
  },
  quizCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
    padding: scale(16),
    marginBottom: scale(18),
  },
  quizLabel: {
    color: '#8CB8FF',
  },
  quizTitle: {
    marginTop: scale(8),
  },
  quizBody: {
    marginTop: scale(8),
    fontSize: fontSize(14),
    lineHeight: fontSize(20),
  },
  quizFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(18),
  },
  quizButton: {
    minWidth: scale(140),
  },
  quizBest: {
    alignItems: 'flex-end',
  },
  quizBestLabel: {
    color: 'rgba(196,214,244,0.6)',
    fontSize: fontSize(9),
  },
  quizBestValue: {
    marginTop: scale(2),
  },
  chipsWrap: {
    marginBottom: scale(6),
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  letter: {
    marginTop: scale(18),
    marginBottom: scale(8),
    color: colors.textSecondary,
  },
  termWrap: {
    marginBottom: scale(8),
  },
  termCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surfaceMuted,
    padding: scale(13),
  },
  termHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  termName: {
    flex: 1,
    fontSize: fontSize(15),
  },
  termCategory: {
    color: colors.textFaint,
    fontSize: fontSize(9),
    letterSpacing: 0.8,
    marginTop: scale(3),
  },
  termDefinition: {
    marginTop: scale(6),
    color: colors.textSecondary,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: scale(30),
  },
});
