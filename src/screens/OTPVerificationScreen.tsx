
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useAuth } from '../context/AuthContext';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';

// type OTPVerificationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTPVerification'>;
// type OTPVerificationRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

// const OTPVerificationScreen: React.FC = () => {
//   const navigation = useNavigation<OTPVerificationNavigationProp>();
//   const route = useRoute<OTPVerificationRouteProp>();
//   const { mobileNumber, countryCode, redirectTo } = route.params || { mobileNumber: '+91XXXXXXXXXX' };
//   const { loginWithOTP } = useAuth();

//   const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState<number>(30);
//   const inputs = useRef<(TextInput | null)[]>([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChangeText = (text: string, index: number) => {
//     if (/^\d$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);
//       if (index < 5) {
//         inputs.current[index + 1]?.focus();
//       }
//     } else if (text === '') {
//       const newOtp = [...otp];
//       newOtp[index] = '';
//       setOtp(newOtp);
//     }
//   };

//   const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }, index: number) => {
//     if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const handleLogin = () => {
//     const enteredOtp = otp.join('');
//     console.log('OTP Entered:', enteredOtp);
//     const fullNumber = countryCode ? `${countryCode}${mobileNumber}` : mobileNumber;
//     const isSuccess = loginWithOTP(fullNumber, enteredOtp);
//     if (isSuccess) {
//       if (redirectTo) {
//         navigation.navigate(redirectTo.screen, redirectTo.params);
//       } else {
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Main', params: { screen: 'Home' } }],
//         });
//       }
//     } else {
//       Alert.alert('Error', 'Invalid OTP. Please use the hardcoded OTP: 123456 for testing.');
//     }
//   };

//   const handleResend = () => {
//     setTimer(30);
//     setOtp(['', '', '', '', '', '']);
//     inputs.current[0]?.focus();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.headerCard}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={20} color="#C93A3A" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Enter OTP</Text>
//         </View>

//         <View style={styles.content}>
//           <Text style={styles.title}>Enter 6-digit OTP</Text>
//           <Text style={styles.subtitle}>OTP was sent to {mobileNumber}</Text>
//           <Text style={styles.note}>Note: For testing, use hardcoded OTP: 123456</Text>

//           <View style={styles.otpInputs}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 style={styles.inputBox}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 value={digit}
//                 onChangeText={(text) => handleChangeText(text, index)}
//                 onKeyPress={(e) => handleKeyPress(e, index)}
//                 ref={(ref) => (inputs.current[index] = ref)}
//                 autoFocus={index === 0}
//               />
//             ))}
//           </View>

//           <View style={styles.timerContainer}>
//             <Text style={styles.timerText}>
//               {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
//             </Text>
//             {timer === 0 && (
//               <TouchableOpacity onPress={handleResend}>
//                 <Text style={styles.resendText}>RESEND</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         <View style={styles.bottom}>
//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={handleLogin}
//             disabled={otp.some((digit) => !digit)}
//           >
//             <Text style={styles.loginButtonText}>LOGIN</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerCard: {
//     marginTop: 16,
//     marginHorizontal: 16,
//     backgroundColor: '#fff',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   headerText: {
//     color: '#C93A3A',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 10,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 70,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 10,
//   },
//   note: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 20,
//     fontStyle: 'italic',
//   },
//   otpInputs: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   inputBox: {
//     width: 48,
//     height: 56,
//     borderWidth: 2,
//     borderColor: '#C93A3A',
//     borderRadius: 8,
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#C93A3A',
//   },
//   timerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   timerText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   resendText: {
//     fontSize: 14,
//     color: '#C93A3A',
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   bottom: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#FFF5F6',
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   loginButton: {
//     backgroundColor: '#C93A3A',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//   },
// });

// export default OTPVerificationScreen;






// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useAuth } from '../context/AuthContext';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';

// type OTPVerificationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTPVerification'>;
// type OTPVerificationRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

// const OTPVerificationScreen: React.FC = () => {
//   const navigation = useNavigation<OTPVerificationNavigationProp>();
//   const route = useRoute<OTPVerificationRouteProp>();
//   const { mobileNumber, countryCode, redirectTo } = route.params || { mobileNumber: '+91XXXXXXXXXX' };
//   const { loginWithOTP } = useAuth();

//   const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState<number>(30);
//   const inputs = useRef<(TextInput | null)[]>([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChangeText = (text: string, index: number) => {
//     if (/^\d$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);
//       if (index < 5) {
//         inputs.current[index + 1]?.focus();
//       }
//     } else if (text === '') {
//       const newOtp = [...otp];
//       newOtp[index] = '';
//       setOtp(newOtp);
//     }
//   };

//   const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }, index: number) => {
//     if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const handleLogin = async () => {
//     const enteredOtp = otp.join('');
//     const fullNumber = countryCode ? `${countryCode}${mobileNumber}` : mobileNumber;
//     try {
//       const isSuccess = await loginWithOTP(fullNumber, enteredOtp);
//       if (isSuccess) {
//         if (redirectTo) {
//           navigation.navigate(redirectTo.screen, redirectTo.params);
//         } else {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Main', params: { screen: 'Home' } }],
//           });
//         }
//       } else {
//         Alert.alert('Error', 'Invalid OTP. Please try again.');
//       }
//     } catch (error: any) {
//       Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
//     }
//   };

//   const handleResend = () => {
//     setTimer(30);
//     setOtp(['', '', '', '', '', '']);
//     inputs.current[0]?.focus();
//     // Optionally call requestOtp again here if needed
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.headerCard}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={20} color="#C93A3A" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Enter OTP</Text>
//         </View>

//         <View style={styles.content}>
//           <Text style={styles.title}>Enter 6-digit OTP</Text>
//           <Text style={styles.subtitle}>OTP was sent to {mobileNumber}</Text>

//           <View style={styles.otpInputs}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 style={styles.inputBox}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 value={digit}
//                 onChangeText={(text) => handleChangeText(text, index)}
//                 onKeyPress={(e) => handleKeyPress(e, index)}
//                 ref={(ref) => (inputs.current[index] = ref)}
//                 autoFocus={index === 0}
//               />
//             ))}
//           </View>

//           <View style={styles.timerContainer}>
//             <Text style={styles.timerText}>
//               {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
//             </Text>
//             {timer === 0 && (
//               <TouchableOpacity onPress={handleResend}>
//                 <Text style={styles.resendText}>RESEND</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         <View style={styles.bottom}>
//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={handleLogin}
//             disabled={otp.some((digit) => !digit)}
//           >
//             <Text style={styles.loginButtonText}>LOGIN</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerCard: {
//     marginTop: 16,
//     marginHorizontal: 16,
//     backgroundColor: '#fff',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   headerText: {
//     color: '#C93A3A',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 10,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 70,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 20,
//   },
//   otpInputs: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   inputBox: {
//     width: 48,
//     height: 56,
//     borderWidth: 2,
//     borderColor: '#C93A3A',
//     borderRadius: 8,
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#C93A3A',
//   },
//   timerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   timerText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   resendText: {
//     fontSize: 14,
//     color: '#C93A3A',
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   bottom: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#FFF5F6',
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   loginButton: {
//     backgroundColor: '#C93A3A',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//   },
// });

// export default OTPVerificationScreen;





import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTPVerification'>;
type RouteProps = RouteProp<RootStackParamList, 'OTPVerification'>;

const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { mobileNumber, countryCode, redirectTo } = route.params;
  const { loginWithOTP } = useAuth();

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChangeText = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5) inputs.current[index + 1]?.focus();
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }, index: number) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleLogin = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) return;

    const fullNumber = `${countryCode}${mobileNumber}`;
    setIsVerifying(true);
    try {
      const isSuccess = await loginWithOTP(fullNumber, enteredOtp);
      if (isSuccess) {
        if (redirectTo) {
          navigation.navigate(redirectTo.screen, redirectTo.params);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main', params: { screen: 'Home' } }],
          });
        }
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } catch {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    inputs.current[0]?.focus();
    // optional: trigger sendOtp again via AuthContext if you expose it
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#C93A3A" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Enter OTP</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Enter 6-digit OTP</Text>
          <Text style={styles.subtitle}>OTP was sent to {countryCode}{mobileNumber}</Text>

          <View style={styles.otpInputs}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                style={styles.inputBox}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(t) => handleChangeText(t, idx)}
                onKeyPress={(e) => handleKeyPress(e, idx)}
                ref={(ref) => { inputs.current[idx] = ref; }}
                autoFocus={idx === 0}
              />
            ))}
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {timer > 0 ? `Resend OTP in ${timer}s` : 'Didn’t get the code?'}
            </Text>
            {timer === 0 && (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>RESEND</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              { opacity: otp.every((d) => d) && !isVerifying ? 1 : 0.6 },
            ]}
            onPress={handleLogin}
            disabled={otp.some((d) => !d) || isVerifying}
          >
            {isVerifying ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>LOGIN</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default OTPVerificationScreen;

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerCard: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: { color: '#C93A3A', fontSize: 16, fontWeight: '600', marginLeft: 10 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 70 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 20 },
  otpInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  inputBox: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: '#C93A3A',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#C93A3A',
  },
  timerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  timerText: { fontSize: 14, color: '#666' },
  resendText: { fontSize: 14, color: '#C93A3A', fontWeight: 'bold', marginLeft: 10 },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF5F6',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  loginButton: {
    backgroundColor: '#C93A3A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: '700', letterSpacing: 1 },
});
