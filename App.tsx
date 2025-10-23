import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import RegistrationScreen from './src/screens/RegistrationScreen';
import ProductsListingScreen from './src/screens/ProductsListingScreen';
import CartScreen from './src/screens/CartScreen';
import { colors } from './src/styles/colors';

type Screen = 'registration' | 'products' | 'cart';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('registration');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'registration':
        return <RegistrationScreen />;
      case 'products':
        return <ProductsListingScreen />;
      case 'cart':
        return <CartScreen />;
      default:
        return <RegistrationScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {renderScreen()}
      
      {/* Simple Navigation Tabs */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentScreen === 'registration' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('registration')}
        >
          <Text style={[styles.navButtonText, currentScreen === 'registration' && styles.navButtonTextActive]}>
            Registration
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navButton, currentScreen === 'products' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('products')}
        >
          <Text style={[styles.navButtonText, currentScreen === 'products' && styles.navButtonTextActive]}>
            Products
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navButton, currentScreen === 'cart' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('cart')}
        >
          <Text style={[styles.navButtonText, currentScreen === 'cart' && styles.navButtonTextActive]}>
            Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  navigation: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  navButtonActive: {
    backgroundColor: colors.primary,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  navButtonTextActive: {
    color: colors.white,
  },
});
