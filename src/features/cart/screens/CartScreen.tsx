import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@styles/colors';
import { commonStyles } from '@styles/commonStyles';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { 
  removeItemFromCart, 
  incrementQuantity, 
  decrementQuantity 
} from '@/stores/features/cart/cartSlice';
import { CartItem } from '@/types';
import OliveDivider from '@/components/divider/OliveDivider';

const CartScreen = () => {
  const [promoCode, setPromoCode] = useState('');
  const dispatch = useAppDispatch();
  const { items: cartItems, total } = useAppSelector(state => state.cart);

  const handleIncrementQuantity = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.itemImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.itemImagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>R {item.price}</Text>

        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>

          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleDecrementQuantity(item.id)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleIncrementQuantity(item.id)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Text style={commonStyles.backButton}>‹</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cart Title */}
        <View style={{paddingHorizontal:20, backgroundColor: colors.background}}>
        <View style={styles.titleSection}>
          <Text style={styles.cartTitle}>Cart</Text>
          <OliveDivider style={{ marginBottom: 0, marginTop:10 }} height={15} />
        </View>
       

        {/* Cart Items */}
        <View style={styles.cartItemsSection}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
              <Text style={styles.emptyCartSubtext}>Add some items to get started!</Text>
            </View>
          ) : (
            cartItems.map(renderCartItem)
          )}
        </View>

        {/* Promo Code Section */}
        <View style={styles.promoSection}>
          <TextInput
            style={styles.promoInput}
            placeholder='Add your promo code'
            value={promoCode}
            onChangeText={setPromoCode}
            placeholderTextColor={colors.primary}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub total</Text>
            <Text style={styles.summaryValue}>R {total.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>R 28.00</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R {(total + 28).toFixed(2)}</Text>
          </View>

            {/* Checkout Button */}
 <View style={{marginVertical:10}}>
 <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
 </View>
       
        
    
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
backgroundColor: colors.lightGray
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 32,
  },
  cartTitle: {
    fontSize: 40,
    color: colors.primary,
    fontFamily: 'AGaramondPro-BoldItalic',
  },
  cartItemsSection: {
    marginBottom: 32,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemImageContainer: {
    marginRight: 16,
  },
  itemImage: {
    width: 133,
    height: 126,
  },
  itemImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: colors.gray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: colors.textLight,
    textAlign: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '100',
    color: colors.primary,
    marginBottom: 8,
    fontFamily: 'AGaramondPro-Italic',
    textTransform: 'uppercase',
    marginTop:20
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    fontFamily: 'AGaramondPro-BoldItalic',
  },
  quantityControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
 borderWidth:2,
 borderColor: colors.primary,

  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    fontFamily: 'Avenir-Roman',
   
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth:2,
    borderColor: colors.primary,
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    fontFamily: 'Avenir-Roman',
    
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: 'AGaramondPro-Bold',
    marginHorizontal: 16,
  },
  promoSection: {
    flexDirection: 'row',
    marginBottom: 32,
    borderWidth:2,
    borderColor: colors.primary,
    borderRadius: 30,
    padding:4
  },
  promoInput: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colors.primary,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.primary,
    // backgroundColor: colors.white,
    marginRight: 12,
    fontFamily: 'Avenir-Roman',
  },
  applyButton: {
    // backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    // borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Avenir-Roman',
  },
  orderSummary: {
    marginBottom: 100,
    backgroundColor: colors.lightGray,
    padding:20
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.primary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: 'AGaramondPro-Bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'AGaramondPro-Bold',
  },
  checkoutSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Avenir-Roman',
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: colors.textLight,
  },
});

export default CartScreen;
