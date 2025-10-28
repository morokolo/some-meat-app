import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

type Props = {
  subtotal: number;
  deliveryFee: number;
  onCheckout: () => void;
};

const OrderSummary: React.FC<Props> = ({
  subtotal,
  deliveryFee,
  onCheckout,
}) => {
  const total = subtotal + deliveryFee;
  return (
    <View style={styles.orderSummary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Sub total</Text>
        <Text style={styles.summaryValue}>R {subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Delivery</Text>
        <Text style={styles.summaryValue}>R {deliveryFee.toFixed(2)}</Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>R {total.toFixed(2)}</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderSummary: {
    backgroundColor: colors.lightGray,
    padding: 20,
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
    fontWeight: '600',
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
});

export default OrderSummary;
