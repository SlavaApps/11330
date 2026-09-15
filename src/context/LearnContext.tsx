import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { StorageKeys } from '../storage/storage';
import { lessons } from '../data/lessons';
import { Lesson, LessonProgress, LessonProgressMap } from '../types';

const emptyProgress: LessonProgress = {
  checkedSections: [],
  completed: false,
  lastSectionIndex: 0,
};

export type LessonStatus = 'not-started' | 'in-progress' | 'completed';

interface LearnContextValue {
  progress: LessonProgressMap;
  bookmarks: string[];
  hydrated: boolean;
  completedCount: number;
  overallPercent: number;
  statusFor: (lessonId: string) => LessonStatus;
  percentFor: (lessonId: string) => number;
  isChecked: (lessonId: string, section: string) => boolean;
  toggleSection: (lessonId: string, section: string, total: number) => void;
  markVisited: (lessonId: string, sectionIndex: number) => void;
  markCompleted: (lessonId: string) => void;
  resetLesson: (lessonId: string) => void;
  resetAllProgress: () => void;
  isBookmarked: (lessonId: string) => boolean;
  toggleBookmark: (lessonId: string) => void;
  continueLesson: Lesson;
}

const LearnContext = createContext<LearnContextValue | undefined>(undefined);

export function LearnProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [progress, setProgress, progressHydrated] = usePersistedState<LessonProgressMap>(
    StorageKeys.lessonProgress,
    {},
  );
  const [bookmarks, setBookmarks, bookmarksHydrated] = usePersistedState<string[]>(
    StorageKeys.bookmarks,
    [],
  );

  const value = useMemo<LearnContextValue>(() => {
    const entryFor = (lessonId: string): LessonProgress => progress[lessonId] ?? emptyProgress;

    const percentFor = (lessonId: string): number => {
      const lesson = lessons.find(item => item.id === lessonId);
      if (!lesson) {
        return 0;
      }
      const entry = entryFor(lessonId);
      if (entry.completed) {
        return 100;
      }
      const total = lesson.checklist.length;
      if (total === 0) {
        return 0;
      }
      return Math.round((entry.checkedSections.length / total) * 100);
    };

    const statusFor = (lessonId: string): LessonStatus => {
      const entry = entryFor(lessonId);
      if (entry.completed) {
        return 'completed';
      }
      return entry.checkedSections.length > 0 ? 'in-progress' : 'not-started';
    };

    const completedCount = lessons.filter(lesson => entryFor(lesson.id).completed).length;

    const overallPercent = Math.round(
      lessons.reduce((total, lesson) => total + percentFor(lesson.id), 0) / lessons.length,
    );

    const continueLesson =
      lessons.find(lesson => statusFor(lesson.id) === 'in-progress') ??
      lessons.find(lesson => statusFor(lesson.id) === 'not-started') ??
      lessons[0];

    return {
      progress,
      bookmarks,
      hydrated: progressHydrated && bookmarksHydrated,
      completedCount,
      overallPercent,
      statusFor,
      percentFor,
      isChecked: (lessonId, section) => entryFor(lessonId).checkedSections.includes(section),
      toggleSection: (lessonId, section, total) =>
        setProgress(previous => {
          const entry = previous[lessonId] ?? emptyProgress;
          const checked = entry.checkedSections.includes(section)
            ? entry.checkedSections.filter(item => item !== section)
            : [...entry.checkedSections, section];
          return {
            ...previous,
            [lessonId]: {
              ...entry,
              checkedSections: checked,
              completed: checked.length >= total,
            },
          };
        }),
      markVisited: (lessonId, sectionIndex) =>
        setProgress(previous => {
          const entry = previous[lessonId] ?? emptyProgress;
          if (entry.lastSectionIndex === sectionIndex && previous[lessonId]) {
            return previous;
          }
          return {
            ...previous,
            [lessonId]: { ...entry, lastSectionIndex: sectionIndex },
          };
        }),
      markCompleted: lessonId =>
        setProgress(previous => {
          const lesson = lessons.find(item => item.id === lessonId);
          const entry = previous[lessonId] ?? emptyProgress;
          return {
            ...previous,
            [lessonId]: {
              ...entry,
              completed: true,
              checkedSections: lesson ? lesson.checklist : entry.checkedSections,
            },
          };
        }),
      resetLesson: lessonId =>
        setProgress(previous => {
          const next = { ...previous };
          delete next[lessonId];
          return next;
        }),
      resetAllProgress: () => setProgress({}),
      isBookmarked: lessonId => bookmarks.includes(lessonId),
      toggleBookmark: lessonId =>
        setBookmarks(previous =>
          previous.includes(lessonId)
            ? previous.filter(item => item !== lessonId)
            : [...previous, lessonId],
        ),
      continueLesson,
    };
  }, [progress, bookmarks, progressHydrated, bookmarksHydrated, setProgress, setBookmarks]);

  return <LearnContext.Provider value={value}>{children}</LearnContext.Provider>;
}

export function useLearn(): LearnContextValue {
  const context = useContext(LearnContext);
  if (!context) {
    throw new Error('useLearn must be used inside LearnProvider');
  }
  return context;
}
