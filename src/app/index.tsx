import React from 'react';
import {
  ImageBackground,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

import UnserviceableScreen from './unserviceable';
import { SplashOverlay } from '../components/home/SplashOverlay';
import { HeaderSection } from '../components/home/HeaderSection';
import { FooterSection } from '../components/home/FooterSection';
import { PhoneStep } from '../components/home/PhoneStep';
import { OtpStep } from '../components/home/OtpStep';
import { LocationStep } from '../components/home/LocationStep';
import { ManualLocationStep } from '../components/home/ManualLocationStep';
import { HomeStoreStep } from '../components/home/HomeStoreStep';
import { useHomeScreenLogic } from '../hooks/useHomeScreenLogic';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
  const {
    showSplash,
    currentStep,
    setCurrentStep,
    phone,
    setPhone,
    otp,
    setOtp,
    otpTimer,
    isRequesting,
    showUnserviceable,
    setShowUnserviceable,
    unserviceableParams,
    manualAddress,
    setManualAddress,
    locationAddress,
    suggestions,
    isSearchingAddress,
    headlineIndex,
    headlines,
    windowHeight,
    animations,
    requestLocation,
    skipLocation,
    handleManualLocationSubmit,
    handleSendOtp,
    handleResendOtp,
    handleVerifyOtp,
  } = useHomeScreenLogic();

  // Condition 1: If area is unserviceable, render Unserviceable ("Off the grid") screen
  if (showUnserviceable && unserviceableParams) {
    return (
      <UnserviceableScreen
        params={unserviceableParams}
        onBack={() => setShowUnserviceable(false)}
      />
    );
  }

  // Condition 2: If area is serviceable, transition to the static Homepage store feed
  if (currentStep === 'home') {
    return <HomeStoreStep locationAddress={locationAddress || 'Indiranagar, Bengaluru'} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />

        <ImageBackground
          source={require('../../assets/images/party_point_bg.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          {!showSplash && (
            <View style={{ height: windowHeight, width: '100%' }}>
              <SafeAreaView style={styles.safeArea}>
                {currentStep !== 'manual_location' && <HeaderSection />}

                <Animated.View
                  style={[
                    {
                      flex: 1,
                      justifyContent:
                        currentStep === 'manual_location' ? 'flex-start' : 'center',
                    },
                    currentStep !== 'manual_location' ? animations.keyboardAnimatedStyle : null,
                  ]}
                >
                  <View
                    style={[
                      styles.middleSection,
                      currentStep === 'manual_location' && {
                        flex: 1,
                        justifyContent: 'flex-start',
                        paddingTop: 0,
                      },
                    ]}
                  >
                    {currentStep === 'phone' && (
                      <PhoneStep
                        phone={phone}
                        setPhone={setPhone}
                        headlineIndex={headlineIndex}
                        headlines={headlines}
                        neonAnimatedStyle={animations.neonAnimatedStyle}
                        carouselAnimatedStyle={animations.carouselAnimatedStyle}
                        animatedButtonStyle={animations.animatedButtonStyle}
                        isRequesting={isRequesting}
                        onSendOtp={handleSendOtp}
                      />
                    )}
                    {currentStep === 'otp' && (
                      <OtpStep
                        phone={phone}
                        otp={otp}
                        setOtp={setOtp}
                        otpTimer={otpTimer}
                        discoTextStyle={animations.discoTextStyle}
                        animatedButtonStyle={animations.animatedButtonStyle}
                        isRequesting={isRequesting}
                        onVerifyOtp={handleVerifyOtp}
                        onResendOtp={handleResendOtp}
                      />
                    )}
                    {currentStep === 'location' && (
                      <LocationStep
                        discoTextStyle={animations.discoTextStyle}
                        animatedButtonStyle={animations.animatedButtonStyle}
                        isRequesting={isRequesting}
                        onRequestLocation={requestLocation}
                        onSkipLocation={skipLocation}
                      />
                    )}
                    {currentStep === 'manual_location' && (
                      <ManualLocationStep
                        manualAddress={manualAddress}
                        setManualAddress={setManualAddress}
                        suggestions={suggestions}
                        isSearchingAddress={isSearchingAddress}
                        onBack={() => setCurrentStep('location')}
                        onSubmit={handleManualLocationSubmit}
                      />
                    )}
                  </View>

                  {currentStep !== 'manual_location' && <FooterSection />}
                </Animated.View>
              </SafeAreaView>
            </View>
          )}
        </ImageBackground>

        <SplashOverlay
          showSplash={showSplash}
          splashStyle={animations.splashStyle}
          strobeStyle={animations.strobeStyle}
          laserStyle={animations.laserStyle}
          logoAnimatedStyle={animations.logoAnimatedStyle}
          discoTextStyle={animations.discoTextStyle}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  middleSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});
