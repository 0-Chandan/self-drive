// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useAuth } from '../context/AuthContext';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';

// type TabParamList = {
//   Home: { location?: string } | undefined;
//   'My Trips': undefined;
//   Profile: undefined;
//   Notification: undefined;
// };

// type RootStackParamList = {
//   Login: { redirectTo?: { screen: keyof RootStackParamList; params: any } };
//   OTPVerification: { mobileNumber: string; redirectTo?: { screen: keyof RootStackParamList; params: any } };
//   SignUp: undefined;
//   Main: { screen: keyof TabParamList };
//   CarDetails: { carId: number };
//   SearchResults: { location: string; startDate: string; endDate: string };
//   LocationPicker: undefined;
//   EditProfile: undefined;
//   Payment: { carId: number; carName: string; price: string; startDate: string; endDate: string };
// };

// type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
// type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation<LoginNavigationProp>();
//   const route = useRoute<LoginRouteProp>();
//   const loginWithOTP  = useAuth();
//   const [mobile, setMobile] = useState<string>('');

//   const handleLogin = () => {
//     if (!mobile) {
//       Alert.alert('Error', 'Please enter your mobile number');
//       return;
//     }
//     navigation.navigate('OTPVerification', {
//       mobileNumber: mobile,
//       redirectTo: route.params?.redirectTo,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={24} color="#811717" />
//       </TouchableOpacity>
//       <Text style={styles.title}>Log In</Text>
//       <Text style={styles.subtitle}>Enter your mobile number to continue</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Mobile Number"
//         value={mobile}
//         onChangeText={setMobile}
//         keyboardType="phone-pad"
//       />
//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginButtonText}>Continue</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//         <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
//   backButton: { position: 'absolute', top: 20, left: 20 },
//   title: { fontSize: 28, fontWeight: 'bold', color: '#811717', marginBottom: 10, textAlign: 'center' },
//   subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
//   input: {
//     borderWidth: 1.5,
//     borderColor: '#F04F65',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: '#811717',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   signupText: { color: '#4169E1', textAlign: 'center', marginTop: 10 },
// });

// export default LoginScreen;




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   FlatList,
//   Modal,
//   Dimensions,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';

// const { height } = Dimensions.get('window');

// const countryCodes = [
//   { code: '+91', country: 'India', flag: '🇮🇳' },
//   { code: '+1', country: 'United States', flag: '🇺🇸' },
//   { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
//   { code: '+61', country: 'Australia', flag: '🇦🇺' },
//   { code: '+86', country: 'China', flag: '🇨🇳' },
// ];

// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
//   const route = useRoute<RouteProp<RootStackParamList, 'Login'>>();
//   const insets = useSafeAreaInsets();

//   const [mobileNumber, setMobileNumber] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
//   const [countryModalVisible, setCountryModalVisible] = useState(false);
//   const [showError, setShowError] = useState(false);

//   const dismissKeyboard = () => Keyboard.dismiss();

//   // Validation function for exactly 10 digits
//   const isValidMobileNumber = (number: string): boolean => {
//     const cleanedNumber = number.replace(/\D/g, '');
//     return cleanedNumber.length === 10;
//   };

//   // Handle Proceed button press
//   const handleProceed = () => {
//     if (isValidMobileNumber(mobileNumber)) {
//       setShowError(false);
//       navigation.navigate('OTPVerification', {
//         mobileNumber,
//         countryCode: selectedCountry.code,
//         redirectTo: route.params?.redirectTo,
//       });
//     } else {
//       setShowError(true); // Show error only on button press
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ flex: 1 }}
//       keyboardVerticalOffset={Platform.OS === 'ios' ?Insets.bottom + 20 : 0}
//     >
//       <TouchableWithoutFeedback onPress={dismissKeyboard}>
//         <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
//           {/* Header */}
//           <View style={styles.headerCard}>
//             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//               <Ionicons name="arrow-back" size={22} color="#C93A3A" />
//             </TouchableOpacity>
//             <Text style={styles.headerCardTitle}>Enter Mobile Number</Text>
//           </View>

//           {/* Main Content */}
//           <View style={styles.contentWrapper}>
//             {/* Center card */}
//             <View style={styles.middleCard}>
//               <Text style={styles.title}>Verify Mobile Number to Continue</Text>

//               <View style={styles.inputWrapper}>
//                 <TouchableOpacity
//                   style={styles.countryCodeContainer}
//                   onPress={() => setCountryModalVisible(true)}
//                 >
//                   <Text style={styles.flagIcon}>{selectedCountry.flag}</Text>
//                   <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
//                 </TouchableOpacity>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Mobile Number"
//                   placeholderTextColor="#888"
//                   keyboardType="phone-pad"
//                   value={mobileNumber}
//                   onChangeText={(text) => {
//                     setMobileNumber(text.replace(/\D/g, ''));
//                     setShowError(false); // Hide error while typing
//                   }}
//                   maxLength={10}
//                 />
//               </View>

//               {/* Error message */}
//               {showError && (
//                 <Text style={styles.errorText}>Numbers are required, please check the number</Text>
//               )}
//             </View>

//             {/* Bottom button */}
//             <View style={styles.bottomButtonWrapper}>
//               <TouchableOpacity
//                 style={[
//                   styles.proceedButton,
//                   { opacity: isValidMobileNumber(mobileNumber) ? 1 : 0.6 },
//                 ]}
//                 onPress={handleProceed}
//                 disabled={!isValidMobileNumber(mobileNumber)}
//               >
//                 <Text style={styles.proceedButtonText}>PROCEED WITH OTP</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Modal */}
//           <Modal
//             visible={countryModalVisible}
//             animationType="slide"
//             transparent
//             onRequestClose={() => setCountryModalVisible(false)}
//           >
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <View style={styles.modalHeader}>
//                   <Text style={styles.modalTitle}>Select Country</Text>
//                   <TouchableOpacity onPress={() => setCountryModalVisible(false)}>
//                     <Ionicons name="close" size={24} color="#000" />
//                   </TouchableOpacity>
//                 </View>
//                 <FlatList
//                   data={countryCodes}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       style={styles.countryItem}
//                       onPress={() => {
//                         setSelectedCountry(item);
//                         setCountryModalVisible(false);
//                       }}
//                     >
//                       <Text style={styles.countryFlag}>{item.flag}</Text>
//                       <Text style={styles.countryName}>{item.country}</Text>
//                       <Text style={styles.countryCode}>{item.code}</Text>
//                     </TouchableOpacity>
//                   )}
//                   keyExtractor={(item) => item.code}
//                 />
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerCard: {
//     marginHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     marginTop: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   headerCardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#C93A3A',
//     marginLeft: 8,
//   },
//   contentWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   middleCard: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 14,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   countryCodeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingRight: 10,
//     borderRightWidth: 1,
//     borderRightColor: '#ccc',
//     marginRight: 10,
//   },
//   flagIcon: {
//     fontSize: 22,
//     marginRight: 6,
//   },
//   countryCodeText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#000',
//   },
//   errorText: {
//     fontSize: 14,
//     color: '#C93A3A',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   bottomButtonWrapper: {
//     alignItems: 'center',
//     paddingBottom: 20,
//   },
//   proceedButton: {
//     backgroundColor: '#F04F65',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     shadowColor: '#F04F65',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 4,
//     width: '100%',
//   },
//   proceedButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: height * 0.7,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   countryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   countryFlag: {
//     fontSize: 24,
//     marginRight: 12,
//   },
//   countryName: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   countryCode: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#666',
//   },
// });

// export default LoginScreen;





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
      await sendOtp(fullNumber);
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
              <Ionicons name="arrow-back" size={22} color="#C93A3A" />
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
  headerCardTitle: { fontSize: 18, fontWeight: '600', color: '#C93A3A', marginLeft: 8 },
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
    backgroundColor: '#F04F65',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    elevation: 4,
  },
  proceedButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
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
