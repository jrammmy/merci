import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Wall() {
  return (
    <View style={styles.container}>
      <Text>Sign up screen</Text>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Wall;
