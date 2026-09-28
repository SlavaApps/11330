import React, { createContext, PropsWithChildren, useContext } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { StorageKeys } from '../storage/storage';
import {
  initialPractice,
  PracticeAction,
  practiceReducer,
  PracticeState,
} from '../utils/practice';

interface PracticeContextValue {
  state: PracticeState;
  hydrated: boolean;
  dispatch: (action: PracticeAction) => void;
}
const PracticeContext = createContext<PracticeContextValue | undefined>(
  undefined,
);

export function PracticeProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const [state, setState, hydrated] = usePersistedState(
    StorageKeys.practice,
    initialPractice,
  );
  const dispatch = (action: PracticeAction) => {
    if (hydrated) {
      setState(previous => practiceReducer(previous, action));
    }
  };
  return (
    <PracticeContext.Provider value={{ state, hydrated, dispatch }}>
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractice(): PracticeContextValue {
  const value = useContext(PracticeContext);
  if (!value) {
    throw new Error('usePractice must be used inside PracticeProvider');
  }
  return value;
}
