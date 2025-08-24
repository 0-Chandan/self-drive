import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../constant/Base_Url';
import { uploadDocument } from '../api/user';

type RootStackParamList = { Documents: undefined };
type DocumentsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Documents'>;

type userdata = { id: string; mobile: string; role: string };

const DocumentsScreen: React.FC = () => {
  const navigation = useNavigation<DocumentsNavigationProp>();
  const [aadhaarNumber, setAadharNumber] = useState('');
  const [driversLicenseNumber, setDriversLicenseNumber] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<userdata | null>(null);

  // Error state for inputs
  const [aadharError, setAadharError] = useState('');
  const [licenseError, setLicenseError] = useState('');

  // Loader + verified state
  const [aadhaarLoading, setAadhaarLoading] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  const [licenseLoading, setLicenseLoading] = useState(false);
  const [licenseVerified, setLicenseVerified] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('authToken').then((t) => t && setToken(t));
    AsyncStorage.getItem('user').then((u) => u && setUser(JSON.parse(u)));
  }, []);

  // ---- Aadhaar Verification ----
  const verifyaadharnumber = () => {
    if (!aadhaarNumber.trim()) {
      setAadharError('Aadhar number is required');
      return;
    }
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setAadharError('Aadhar must be 12 digits');
      return;
    }
    setAadharError('');
    setAadhaarLoading(true);

    const payload = { userId: user?.id.toString(), aadhaarNumber };
    axios
      .post(`${baseURL}/users/documents`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Alert.alert('Success', 'Aadhar number verified successfully!');
        setAadharNumber('');
        setAadhaarVerified(true);
      })
      .catch((err) => {
        Alert.alert('Error', err.response?.data?.message || 'Failed to verify Aadhar');
        console.error(err.response?.data);
      })
      .finally(() => setAadhaarLoading(false));
  };

  // ---- License Verification ----
  const verifydriverslicensenumber = () => {
    if (!driversLicenseNumber.trim()) {
      setLicenseError('License number is required');
      return;
    }
    if (!/^[A-Z0-9]{8,16}$/.test(driversLicenseNumber)) {
      setLicenseError('License number must be 8–16 alphanumeric chars');
      return;
    }
    setLicenseError('');
    setLicenseLoading(true);

    const payload = { userId: user?.id.toString(), drivingLicenseNumber: driversLicenseNumber };
    axios
      .post(`${baseURL}/users/documents`, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Alert.alert('Success', 'Driver’s license verified successfully!');
        setDriversLicenseNumber('');
        setLicenseVerified(true);
      })
      .catch((err) => {
        console.error(err.response?.data);
        Alert.alert('Error', 'Failed to verify license');
      })
      .finally(() => setLicenseLoading(false));
  };

  // ---- Document Upload ----
  const handleUpdateDocuments = async () => {
    if (!aadhaarVerified || !licenseVerified) {
      Alert.alert('Error', 'Please verify both Aadhaar & License before uploading');
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('aadharNumber', aadhaarNumber);
      formData.append('driversLicenseNumber', driversLicenseNumber);

      await uploadDocument(formData);
      Alert.alert('Success', 'Documents uploaded successfully!');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#811717" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Documents</Text>
      </View>

      <View style={styles.form}>
        {/* Aadhaar Input */}
        <TextInput
          style={[styles.input, aadharError ? styles.errorInput : null]}
          placeholder="Aadhar Number"
          value={aadhaarNumber}
          onChangeText={(text) => {
            setAadharNumber(text);
            if (text.trim()) setAadharError('');
          }}
          keyboardType="numeric"
          maxLength={12}
        />
        {aadharError ? <Text style={styles.errorText}>{aadharError}</Text> : null}

        {aadhaarVerified ? (
          <Text style={styles.verifiedText}>✅ Aadhaar Verified</Text>
        ) : (
          <TouchableOpacity style={styles.verifyButton} onPress={verifyaadharnumber} disabled={aadhaarLoading}>
            {aadhaarLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={18} color="#fff" />
                <Text style={styles.verifyButtonText}>Verify Aadhaar</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* License Input */}
        <TextInput
          style={[styles.input, licenseError ? styles.errorInput : null]}
          placeholder="Driver's License Number"
          value={driversLicenseNumber}
          onChangeText={(text) => {
            setDriversLicenseNumber(text);
            if (text.trim()) setLicenseError('');
          }}
          maxLength={16}
        />
        {licenseError ? <Text style={styles.errorText}>{licenseError}</Text> : null}

        {licenseVerified ? (
          <Text style={styles.verifiedText}>✅ License Verified</Text>
        ) : (
          <TouchableOpacity style={styles.verifyButton} onPress={verifydriverslicensenumber} disabled={licenseLoading}>
            {licenseLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={18} color="#fff" />
                <Text style={styles.verifyButtonText}>Verify License</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom Update */}
      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={[styles.updateButton, isUploading && { opacity: 0.6 }]}
          onPress={handleUpdateDocuments}
          disabled={isUploading}
        >
          <Text style={styles.updateButtonText}>
            {isUploading ? 'UPLOADING...' : 'UPDATE DOCUMENTS'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: { color: '#006400', fontSize: 18, fontWeight: '600', marginLeft: 10 },

  form: { padding: 20 },

  input: {
    borderWidth: 2,
    borderColor: '#006400',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    fontSize: 16,
  },
  errorInput: { borderColor: 'red' },
  errorText: { color: 'red', marginBottom: 10, fontSize: 13 },

  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#006400',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  verifyButtonText: { color: '#fff', fontWeight: '600', marginLeft: 6 },

  verifiedText: {
    color: 'green',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'right',
  },

  bottomButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#FFF5F6',
  },
  updateButton: {
    backgroundColor: '#006400',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default DocumentsScreen;
