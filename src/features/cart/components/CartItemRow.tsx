import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem } from '@/types';
import { colors } from '@styles/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  item: CartItem;
  onRemove: (id: number) => void;
  onDecrement: (id: number) => void;
  onIncrement: (id: number) => void;
};

const CartItemRow: React.FC<Props> = ({
  item,
  onRemove,
  onDecrement,
  onIncrement,
}) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.itemImage}
            resizeMode='cover'
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
            onPress={() => onRemove(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>

          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onDecrement(item.id)}
            >
              <Ionicons
                name='remove-circle-outline'
                size={40}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onIncrement(item.id)}
            >
              <Ionicons
                name='add-circle-outline'
                size={40}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  itemDetails: { flex: 1 },
  itemName: {
    fontSize: 14,
    fontWeight: '100',
    color: colors.primary,
    marginBottom: 8,
    fontFamily: 'AGaramondPro-Italic',
    textTransform: 'uppercase',
    marginTop: 20,
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
    borderWidth: 2,
    borderColor: colors.primary,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    fontFamily: 'Avenir-Roman',
  },
  quantityButton: {},
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
});

export default CartItemRow;
