// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';
// import { useAuth } from '../context/AuthContext';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// type RootStackParamList = {
//   EditProfile: undefined;
// };

// type EditProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

// const EditProfile: React.FC = () => {
//   const navigation = useNavigation<EditProfileNavigationProp>();
//   const { userData, loginWithOTP } = useAuth();
//   const [name, setName] = useState(userData.name);
//   const [phone, setPhone] = useState(userData.phone);
//   const [email, setEmail] = useState('');
//   const [photo, setPhoto] = useState<string | null>(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         // Permissions handled by react-native-image-picker
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     const options: ImageLibraryOptions = {
//       mediaType: 'photo',
//       quality: 0.8,
//     };
//     const result: ImagePickerResponse = await launchImageLibrary(options);

//     if (!result.didCancel && result.assets && result.assets.length > 0) {
//       setPhoto(result.assets[0].uri || null);
//     }
//   };

//   const handleUpdateProfile = () => {
//     loginWithOTP(phone, '123456');
//     navigation.goBack();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerCard}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={20} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Profile</Text>
//         </View>
//       </View>

//       <View style={styles.avatarContainer}>
//         <Image
//           style={styles.avatar}
//           source={
//             photo
//               ? { uri: photo }
//               : require('../../assets/car1.png') // Replaced car1.png with placeholder
//           }
//         />
//         <TouchableOpacity style={styles.addPhoto} onPress={pickImage}>
//           <Text style={styles.addPhotoText}>Add photo</Text>
//           <Ionicons name="pencil" size={14} color="#4169E1" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputSection}>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//       </View>

//       <View style={styles.bottomButton}>
//         <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
//           <Text style={styles.updateButtonText}>UPDATE PROFILE</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerCard: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     margin: 14,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#811717',
//     marginLeft: 10,
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#ccc',
//   },
//   addPhoto: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   addPhotoText: {
//     color: '#4169E1',
//     marginRight: 4,
//     fontSize: 13,
//   },
//   inputSection: {
//     paddingHorizontal: 14,
//   },
//   input: {
//     borderWidth: 1.5,
//     borderColor: '#F04F65',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 15,
//     marginBottom: 15,
//   },
//   bottomButton: {
//     marginTop: 60,
//     paddingHorizontal: 14,
//   },
//   updateButton: {
//     backgroundColor: '#811717',
//     paddingVertical: 16,
//     borderRadius: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     elevation: 5,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 15,
//     textTransform: 'uppercase',
//   },
// });

// export default EditProfile;



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Platform,
//   Alert,
//   AppState,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import {
//   launchImageLibrary,
//   ImagePickerResponse,
//   ImageLibraryOptions,
// } from 'react-native-image-picker';
// import { useAuth } from '../context/AuthContext';
// import { updateUserProfile } from '../api/user';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// type RootStackParamList = {
//   EditProfile: undefined;
// };

// type EditProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

// // Placeholder function for photo upload
// const uploadDocument = async (formData: FormData): Promise<void> => {
//   // Add real implementation here
//   console.log('Uploading photo...', formData);
// };

// const EditProfile: React.FC = () => {
//   const navigation = useNavigation<EditProfileNavigationProp>();
//   const { userData, updateProfile } = useAuth();
//   const [name, setName] = useState(userData.name);
//   const [phone, setPhone] = useState(userData.phone);
//   const [email, setEmail] = useState(userData.email || '');
//   const [city, setCity] = useState(userData.city || '');
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     if (Platform.OS !== 'web') {
//       // Permissions handled by react-native-image-picker
//     }
//   }, []);

//   const pickImage = async () => {
//     const options: ImageLibraryOptions = {
//       mediaType: 'photo',
//       quality: 0.8,
//     };
//     const result: ImagePickerResponse = await launchImageLibrary(options);

//     if (!result.didCancel && result.assets && result.assets.length > 0) {
//       setPhoto(result.assets[0].uri || null);
//     }
//   };

//   const validateInputs = () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Name is required');
//       return false;
//     }
//     if (!phone || !/^\+?\d{10,12}$/.test(phone)) {
//       Alert.alert('Error', 'Valid phone number is required');
//       return false;
//     }
//     if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       Alert.alert('Error', 'Valid email is required');
//       return false;
//     }
//     return true;
//   };

//   const handleUpdateProfile = async () => {
//     if (!validateInputs())
//       {
//         return;
//       }

//     setIsUpdating(true);
//     try {
//       const profileData: { name?: string; phone?: string; email?: string; city?: string } = {
//         name,
//         phone,
//         email,
//         city,
//       };

//       await updateUserProfile(profileData);

//       if (photo) {
//         const formData = new FormData();
//         formData.append('photo', {
//           uri: photo,
//           name: `profile_${Date.now()}.jpg`,
//           type: 'image/jpeg',
//         } as any);
//         await uploadDocument(formData);
//       }

//       await updateProfile({ name, phone, email, city });

//       if (AppState.currentState === 'active') {
//         Alert.alert('Success', 'Profile updated successfully!');
//       }
//       navigation.goBack();
//     } catch (error: any) {
//       console.error('Update Profile Error:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       if (AppState.currentState === 'active') {
//         Alert.alert(
//           'Error',
//           error.response?.data?.message || 'Failed to update profile. Please try again.'
//         );
//       }
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerCard}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={20} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Profile</Text>
//         </View>
//       </View>

//       <View style={styles.avatarContainer}>
//         <Image
//           style={styles.avatar}
//           source={
//             photo
//               ? { uri: photo }
//               : require('../../assets/car1.png') // Replace with actual placeholder
//           }
//         />
//         <TouchableOpacity style={styles.addPhoto} onPress={pickImage}>
//           <Text style={styles.addPhotoText}>Add photo</Text>
//           <Ionicons name="pencil" size={14} color="#4169E1" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputSection}>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="City"
//           value={city}
//           onChangeText={setCity}
//         />
//       </View>

//       <View style={styles.bottomButton}>
//         <TouchableOpacity
//           style={[styles.updateButton, isUpdating && styles.disabledButton]}
//           onPress={handleUpdateProfile}
//           disabled={isUpdating}
//         >
//           <Text style={styles.updateButtonText}>
//             {isUpdating ? 'UPDATING...' : 'UPDATE PROFILE'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerCard: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     margin: 14,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#811717',
//     marginLeft: 10,
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#ccc',
//   },
//   addPhoto: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   addPhotoText: {
//     color: '#4169E1',
//     marginRight: 4,
//     fontSize: 13,
//   },
//   inputSection: {
//     paddingHorizontal: 14,
//   },
//   input: {
//     borderWidth: 1.5,
//     borderColor: '#F04F65',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 15,
//     marginBottom: 15,
//   },
//   bottomButton: {
//     marginTop: 60,
//     paddingHorizontal: 14,
//   },
//   updateButton: {
//     backgroundColor: '#811717',
//     paddingVertical: 16,
//     borderRadius: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     elevation: 5,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 15,
//     textTransform: 'uppercase',
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
// });

// export default EditProfile;





import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
  AppState,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, uploadDocument } from '../api/user';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EditProfile: undefined;
};

type EditProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { userData, updateProfile } = useAuth();
  const [name, setName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phone);
  const [email, setEmail] = useState(userData.email || '');
  const [city, setCity] = useState(userData.city || '');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Permissions handled by react-native-image-picker
    }
  }, []);

  const pickImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };
    const result: ImagePickerResponse = await launchImageLibrary(options);

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri || null);
    }
  };

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return false;
    }
    if (!phone || !/^\+?\d{10,12}$/.test(phone)) {
      Alert.alert('Error', 'Valid phone number is required');
      return false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Valid email is required');
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsUpdating(true);
    try {
      const profileData: { name?: string; phone?: string; email?: string; city?: string } = {
        name,
        phone,
        email,
        city,
      };

      // Update profile on backend
      const updateResponse = await updateUserProfile(profileData);

      let photoUrl = userData.photoUrl;
      if (photo) {
        const formData = new FormData();
        const photoName = `profile_${Date.now()}.jpg`;
        formData.append('photo', {
          uri: photo,
          name: photoName,
          type: 'image/jpeg',
        } as any);
        const uploadResponse = await uploadDocument(formData);
        // Assuming backend returns the photo URL or path
        photoUrl = uploadResponse.photoUrl || `/uploads/${photoName}`;
      }

      // Update local state with all profile data, including photoUrl
      await updateProfile({ name, phone, email, city, photoUrl });

      if (AppState.currentState === 'active') {
        Alert.alert('Success', 'Profile updated successfully!');
      }
      navigation.goBack();
    } catch (error: any) {
      console.error('Update Profile Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      if (AppState.currentState === 'active') {
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Failed to update profile. Please try again.'
        );
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Profile</Text>
        </View>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={
            photo
              ? { uri: photo }
              : userData.photoUrl
              ? { uri: `http://10.0.2.2:5000${userData.photoUrl}` } // Adjust for physical device if needed
              : require('../../assets/car1.png')
          }
        />
        <TouchableOpacity style={styles.addPhoto} onPress={pickImage}>
          <Text style={styles.addPhotoText}>Add photo</Text>
          <Ionicons name="pencil" size={14} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={[styles.updateButton, isUpdating && styles.disabledButton]}
          onPress={handleUpdateProfile}
          disabled={isUpdating}
        >
          <Text style={styles.updateButtonText}>
            {isUpdating ? 'UPDATING...' : 'UPDATE PROFILE'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerCard: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    margin: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006400',
    marginLeft: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  addPhoto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addPhotoText: {
    color: '#4169E1',
    marginRight: 4,
    fontSize: 13,
  },
  inputSection: {
    paddingHorizontal: 14,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#006400',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 15,
  },
  bottomButton: {
    marginTop: 60,
    paddingHorizontal: 14,
  },
  updateButton: {
    backgroundColor: '#006400',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default EditProfile;
  