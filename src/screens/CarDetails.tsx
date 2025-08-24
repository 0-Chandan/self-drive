import React, { use, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, FlatList,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import PriceBreakup from './PriceBreakup';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../constant/Base_Url';


type CarDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;
type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

interface CarData {
  id: number;
  name: string;
  number: string;
  typeId: number;
  fuel: string;
  transmission: string;
  ac: boolean;
  seats: number;
  available: boolean;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  features: string | null;
  benefits: string | null;
  cancellationPolicy: string;
  pricePerKm: number;
  pricePerDay: number;
  driverCharge: number;
  convenienceFee: number;
  tripProtectionFee: number;
  deposit: number | null;
  images: { url: string; public_id: string };
  rating?: number;
}

interface SimilarCar {
  id: number;
  name: string;
  pricePerday: number;
  transmission: string;
  fuel: string;
  seats: number;
  imageUrl: string;
}

const { width } = Dimensions.get('window');

const CarDetails: React.FC = () => {
  const route = useRoute<CarDetailsRouteProp>();
  const navigation = useNavigation<CarDetailsNavigationProp>();
  const { isLoggedIn } = useAuth();
  const { carId, startDate, endDate, isWithDriver } = route.params || { carId: 1 };
  const [isPriceBreakupOpen, setIsPriceBreakupOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [carDetails, setCarDetails] = useState<CarData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [similarCars, setSimilarCars] = useState<SimilarCar[]>([]);
  const[issimilar, setIsSimilar] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const getToken = async () => {
    const value = await AsyncStorage.getItem('authToken');
    setToken(value);
  };

  const getuserid = async () => {
    const value = await AsyncStorage.getItem('user');
    const user = value ? JSON.parse(value) : null;
    if (value !== null) {
      setUserId(parseInt(user.id)); 
  };
  }

  const fetchCarDetails = () => {
    setIsLoading(true);
    setError(null);
    axios
      .get(`${baseURL}/vehicles/${carId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, // Uncomment if token is required
        },
      })
      .then((response) => {
        const data = response.data.data;
        console.log('Car details fetched:', data);
        if (!data) {
          setError('Car not found');
          return;
        }
        setCarDetails({
          id: data.id,
          name: data.name,
          number: data.number,
          typeId: data.typeId,
          fuel: data.fuel,
          transmission: data.transmission,
          ac: data.ac,
          seats: data.seats,
          available: data.available,
          location: data.location || 'Not specified',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          features: data.features,
          benefits: data.benefits || 'No benefits specified',
          cancellationPolicy: data.cancellationPolicy,
          pricePerKm: data.pricePerKm,
          pricePerDay: data.pricePerDay,
          driverCharge: data.driverCharge,
          convenienceFee: data.convenienceFee,
          tripProtectionFee: data.tripProtectionFee,
          deposit: data.deposit || 0,
          images: data.images,
          rating: 4.5, // Default rating; replace with API data if available
        });
      })
      .catch((err) => {
        setError('Failed to fetch car details');
        console.log('Error fetching car details:', err);
      })
      .finally(() => setIsLoading(false));
  };

  const getSimilarCars = async () => {
    try {
      const response = await axios.get(`${baseURL}/vehicles?page=1&limit=4`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, // Uncomment if token is required
        },
      });
      console.log('Similar cars fetched:', response.data.data);
      setSimilarCars(response.data.data.cars.map((car: any) => ({
        id: car.id,
        name: car.name,
        pricePerday: car.pricePerDay,
        transmission: car.transmission,
        fuel: car.fuel,
        seats: car.seats,
        imageUrl: car.images?.url || 'https://via.placeholder.com/300',
      })));
    } catch (err) {
      console.log('Error fetching similar cars:', err);
    }
  };

  useEffect(() => {
    getToken();
      fetchCarDetails();
      getSimilarCars();
      getuserid();
   
  }, [isLoggedIn, token,issimilar]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())) return 'Invalid Date';
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())) return '';
    const date = new Date(dateStr);
    return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  };

  const handleButtonPress = () => {
   
      // navigation.navigate('Login', {
      //   redirectTo: { screen: 'CarDetails', params: { carId, startDate, endDate, isWithDriver } },
      // });
       if(!userId){
          Alert.alert(
            'Login Required',
            'You need to log in to book a driver.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Log In',
                onPress: () => navigation.navigate('Login', { redirectTo: { screen: 'CarDetails', params: { carId, startDate, endDate, isWithDriver } } }),
              },
            ],
            { cancelable: false }
          );
          return;
        }
   if (carDetails) {
      navigation.navigate('Payment', {
        carId: carDetails.id,
        carName: carDetails.name,
        price: Number(carDetails.pricePerDay),
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || new Date().toISOString(),
        isWithDriver,
      });
    }
  };

  const handleViewSimilarCar = (similarCarId: number) => {
    setIsSimilar(issimilar => !issimilar);
    navigation.navigate('CarDetails', {
      carId: similarCarId,
      startDate,
      endDate,
      isWithDriver,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!carDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Car not found.</Text>
      </View>
    );
  }

  const images = [carDetails.images].map((img, index) => ({ id: index + 1, url: img.url }));

  const reviews = [
    {
      id: 1,
      name: 'Amit Kumar',
      rating: 4.5,
      date: '06 Aug 2025 | 12:26 PM',
      text: 'Great experience with the Toyota Camry! Very comfortable and easy to book.',
    },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerCard}>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item.url }} style={styles.carImage} resizeMode="cover" />
            )}
            style={styles.imageScroll}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.carName}>
              {carDetails.name} <Ionicons name="star" size={16} color="#900" />
              <Text style={styles.ratingText}> {carDetails.rating} (12)</Text>
            </Text>
            <Text style={styles.carDetails}>{`${carDetails.transmission} | ${carDetails.fuel} | ${carDetails.seats} Seats`}</Text>
            <Text style={styles.locationText}>Location: {carDetails.location}</Text>
            <Text style={styles.carPrice}>Vehicle NO: {carDetails.number}</Text>
            <View style={styles.dateBox}>
              <Text style={styles.dateBoxText}>₹{carDetails.pricePerDay}/day</Text>
              <Text style={styles.dateBoxText}>
                {`${formatDate(startDate)} - ${formatDate(endDate)} | ${formatTime(startDate)} - ${formatTime(endDate)}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cancellation</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>{carDetails.cancellationPolicy}</Text>
            <View style={styles.badge} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feature</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>{carDetails.features || 'No features specified'},</Text>
            {carDetails.ac ? (
              <Text style={styles.featureText}>AC</Text>
            ) : (
              <Text style={styles.featureText}>Non-AC</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>
                  {review.name} <Ionicons name="star" size={16} color="#900" />
                  <Text style={styles.ratingText}> {review.rating}</Text>
                </Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.similarsection}>
          <Text style={styles.sectionTitle}>Similar Cars</Text>
          <FlatList
            data={similarCars}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.similarCarCard}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.similarCarImage}
                  resizeMode="cover"
                />
                <View style={styles.similarCarInfo}>
                  <Text style={styles.carName}>{item.name}</Text>
                  <Text style={styles.carPrice}>₹{item.pricePerday}/day</Text>
                  <Text style={styles.carDetails}>
                    {`${item.transmission} | ${item.fuel} | ${item.seats} Seats`}
                  </Text>
                  <TouchableOpacity style={styles.viewButton} onPress={() => handleViewSimilarCar(item.id)}>
                    <Text style={styles.viewButtonText}>VIEW</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            style={styles.carousel}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          {['How do I book a car?', 'How do I cancel a car?', 'What are the payment options?'].map((faq, index) => (
            <TouchableOpacity key={index} style={styles.faqItem}>
              <Text style={styles.faqText}>{faq}</Text>
              <Ionicons name="chevron-forward" size={16} color="#900" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerPrice}>₹{carDetails.pricePerDay}/day</Text>
          <TouchableOpacity onPress={() => setIsPriceBreakupOpen(true)}>
            <Text style={styles.priceBreakupLink}>View Price Breakup</Text>
          </TouchableOpacity>
        </View>
        {
          carDetails.available ?
        <TouchableOpacity style={styles.proceedButton} onPress={handleButtonPress}>
          <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.notavailablebutton}>
          <Text style={styles.proceedButtonText}>Not Available</Text>
        </TouchableOpacity>
      }
      </View>
      {isPriceBreakupOpen && carDetails && (
        <PriceBreakup
          visible={isPriceBreakupOpen}
          onClose={() => setIsPriceBreakupOpen(false)}
          pricingDetails={{
            pricePerDay: carDetails.pricePerDay,
            driverCharge: isWithDriver ? carDetails.driverCharge : 0,
            deposit: carDetails.deposit || 0,
            convenienceFee: carDetails.convenienceFee,
            tripProtectionFee: carDetails.tripProtectionFee,
            startDate,
            endDate,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: 16 },
  errorText: { color: '#900', fontSize: 16, textAlign: 'center', marginTop: 20 },
  loginButton: {
    backgroundColor: '#006400',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imageScroll: { width: '100%', height: 200 },
  carImage: {
    width: width - 32,
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginRight: 8,
  },
  headerInfo: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  carName: { fontWeight: 'bold', fontSize: 20, color: '#006400' },
  ratingText: { fontSize: 14, color: '#900', marginLeft: 4 },
  carDetails: { fontSize: 14, color: '#555', marginVertical: 4 },
  locationText: { fontSize: 12, color: '#666', marginBottom: 8 },
  carPrice: { fontSize: 16, fontWeight: 'bold', color: '#006400' },
  dateBox: {
    backgroundColor: '#006400',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  dateBoxText: { color: '#fff', fontSize: 12 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    marginVertical: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, color: '#006400', marginBottom: 12 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  featureText: { fontSize: 14, color: '#333', flex: 1 },
  badge: {
    width: 12,
    height: 12,
    backgroundColor: '#006400',
    borderRadius: 6,
    marginLeft: 8,
  },
  reviewCard: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  reviewName: { fontSize: 14, color: '#000', fontWeight: '500' },
  reviewDate: { fontSize: 12, color: '#666' },
  reviewText: { fontSize: 14, color: '#333', marginTop: 4 },
  similarsection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 250,
    elevation: 5,
    marginVertical: 12, 
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  similarCarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    marginRight: 8,
    padding: 8,
    height:"90%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: width * 0.8, // Fixed width for carousel items
  },
  similarCarImage: { width: 120, height: 100, borderRadius: 8 },
  similarCarInfo: { flex: 1, marginLeft: 12 },
  viewButton: {
    backgroundColor: '#006400',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  viewButtonText: { color: '#fff', fontSize: 12 },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  faqText: { fontSize: 14, color: '#333' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  footerLeft: { flexDirection: 'column' },
  footerPrice: { fontWeight: 'bold', fontSize: 20, color: '#006400' },
  priceBreakupLink: { fontSize: 14, color: '#900', textDecorationLine: 'underline', marginTop: 6 },
  proceedButton: {
    backgroundColor: '#006400',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  proceedButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  notavailablebutton: {
     backgroundColor: '#640f00ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  carousel: { width: '100%', height: 150 },
});

export default CarDetails;