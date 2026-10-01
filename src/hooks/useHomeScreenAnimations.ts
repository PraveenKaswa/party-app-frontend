import { useEffect } from 'react';
import { LayoutAnimation } from 'react-native';
import {
  Easing,
  interpolateColor,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export function useHomeScreenAnimations(
  currentStep: string,
  showSplash: boolean,
  setShowSplash: (val: boolean) => void,
  setCurrentStep: (step: any) => void
) {
  const keyboard = useAnimatedKeyboard();
  const isManualLocation = useSharedValue(false);

  const buttonScale = useSharedValue(1);
  const colorProgress = useSharedValue(0);
  const lightOrbit = useSharedValue(0);
  const strobeOpacity = useSharedValue(0.2);
  const splashOpacity = useSharedValue(1);
  const logoScale = useSharedValue(1);
  const logoOpacity = useSharedValue(1);
  const swingRotation = useSharedValue(-5);
  const carouselProgress = useSharedValue(0);

  useEffect(() => {
    isManualLocation.value = currentStep === 'manual_location';
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [currentStep]);

  useEffect(() => {
    // Show splash for 2 seconds, then zoom into the logo and fade out
    const timer = setTimeout(() => {
      logoScale.value = withTiming(20, { duration: 800, easing: Easing.in(Easing.exp) });
      logoOpacity.value = withTiming(0, { duration: 800, easing: Easing.in(Easing.exp) });

      setTimeout(() => {
        splashOpacity.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) });
        setTimeout(() => {
          setShowSplash(false);
          setCurrentStep('phone');
        }, 800);
      }, 400);
    }, 2000);

    // Pulse animation for the main button
    buttonScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Disco color progress for cycling text colors
    colorProgress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );

    // Smooth pendulum swing animation (Sine wave for perfect fluidity)
    swingRotation.value = -5; // Explicitly reset to prevent hot-reload freezes
    swingRotation.value = withRepeat(
      withTiming(5, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );

    // Very fast 360 rotation for the disco spotlights
    lightOrbit.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );

    // Club Strobe Effect (Rapid blinking)
    strobeOpacity.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 150, easing: Easing.linear }),
        withTiming(0.1, { duration: 200, easing: Easing.linear }),
        withTiming(0.7, { duration: 100, easing: Easing.linear }),
        withTiming(0.2, { duration: 250, easing: Easing.linear })
      ),
      -1,
      false
    );

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const keyboardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -(keyboard.height.value * 0.45) }],
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const discoTextStyle = useAnimatedStyle(() => {
    const animatedColor = interpolateColor(
      colorProgress.value,
      [0, 0.5, 1],
      ['#FFFFFF', '#E5FA5E', '#FFFFFF']
    );
    return {
      color: animatedColor,
    };
  });

  const neonAnimatedStyle = useAnimatedStyle(() => {
    const animatedColor = interpolateColor(
      colorProgress.value,
      [0, 0.33, 0.66, 1],
      ['#00FFFF', '#39FF14', '#E5FA5E', '#00FFFF']
    );
    return {
      color: animatedColor,
    };
  });

  const carouselAnimatedStyle = useAnimatedStyle(() => {
    const p = carouselProgress.value;

    let scale = 0.8;
    if (p <= 0.2) scale = 0.8 + (p / 0.2) * 0.2;
    else if (p <= 0.6) scale = 1.0 + ((p - 0.2) / 0.4) * 0.3;
    else if (p <= 0.9) scale = 1.3 + ((p - 0.6) / 0.3) * 0.3;
    else scale = 1.6 + ((p - 0.9) / 0.1) * 0.2;

    let opacity = 0;
    if (p <= 0.2) opacity = p / 0.2;
    else if (p <= 0.6) opacity = 1 - ((p - 0.2) / 0.4) * 0.4;
    else if (p <= 0.9) opacity = 0.6 - ((p - 0.6) / 0.3) * 0.4;
    else opacity = 0.2 - ((p - 0.9) / 0.1) * 0.2;

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const strobeStyle = useAnimatedStyle(() => ({
    opacity: strobeOpacity.value,
  }));

  const swingStyle = useAnimatedStyle(() => {
    const animatedColor = interpolateColor(
      swingRotation.value,
      [-5, 0, 5],
      ['#FF00FF', '#E5FA5E', '#00FFFF']
    );
    return {
      transform: [{ rotate: `${swingRotation.value * 2}deg` }],
      color: animatedColor,
    };
  });

  const laserStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${lightOrbit.value * 0.05}deg` },
      { scale: 1.2 },
    ],
  }));

  const splashStyle = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  return {
    carouselProgress,
    keyboardAnimatedStyle,
    animatedButtonStyle,
    discoTextStyle,
    neonAnimatedStyle,
    carouselAnimatedStyle,
    strobeStyle,
    swingStyle,
    laserStyle,
    splashStyle,
    logoAnimatedStyle,
  };
}
