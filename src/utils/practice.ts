import { practiceDrills } from '../data/practice';

export interface PracticeSession {
  id: string;
  drillId: string;
  target: number;
  shots: boolean[];
  startedAt: string;
}

export interface PracticeResult extends PracticeSession {
  completedAt: string;
  note: string;
}

export interface PracticeState {
  weeklyGoal: number;
  active: PracticeSession | null;
  history: PracticeResult[];
}

export const initialPractice: PracticeState = {
  weeklyGoal: 3,
  active: null,
  history: [],
};
export type PracticeAction =
  | { type: 'start'; session: PracticeSession }
  | { type: 'shot'; success: boolean }
  | { type: 'undo' }
  | { type: 'discard' }
  | { type: 'reset' }
  | { type: 'finish'; at: string; note: string }
  | { type: 'goal'; goal: number }
  | { type: 'delete'; id: string };

export function practiceReducer(
  state: PracticeState,
  action: PracticeAction,
): PracticeState {
  switch (action.type) {
    case 'start':
      if (
        state.active ||
        !practiceDrills.some(drill => drill.id === action.session.drillId) ||
        ![10, 20, 30].includes(action.session.target)
      ) {
        return state;
      }
      return { ...state, active: { ...action.session, shots: [] } };
    case 'shot':
      if (!state.active || state.active.shots.length >= state.active.target) {
        return state;
      }
      return {
        ...state,
        active: {
          ...state.active,
          shots: [...state.active.shots, action.success],
        },
      };
    case 'undo':
      if (!state.active) {
        return state;
      }
      return {
        ...state,
        active: { ...state.active, shots: state.active.shots.slice(0, -1) },
      };
    case 'reset':
      return { weeklyGoal: 3, active: null, history: [] };
    case 'discard':
      return { ...state, active: null };
    case 'finish':
      if (!state.active || state.active.shots.length !== state.active.target) {
        return state;
      }
      return {
        ...state,
        active: null,
        history: [
          {
            ...state.active,
            completedAt: action.at,
            note: action.note.trim().slice(0, 240),
          },
          ...state.history,
        ],
      };
    case 'goal':
      return [1, 3, 5, 7].includes(action.goal)
        ? { ...state, weeklyGoal: action.goal }
        : state;
    case 'delete':
      return {
        ...state,
        history: state.history.filter(item => item.id !== action.id),
      };
  }
}

export function accuracy(shots: boolean[]): number {
  return shots.length
    ? Math.round((shots.filter(Boolean).length / shots.length) * 100)
    : 0;
}

// Local calendar boundaries avoid UTC day shifts and daylight-saving week errors.
export function sessionsThisWeek(
  history: PracticeResult[],
  now = new Date(),
): number {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return history.filter(item => {
    const time = new Date(item.completedAt).getTime();
    return (
      time >= start.getTime() && time < end.getTime() && time <= now.getTime()
    );
  }).length;
}

export function drillStats(
  history: PracticeResult[],
  drillId: string,
  target: number,
) {
  const results = history.filter(
    item => item.drillId === drillId && item.target === target,
  );
  return {
    count: results.length,
    latest: results.length ? accuracy(results[0].shots) : null,
    best: results.length
      ? Math.max(...results.map(item => accuracy(item.shots)))
      : null,
  };
}
