import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { increment, decrement } from '@features/counter/redux/reducer';

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  // Redux Test component
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Button
          title={'Increment'}
          onPress={() => dispatch(increment())}
        />
        <Text style={styles.text}>{count}</Text>
        <Button
          title={'Decrement'}
          onPress={() => dispatch(decrement())}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  text: {
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});