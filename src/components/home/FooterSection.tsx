import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { NEON_YELLOW, WHITE } from '../../constants/colors';

export const FooterSection: React.FC = () => {
  return (
    <Animated.View entering={FadeInUp.duration(800).delay(500)} style={styles.footerSection}>
      <View style={[styles.bottomFooter, { marginTop: 0 }]}>
        <Text style={styles.footerLines}>= </Text>
        <Text style={styles.footerText}>Quick Commerce</Text>
        <Text style={styles.lightningIcon}> ⚡ </Text>
        <Text style={styles.footerText}>Fast Delivery</Text>
        <Text style={styles.footerLines}> =</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footerSection: {
    alignItems: 'center',
    width: '100%',
  },
  bottomFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: WHITE,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  lightningIcon: {
    fontSize: 14,
    marginHorizontal: 5,
  },
  footerLines: {
    color: NEON_YELLOW,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
