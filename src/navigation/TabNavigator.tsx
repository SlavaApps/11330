import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabBar } from './TabBar';
import { PracticeScreen } from '../screens/practice/PracticeScreen';
import { LearnScreen } from '../screens/learn/LearnScreen';
import { LessonScreen } from '../screens/learn/LessonScreen';
import { ProfileScreen } from '../screens/learn/ProfileScreen';
import { DictionaryScreen } from '../screens/dictionary/DictionaryScreen';
import { SearchScreen } from '../screens/dictionary/SearchScreen';
import { QuizScreen } from '../screens/dictionary/QuizScreen';
import { QuizResultScreen } from '../screens/dictionary/QuizResultScreen';
import { ScoreboardScreen } from '../screens/score/ScoreboardScreen';
import { MatchHistoryScreen } from '../screens/score/MatchHistoryScreen';
import { EventsScreen } from '../screens/events/EventsScreen';
import { MyPlansScreen } from '../screens/events/MyPlansScreen';
import { MenuScreen } from '../screens/menu/MenuScreen';
import { colors } from '../theme';
import type {
  DictionaryStackParamList,
  EventsStackParamList,
  LearnStackParamList,
  MainTabParamList,
  MenuStackParamList,
  ScoreStackParamList,
} from './types';

const stackOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
  animation: 'slide_from_right',
} as const;

const LearnStack = createNativeStackNavigator<LearnStackParamList>();

function LearnNavigator(): React.JSX.Element {
  return (
    <LearnStack.Navigator screenOptions={stackOptions}>
      <LearnStack.Screen name="LearnHome" component={LearnScreen} />
      <LearnStack.Screen name="Practice" component={PracticeScreen} />
      <LearnStack.Screen name="Lesson" component={LessonScreen} />
      <LearnStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
    </LearnStack.Navigator>
  );
}

const DictionaryStack = createNativeStackNavigator<DictionaryStackParamList>();

function DictionaryNavigator(): React.JSX.Element {
  return (
    <DictionaryStack.Navigator screenOptions={stackOptions}>
      <DictionaryStack.Screen name="DictionaryHome" component={DictionaryScreen} />
      <DictionaryStack.Screen
        name="DictionarySearch"
        component={SearchScreen}
        options={{ animation: 'fade' }}
      />
      <DictionaryStack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <DictionaryStack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{ animation: 'fade' }}
      />
    </DictionaryStack.Navigator>
  );
}

const ScoreStack = createNativeStackNavigator<ScoreStackParamList>();

function ScoreNavigator(): React.JSX.Element {
  return (
    <ScoreStack.Navigator screenOptions={stackOptions}>
      <ScoreStack.Screen name="Scoreboard" component={ScoreboardScreen} />
      <ScoreStack.Screen name="MatchHistory" component={MatchHistoryScreen} />
    </ScoreStack.Navigator>
  );
}

const EventsStack = createNativeStackNavigator<EventsStackParamList>();

function EventsNavigator(): React.JSX.Element {
  return (
    <EventsStack.Navigator screenOptions={stackOptions}>
      <EventsStack.Screen name="EventsHome" component={EventsScreen} />
      <EventsStack.Screen name="MyPlans" component={MyPlansScreen} />
    </EventsStack.Navigator>
  );
}

const MenuStack = createNativeStackNavigator<MenuStackParamList>();

function MenuNavigator(): React.JSX.Element {
  return (
    <MenuStack.Navigator screenOptions={stackOptions}>
      <MenuStack.Screen name="MenuHome" component={MenuScreen} />
    </MenuStack.Navigator>
  );
}

const Tabs = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

export function TabNavigator(): React.JSX.Element {
  return (
    <Tabs.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}>
      <Tabs.Screen name="Learn" component={LearnNavigator} options={{ tabBarLabel: 'Learn' }} />
      <Tabs.Screen
        name="Dictionary"
        component={DictionaryNavigator}
        options={{ tabBarLabel: 'Dictionary' }}
      />
      <Tabs.Screen name="Score" component={ScoreNavigator} options={{ tabBarLabel: 'Score' }} />
      <Tabs.Screen name="Events" component={EventsNavigator} options={{ tabBarLabel: 'Events' }} />
      <Tabs.Screen name="Menu" component={MenuNavigator} options={{ tabBarLabel: 'Menu' }} />
    </Tabs.Navigator>
  );
}
