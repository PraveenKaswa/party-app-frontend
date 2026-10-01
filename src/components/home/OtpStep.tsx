import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { NEON_YELLOW, WHITE } from '../../constants/colors';

interface OtpStepProps {
  phone: string;
  otp: string;
  setOtp: (otp: string) => void;
  otpTimer: number;
  discoTextStyle: any;
  animatedButtonStyle: any;
  isRequesting: boolean;
  onVerifyOtp: () => void;
  onResendOtp: () => void;
}

export const OtpStep: React.FC<OtpStepProps> = ({
  phone,
  otp,
  setOtp,
  otpTimer,
  discoTextStyle,
  animatedButtonStyle,
  isRequesting,
  onVerifyOtp,
  onResendOtp,
}) => {
  return (
    <Animated.View entering={FadeInUp.duration(700)} style={{ alignItems: 'center', width: '100%' }}>
      <Animated.Text style={[styles.mainTitle, discoTextStyle]}>VERIFY</Animated.Text>
      <Animated.Text style={[styles.mainTitle, discoTextStyle]}>ACCESS</Animated.Text>
      <Animated.Text style={styles.yellowSubtitle}>VIP Guestlist.</Animated.Text>
      <Animated.Text style={[styles.descriptionText, { marginBottom: 40 }]}>
        Enter the secret code sent to <Text style={styles.highlightText}>{phone}</Text>.
      </Animated.Text>

      <Animated.View entering={FadeInDown.duration(600)} style={{ width: '100%', alignItems: 'center' }}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter OTP"
          placeholderTextColor="rgba(255,255,255,0.6)"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
          autoFocus
        />
        <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
          <TouchableOpacity style={styles.primaryButton} onPress={onVerifyOtp} disabled={isRequesting}>
            <Text style={styles.primaryButtonText}>{isRequesting ? 'Verifying...' : 'Unlock Party'}</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Resend OTP Timer & Button */}
        <View style={styles.resendContainer}>
          {otpTimer > 0 ? (
            <Text style={styles.resendTimerText}>
              Resend code in <Text style={styles.highlightTimer}>00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={onResendOtp} disabled={isRequesting} style={styles.resendButton}>
              <Text style={styles.resendButtonText}>
                {isRequesting ? 'Sending...' : "Didn't receive code? Resend OTP"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
    marginBottom: 15,
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
  resendContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  resendTimerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    fontWeight: '500',
  },
  highlightTimer: {
    color: NEON_YELLOW,
    fontWeight: '800',
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  resendButtonText: {
    color: NEON_YELLOW,
    fontSize: 15,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
