import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppProvider';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <View style={styles.root}>
          <StatusBar barStyle="light-content" backgroundColor={colors.background} />
          <AppProvider>
            <RootNavigator />
          </AppProvider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
