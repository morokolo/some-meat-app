import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import AppHeader from '@/components/header/AppHeader';

const FavouritesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Favourites</Text>
        <Text style={styles.subtitle}>Your saved items</Text>
        <Text style={styles.description}>
          Items you've marked as favourites will appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default FavouritesScreen;
