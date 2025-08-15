import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/core';


type RootStackParamList = {
  BookingDetails: { bookingId: number; carName: string; price: string; startDate: string; endDate: string };
  Payment: { carId: number; carName: string; price: string; startDate: string; endDate: string };
  RatingsReview: undefined;
};

type BookingDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookingDetails'>;
type BookingDetailsRouteProp = RouteProp<RootStackParamList, 'BookingDetails'>;

const BookingDetails: React.FC = () => {
  const navigation = useNavigation<BookingDetailsNavigationProp>();
  const route = useRoute<BookingDetailsRouteProp>();
  const { bookingId, carName, price, startDate, endDate } = route.params;

  const formatDate = (dateStr: string): string => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())){
       return 'Invalid Date';
    }
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
  };

  const handlePayment = () => {
    navigation.navigate('Payment', {
      carId: bookingId,
      carName,
      price,
      startDate,
      endDate,
    });
  };

  const handleReview = () => {
    navigation.navigate('RatingsReview');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#811717" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Booking Details</Text>
      </View>
      <Image source={require('../../assets/icon1.png')} style={styles.carImage} />
      <View style={styles.details}>
        <Text style={styles.carName}>{carName}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.date}>
          {`${formatDate(startDate)} - ${formatDate(endDate)}`}
        </Text>
        <Text style={styles.bookingId}>Booking ID: {bookingId}</Text>
      </View>
      <TouchableOpacity style={styles.actionButton} onPress={handlePayment}>
        <Text style={styles.actionButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={handleReview}>
        <Text style={styles.actionButtonText}>Rate & Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#811717', marginLeft: 10 },
  carImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  details: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 15,
    marginBottom: 20,
  },
  carName: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  price: { fontSize: 16, color: '#811717', fontWeight: 'bold', marginVertical: 5 },
  date: { fontSize: 14, color: '#666', marginVertical: 5 },
  bookingId: { fontSize: 14, color: '#666' },
  actionButton: {
    backgroundColor: '#811717',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default BookingDetails;
