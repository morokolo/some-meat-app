import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { colors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';
import AppHeader from '@/components/header/AppHeader';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchAllProducts, fetchMealCategories, fetchMealsByCategory, fetchAllMeals } from '@/stores/features/products/productsSlice';
import { addItemToCart } from '@/stores/features/cart/cartSlice';
import { Product, ProductCategory } from '@/types';
import OliveDivider from '@/components/divider/OliveDivider';
import ProductCard from '@/components/product/ProductCard';
import CategoryChips from '@/components/CategoryChips';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProductsListingScreen = () => {
  const formatCategoryLabel = (category: string) => {
    return category
      .toString()
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  };
  const [selectedCategory, setSelectedCategory] = useState<string>(ProductCategory.ALL);
  const isAuthenticated = useAppSelector(state => state.registration.isAuthenticated);
  const mealCategories = useAppSelector(state => state.products.mealCategories) || [];
  const useMealsApi = useAppSelector(state => state.products.useMealsApi);
  const categories = useMealsApi ? ['All', ...mealCategories] : [
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
    if (isAuthenticated) {
      dispatch(fetchMealCategories());
      dispatch(fetchAllMeals());
    } else if (!products || !Array.isArray(products) || products.length === 0) {
      //if users can't find food show them clothes hahaha, you cannot be hungry and dirty at this point
      dispatch(fetchAllProducts());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (useMealsApi) {
      if (!selectedCategory || selectedCategory === ProductCategory.ALL || selectedCategory === 'All') {
        dispatch(fetchAllMeals());
      } else {
        dispatch(fetchMealsByCategory(selectedCategory));
      }
    }
  }, [dispatch, useMealsApi, selectedCategory]);

  // Debug log
  console.log('Products from state:', products);

  const filteredProducts = useMealsApi
    ? products
    : selectedCategory === ProductCategory.ALL
      ? products
      : products.filter((prod: Product) => prod.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart(product));
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} onAddToCart={handleAddToCart} stylesRef={styles} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader isFilter />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Title */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Meat</Text>
        </View>
        <OliveDivider style={{ marginBottom: 35 }} height={15} />

        {/* Category Tabs */}
        <View style={styles.categoryTabs}>
          <CategoryChips
            categories={categories.map(formatCategoryLabel)}
            selected={formatCategoryLabel(selectedCategory)}
            onSelect={label => {
              // Map back to raw value when meals API is used
              const original = useMealsApi
                ? (categories.find(c => formatCategoryLabel(c) === label) || label)
                : label.toLowerCase();
              setSelectedCategory(original);
            }}
          />
        </View>

        {/* Product Section Header */}
        <View style={styles.productSectionHeader}>
          <Text style={styles.basedOnSelection}>Based on your selection</Text>
          <Text style={styles.ourProducts}>Our products</Text>
          
        </View>

        {/* Loading, Error, Products Display */}
        <View style={styles.productGrid}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ margin: 40 }} />
          ) : error ? (
            <Text style={{ color: colors.error, textAlign: 'center', margin: 40 }}>{error}</Text>
          ) : (
            <FlashList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={item => item.id?.toString()}
              numColumns={2}
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
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'AGaramondPro-Bold',
  },
  categoryTabs: {
    marginBottom: 32,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
  
  },
  categoryTabActive: {
    //backgroundColor: colors.primary,
  },
  categoryTabText: {
    fontSize: 16,
    fontWeight: '200',
    color: '#352329',
  },
  categoryTabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  productSectionHeader: {
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  basedOnSelection: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 4,
  },
  ourProducts: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'AGaramondPro-Bold',
    marginVertical:5
  },
  productGrid: {
    marginBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
    columnGap: 5,
  },
  productCard: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom:30
  },
  productInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productTitlePriceRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
  },
  sideBySideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  productImagePlaceholder: {
    height: 163,
    backgroundColor: colors.gray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImageReal: {
    height: 163,
    backgroundColor: colors.white,
    marginBottom: 8,
    width: '100%',
    borderRadius:10

  },
  cart: {borderWidth:1, borderColor: colors.primary,borderRadius:20,padding:2},
  placeholderText: {
    fontSize: 12,
    color: colors.textLight,
  },
  cartIcon: {

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
    fontWeight: '100',
    color: colors.primary,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 900,
    fontFamily: 'Avenir-Roman',
  
  },
});

export default ProductsListingScreen;
