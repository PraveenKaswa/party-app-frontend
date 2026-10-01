import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { NEON_YELLOW, WHITE } from '../../constants/colors';

interface PhoneStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  headlineIndex: number;
  headlines: string[];
  neonAnimatedStyle: any;
  carouselAnimatedStyle: any;
  animatedButtonStyle: any;
  isRequesting: boolean;
  onSendOtp: () => void;
}

export const PhoneStep: React.FC<PhoneStepProps> = ({
  phone,
  setPhone,
  headlineIndex,
  headlines,
  neonAnimatedStyle,
  carouselAnimatedStyle,
  animatedButtonStyle,
  isRequesting,
  onSendOtp,
}) => {
  return (
    <Animated.View entering={FadeInUp.duration(700).delay(400)} style={{ alignItems: 'center', width: '100%' }}>
      {/* Looping Cross-Fade Carousel for Eyebrow Texts */}
      <View style={{ height: 75, width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
        <Animated.Text
          key={headlineIndex}
          style={[
            styles.neonTitle,
            neonAnimatedStyle,
            carouselAnimatedStyle,
            { position: 'absolute', marginBottom: 0 },
          ]}
        >
          {headlines[headlineIndex]}
        </Animated.Text>
      </View>

      <Animated.Text style={[styles.yellowSubtitle, { marginBottom: 0, fontSize: 46, transform: [{ rotate: '0deg' }] }]}>
        After Hours
      </Animated.Text>
      <Animated.Text style={styles.yellowSubtitle}>Elevate your evening</Animated.Text>
      <Animated.Text style={[styles.descriptionText, { marginBottom: 40 }]}>
        Curated nightlife essentials,{'\n'}delivered in <Text style={styles.highlightText}>minutes.</Text>
      </Animated.Text>

      <Animated.View entering={FadeInDown.duration(600).delay(600)} style={{ width: '100%' }}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter phone number"
          placeholderTextColor="rgba(255,255,255,0.6)"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={15}
        />
        <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
          <TouchableOpacity style={styles.primaryButton} onPress={onSendOtp} disabled={isRequesting}>
            <Text style={styles.primaryButtonText}>{isRequesting ? 'Sending...' : 'Enter The Club'}</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  neonTitle: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 8,
    textTransform: 'uppercase',
    textAlign: 'center',
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
  textInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: WHITE,
    borderRadius: 18,
    padding: 18,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(229, 250, 94, 0.5)',
    textAlign: 'center',
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
});
