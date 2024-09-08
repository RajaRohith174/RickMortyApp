/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNavigator from './src/navigation/navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles?.topContainer}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {flex: 1, backgroundColor: 'gray'},
});

export default App;
