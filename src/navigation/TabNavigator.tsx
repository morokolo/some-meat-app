import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens
import ProfileScreen from '@features/profile/ProfileScreen';
import HomeScreen from '@features/home/HomeScreen';
import FavouritesScreen from '@features/favourites/FavouritesScreen';
import SearchScreen from '@features/search/SearchScreen';
import CartScreen from '@/features/cart/screens/CartScreen';
import { colors } from '@styles/colors';
import ProductsListingScreen from '@/features/products/ProductsListingScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={ProductsListingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size || 20, color }}>H</Text>
          ),
        }}
      />
      <Tab.Screen
        name='Favourites'
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size || 20, color }}>♥</Text>
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size || 20, color }}>S</Text>
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size || 20, color }}>C</Text>
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size || 20, color }}>P</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
