import type { NavigatorScreenParams } from '@react-navigation/native';

export type LearnStackParamList = {
  LearnHome: undefined;
  Lesson: { lessonId: string };
  Profile: undefined;
};

export type DictionaryStackParamList = {
  DictionaryHome: undefined;
  DictionarySearch: undefined;
  Quiz: undefined;
  QuizResult: {
    score: number;
    correct: number;
    total: number;
    accuracy: number;
    durationSeconds: number;
    isBest: boolean;
    previousBest: number;
    weakestTopic: string | null;
  };
};

export type ScoreStackParamList = {
  Scoreboard: undefined;
  MatchHistory: undefined;
};

export type EventsStackParamList = {
  EventsHome: undefined;
  MyPlans: undefined;
};

export type MenuStackParamList = {
  MenuHome: undefined;
};

export type MainTabParamList = {
  Learn: NavigatorScreenParams<LearnStackParamList>;
  Dictionary: NavigatorScreenParams<DictionaryStackParamList>;
  Score: NavigatorScreenParams<ScoreStackParamList>;
  Events: NavigatorScreenParams<EventsStackParamList>;
  Menu: NavigatorScreenParams<MenuStackParamList>;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
