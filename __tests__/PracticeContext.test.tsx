import React from 'react';
import Renderer, { act } from 'react-test-renderer';
import { PracticeProvider, usePractice } from '../src/context/PracticeContext';
import { readValue, writeValue } from '../src/storage/storage';
import { initialPractice } from '../src/utils/practice';

jest.mock('../src/storage/storage', () => ({
  StorageKeys: { practice: 'practice' },
  readValue: jest.fn(),
  writeValue: jest.fn(),
}));

let current: ReturnType<typeof usePractice>;
function Probe() {
  current = usePractice();
  return null;
}
let tree: ReturnType<typeof Renderer.create>;

beforeEach(() => {
  jest.clearAllMocks();
  (readValue as jest.Mock).mockResolvedValue(initialPractice);
  (writeValue as jest.Mock).mockResolvedValue(undefined);
});
afterEach(async () => {
  await act(() => tree?.unmount());
});

test('restores an unfinished set after provider unmount and saves it exactly once', async () => {
  await act(async () => {
    tree = Renderer.create(
      <PracticeProvider>
        <Probe />
      </PracticeProvider>,
    );
  });
  expect(current.hydrated).toBe(true);
  await act(() =>
    current.dispatch({
      type: 'start',
      session: {
        id: 'persistent',
        drillId: 'straight-pot',
        target: 10,
        shots: [],
        startedAt: new Date().toISOString(),
      },
    }),
  );
  await act(() => current.dispatch({ type: 'shot', success: true }));
  const stored = (writeValue as jest.Mock).mock.calls.at(-1)![1];
  expect(stored.active.shots).toEqual([true]);
  await act(() => tree.unmount());
  (readValue as jest.Mock).mockResolvedValue(
    JSON.parse(JSON.stringify(stored)),
  );
  await act(async () => {
    tree = Renderer.create(
      <PracticeProvider>
        <Probe />
      </PracticeProvider>,
    );
  });
  expect(current.state.active?.id).toBe('persistent');
  expect(current.state.active?.shots).toEqual([true]);
  await act(() => {
    for (let i = 0; i < 9; i++) {
      current.dispatch({ type: 'shot', success: false });
    }
  });
  await act(() => {
    current.dispatch({
      type: 'finish',
      at: new Date().toISOString(),
      note: 'Steady bridge',
    });
    current.dispatch({
      type: 'finish',
      at: new Date().toISOString(),
      note: 'Duplicate',
    });
  });
  expect(current.state.active).toBeNull();
  expect(current.state.history).toHaveLength(1);
  expect(current.state.history[0].note).toBe('Steady bridge');
  expect((writeValue as jest.Mock).mock.calls.at(-1)![1].history).toHaveLength(
    1,
  );
});

test('does not overwrite saved progress before hydration completes', async () => {
  let resolve: (state: typeof initialPractice) => void = () => {};
  (readValue as jest.Mock).mockReturnValue(
    new Promise(done => {
      resolve = done;
    }),
  );
  await act(() => {
    tree = Renderer.create(
      <PracticeProvider>
        <Probe />
      </PracticeProvider>,
    );
  });
  expect(current.hydrated).toBe(false);
  await act(() => current.dispatch({ type: 'goal', goal: 7 }));
  expect(writeValue).not.toHaveBeenCalled();
  await act(async () => {
    resolve({ ...initialPractice, weeklyGoal: 5 });
  });
  expect(current.state.weeklyGoal).toBe(5);
});
