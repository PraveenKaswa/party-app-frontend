import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { NEON_YELLOW, WHITE } from '../../constants/colors';

interface LocationStepProps {
  discoTextStyle: any;
  animatedButtonStyle: any;
  isRequesting: boolean;
  onRequestLocation: () => void;
  onSkipLocation: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  discoTextStyle,
  animatedButtonStyle,
  isRequesting,
  onRequestLocation,
  onSkipLocation,
}) => {
  return (
    <Animated.View entering={FadeInUp.duration(700)} style={{ alignItems: 'center', width: '100%' }}>
      <Animated.Text style={[styles.mainTitle, discoTextStyle]}>SET</Animated.Text>
      <Animated.Text style={[styles.mainTitle, discoTextStyle]}>LOCATION</Animated.Text>
      <Animated.Text style={styles.yellowSubtitle}>Where's the party?</Animated.Text>
      <Animated.Text style={[styles.descriptionText, { marginBottom: 40 }]}>
        Drop your pin and let the <Text style={styles.highlightText}>party essentials</Text>
        {'\n'}come straight to you!
      </Animated.Text>

      <Animated.View entering={FadeInDown.duration(600)} style={{ width: '100%', alignItems: 'center' }}>
        <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onRequestLocation}
            disabled={isRequesting}
          >
            <Text style={styles.buttonIcon}>📍</Text>
            <Text style={styles.primaryButtonText}>
              {isRequesting ? 'Requesting...' : 'Use My Location'}
            </Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={onSkipLocation} style={styles.manualLocationBtn}>
          <Text style={styles.manualLocationText}>Enter Location Manually</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 58,
    fontWeight: '900',
    fontStyle: 'italic',
    lineHeight: 60,
    textShadowColor: '#000000',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 1,
    textTransform: 'uppercase',
  },
  yellowSubtitle: {
    color: NEON_YELLOW,
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  descriptionText: {
    color: WHITE,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  highlightText: {
    color: NEON_YELLOW,
    fontWeight: '700',
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: NEON_YELLOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    marginBottom: 20,
    shadowColor: NEON_YELLOW,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '800',
  },
  buttonArrow: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  manualLocationBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  manualLocationText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
