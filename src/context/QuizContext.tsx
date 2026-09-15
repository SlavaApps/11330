import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { StorageKeys } from '../storage/storage';
import { QuizAttempt, QuizStats } from '../types';

const emptyStats: QuizStats = {
  bestScore: 0,
  bestScoreDate: null,
  attempts: [],
};

const MAX_ATTEMPTS = 12;
const MAX_SEARCHES = 6;

interface QuizContextValue {
  stats: QuizStats;
  hydrated: boolean;
  recentSearches: { query: string; at: string }[];
  recordAttempt: (attempt: Omit<QuizAttempt, 'id' | 'date'>) => {
    isBest: boolean;
    previousBest: number;
  };
  resetStats: () => void;
  pushSearch: (query: string) => void;
  clearSearches: () => void;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function QuizProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [stats, setStats, hydrated] = usePersistedState<QuizStats>(
    StorageKeys.quizStats,
    emptyStats,
  );
  const [recentSearches, setRecentSearches] = usePersistedState<{ query: string; at: string }[]>(
    StorageKeys.recentSearches,
    [],
  );

  const value = useMemo<QuizContextValue>(
    () => ({
      stats,
      hydrated,
      recentSearches,
      recordAttempt: attempt => {
        const previousBest = stats.bestScore;
        const isBest = attempt.score > previousBest;
        const entry: QuizAttempt = {
          ...attempt,
          id: `attempt-${Date.now()}`,
          date: new Date().toISOString(),
        };
        setStats(previous => ({
          bestScore: Math.max(previous.bestScore, attempt.score),
          bestScoreDate:
            attempt.score > previous.bestScore ? entry.date : previous.bestScoreDate,
          attempts: [entry, ...previous.attempts].slice(0, MAX_ATTEMPTS),
        }));
        return { isBest, previousBest };
      },
      resetStats: () => setStats(emptyStats),
      pushSearch: query => {
        const trimmed = query.trim();
        if (trimmed.length < 2) {
          return;
        }
        setRecentSearches(previous => [
          { query: trimmed, at: new Date().toISOString() },
          ...previous.filter(item => item.query.toLowerCase() !== trimmed.toLowerCase()),
        ].slice(0, MAX_SEARCHES));
      },
      clearSearches: () => setRecentSearches([]),
    }),
    [stats, hydrated, recentSearches, setStats, setRecentSearches],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizStats(): QuizContextValue {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizStats must be used inside QuizProvider');
  }
  return context;
}
