
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/navigation'; // Adjust path as necessary
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
 
  const { isLoggedIn, userData, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const[token, setToken] = React.useState<string | null>(null);

  const fetchToken = async () => {
    await AsyncStorage.getItem('authToken').then((value) => {
      
      setToken(value);
    }
    ).catch((error) => {
      console.error('Error fetching token:', error);
    });
  }

  useEffect(() => {
    fetchToken();
  })
  const commonItems = [
    { icon: 'settings-outline', label: 'Settings', screen: 'Settings' },
    { icon: 'star-outline', label: 'Ratings & Reviews', screen: 'RatingsReview' },
   
  ];

 
  const authOnlyItems = [
    { icon: 'person-outline', label: 'Edit Profile', screen: 'EditProfile' },
    { icon: 'document-outline', label: 'Documents', screen: 'Documents' },
    { icon: 'gift-outline', label: 'Loyalty Rewards', screen: 'LoyaltyRewards' },
  ];

  const handleLogout = () => {
    logout();
    AsyncStorage.removeItem('authToken'); // Clear token on logout
    setToken(null); // Update local state
    // Redirect to login screen 
    navigation.navigate({ name: 'Login', params: {} });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileCard}>
          <Image
            source={
              isLoggedIn && userData.photoUrl
                ? { uri: `https://car-rent-server-three.vercel.app/${userData.photoUrl}` } // Adjust for physical device if needed
                : require('../../assets/car1.png')
            }
            style={styles.avatar}
          />
          <Text style={styles.nameText}>{isLoggedIn ? userData.name : 'Guest'}</Text>
          <Text style={styles.phoneText}>
            {isLoggedIn ? userData.phone : 'Please log in to view details'}
          </Text>

          {token && (
            <View style={styles.loyaltyContainer}>
              <Ionicons name="gift-outline" size={20} color="#006400" />
              <Text style={styles.loyaltyText}>
                Loyalty Rewards: {userData.loyaltyPoints} Points
              </Text>
            </View>
          )}
       {/* Remove comment after play store(chandan) */}

          {!token && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate({ name: 'Login', params: {} })}
            >
              <Text style={styles.loginButtonText}>Log In / Sign Up</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.menuContainer}>
          {token &&
            authOnlyItems.map((item:any, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen)} // Adjust screen name as necessary  
              >
                <Ionicons name={item.icon} size={22} color="#006400" />
                <Text style={styles.menuText}>{item.label}</Text>
                <Ionicons name="chevron-forward-outline" size={18} color="#ccc" />
              </TouchableOpacity>
            ))}

        
            <TouchableOpacity
         
              style={styles.menuItem}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name={"settings-outline"} size={22} color="#86a686" />
              <Text style={styles.menuText}>Settings</Text>
              <Ionicons name="chevron-forward-outline" size={18} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
                       style={styles.menuItem}
              onPress={() => navigation.navigate('RatingsReview')}
            >
              <Ionicons name={"settings-outline"} size={22} color="#86a686" />
              <Text style={styles.menuText}>Rating & Reviews</Text>
              <Ionicons name="chevron-forward-outline" size={18} color="#ccc" />
            </TouchableOpacity>

            {token &&
            <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('BookedCar')}
            >
              <Ionicons name={"settings-outline"} size={22} color="#86a686" />
              <Text style={styles.menuText}>Booked Cars</Text>
              <Ionicons name="chevron-forward-outline" size={18} color="#ccc" />

            </TouchableOpacity>
}
      
        </View>

        {token && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#86a686" />
            <Text style={styles.logoutText}>LOG OUT</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.version}>V01.21</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006400',
    alignSelf: 'center',
    marginVertical: 10,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  phoneText: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  loyaltyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  loyaltyText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: 12,
    backgroundColor: '#006400',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  logoutText: {
    marginLeft: 8,
    color: '#811717',
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 12,
    marginTop: 24,
    marginBottom: 16,
  },
});

export default ProfileScreen;
