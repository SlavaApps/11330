import {
  accuracy,
  drillStats,
  initialPractice,
  PracticeResult,
  practiceReducer,
  PracticeSession,
  PracticeState,
  sessionsThisWeek,
} from '../src/utils/practice';

const session: PracticeSession = {
  id: 'session-1',
  drillId: 'straight-pot',
  target: 10,
  shots: [],
  startedAt: '2026-09-28T10:00:00.000Z',
};
const start = (): PracticeState =>
  practiceReducer(initialPractice, { type: 'start', session });
const complete = (): PracticeState =>
  Array.from({ length: 10 }).reduce<PracticeState>(
    (state, _, index) =>
      practiceReducer(state, { type: 'shot', success: index < 7 }),
    start(),
  );
const result = (overrides: Partial<PracticeResult> = {}): PracticeResult => ({
  ...session,
  shots: [true, false],
  completedAt: '2026-09-28T11:00:00.000Z',
  note: '',
  ...overrides,
});

test('records success and miss, undoes exactly one attempt, and calculates accuracy', () => {
  let state = practiceReducer(start(), { type: 'shot', success: true });
  state = practiceReducer(state, { type: 'shot', success: false });
  expect(accuracy(state.active!.shots)).toBe(50);
  state = practiceReducer(state, { type: 'undo' });
  expect(state.active!.shots).toEqual([true]);
  expect(accuracy(state.active!.shots)).toBe(100);
  expect(accuracy([])).toBe(0);
});

test('protects active progress and rejects invalid exercise or set sizes', () => {
  const state = start();
  expect(
    practiceReducer(state, {
      type: 'start',
      session: { ...session, id: 'other' },
    }),
  ).toBe(state);
  for (const invalid of [
    { ...session, target: 0 },
    { ...session, drillId: 'missing' },
  ]) {
    expect(
      practiceReducer(initialPractice, { type: 'start', session: invalid }),
    ).toBe(initialPractice);
  }
});

test('requires a complete set, caps attempts and prevents duplicate saves', () => {
  const state = start();
  const finish = {
    type: 'finish',
    at: '2026-09-28T11:00:00.000Z',
    note: '  Keep bridge steady  ',
  } as const;
  expect(practiceReducer(state, finish)).toBe(state);
  const completed = complete();
  expect(practiceReducer(completed, { type: 'shot', success: true })).toBe(
    completed,
  );
  const saved = practiceReducer(completed, finish);
  expect(saved.active).toBeNull();
  expect(saved.history).toHaveLength(1);
  expect(saved.history[0].note).toBe('Keep bridge steady');
  expect(accuracy(saved.history[0].shots)).toBe(70);
  expect(practiceReducer(saved, finish)).toBe(saved);
});

test('supports undoing the final shot before saving', () => {
  const state = practiceReducer(complete(), { type: 'undo' });
  expect(state.active!.shots).toHaveLength(9);
  expect(
    practiceReducer(state, { type: 'finish', at: session.startedAt, note: '' }),
  ).toBe(state);
});

test('persisted session resumes with all recorded attempts', () => {
  const state = practiceReducer(start(), { type: 'shot', success: true });
  const restored = JSON.parse(JSON.stringify(state)) as PracticeState;
  const resumed = practiceReducer(restored, { type: 'shot', success: false });
  expect(resumed.active!.shots).toEqual([true, false]);
  expect(resumed.active!.id).toBe(session.id);
});

test('discards active set without changing history or goal', () => {
  const state = { ...start(), weeklyGoal: 5, history: [result()] };
  expect(practiceReducer(state, { type: 'discard' })).toEqual({
    ...state,
    active: null,
  });
});

test('compares only the same exercise and set length', () => {
  const history = [
    result({ id: 'new', shots: [true, false] }),
    result({ id: 'old', shots: [true, true] }),
    result({ id: 'different', drillId: 'long-pot', shots: [false] }),
    result({ id: 'long', target: 20, shots: [false] }),
  ];
  expect(drillStats(history, 'straight-pot', 10)).toEqual({
    count: 2,
    latest: 50,
    best: 100,
  });
  expect(drillStats([], 'straight-pot', 10)).toEqual({
    count: 0,
    latest: null,
    best: null,
  });
});

test('weekly progress respects local Monday boundary and excludes future results', () => {
  const now = new Date(2026, 8, 30, 12);
  const dates = [
    new Date(2026, 8, 27, 23, 59),
    new Date(2026, 8, 28, 0),
    now,
    new Date(2026, 8, 30, 13),
    new Date(2026, 9, 5, 0),
  ];
  expect(
    sessionsThisWeek(
      dates.map(date => result({ completedAt: date.toISOString() })),
      now,
    ),
  ).toBe(2);
  expect(
    sessionsThisWeek(
      [result({ completedAt: new Date(2026, 8, 28).toISOString() })],
      new Date(2026, 9, 4, 23, 59),
    ),
  ).toBe(1);
});

test('deleting a result updates statistics without deleting other sessions', () => {
  const state = {
    ...initialPractice,
    history: [
      result({ id: 'a', shots: [true] }),
      result({ id: 'b', shots: [false] }),
    ],
  };
  const updated = practiceReducer(state, { type: 'delete', id: 'a' });
  expect(updated.history.map(item => item.id)).toEqual(['b']);
  expect(drillStats(updated.history, 'straight-pot', 10).best).toBe(0);
});

test('accepts supported weekly goals and rejects invalid values', () => {
  expect(
    practiceReducer(initialPractice, { type: 'goal', goal: 5 }).weeklyGoal,
  ).toBe(5);
  expect(practiceReducer(initialPractice, { type: 'goal', goal: -1 })).toBe(
    initialPractice,
  );
});

test('reset clears practice history, unfinished set and custom goal', () => {
  const state = { ...start(), weeklyGoal: 7, history: [result()] };
  expect(practiceReducer(state, { type: 'reset' })).toEqual(initialPractice);
});
