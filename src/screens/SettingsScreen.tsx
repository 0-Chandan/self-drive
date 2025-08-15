import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define your navigation types
type RootStackParamList = {
  Settings: undefined;
  Notifications: undefined;
  Language: undefined;
  PrivacyPolicy: undefined;
  TermCondition: undefined;
  ReturnPolicy:undefined
};

// Type for navigation prop
type SettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();

  // Define the settings options and restrict the screen names to valid keys from RootStackParamList
  const settingsOptions = [
    { name: 'Notifications', icon: 'notifications-outline', screen: 'Notifications' },
    { name: 'Language', icon: 'language-outline', screen: 'Language' },
    { name: 'Privacy Policy', icon: 'lock-closed-outline', screen: 'PrivacyPolicy' },
    { name: 'Terms & Conditions', icon: 'document-text-outline', screen: 'TermCondition' },
    {name:"Return Policy",icon:"document-text-outline",screen:"ReturnPolicy"}
  ] as const;  // Using 'as const' ensures that TypeScript knows these values are literal types

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.options}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => navigation.navigate(option.screen)} // No type error now
          >
            <Ionicons name={option.icon} size={24} color="#006400" />
            <Text style={styles.optionText}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#006400' },
  options: { padding: 16 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: { fontSize: 16, marginLeft: 10 },
});

export default SettingsScreen;
