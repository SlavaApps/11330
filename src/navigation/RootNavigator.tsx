import React from 'react';
import { DarkTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { TabNavigator } from './TabNavigator';
import { colors } from '../theme';
import type { RootStackParamList } from './types';

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.primary,
  },
};

const Root = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Root.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade',
        }}>
        <Root.Screen name="Splash" component={SplashScreen} />
        <Root.Screen name="Onboarding" component={OnboardingScreen} />
        <Root.Screen name="Main" component={TabNavigator} />
      </Root.Navigator>
    </NavigationContainer>
  );
}
