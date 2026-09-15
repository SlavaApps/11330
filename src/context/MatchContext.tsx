import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { StorageKeys } from '../storage/storage';
import { BallEvent, MatchState, SavedMatch } from '../types';

export const FOUL_POINTS = 4;

export const ballButtons: { label: string; points: number; ball: string }[] = [
  { label: '1', points: 1, ball: 'red' },
  { label: '2', points: 2, ball: 'yellow' },
  { label: '3', points: 3, ball: 'green' },
  { label: '4', points: 4, ball: 'brown' },
  { label: '5', points: 5, ball: 'blue' },
  { label: '6', points: 6, ball: 'pink' },
  { label: '7', points: 7, ball: 'black' },
];

export const emptyMatch: MatchState = {
  playerOne: '',
  playerTwo: '',
  bestOf: 7,
  table: 'Table 1',
  frameNumber: 1,
  scoreOne: 0,
  scoreTwo: 0,
  framesOne: 0,
  framesTwo: 0,
  events: [],
  startedAt: null,
  currentBreak: 0,
  currentBreakPlayer: null,
  highestBreak: 0,
  highestBreakPlayer: null,
};

export interface HistoryStats {
  played: number;
  won: number;
  averageBreak: number;
  hasData: boolean;
  frameWinRate: { label: string; value: number }[];
  monthOverMonth: number | null;
}

interface MatchContextValue {
  match: MatchState;
  savedMatches: SavedMatch[];
  hydrated: boolean;
  stats: HistoryStats;
  elapsedSeconds: number;
  setPlayerName: (player: 1 | 2, name: string) => void;
  setBestOf: (bestOf: number) => void;
  setTable: (table: string) => void;
  addPoints: (player: 1 | 2, points: number, label: string) => void;
  addFoul: (player: 1 | 2) => void;
  undoLast: () => void;
  awardFrame: (player: 1 | 2) => void;
  resetMatch: () => void;
  saveMatch: () => SavedMatch | null;
  deleteSavedMatch: (id: string) => void;
  clearHistory: () => void;
}

const MatchContext = createContext<MatchContextValue | undefined>(undefined);

function applyBreak(state: MatchState, player: 1 | 2, points: number): Partial<MatchState> {
  const sameVisit = state.currentBreakPlayer === player;
  const nextBreak = sameVisit ? state.currentBreak + points : points;
  const isHighest = nextBreak > state.highestBreak;

  return {
    currentBreak: nextBreak,
    currentBreakPlayer: player,
    highestBreak: isHighest ? nextBreak : state.highestBreak,
    highestBreakPlayer: isHighest ? player : state.highestBreakPlayer,
  };
}

function recalculate(state: MatchState): MatchState {
  let scoreOne = 0;
  let scoreTwo = 0;
  let currentBreak = 0;
  let currentBreakPlayer: 1 | 2 | null = null;
  let highestBreak = 0;
  let highestBreakPlayer: 1 | 2 | null = null;

  state.events.forEach(event => {
    if (event.foul) {
      if (event.player === 1) {
        scoreTwo += event.points;
      } else {
        scoreOne += event.points;
      }
      currentBreak = 0;
      currentBreakPlayer = null;
      return;
    }

    if (event.player === 1) {
      scoreOne += event.points;
    } else {
      scoreTwo += event.points;
    }

    currentBreak = currentBreakPlayer === event.player ? currentBreak + event.points : event.points;
    currentBreakPlayer = event.player;
    if (currentBreak > highestBreak) {
      highestBreak = currentBreak;
      highestBreakPlayer = event.player;
    }
  });

  return {
    ...state,
    scoreOne,
    scoreTwo,
    currentBreak,
    currentBreakPlayer,
    highestBreak,
    highestBreakPlayer,
  };
}

function monthKey(iso: string): string {
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function buildStats(matches: SavedMatch[]): HistoryStats {
  if (matches.length === 0) {
    return {
      played: 0,
      won: 0,
      averageBreak: 0,
      hasData: false,
      frameWinRate: [],
      monthOverMonth: null,
    };
  }

  const played = matches.length;
  const won = matches.filter(item => item.winner === item.playerOne).length;
  const breaks = matches.filter(item => item.highestBreak > 0);
  const averageBreak = breaks.length
    ? Math.round(breaks.reduce((total, item) => total + item.highestBreak, 0) / breaks.length)
    : 0;

  const buckets = new Map<string, { won: number; total: number }>();
  matches.forEach(item => {
    const key = monthKey(item.playedAt);
    const bucket = buckets.get(key) ?? { won: 0, total: 0 };
    bucket.won += item.framesOne;
    bucket.total += item.framesOne + item.framesTwo;
    buckets.set(key, bucket);
  });

  const frameWinRate = Array.from(buckets.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-6)
    .map(([key, bucket]) => {
      const [year, month] = key.split('-');
      const label = new Date(Number(year), Number(month) - 1, 1)
        .toLocaleDateString('en-GB', { month: 'short' })
        .toUpperCase();
      return {
        label,
        value: bucket.total > 0 ? Math.round((bucket.won / bucket.total) * 100) : 0,
      };
    });

  const monthOverMonth =
    frameWinRate.length >= 2
      ? frameWinRate[frameWinRate.length - 1].value - frameWinRate[frameWinRate.length - 2].value
      : null;

  return {
    played,
    won,
    averageBreak,
    hasData: true,
    frameWinRate,
    monthOverMonth,
  };
}

export function MatchProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [match, setMatch, matchHydrated] = usePersistedState<MatchState>(
    StorageKeys.currentMatch,
    emptyMatch,
  );
  const [savedMatches, setSavedMatches, savedHydrated] = usePersistedState<SavedMatch[]>(
    StorageKeys.savedMatches,
    [],
  );
  const [tick, setTick] = React.useState(0);

  const running = match.startedAt !== null;

  React.useEffect(() => {
    if (!running) {
      return;
    }
    const timer = setInterval(() => setTick(value => value + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  const elapsedSeconds = useMemo(() => {
    if (!match.startedAt) {
      return 0;
    }
    return Math.max(0, Math.floor((Date.now() - match.startedAt) / 1000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.startedAt, tick]);

  const value = useMemo<MatchContextValue>(() => {
    const pushEvent = (player: 1 | 2, points: number, label: string, foul: boolean) =>
      setMatch(previous => {
        const event: BallEvent = {
          id: `event-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
          player,
          points,
          label,
          foul,
          at: Date.now(),
        };

        const base: MatchState = {
          ...previous,
          startedAt: previous.startedAt ?? Date.now(),
          events: [...previous.events, event],
        };

        if (foul) {
          return {
            ...base,
            scoreOne: player === 2 ? previous.scoreOne + points : previous.scoreOne,
            scoreTwo: player === 1 ? previous.scoreTwo + points : previous.scoreTwo,
            currentBreak: 0,
            currentBreakPlayer: null,
          };
        }

        return {
          ...base,
          scoreOne: player === 1 ? previous.scoreOne + points : previous.scoreOne,
          scoreTwo: player === 2 ? previous.scoreTwo + points : previous.scoreTwo,
          ...applyBreak(previous, player, points),
        };
      });

    return {
      match,
      savedMatches,
      hydrated: matchHydrated && savedHydrated,
      stats: buildStats(savedMatches),
      elapsedSeconds,
      setPlayerName: (player, name) =>
        setMatch(previous =>
          player === 1 ? { ...previous, playerOne: name } : { ...previous, playerTwo: name },
        ),
      setBestOf: bestOf => setMatch(previous => ({ ...previous, bestOf })),
      setTable: table => setMatch(previous => ({ ...previous, table })),
      addPoints: (player, points, label) => pushEvent(player, points, label, false),
      addFoul: player => pushEvent(player, FOUL_POINTS, `Foul · ${FOUL_POINTS}`, true),
      undoLast: () =>
        setMatch(previous => {
          if (previous.events.length === 0) {
            return previous;
          }
          return recalculate({
            ...previous,
            events: previous.events.slice(0, -1),
          });
        }),
      awardFrame: player =>
        setMatch(previous => ({
          ...previous,
          startedAt: previous.startedAt ?? Date.now(),
          framesOne: player === 1 ? previous.framesOne + 1 : previous.framesOne,
          framesTwo: player === 2 ? previous.framesTwo + 1 : previous.framesTwo,
          frameNumber: previous.frameNumber + 1,
          scoreOne: 0,
          scoreTwo: 0,
          events: [],
          currentBreak: 0,
          currentBreakPlayer: null,
          highestBreak: 0,
          highestBreakPlayer: null,
        })),
      resetMatch: () =>
        setMatch(previous => ({
          ...emptyMatch,
          playerOne: previous.playerOne,
          playerTwo: previous.playerTwo,
          bestOf: previous.bestOf,
          table: previous.table,
        })),
      saveMatch: () => {
        const hasPlay =
          match.scoreOne > 0 ||
          match.scoreTwo > 0 ||
          match.framesOne > 0 ||
          match.framesTwo > 0;
        if (!hasPlay) {
          return null;
        }

        const playerOne = match.playerOne.trim() || 'Player 1';
        const playerTwo = match.playerTwo.trim() || 'Player 2';
        const framesOne = match.framesOne + (match.scoreOne > match.scoreTwo ? 1 : 0);
        const framesTwo = match.framesTwo + (match.scoreTwo > match.scoreOne ? 1 : 0);

        const saved: SavedMatch = {
          id: `match-${Date.now()}`,
          playedAt: new Date().toISOString(),
          durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
          playerOne,
          playerTwo,
          scoreOne: match.scoreOne,
          scoreTwo: match.scoreTwo,
          framesOne,
          framesTwo,
          winner: framesOne === framesTwo
            ? match.scoreOne >= match.scoreTwo
              ? playerOne
              : playerTwo
            : framesOne > framesTwo
              ? playerOne
              : playerTwo,
          highestBreak: match.highestBreak,
        };

        setSavedMatches(previous => [saved, ...previous]);
        setMatch(previous => ({
          ...emptyMatch,
          playerOne: previous.playerOne,
          playerTwo: previous.playerTwo,
          bestOf: previous.bestOf,
          table: previous.table,
        }));
        return saved;
      },
      deleteSavedMatch: id => setSavedMatches(previous => previous.filter(item => item.id !== id)),
      clearHistory: () => setSavedMatches([]),
    };
  }, [match, savedMatches, matchHydrated, savedHydrated, elapsedSeconds, setMatch, setSavedMatches]);

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
}

export function useMatch(): MatchContextValue {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used inside MatchProvider');
  }
  return context;
}
