import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@styles/colors';
import { commonStyles } from '@styles/commonStyles';

type Props = {
  title?: string;
  isFilter?: boolean;
  onBackPress?: () => void;
  onFilterPress?: () => void;
};

const AppHeader: React.FC<Props> = ({ title = '', isFilter = false, onBackPress, onFilterPress }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[commonStyles.header]}>
      <TouchableOpacity onPress={onBackPress}>
        <View style={styles.leftRow}>
          <Ionicons name='chevron-back' size={20} color={colors.primary} />
          <Text style={commonStyles.headerTitleLeft}>Back</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.rightRow}>
        {!!title && <Text style={commonStyles.headerTitle}>{title}</Text>}
        {isFilter && (
          <TouchableOpacity onPress={onFilterPress}>
            <Ionicons name='filter' size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default AppHeader;


