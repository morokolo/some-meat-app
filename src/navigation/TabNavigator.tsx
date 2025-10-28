import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
// Import screens
import ProfileScreen from '@features/profile/ProfileScreen';
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
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.floral,
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          // marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={ProductsListingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Favourites'
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='search-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='cart-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Text style={{ fontSize: size || 20, color }}>P</Text>
            <Ionicons name='person-outline' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
