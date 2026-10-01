import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { NEON_YELLOW, WHITE } from '../../constants/colors';

interface SplashOverlayProps {
  showSplash: boolean;
  splashStyle: any;
  strobeStyle: any;
  laserStyle: any;
  logoAnimatedStyle: any;
  discoTextStyle: any;
}

export const SplashOverlay: React.FC<SplashOverlayProps> = ({
  showSplash,
  splashStyle,
  strobeStyle,
  laserStyle,
  logoAnimatedStyle,
  discoTextStyle,
}) => {
  return (
    <Animated.View
      style={[styles.splashRoot, splashStyle]}
      pointerEvents={showSplash ? 'auto' : 'none'}
    >
      {/* Animated Laser Beams Background */}
      <Animated.Image
        source={require('../../../assets/images/laser_bg.png')}
        style={[StyleSheet.absoluteFill, { zIndex: -1 }, strobeStyle, laserStyle]}
        resizeMode="cover"
      />

      {/* Splash Logo */}
      <Animated.View style={[styles.splashLogo, logoAnimatedStyle, { zIndex: 10, elevation: 10 }]}>
        <View style={styles.logoTextRow}>
          <Animated.Text style={[styles.splashTextParty, discoTextStyle]}>Party</Animated.Text>
          <Animated.Text style={[styles.splashTextPoint, discoTextStyle]}>Point</Animated.Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  splashRoot: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoTextRow: {
    flexDirection: 'column',
  },
  splashTextParty: {
    color: WHITE,
    fontSize: 72,
    fontWeight: '900',
    fontStyle: 'italic',
    lineHeight: 76,
    textAlign: 'center',
  },
  splashTextPoint: {
    color: NEON_YELLOW,
    fontSize: 72,
    fontWeight: '900',
    fontStyle: 'italic',
    lineHeight: 76,
    textAlign: 'center',
  },
});
