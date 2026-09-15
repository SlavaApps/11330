import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { Icon } from '../../components/Icon';
import { Reveal, Stagger } from '../../components/Reveal';
import { SectionLabel } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { TermRow } from './DictionaryScreen';
import { searchDictionary } from '../../data/dictionary';
import { useQuizStats } from '../../context/QuizContext';
import { colors, fontSize, hitSlop, layout, radius, scale, typography } from '../../theme';
import { relativeDay } from '../../utils/format';
import type { DictionaryStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<DictionaryStackParamList, 'DictionarySearch'>;

export function SearchScreen({ navigation }: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { recentSearches, pushSearch, clearSearches } = useQuizStats();
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  const results = useMemo(() => searchDictionary(query), [query]);
  const hasQuery = query.trim().length > 0;

  const commit = (value: string) => {
    pushSearch(value);
    Keyboard.dismiss();
  };

  return (
    <Screen edges={{ top: true }}>
      <View style={styles.searchRow}>
        <View style={styles.inputWrap}>
          <Icon name="search" size={scale(16)} color={colors.textFaint} />
          <TextInput
            ref={inputRef}
            autoFocus
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => commit(query)}
            placeholder="Search terms and definitions"
            placeholderTextColor={colors.textFaint}
            selectionColor={colors.primary}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
          />
          {hasQuery ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              hitSlop={hitSlop}
              onPress={() => setQuery('')}>
              <Icon name="close" size={scale(16)} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          hitSlop={hitSlop}
          onPress={() => navigation.goBack()}
          style={({ pressed }) => pressed && styles.pressed}>
          <Text style={[typography.button, styles.cancel]}>Cancel</Text>
        </Pressable>
      </View>

      <FlatList
        data={hasQuery ? results : []}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: scale(30) + insets.bottom }]}
        ListHeaderComponent={
          hasQuery ? (
            <Text style={[typography.label, styles.resultCount]}>
              {results.length} {results.length === 1 ? 'RESULT' : 'RESULTS'}
            </Text>
          ) : null
        }
        renderItem={({ item, index }) => (
          <Stagger index={index} base={20} step={22} max={10} style={styles.resultWrap}>
            <Pressable onPress={() => commit(item.term)}>
              <TermRow term={item} />
            </Pressable>
          </Stagger>
        )}
        ListEmptyComponent={
          hasQuery ? (
            <EmptyState
              icon="search"
              title="Nothing found"
              message={`No term or definition matches “${query.trim()}”. Try a shorter word or browse by category.`}
              style={styles.emptyState}
            />
          ) : (
            <View>
              {recentSearches.length > 0 ? (
                <Reveal delay={40}>
                  <View style={styles.recentHead}>
                    <SectionLabel label="Recent searches" />
                    <Pressable
                      accessibilityRole="button"
                      hitSlop={hitSlop}
                      onPress={clearSearches}
                      style={({ pressed }) => pressed && styles.pressed}>
                      <Text style={[typography.tiny, styles.clear]}>CLEAR</Text>
                    </Pressable>
                  </View>

                  {recentSearches.map((entry, index) => (
                    <Stagger key={entry.query} index={index} base={60} step={40}>
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => setQuery(entry.query)}
                        style={({ pressed }) => [styles.recentRow, pressed && styles.pressed]}>
                        <Text numberOfLines={1} style={[typography.bodyStrong, styles.recentTerm]}>
                          {entry.query}
                        </Text>
                        <Text style={[typography.tiny, styles.recentTime]}>
                          {relativeDay(entry.at)}
                        </Text>
                      </Pressable>
                    </Stagger>
                  ))}
                </Reveal>
              ) : (
                <EmptyState
                  icon="dictionary"
                  title="Search the club dictionary"
                  message="Look up any of the 120 snooker terms by name, or type a phrase to search inside the definitions."
                  style={styles.emptyState}
                />
              )}
            </View>
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingHorizontal: scale(layout.gutter),
    paddingTop: scale(8),
    paddingBottom: scale(12),
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(9),
    height: scale(42),
    paddingHorizontal: scale(13),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    fontSize: fontSize(14),
    padding: 0,
  },
  cancel: {
    color: colors.primary,
    fontSize: fontSize(15),
  },
  pressed: {
    opacity: 0.65,
  },
  content: {
    paddingHorizontal: scale(layout.gutter),
  },
  resultCount: {
    marginBottom: scale(10),
  },
  resultWrap: {
    marginBottom: scale(8),
  },
  recentHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(6),
    marginBottom: scale(8),
  },
  clear: {
    color: colors.primary,
    letterSpacing: 0.9,
    fontWeight: '700',
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(13),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
    gap: scale(12),
  },
  recentTerm: {
    flex: 1,
  },
  recentTime: {
    color: colors.textFaint,
  },
  emptyState: {
    marginTop: scale(40),
  },
});
