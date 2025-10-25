import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@styles/colors';
import { commonStyles } from '@styles/commonStyles';
import { Product } from '@/types';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Beef');

  const categories = ['All', 'Beef', 'Fish', 'Pork', 'Poultry'];

  const products: Product[] = [
    {
      id: 1,
      title: 'Wagyu steak medalions',
      price: 299.99,
      description: 'Premium wagyu steak medalions',
      category: 'meat',
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: 2,
      title: 'Rump steak',
      price: 199.99,
      description: 'Fresh rump steak',
      category: 'meat',
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4.2, count: 85 },
    },
    {
      id: 3,
      title: 'Wagyu steak medalions',
      price: 299.99,
      description: 'Premium wagyu steak medalions',
      category: 'meat',
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: 4,
      title: 'Rump steak',
      price: 199.99,
      description: 'Fresh rump steak',
      category: 'meat',
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4.2, count: 85 },
    },
    {
      id: 5,
      title: 'Wagyu steak medalions',
      price: 299.99,
      description: 'Premium wagyu steak medalions',
      category: 'meat',
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: 6,
      title: 'Rump steak',
      price: 199.99,
      description: 'Fresh rump steak',
      category: 'meat',
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4.2, count: 85 },
    },
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder}>
          <Text style={styles.placeholderText}>Product Image</Text>
        </View>
        <TouchableOpacity style={styles.cartIcon}>
          <Text style={styles.cartIconText}>🛒</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Text style={commonStyles.backButton}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Text style={commonStyles.headerTitle}>Filter</Text>
          <Text style={styles.filterIcon}>⚙️</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Title */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Meat</Text>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    selectedCategory === category &&
                      styles.categoryTabTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Section Header */}
        <View style={styles.productSectionHeader}>
          <Text style={styles.basedOnSelection}>Based on your selection</Text>
          <Text style={styles.ourProducts}>Our products</Text>
        </View>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    marginLeft: 8,
    fontSize: 16,
  },
  categorySection: {
    marginTop: 20,
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  categoryTabs: {
    marginBottom: 32,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.gray,
  },
  categoryTabActive: {
    backgroundColor: colors.primary,
  },
  categoryTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textLight,
  },
  categoryTabTextActive: {
    color: colors.white,
  },
  productSectionHeader: {
    marginBottom: 24,
  },
  basedOnSelection: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  ourProducts: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'serif',
  },
  productGrid: {
    marginBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  productImagePlaceholder: {
    height: 150,
    backgroundColor: colors.gray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 12,
    color: colors.textLight,
  },
  cartIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartIconText: {
    fontSize: 16,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default HomeScreen;
