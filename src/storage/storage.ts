import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@shorelines_snooker/';

export const StorageKeys = {
  practice: `${PREFIX}practice`,
  onboarding: `${PREFIX}onboarding_complete`,
  profile: `${PREFIX}profile`,
  lessonProgress: `${PREFIX}lesson_progress`,
  bookmarks: `${PREFIX}lesson_bookmarks`,
  quizStats: `${PREFIX}quiz_stats`,
  recentSearches: `${PREFIX}recent_searches`,
  currentMatch: `${PREFIX}current_match`,
  savedMatches: `${PREFIX}saved_matches`,
  eventPlans: `${PREFIX}event_plans`,
  tableRequest: `${PREFIX}table_request`,
  requestHistory: `${PREFIX}request_history`,
} as const;

export async function readValue<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeValue<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}

export async function removeValue(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
  }
}

export async function clearAll(): Promise<void> {
  await Promise.all(Object.values(StorageKeys).map(key => removeValue(key)));
}
