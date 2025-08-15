import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigation';
import { useAuth } from '../context/AuthContext';

const { height } = Dimensions.get('window');

const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type RouteProps = RouteProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const insets = useSafeAreaInsets();
  const { sendOtp } = useAuth();

  const [mobileNumber, setMobileNumber] = useState('');
  console.log("mobileNumber",mobileNumber)
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const dismissKeyboard = () => Keyboard.dismiss();

  const isValidMobileNumber = (number: string): boolean =>
    number.replace(/\D/g, '').length === 10;

  const handleProceed = async () => {
    if (!isValidMobileNumber(mobileNumber)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setIsSending(true);
    try {
      const fullNumber = `${selectedCountry.code}${mobileNumber}`;
      console.log('Sending OTP for:', fullNumber);
      await sendOtp(mobileNumber);
      navigation.navigate('OTPVerification', {
        mobileNumber,
        countryCode: selectedCountry.code,
        redirectTo: route.params?.redirectTo,
      });
    } catch (error: any) {
      console.error('OTP Request Failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to send OTP. Please check your network or try again later.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom + 20 : 0}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={styles.headerCard}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#006400" />
            </TouchableOpacity>
            <Text style={styles.headerCardTitle}>Enter Mobile Number</Text>
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.middleCard}>
              <Text style={styles.title}>Verify Mobile Number to Continue</Text>

              <View style={styles.inputWrapper}>
                <TouchableOpacity
                  style={styles.countryCodeContainer}
                  onPress={() => setCountryModalVisible(true)}
                >
                  <Text style={styles.flagIcon}>{selectedCountry.flag}</Text>
                  <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="#888"
                  keyboardType="phone-pad"
                  value={mobileNumber}
                  onChangeText={(text) => {
                    setMobileNumber(text.replace(/\D/g, ''));
                    setShowError(false);
                  }}
                  maxLength={10}
                />
              </View>

              {showError && (
                <Text style={styles.errorText}>
                  Numbers are required, please check the number
                </Text>
              )}
            </View>

            <View style={styles.bottomButtonWrapper}>
              <TouchableOpacity
                style={[
                  styles.proceedButton,
                  {
                    opacity: isValidMobileNumber(mobileNumber) && !isSending ? 1 : 0.6,
                  },
                ]}
                onPress={handleProceed}
                disabled={!isValidMobileNumber(mobileNumber) || isSending}
              >
                {isSending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.proceedButtonText}>PROCEED WITH OTP</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            visible={countryModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setCountryModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Country</Text>
                  <TouchableOpacity onPress={() => setCountryModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={countryCodes}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.countryItem}
                      onPress={() => {
                        setSelectedCountry(item);
                        setCountryModalVisible(false);
                      }}
                    >
                      <Text style={styles.countryFlag}>{item.flag}</Text>
                      <Text style={styles.countryName}>{item.country}</Text>
                      <Text style={styles.countryCode}>{item.code}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.code}
                />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerCard: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerCardTitle: { fontSize: 18, fontWeight: '600', color: '#006400', marginLeft: 8 },
  contentWrapper: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  middleCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 20, textAlign: 'center' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 2,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    marginRight: 10,
  },
  flagIcon: { fontSize: 22, marginRight: 6 },
  countryCodeText: { fontSize: 16, fontWeight: '500', color: '#333' },
  input: { flex: 1, fontSize: 16, color: '#000' },
  errorText: { fontSize: 14, color: '#C93A3A', marginTop: 8, textAlign: 'center' },
  bottomButtonWrapper: { alignItems: 'center', paddingBottom: 20 },
  proceedButton: {
    backgroundColor: '#81cc95',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    elevation: 4,
  },
  proceedButtonText: { color: '#191a19', fontSize: 16, fontWeight: '600' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryFlag: { fontSize: 24, marginRight: 12 },
  countryName: { flex: 1, fontSize: 16, color: '#333' },
  countryCode: { fontSize: 16, fontWeight: '500', color: '#666' },
});
