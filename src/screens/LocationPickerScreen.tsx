import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: { screen: string; params?: { location: string } };
};

type LocationPickerNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const dummyLocations = [
  {
    name: 'Majestic Bus Stand Ratu',
    address: 'XHGC+WKM, KEMPGOWDA, gandhi nagar, jharkhand, india. 835269',
  },
  {
    name: 'Majestic Bus Stand Ratu',
    address: 'XHGC+WKM, KEMPGOWDA, gandhi nagar, jharkhand, india. 835269',
  },
  {
    name: 'Majestic Bus Stand Ratu',
    address: 'XHGC+WKM, KEMPGOWDA, gandhi nagar, jharkhand, india. 835269',
  },
];

const LocationPickerScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<LocationPickerNavigationProp>();

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      console.log('Navigating with location:', searchQuery);
      navigation.navigate('Main', {
        screen: 'Home',
        params: { location: searchQuery.trim() },
      });
    }
  };

  const handleLocationSelect = (locationName: string) => {
    console.log('Navigating with location:', locationName);
    navigation.navigate('Main', {
      screen: 'Home',
      params: { location: locationName },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="done"
        />
        <Ionicons name="search" size={24} color="#900" style={styles.searchIcon} />
      </View>

      <TouchableOpacity style={styles.currentLocationBtn}>
        <MaterialIcons name="my-location" size={20} color="#900" />
        <Text style={styles.currentLocationText}>CURRENT LOCATION</Text>
      </TouchableOpacity>

      <Text style={styles.suggestedTitle}>SUGGESTED LOCATIONS</Text>

      <ScrollView style={styles.listContainer}>
        {dummyLocations.map((loc, i) => (
          <TouchableOpacity
            key={i}
            style={styles.locationCard}
            onPress={() => handleLocationSelect(loc.name)}
          >
            <Ionicons name="location-outline" size={24} color="#900" />
            <View style={styles.locationDetails}>
              <Text style={styles.locationName}>{loc.name}</Text>
              <Text style={styles.locationAddress}>{loc.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#900',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: { flex: 1, height: 40 },
  searchIcon: { marginLeft: 8 },
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  currentLocationText: {
    marginLeft: 10,
    color: '#900',
    fontWeight: 'bold',
  },
  suggestedTitle: {
    fontSize: 12,
    color: '#900',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 10,
  },
  listContainer: { flexGrow: 0 },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  locationDetails: { marginLeft: 10, flex: 1 },
  locationName: { fontWeight: 'bold', color: '#900' },
  locationAddress: { fontSize: 12, color: '#444' },
});

export default LocationPickerScreen;
