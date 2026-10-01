import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const NEON_YELLOW = '#E5FA5E';
const WHITE = '#FFFFFF';

const API_BASE_URL = 'http://192.168.69.159:4003/api';

export default function UnserviceableScreen({ params, onBack }: { params: any, onBack: () => void }) {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {isSuccess ? (
            <Animated.View style={styles.successContainer} entering={FadeInUp.duration(600)}>
              <Animated.Text entering={FadeInDown.duration(600).springify().delay(200)} style={styles.emoji}>
                🎉
              </Animated.Text>

              <Animated.Text entering={FadeInUp.duration(600).delay(400)} style={styles.title}>
                Coordinates Locked!
              </Animated.Text>

              <Animated.Text entering={FadeInUp.duration(600).delay(500)} style={styles.subtitle}>
                You're officially on the VIP list. We'll send up a flare as soon as the party reaches your zone!
              </Animated.Text>

              <Animated.View entering={FadeInUp.duration(600).delay(600)} style={{ width: '100%', marginTop: 20 }}>
                <TouchableOpacity onPress={onBack} style={styles.button}>
                  <Text style={styles.buttonText}>Return to Base</Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          ) : (
            <>
              <Animated.Text entering={FadeInDown.duration(600).springify()} style={styles.emoji}>
                🛸
              </Animated.Text>

              <Animated.Text entering={FadeInUp.duration(600).delay(200)} style={styles.title}>
                Whoa, You're Off the Grid!
              </Animated.Text>

              <Animated.Text entering={FadeInUp.duration(600).delay(300)} style={styles.subtitle}>
                We're only dropping supplies in active party zones right now. But fear not—the mothership is expanding fast!
              </Animated.Text>

              <Animated.View entering={FadeInUp.duration(600).delay(400)} style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsSuccess(true)}
                >
                  <Text style={styles.buttonText}>Bring the Party to Me! 🚀</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View entering={FadeInUp.duration(600).delay(500)} style={{ marginTop: 30 }}>
                <TouchableOpacity onPress={onBack}>
                  <Text style={styles.goBackText}>← Go Back</Text>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    color: WHITE,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    color: WHITE,
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: NEON_YELLOW,
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '800',
  },
  goBackText: {
    color: WHITE,
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});
