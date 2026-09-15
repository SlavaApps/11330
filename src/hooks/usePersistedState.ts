import { useCallback, useEffect, useRef, useState } from 'react';
import { readValue, writeValue } from '../storage/storage';

type Updater<T> = T | ((previous: T) => T);

export function usePersistedState<T>(
  key: string,
  initial: T,
): [T, (value: Updater<T>) => void, boolean] {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    readValue<T>(key, initial).then(stored => {
      if (mounted.current) {
        setState(stored);
        setHydrated(true);
      }
    });
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (value: Updater<T>) => {
      setState(previous => {
        const next =
          typeof value === 'function' ? (value as (p: T) => T)(previous) : value;
        writeValue(key, next);
        return next;
      });
    },
    [key],
  );

  return [state, update, hydrated];
}
