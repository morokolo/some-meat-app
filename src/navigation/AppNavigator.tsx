import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '@/features/registration/screens/RegistrationScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Registration'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Registration' component={RegistrationScreen} />
        <Stack.Screen name='MainTabs' component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
