// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { launchImageLibrary, launchCamera, ImagePickerResponse, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// type RootStackParamList = {
//   Documents: undefined;
// };

// type DocumentsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Documents'>;

// const DocumentsScreen: React.FC = () => {
//   const navigation = useNavigation<DocumentsNavigationProp>();
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [driversLicenseNumber, setDriversLicenseNumber] = useState('');
//   const [aadharPhoto, setAadharPhoto] = useState<string | null>(null);
//   const [licensePhoto, setLicensePhoto] = useState<string | null>(null);
//   const [livePhoto, setLivePhoto] = useState<string | null>(null);

//   const handleUpdateDocuments = () => {
//     if (!aadharNumber || !driversLicenseNumber || !aadharPhoto || !licensePhoto || !livePhoto) {
//       Alert.alert('Error', 'Please fill all fields and add all photos');
//       return;
//     }
//     Alert.alert('Success', 'Documents updated successfully!');
//     navigation.goBack();
//   };

//   const pickImageFromGallery = async (setPhoto: React.Dispatch<React.SetStateAction<string | null>>) => {
//     const options: ImageLibraryOptions = {
//       mediaType: 'photo',
//       quality: 0.5,
//     };
//     const result: ImagePickerResponse = await launchImageLibrary(options);

//     if (!result.didCancel && result.assets && result.assets.length > 0) {
//       setPhoto(result.assets[0].uri || null);
//     }
//   };

//   const takeLivePhoto = async () => {
//     const options: CameraOptions = {
//       mediaType: 'photo',
//       quality: 0.5,
//     };
//     const result: ImagePickerResponse = await launchCamera(options);

//     if (!result.didCancel && result.assets && result.assets.length > 0) {
//       setLivePhoto(result.assets[0].uri || null);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={20} color="#811717" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Documents</Text>
//       </View>

//       <View style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="Aadhar Number"
//           value={aadharNumber}
//           onChangeText={setAadharNumber}
//         />
//         <TouchableOpacity style={styles.addPhoto} onPress={() => pickImageFromGallery(setAadharPhoto)}>
//           <Text style={styles.addPhotoText}>Add Aadhar Photo</Text>
//           <Ionicons name="attach" size={16} color="#666" />
//         </TouchableOpacity>
//         {aadharPhoto && <Image source={{ uri: aadharPhoto }} style={styles.preview} />}

//         <TextInput
//           style={styles.input}
//           placeholder="Driver's License Number"
//           value={driversLicenseNumber}
//           onChangeText={setDriversLicenseNumber}
//         />
//         <TouchableOpacity style={styles.addPhoto} onPress={() => pickImageFromGallery(setLicensePhoto)}>
//           <Text style={styles.addPhotoText}>Add License Photo</Text>
//           <Ionicons name="attach" size={16} color="#666" />
//         </TouchableOpacity>
//         {licensePhoto && <Image source={{ uri: licensePhoto }} style={styles.preview} />}

//         <TouchableOpacity style={styles.takeImageButton} onPress={takeLivePhoto}>
//           <Text style={styles.takeImageButtonText}>Take Live Photo</Text>
//         </TouchableOpacity>
//         {livePhoto && <Image source={{ uri: livePhoto }} style={styles.preview} />}
//       </View>

//       <View style={styles.bottomButton}>
//         <TouchableOpacity style={styles.updateButton} onPress={handleUpdateDocuments}>
//           <Text style={styles.updateButtonText}>UPDATE DOCUMENTS</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerText: { color: '#811717', fontSize: 16, fontWeight: '600', marginLeft: 10 },
//   form: { padding: 20 },
//   input: {
//     borderWidth: 2,
//     borderColor: '#F04F65',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   addPhoto: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   addPhotoText: { color: '#666', marginRight: 5 },
//   preview: { width: 100, height: 100, marginVertical: 10, borderRadius: 8 },
//   takeImageButton: {
//     backgroundColor: '#811717',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   takeImageButtonText: { color: '#fff', fontWeight: 'bold' },
//   bottomButton: {
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     backgroundColor: '#FFF5F6',
//   },
//   updateButton: {
//     backgroundColor: '#811717',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//     textTransform: 'uppercase',
//   },
// });

// export default DocumentsScreen;



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  AppState,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import { uploadDocument } from '../api/user';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Documents: undefined;
};

type DocumentsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Documents'>;

const DocumentsScreen: React.FC = () => {
  const navigation = useNavigation<DocumentsNavigationProp>();
  const [aadharNumber, setAadharNumber] = useState('');
  const [driversLicenseNumber, setDriversLicenseNumber] = useState('');
  const [aadharPhoto, setAadharPhoto] = useState<string | null>(null);
  const [licensePhoto, setLicensePhoto] = useState<string | null>(null);
  const [livePhoto, setLivePhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateInputs = () => {
    if (!aadharNumber || !/^\d{12}$/.test(aadharNumber)) {
      Alert.alert('Error', 'Valid 12-digit Aadhar number is required');
      return false;
    }
    if (!driversLicenseNumber || !/^[A-Z0-9]{8,16}$/.test(driversLicenseNumber)) {
      Alert.alert('Error', 'Valid driver’s license number is required');
      return false;
    }
    if (!aadharPhoto || !licensePhoto || !livePhoto) {
      Alert.alert('Error', 'Please upload all required photos');
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async (
    setPhoto: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.5,
    };
    const result: ImagePickerResponse = await launchImageLibrary(options);

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri || null);
    }
  };

  const takeLivePhoto = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.5,
    };
    const result: ImagePickerResponse = await launchCamera(options);

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setLivePhoto(result.assets[0].uri || null);
    }
  };

  const handleUpdateDocuments = async () => {
    if (!validateInputs()){
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('aadharNumber', aadharNumber);
      formData.append('driversLicenseNumber', driversLicenseNumber);
      if (aadharPhoto) {
        formData.append('aadharPhoto', {
          uri: aadharPhoto,
          name: `aadhar_${Date.now()}.jpg`,
          type: 'image/jpeg',
        } as any);
      }
      if (licensePhoto) {
        formData.append('licensePhoto', {
          uri: licensePhoto,
          name: `license_${Date.now()}.jpg`,
          type: 'image/jpeg',
        } as any);
      }
      if (livePhoto) {
        formData.append('livePhoto', {
          uri: livePhoto,
          name: `live_${Date.now()}.jpg`,
          type: 'image/jpeg',
        } as any);
      }

      await uploadDocument(formData);

      if (AppState.currentState === 'active') {
        Alert.alert('Success', 'Documents uploaded successfully!');
      }
      navigation.goBack();
    } catch (error: any) {
      console.error('Upload Documents Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      if (AppState.currentState === 'active') {
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Failed to upload documents. Please try again.'
        );
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#811717" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Documents</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Aadhar Number"
          value={aadharNumber}
          onChangeText={setAadharNumber}
          keyboardType="numeric"
          maxLength={12}
        />
        <TouchableOpacity
          style={styles.addPhoto}
          onPress={() => pickImageFromGallery(setAadharPhoto)}
        >
          <Text style={styles.addPhotoText}>Add Aadhar Photo</Text>
          <Ionicons name="attach" size={16} color="#666" />
        </TouchableOpacity>
        {aadharPhoto && <Image source={{ uri: aadharPhoto }} style={styles.preview} />}

        <TextInput
          style={styles.input}
          placeholder="Driver's License Number"
          value={driversLicenseNumber}
          onChangeText={setDriversLicenseNumber}
          maxLength={16}
        />
        <TouchableOpacity
          style={styles.addPhoto}
          onPress={() => pickImageFromGallery(setLicensePhoto)}
        >
          <Text style={styles.addPhotoText}>Add License Photo</Text>
          <Ionicons name="attach" size={16} color="#666" />
        </TouchableOpacity>
        {licensePhoto && <Image source={{ uri: licensePhoto }} style={styles.preview} />}

        <TouchableOpacity style={styles.takeImageButton} onPress={takeLivePhoto}>
          <Text style={styles.takeImageButtonText}>Take Live Photo</Text>
        </TouchableOpacity>
        {livePhoto && <Image source={{ uri: livePhoto }} style={styles.preview} />}
      </View>

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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: { color: '#006400', fontSize: 16, fontWeight: '600', marginLeft: 10 },
  form: { padding: 20 },
  input: {
    borderWidth: 2,
    borderColor: '#006400',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addPhoto: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  addPhotoText: { color: '#666', marginRight: 5 },
  preview: { width: 100, height: 100, marginVertical: 10, borderRadius: 8 },
  takeImageButton: {
    backgroundColor: '#006400',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  takeImageButtonText: {
    color: '#006400',
    fontWeight: 'bold',
    fontSize: 16,
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
