import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { StorageKeys } from '../storage/storage';
import { ActivationState, Profile } from '../types';

const emptyProfile: Profile = {
  name: '',
  memberNumber: '',
  tier: 'Classic',
  validTo: '',
  activation: 'none',
  activatedAt: null,
};

interface ProfileContextValue {
  profile: Profile;
  hydrated: boolean;
  hasProfile: boolean;
  saveProfile: (patch: Partial<Profile>) => void;
  requestActivation: () => void;
  confirmActivation: () => void;
  resetActivation: () => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [profile, setProfile, hydrated] = usePersistedState<Profile>(
    StorageKeys.profile,
    emptyProfile,
  );

  const value = useMemo<ProfileContextValue>(() => {
    const setActivation = (activation: ActivationState, activatedAt: string | null) =>
      setProfile(previous => ({ ...previous, activation, activatedAt }));

    return {
      profile,
      hydrated,
      hasProfile: profile.name.trim().length > 0,
      saveProfile: patch => setProfile(previous => ({ ...previous, ...patch })),
      requestActivation: () => setActivation('pending', null),
      confirmActivation: () => setActivation('active', new Date().toISOString()),
      resetActivation: () => setActivation('none', null),
      clearProfile: () => setProfile(emptyProfile),
    };
  }, [profile, hydrated, setProfile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used inside ProfileProvider');
  }
  return context;
}
