

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
import axios from 'axios';
import { baseURL } from '../constant/Base_Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTPVerification'>;
type RouteProps = RouteProp<RootStackParamList, 'OTPVerification'>;

const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { mobileNumber, countryCode, redirectTo } = route.params;
  const { loginWithOTP } = useAuth();

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
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
      if (index < 3) inputs.current[index + 1]?.focus();
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
    if (enteredOtp.length < 4) return;

    const fullNumber = `${countryCode}${mobileNumber}`;
    console.log('Sending OTP request:',  mobileNumber);
    setIsVerifying(true);
    
      await axios.post(`${baseURL}/auth/user/login`, { mobile: mobileNumber, otp: enteredOtp })
      .then((response) => {
        console.log('OTP Response:', response.data.data);
        AsyncStorage.setItem('authToken', response.data.data.token);
        AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log('Auth Token:', response.data.data.token);
        console.log('User Data:', response.data.data.user);
        Alert.alert('Success', 'Login successful!');
         navigation.replace("Main", { screen: "Home" });
        //loginWithOTP(response.data.token, response.data.user);
      })
      .catch((error) => {
        console.error('OTP Request Failed:', error);
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      })
      .finally(() => {+12
        setIsVerifying(false);
      });
    
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '']);
    inputs.current[0]?.focus();
    // optional: trigger sendOtp again via AuthContext if you expose it
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#006400" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Enter OTP</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Enter 4-digit OTP</Text>
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
  headerText: { color: '#006400', fontSize: 16, fontWeight: '600', marginLeft: 10 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 70 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 20 },
  otpInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  inputBox: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: '#006400',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#006400',
  },
  timerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  timerText: { fontSize: 14, color: '#666' },
  resendText: { fontSize: 14, color: '#006400', fontWeight: 'bold', marginLeft: 10 },
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
    backgroundColor: '#006400',
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
