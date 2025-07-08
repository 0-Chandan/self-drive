// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import  Ionicons  from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../context/AuthContext';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

// const SignUpScreen: React.FC = () => {
//   const navigation = useNavigation<SignUpNavigationProp>();
//   const { signup } = useAuth();
//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [phone, setPhone] = useState<string>('');
//   const [password, setPassword] = useState<string>('');

//   const handleSignUp = () => {
//     if (!name || (!email && !phone)) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }
//     const success = signup({ name, email, phone, password });
//     if (success) {
//       navigation.navigate('Main');
//     } else {
//       Alert.alert('Error', 'Sign up failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={24} color="#811717" />
//       </TouchableOpacity>
//       <Text style={styles.title}>Sign Up</Text>
//       <Text style={styles.subtitle}>Create an account to continue</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email (Optional)"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mobile Number (Optional)"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//         maxLength={10}
//       />
//       {email && (
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//       )}
//       <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
//         <Text style={styles.signupButtonText}>Sign Up</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.loginText}>Already have an account? Log In</Text>
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
//   signupButton: {
//     backgroundColor: '#811717',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   signupButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   loginText: { color: '#4169E1', textAlign: 'center', marginTop: 10 },
// });

// export default SignUpScreen;
