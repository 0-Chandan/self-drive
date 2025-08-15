import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, TextInput, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../constant/Base_Url';

type RootStackParamList = {
  CarDetails: { carId: number };
  Login: undefined;
};

type MyTripsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Trip = {
  id: number;
  Name: string;
  date: string;
  price: number;
  status: string;
  images: { url: string };
  rating?: number;
  reviews?: number;
  distance?: number;
  ac: boolean;
  seats: number;
  fuel: string;
  transmission: string;
  pricePerDay: number;
  pricePerKm: number;
  driverCharge: number;
  location: string;
  latitude: number;
  longitude: number;
  benefits: string;
  cancellationPolicy: string;
  convenienceFee: number;
  deposit: number;
  number: string;
  tripProtectionFee: number;
};

const { height } = Dimensions.get('window');

const MyTripsScreen: React.FC = () => {
  const navigation = useNavigation<MyTripsNavigationProp>();
  const { isLoggedIn } = useAuth();
  const insets = useSafeAreaInsets();
  const [token, setToken] = useState<string>('');
  const [carDetails, setCarDetails] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Filter state
  const [filters, setFilters] = useState({
    ac: false,
    seats: 5,
    available: true,
    pricePerKmMax: 50,
    pricePerDayMax: 200,
    driverChargeMax: 50,
    sortBy: 'pricePerDay' as const,
    sortOrder: 'asc' as const,
    typeId: '',
    homeDelivery: false,
    suv: false,
    recentlyViewed: false,
  });

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('authToken');
      if (value !== null) {
        setToken(value);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const fetchCarDetails = useCallback(async (pageNum: number, search: string) => {
    setIsLoading(true);
    try {
      const url = `${baseURL}/vehicles?page=${pageNum}&limit=10&ac=${filters.ac}&available=${filters.available}&pricePerKmMax=${filters.pricePerKmMax}&pricePerDayMax=${filters.pricePerDayMax}&driverChargeMax=${filters.driverChargeMax}&sortBy=${filters.sortBy}&sortOrder=${filters.sortOrder}&typeId=${filters.typeId}&search=${search}`;
      const response = await axios.get(url);
      console.log('Response:', response.data);
      const newCars = response.data.data.cars.map((car: any) => ({
        id: car.id,
        Name: car.name || 'Unknown Car',
        date: car.createdAt || 'N/A',
        price: car.pricePerDay || 0,
        status: car.available ? 'Available' : 'Unavailable',
        images: { url: car.images?.url || 'https://via.placeholder.com/100' },
        rating: car.rating || 4.5,
        reviews: car.reviews || 3,
        distance: car.distance || 5.5,
        ac: car.ac || false,
        //seats: car.seats || 5,
        number:car?.number,
        fuel: car.fuel || 'N/A',
        transmission: car.transmission || 'N/A',
        pricePerDay: car.pricePerDay || 0,
        pricePerKm: car.pricePerKm || 0,
        driverCharge: car.driverCharge || 0,
        benefits: car.benefits || 'N/A',
      
        deposit: car.deposit || 0,
        tripProtectionFee: car.tripProtectionFee || 0,
      }));
      setCarDetails(prev => (pageNum === 1 ? newCars : [...prev, ...newCars]));
      setHasMore(newCars.length > 0);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch car details');
      console.error('Error fetching car details:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const handleSearch = (query: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setPage(1);
      fetchCarDetails(1, query);
    }, 500);
  };

  const applyFilter = (filterType: keyof typeof filters) => {
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: !prev[filterType] };
      setPage(1);
      fetchCarDetails(1, searchQuery);
      return newFilters;
    });
  };

  useEffect(() => {
    getToken();
    fetchCarDetails(1, '');
  }, [fetchCarDetails]);

  useEffect(() => {
    handleSearch(searchQuery);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  const handleScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const { contentOffset } = nativeEvent;
    if (contentOffset.y <= 0 && !isLoading) {
      setPage(1);
      fetchCarDetails(1, searchQuery);
    }
    const { layoutMeasurement, contentSize } = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 && hasMore && !isLoading) {
      setPage(prev => prev + 1);
      fetchCarDetails(page + 1, searchQuery);
    }
  };

  const dynamicSafeAreaStyle = {
    paddingTop: isLoggedIn ? 6 : insets.top,
    paddingBottom: isLoggedIn ? 10 : insets.bottom,
    backgroundColor: '#f9f9f9',
  };

  return (
    <SafeAreaView style={[styles.safeArea, dynamicSafeAreaStyle]}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View style={styles.header}>
          <Text style={styles.location}>Showing cars at {carDetails[0]?.location || 'N/A'}...</Text>
          <Text style={styles.date}>05 Aug 1:13PM - 6PM</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Daily Drives</Text>
          <Text style={styles.subtitle}>Everyday bookings made quick and easy</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for model, features, etc"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Sort By</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filters.ac && styles.selectedFilter]}
            onPress={() => applyFilter('ac')}
          >
            <Text style={styles.filterText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filters.homeDelivery && styles.selectedFilter]}
            onPress={() => applyFilter('homeDelivery')}
          >
            <Text style={styles.filterText}>Home Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filters.suv && styles.selectedFilter]}
            onPress={() => applyFilter('suv')}
          >
            <Text style={styles.filterText}>SUV</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filters.recentlyViewed && styles.selectedFilter]}
            onPress={() => applyFilter('recentlyViewed')}
          >
            <Text style={styles.filterText}>Recently Viewed</Text>
          </TouchableOpacity>
        </ScrollView>
        <Text style={styles.sectionTitle}>4+ Rated Cars Within 10 KMs</Text>
        {isLoading && carDetails.length === 0 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#006400" />
            <Text style={styles.loaderText}>Loading cars...</Text>
          </View>
        ) : (
          carDetails.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={styles.tripCard}
              onPress={() => navigation.navigate('CarDetails', { carId: trip.id })}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: trip.images.url }}
                style={styles.tripImage}
                //defaultSource={require('../../assets/banner.png')}
              />
              <View style={styles.tripInfo}>
                <Text style={styles.carName}>{trip.Name}</Text>
                <Text style={styles.carDetailsText}>{trip.transmission} • {trip.fuel}</Text>
                <Text style={styles.distance}>No:{trip.number}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>{trip.rating} ({trip.reviews})</Text>
                  <Text style={styles.ratingStatus}>Excellent</Text>
                </View>
        
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>₹{trip.pricePerDay}/day</Text>
                  <Text style={styles.totalPrice}> ₹{(trip.pricePerDay + trip.convenienceFee + trip.tripProtectionFee + trip.driverCharge).toFixed(2)} total</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        {isLoading && carDetails.length > 0 && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#006400" />
            <Text style={styles.loaderText}>Loading more cars...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  titleContainer: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#006400',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sortButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  sortText: {
    fontSize: 14,
    color: '#666',
  },
  filterContainer: {

    padding: 16,
    
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedFilter: {
    backgroundColor: '#006400',
    borderColor: '#006400',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    position: 'relative',
  },
  tripImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  tripInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  carName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#006400',
  },
  carDetailsText: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#006400',
    marginRight: 8,
  },
  ratingStatus: {
    fontSize: 12,
    color: '#28a745',
  },
  distance: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#900',
  },
  totalPrice: {
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
  },
  favoriteText: {
    color: '#fff',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#006400',
  },
});

export default MyTripsScreen;