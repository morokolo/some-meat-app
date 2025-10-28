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
import { useFonts } from 'expo-font';
import AppNavigator from '@navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@stores/configureStore';
import { Counter } from '@features/counter/screens/Counter';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Avenir-Roman': require('./assets/fonts/Avenir-Roman.ttf'),
    'Avenir-Medium': require('./assets/fonts/Avenir-Medium.ttf'),
    'AGaramondPro-Regular': require('./assets/fonts/AGaramondPro-Regular.otf'),
    'AGaramondPro-Bold': require('./assets/fonts/AGaramondPro-Bold.otf'),
    'AGaramondPro-Italic': require('./assets/fonts/AGaramondPro-Italic.otf'),
    'AGaramondPro-BoldItalic': require('./assets/fonts/AGaramondPro-BoldItalic.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

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
