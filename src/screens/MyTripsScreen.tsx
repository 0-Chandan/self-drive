import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  CarDetails: { carId: number };
  Login: undefined;
};

type MyTripsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Trip = {
  id: number;
  carName: string;
  date: string;
  price: string;
  status: string;
  image: any;
};

const trips: Trip[] = [
  {
    id: 1,
    carName: 'Kia Seltos',
    date: '18 Apr 2025 - 19 Apr 2025',
    price: '₹4000',
    status: 'Completed',
    image: require('../../assets/banner.png'),
  },
  {
    id: 2,
    carName: 'Hyundai Creta',
    date: '20 Apr 2025 - 21 Apr 2025',
    price: '₹4500',
    status: 'Upcoming',
    image: require('../../assets/banner.png'),
  },
];

const MyTripsScreen: React.FC = () => {
  const navigation = useNavigation<MyTripsNavigationProp>();
  const { isLoggedIn } = useAuth();
  const insets = useSafeAreaInsets();

  const dynamicSafeAreaStyle = {
    paddingTop: isLoggedIn ? 6 : insets.top,
    paddingBottom: isLoggedIn ? 10 : insets.bottom,
    backgroundColor: isLoggedIn ? '#fff' : '#f67888',
  };

  const dynamicScrollStyle = {
    backgroundColor: dynamicSafeAreaStyle.backgroundColor,
  };

  return (
    <SafeAreaView style={[styles.safeArea, dynamicSafeAreaStyle]}>
      <ScrollView style={[styles.container, dynamicScrollStyle]} contentContainerStyle={styles.contentContainer}>
        {isLoggedIn && (
          <View style={styles.header}>
            <Text style={styles.headerText}>My Trips</Text>
          </View>
        )}

        {isLoggedIn ? (
          trips.length > 0 ? (
            trips.map((trip) => (
              <View key={trip.id} style={styles.tripCard}>
                <Image source={trip.image} style={styles.tripImage} />
                <View style={styles.tripInfo}>
                  <Text style={styles.carName}>{trip.carName}</Text>
                  <Text style={styles.tripDate}>{trip.date}</Text>
                  <Text style={styles.tripPrice}>{trip.price}</Text>
                  <Text style={styles.tripStatus}>{trip.status}</Text>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => navigation.navigate('CarDetails', { carId: trip.id })}
                  >
                    <Text style={styles.viewButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noTrips}>No trips available.</Text>
          )
        ) : (
          <View style={styles.notLoggedInContainer}>
            <Image source={require('../../assets/banner.png')} style={styles.notLoggedInImage} />
            <Text style={styles.notLoggedInText}>Sign In to View Your Trips</Text>
            <Text style={styles.notLoggedInSubText}>Log in to see your past and upcoming trips</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
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
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#811717',
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    margin: 16,
    padding: 12,
  },
  tripImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  tripInfo: {
    flex: 1,
    marginLeft: 12,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  tripPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#900',
  },
  tripStatus: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  viewButton: {
    backgroundColor: '#811717',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  noTrips: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  notLoggedInImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  notLoggedInText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#811717',
    marginBottom: 8,
    textAlign: 'center',
  },
  notLoggedInSubText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#811717',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '70%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyTripsScreen;
