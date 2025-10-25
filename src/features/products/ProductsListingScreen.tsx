import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { colors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchAllProducts } from '@/stores/features/products/productsSlice';
import { addItemToCart } from '@/stores/features/cart/cartSlice';
import { Product, ProductCategory } from '@/types';

const ProductsListingScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(ProductCategory.ALL);
  const categories = [
    ProductCategory.ALL, 
    ProductCategory.ELECTRONICS, 
    ProductCategory.JEWELERY, 
    ProductCategory.MENS_CLOTHING, 
    ProductCategory.WOMENS_CLOTHING
  ];
  const dispatch = useAppDispatch();
  const { items: products, loading, error } = useAppSelector(state => state.products);
  const { items: cartItems } = useAppSelector(state => state.cart);

  useEffect(() => {
    if (!products || !Array.isArray(products) || products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch]);

  // Debug log
  console.log('Products from state:', products);

  const filteredProducts =
    selectedCategory === ProductCategory.ALL
      ? products
      : products.filter((prod: Product) => prod.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart(product));
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.productImageReal}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.productImagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.cartIcon}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.cartIconText}>🛒</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productName} numberOfLines={1}>
        {item.title}
      </Text>
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
          <Text style={styles.categoryTitle}>Shop</Text>
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
                    selectedCategory === category && styles.categoryTabTextActive,
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
          <Text style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>
            Showing {filteredProducts?.length ?? 0} item(s)
          </Text>
        </View>

        {/* Loading, Error, Products Display */}
        <View style={styles.productGrid}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ margin: 40 }} />
          ) : error ? (
            <Text style={{ color: colors.error, textAlign: 'center', margin: 40 }}>{error}</Text>
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={item => item.id?.toString()}
              numColumns={2}
              columnWrapperStyle={styles.productRow}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Text style={{ color: colors.textLight, textAlign: 'center', margin: 40 }}>No products found.</Text>}
            />
          )}
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
    alignItems: 'flex-start',
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
    height: 120,
    backgroundColor: colors.gray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImageReal: {
    height: 120,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 8,
    width: '100%',
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

export default ProductsListingScreen;
