import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/styles/colors';

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  stylesRef: any;
};

const ProductCard: React.FC<Props> = ({ product, onAddToCart, stylesRef }) => {
  return (
    <View style={stylesRef.productCard}>
      <View style={stylesRef.productImageContainer}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={stylesRef.productImageReal}
            resizeMode='cover'
          />
        ) : (
          <View style={stylesRef.productImagePlaceholder}>
            <Text style={stylesRef.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      <View style={stylesRef.productInfoRow}>
        <View style={stylesRef.productTitlePriceRow}>
          <Text style={stylesRef.productName} numberOfLines={1}>
            {product.title}
          </Text>
        </View>
      </View>
      <View style={stylesRef.sideBySideRow}>
        <View>
          <Text style={stylesRef.productPrice}>R XXX.XX</Text>
        </View>
        <TouchableOpacity
          onPress={() => onAddToCart && onAddToCart(product)}
          style={stylesRef.cart}
        >
          <Ionicons name='cart-outline' size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
