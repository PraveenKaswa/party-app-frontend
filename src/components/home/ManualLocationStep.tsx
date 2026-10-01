import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { WHITE } from '../../constants/colors';

interface ManualLocationStepProps {
  manualAddress: string;
  setManualAddress: (address: string) => void;
  suggestions: any[];
  isSearchingAddress: boolean;
  onBack: () => void;
  onSubmit: (suggestion?: any) => void;
}

export const ManualLocationStep: React.FC<ManualLocationStepProps> = ({
  manualAddress,
  setManualAddress,
  suggestions,
  isSearchingAddress,
  onBack,
  onSubmit,
}) => {
  return (
    <Animated.View entering={FadeInUp.duration(400)} style={{ alignItems: 'flex-start', width: '100%', marginTop: 10 }}>
      <TouchableOpacity onPress={onBack} style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <Text style={{ color: '#fff', fontSize: 24, marginRight: 15, marginLeft: 5 }}>←</Text>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Enter Delivery Address</Text>
      </TouchableOpacity>

      <Animated.View entering={FadeInDown.duration(600)} style={{ width: '100%' }}>
        <TextInput
          style={[styles.textInput, { textAlign: 'left' }]}
          placeholder="Search location"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={manualAddress}
          onChangeText={setManualAddress}
          onSubmitEditing={() => onSubmit()}
          autoFocus
        />

        {/* Live Suggestions Dropdown */}
        {(suggestions.length > 0 || isSearchingAddress) && (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={[styles.suggestionsContainer, { marginTop: 10, flexGrow: 0 }]}
          >
            {isSearchingAddress && suggestions.length === 0 ? (
              <Text style={{ color: '#fff', padding: 16, fontSize: 16 }}>Searching...</Text>
            ) : (
              suggestions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.suggestionItem, index === suggestions.length - 1 && { borderBottomWidth: 0 }]}
                  onPress={() => onSubmit(item)}
                >
                  <Text style={styles.suggestionIcon}>📍</Text>
                  <Text style={styles.suggestionText} numberOfLines={2}>
                    {item.display_name}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
  },
  suggestionsContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    marginTop: -10,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  suggestionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  suggestionText: {
    color: WHITE,
    fontSize: 14,
    flex: 1,
  },
});
