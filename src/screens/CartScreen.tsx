import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

const CartScreen = () => {
  const [promoCode, setPromoCode] = useState('');
  
  const cartItems: CartItem[] = [
    {
      id: '1',
      name: '1 WHOLE FREE RANGE CHICKEN',
      price: 'R289.00',
      quantity: 1,
      image: 'placeholder',
    },
    {
      id: '2',
      name: '1 WHOLE FREE RANGE CHICKEN',
      price: 'R289.00',
      quantity: 1,
      image: 'placeholder',
    },
  ];

  const updateQuantity = (id: string, change: number) => {
    // In a real app, this would update the cart state
    console.log(`Update quantity for item ${id} by ${change}`);
  };

  const removeItem = (id: string) => {
    // In a real app, this would remove the item from cart
    console.log(`Remove item ${id}`);
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImagePlaceholder}>
          <Text style={styles.placeholderText}>Item Image</Text>
        </View>
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => removeItem(item.id)}
          >
            <Text style={styles.quantityButtonText}>Remove</Text>
          </TouchableOpacity>
          
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 1)}
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
        <View style={styles.titleSection}>
          <Text style={styles.cartTitle}>Cart</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.cartItemsSection}>
          {cartItems.map(renderCartItem)}
        </View>

        {/* Promo Code Section */}
        <View style={styles.promoSection}>
          <TextInput
            style={styles.promoInput}
            placeholder="Add your promo code"
            value={promoCode}
            onChangeText={setPromoCode}
            placeholderTextColor={colors.placeholder}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub total</Text>
            <Text style={styles.summaryValue}>R 289.00</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>R 28.00</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R 317.00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutSection}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 32,
  },
  cartTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'serif',
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
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: colors.gray,
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginHorizontal: 16,
  },
  promoSection: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
    marginRight: 12,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  orderSummary: {
    marginBottom: 100,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textLight,
  },
  summaryValue: {
    fontSize: 16,
    color: colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  checkoutSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CartScreen;
