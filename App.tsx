// export default function App() {
//   return (
//     <>
//       <StatusBar style='dark' />
//       <AppNavigator />
//     </>
//   );
// }

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from '@navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@stores/configureStore';
import { Counter } from '@features/counter/screens/Counter';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Provider store={store}>
        <StatusBar style='dark' />
        {/* <Counter /> */}
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
