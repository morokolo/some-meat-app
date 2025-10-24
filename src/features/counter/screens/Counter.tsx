import React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
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
    alignSelf: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginHorizontal: 10,
  },
});