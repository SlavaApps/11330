import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { StorageKeys } from '../storage/storage';
import { clubEvents } from '../data/events';
import { ClubEvent, EventPlans, PlanState } from '../types';

interface PlansContextValue {
  plans: EventPlans;
  hydrated: boolean;
  goingCount: number;
  interestedCount: number;
  planCount: number;
  planFor: (eventId: string) => PlanState | undefined;
  toggleGoing: (eventId: string) => void;
  toggleInterested: (eventId: string) => void;
  removePlan: (eventId: string) => void;
  clearPlans: () => void;
  eventsFor: (state: PlanState | 'past') => ClubEvent[];
  popularThisWeek: ClubEvent[];
}

const PlansContext = createContext<PlansContextValue | undefined>(undefined);

export function PlansProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [plans, setPlans, hydrated] = usePersistedState<EventPlans>(StorageKeys.eventPlans, {});

  const value = useMemo<PlansContextValue>(() => {
    const now = Date.now();

    const toggle = (eventId: string, state: PlanState) =>
      setPlans(previous => {
        if (previous[eventId] === state) {
          const next = { ...previous };
          delete next[eventId];
          return next;
        }
        return { ...previous, [eventId]: state };
      });

    const eventsFor = (state: PlanState | 'past'): ClubEvent[] => {
      const planned = clubEvents.filter(event => plans[event.id] !== undefined);
      if (state === 'past') {
        return planned
          .filter(event => new Date(event.isoDate).getTime() < now)
          .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());
      }
      return planned
        .filter(
          event => plans[event.id] === state && new Date(event.isoDate).getTime() >= now,
        )
        .sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
    };

    const upcoming = clubEvents
      .filter(event => new Date(event.isoDate).getTime() >= now)
      .sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());

    return {
      plans,
      hydrated,
      goingCount: Object.values(plans).filter(state => state === 'going').length,
      interestedCount: Object.values(plans).filter(state => state === 'interested').length,
      planCount: Object.keys(plans).length,
      planFor: eventId => plans[eventId],
      toggleGoing: eventId => toggle(eventId, 'going'),
      toggleInterested: eventId => toggle(eventId, 'interested'),
      removePlan: eventId =>
        setPlans(previous => {
          const next = { ...previous };
          delete next[eventId];
          return next;
        }),
      clearPlans: () => setPlans({}),
      eventsFor,
      popularThisWeek: upcoming.slice(0, 3),
    };
  }, [plans, hydrated, setPlans]);

  return <PlansContext.Provider value={value}>{children}</PlansContext.Provider>;
}

export function usePlans(): PlansContextValue {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used inside PlansProvider');
  }
  return context;
}
