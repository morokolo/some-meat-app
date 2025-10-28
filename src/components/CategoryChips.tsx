import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors } from '@styles/colors';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
};

const CategoryChips: React.FC<Props> = ({ categories, selected, onSelect }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.chip, selected === category && styles.chipActive]}
            onPress={() => onSelect(category)}
          >
            <Text
              style={[
                styles.chipText,
                selected === category && styles.chipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 32 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
  },
  chipActive: {},
  chipText: {
    fontSize: 16,
    fontWeight: '200',
    color: colors.piil,
  },
  chipTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default CategoryChips;
