import { useState, useEffect } from 'react';
import { Alert, Linking, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Easing, withTiming } from 'react-native-reanimated';

import { useHomeScreenAnimations } from './useHomeScreenAnimations';
import { sendOtpApi, resendOtpApi, checkUserApi, verifyOtpApi } from '../services/authService';
import {
  checkDeliveryApi,
  subscribeWaitlistApi,
  searchAddressNominatim,
} from '../services/locationService';

export function useHomeScreenLogic() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentStep, setCurrentStep] = useState<
    'splash' | 'phone' | 'otp' | 'location' | 'manual_location' | 'home'
  >('splash');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [status, setStatus] = useState<Location.PermissionStatus | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [showUnserviceable, setShowUnserviceable] = useState(false);
  const [unserviceableParams, setUnserviceableParams] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [manualAddress, setManualAddress] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);

  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = [
    'WE ARRANGE EVERYTHING',
    'ONE TAP',
    'ALL YOUR PARTY NEEDS',
  ];

  const windowHeight = Dimensions.get('window').height;

  const animations = useHomeScreenAnimations(
    currentStep,
    showSplash,
    setShowSplash,
    setCurrentStep
  );

  // OTP Expiry Countdown Timer Effect
  useEffect(() => {
    let interval: any;
    if (currentStep === 'otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStep, otpTimer]);

  // Rapido-style Live Address Autocomplete
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (manualAddress.length > 3 && currentStep === 'manual_location') {
        setIsSearchingAddress(true);
        try {
          const data = await searchAddressNominatim(manualAddress);
          setSuggestions(data);
        } catch (e) {
          console.log('Autocomplete error', e);
          setSuggestions([]);
        } finally {
          setIsSearchingAddress(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [manualAddress, currentStep]);

  // Carousel Effect for Headline Text
  useEffect(() => {
    let interval: any;
    if (!showSplash) {
      animations.carouselProgress.value = withTiming(1, { duration: 2500, easing: Easing.linear });

      interval = setInterval(() => {
        setHeadlineIndex((prev) => (prev + 1) % headlines.length);
        animations.carouselProgress.value = 0;
        animations.carouselProgress.value = withTiming(1, { duration: 2500, easing: Easing.linear });
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showSplash]);

  const requestLocation = async () => {
    console.log('=== requestLocation START ===');
    setIsRequesting(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      if (status !== 'granted') {
        Alert.alert(
          'Location Required',
          'Party Point needs your location to check delivery availability. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      let addressString = '';
      let addressDetails = {
        street: '',
        district: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
      };

      try {
        const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (geocode && geocode.length > 0) {
          const addr = geocode[0];
          addressString = [
            addr.street,
            addr.district,
            addr.city,
            addr.region,
            addr.postalCode,
            addr.country,
          ]
            .filter(Boolean)
            .join(', ');

          addressDetails = {
            street: addr.street || '',
            district: addr.district || '',
            city: addr.city || addr.subregion || '',
            state: addr.region || '',
            country: addr.country || '',
            pincode: addr.postalCode || '',
          };
        }
      } catch (err) {
        console.log('Reverse geocode failed', err);
      }

      try {
        const { ok, data } = await checkDeliveryApi({
          lat: latitude,
          lng: longitude,
          address: addressString,
          addressDetails: addressDetails,
        });
      } catch (err) {
        console.log('Delivery check error:', err);
      }

      setLocationAddress(addressString || `${addressDetails.street || addressDetails.city || 'Indiranagar, Bengaluru'}`);
      setShowUnserviceable(false);
      setCurrentStep('home');

      if (userId) {
        try {
          await subscribeWaitlistApi({
            userId: userId,
            lat: String(latitude),
            lng: String(longitude),
            city: addressDetails.city || '',
            street: addressDetails.street || '',
          });
        } catch (e) {}
      }
    } catch (e) {
      console.error('requestLocation ERROR:', e);
      setLocationAddress('Indiranagar, Bengaluru');
      setShowUnserviceable(false);
      setCurrentStep('home');
    } finally {
      setIsRequesting(false);
    }
  };

  const skipLocation = () => {
    setCurrentStep('manual_location');
  };

  const handleManualLocationSubmit = async (suggestion?: any) => {
    if (!suggestion && manualAddress.trim().length < 3) {
      return Alert.alert('Invalid', 'Please enter a valid address.');
    }

    setIsRequesting(true);
    setSuggestions([]);

    try {
      let latitude = 0;
      let longitude = 0;
      let addressDetails = {
        street: manualAddress,
        district: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
      };

      if (suggestion) {
        latitude = Number(suggestion.lat);
        longitude = Number(suggestion.lon);
        setManualAddress(suggestion.display_name);

        const addr = suggestion.address || {};
        addressDetails = {
          street: addr.road || addr.suburb || suggestion.display_name.split(',')[0],
          district: addr.state_district || addr.county || '',
          city: addr.city || addr.town || addr.village || '',
          state: addr.state || '',
          country: addr.country || '',
          pincode: addr.postcode || '',
        };
      } else {
        const geocodedList = await Location.geocodeAsync(manualAddress);

        if (!geocodedList || geocodedList.length === 0) {
          setIsRequesting(false);
          return Alert.alert(
            'Not Found',
            'Could not find coordinates for this address. Please try being more specific.'
          );
        }

        latitude = geocodedList[0].latitude;
        longitude = geocodedList[0].longitude;

        try {
          const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
          if (reverseGeocode && reverseGeocode.length > 0) {
            const addr = reverseGeocode[0];
            addressDetails = {
              street: manualAddress,
              district: addr.district || '',
              city: addr.city || addr.subregion || '',
              state: addr.region || '',
              country: addr.country || '',
              pincode: addr.postalCode || '',
            };
          }
        } catch (err) {}
      }

      try {
        const { ok, data } = await checkDeliveryApi({
          lat: latitude,
          lng: longitude,
          address: manualAddress,
          addressDetails: addressDetails,
        });
      } catch (err) {}

      setLocationAddress(suggestion?.display_name || manualAddress || 'Indiranagar, Bengaluru');
      setShowUnserviceable(false);
      setCurrentStep('home');

      if (userId) {
        try {
          await subscribeWaitlistApi({
            userId: userId,
            lat: String(latitude),
            lng: String(longitude),
            city: addressDetails.city,
            street: addressDetails.street,
          });
        } catch (e) {}
      }
    } catch (e) {
      console.error('Manual location ERROR:', e);
      setLocationAddress(manualAddress || 'Indiranagar, Bengaluru');
      setShowUnserviceable(false);
      setCurrentStep('home');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSendOtp = async () => {
    if (phone.length < 10) return Alert.alert('Invalid', 'Please enter a valid phone number');

    setIsRequesting(true);
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    try {
      const { ok, data } = await sendOtpApi(formattedPhone);

      if (ok && (data.success || data.statusCode === 200)) {
        const seconds =
          data.data?.expireTimeInSeconds ?? data.expireTimeInSeconds ?? 60;
        setOtpTimer(seconds);
        await checkUserApi(formattedPhone);
        setOtp('');
        setCurrentStep('otp');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.log('Error sending OTP:', error);
      Alert.alert('Error', 'An error occurred while sending the OTP.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleResendOtp = async () => {
    if (isRequesting || otpTimer > 0) return;

    setIsRequesting(true);
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    try {
      const { ok, data } = await resendOtpApi(formattedPhone);

      if (ok && (data.success || data.statusCode === 200)) {
        const seconds =
          data.data?.expireTimeInSeconds ?? data.expireTimeInSeconds ?? 60;
        setOtpTimer(seconds);
        Alert.alert('Success', data.message || 'OTP resent successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.log('Error resending OTP:', error);
      Alert.alert('Error', 'An error occurred while resending the OTP.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return Alert.alert('Invalid', 'Please enter the OTP');

    setIsRequesting(true);
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    try {
      const { ok, data } = await verifyOtpApi(formattedPhone, otp);

      if (ok && (data.success || data.statusCode === 200)) {
        const userData = data.data?.user || data.user;
        const userToken = data.data?.token || data.token;
        if (userToken) {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          setUserId(userData?.id);
        }
        setCurrentStep('location');
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
        setOtp('');
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      Alert.alert('Error', 'An error occurred while verifying the OTP.');
      setOtp('');
    } finally {
      setIsRequesting(false);
    }
  };

  return {
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
  };
}
