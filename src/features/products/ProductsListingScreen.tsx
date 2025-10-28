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
import { fetchAllProducts, fetchMealCategories, fetchMealsByCategory, fetchAllMeals } from '@/stores/features/products/productsSlice';
import { addItemToCart } from '@/stores/features/cart/cartSlice';
import { Product, ProductCategory } from '@/types';
import OliveDivider from '@/components/divider/OliveDivider';

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
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.productImageReal}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.productImagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        
      </View>
      <View style={styles.productInfoRow}>
        <View style={styles.productTitlePriceRow}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.title}
          </Text>
         
        </View>
       
        </View>
        <View style={styles.sideBySideRow}>
          <View>
          <Text style={styles.productPrice}>R XXX.XX</Text>
          </View>
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <Text style={styles.cartIconText}>🛒</Text>
          </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Text style={commonStyles.backButton}>‹ Back</Text>
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
        <OliveDivider style={{ marginBottom: 35 }} height={15} />

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
                  {formatCategoryLabel(category)}
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

  },
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
