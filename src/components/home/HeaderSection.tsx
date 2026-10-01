import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { WHITE } from '../../constants/colors';

export const HeaderSection: React.FC = () => {
  return (
    <Animated.View entering={FadeInDown.duration(800)} style={styles.header}>
      <View style={{ flex: 1 }} />
      <View style={styles.rightHeader}>
        <Text style={styles.rightHeaderText}>Same</Text>
        <Text style={styles.rightHeaderText}>Vibes</Text>
        <Text style={styles.rightHeaderText}>Faster</Text>
        <Text style={styles.rightHeaderText}>Delivery</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rightHeader: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  rightHeaderText: {
    color: WHITE,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
