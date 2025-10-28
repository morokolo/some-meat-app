import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
};

const PromoCodeBar: React.FC<Props> = ({ value, onChange, onApply }) => {
  return (
    <View style={styles.promoSection}>
      <TextInput
        style={styles.promoInput}
        placeholder='Add your promo code'
        value={value}
        onChangeText={onChange}
        placeholderTextColor={colors.primary}
      />
      <TouchableOpacity style={styles.applyButton} onPress={onApply}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  promoSection: {
    flexDirection: 'row',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 30,
    padding: 4,
  },
  promoInput: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colors.primary,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.primary,
    marginRight: 12,
    fontFamily: 'Avenir-Roman',
  },
  applyButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Avenir-Roman',
  },
});

export default PromoCodeBar;


