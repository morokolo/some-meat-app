import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@styles/colors';

type Props = {
  style?: ViewStyle;
  height?: number;
};

const OliveDivider: React.FC<Props> = ({ style, height = 1 }) => {
  return <View style={[styles.divider, { height }, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    backgroundColor: colors.textOlive,
  },
});

export default OliveDivider;


