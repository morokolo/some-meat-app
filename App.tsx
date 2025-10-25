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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@stores/configureStore';
import { Counter } from '@features/counter/screens/Counter';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style='dark' />
        {/* <Counter /> */}
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
