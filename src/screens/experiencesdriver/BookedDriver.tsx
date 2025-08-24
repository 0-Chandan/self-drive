import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, Alert, ActivityIndicator, Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { baseURL } from '../../constant/Base_Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';


type RootStackParamList = {
  Payment: { driverId: number, name: string,price:number };
  Main: { screen: string };
};

type PaymentNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentRouteProp = RouteProp<RootStackParamList, 'Payment'>;

const BookedDriver: React.FC = () => {
  const navigation = useNavigation<PaymentNavigationProp>();
  const route = useRoute<PaymentRouteProp>();
  const {driverId, name, price} = route.params;


  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [pickupDate, setPickupDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [selecting, setSelecting] = useState<'pickup' | 'return' | null>(null);
  const [driver, setDriver] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const[address, setAddress] = useState<string>('');
    const[paymentid,setPaymentid] = useState<String>('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: ''
  });
  const[hour, setHour] = useState<number>(1);


  const fetchCustomerId = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      const user = value ? JSON.parse(value) : null;
      if (value !== null) {
        setCustomerId(parseInt(user.id));
      }
    } catch (error) {
      console.error('Error fetching customer ID:', error);
    }
  }

  useEffect(() => {
    fetchCustomerId();
  }, []);
    const handlerazorpay = () =>{

    var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'INR',
    key: 'rzp_test_Wj7tv57Xhk19Qj',
    amount: price*100,
    name: 'Acme Corp',
    order_id: '',//Replace this with an order_id created using Orders API.
    prefill: {
      email: 'gaurav.kumar@example.com',
      contact: '+919876543210',
      name: 'Gaurav Kumar'
    },
    theme: {color: '#53a20e'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
   
    console.log("data",data)
    setPaymentid(data?.razorpay_payment_id)
    Alert.alert(`Success: ${data.razorpay_payment_id}`);
   
      postthrazorpay(data.razorpay_payment_id);
    
  }).catch((error) => {
    // handle failure
    postthrazorpay();
    Alert.alert(`Error: ${error.code} | ${error.description}`);
  });
  }


   const postthrazorpay=(paymentId?:string) =>{
    setLoading(true);
    const payload = {
      customerId,
      driverId,
      pickupDate: pickupDate.toString(),
      returnDate: returnDate.toString(),
      amount: price*hour,
      driver,
      paymentMethod,
      address,
      razarPayId:paymentId||"",
    PaymentStatus:paymentid?"Paid":"Failed"
      
    }
    axios.post(`${baseURL}/driver-booking/create`, payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setLoading(false);
      Alert.alert('Success', 'Booking successful!');
      navigation.navigate('Main', { screen: ' DriverDetails' });
    }).catch((err) => {
      setLoading(false);
      Alert.alert('Error', err.response?.data.message || 'Booking failed!');
    });
  }

  const postdata = () => {
    setLoading(true);
    const payload = {
      customerId,
      driverId: driverId,
      pickupDate: pickupDate.toString(),
      returnDate: returnDate.toString(),
      amount: price*hour,
      paymentMethod,
      address
    }
    console.log("payload",payload);
    axios.post(`${baseURL}/driver-booking/create`, payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setLoading(false);
      Alert.alert('Success', 'Booking successful!');
      navigation.navigate('Main', { screen: 'Home' });
    }).catch((err) => {
      setLoading(false);
      Alert.alert('Error', err.response?.data.message || 'Booking failed!');
    });
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())) {
      return 'Invalid Date';
    }
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
  };

  const handlePayment = () => {
    if (!pickupDate || !returnDate || !paymentMethod || !hour) {
      Alert.alert('⚠️ Please select pickup, return date , payment method and hour');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    if (pickup < today) {
      Alert.alert('⚠️ Invalid Pickup Date', 'Pickup date cannot be before today.');
      return;
    }

    if (returnD < pickup) {
      Alert.alert('⚠️ Invalid Return Date', 'Return date must be the same or after pickup date.');
      return;
    }

if(paymentMethod==='Razapay')
{
  handlerazorpay();
}
    postdata();
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '').substring(0, 16);
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '').substring(0, 4);
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    }
    return cleaned;
  };

  return (
    <>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Booking & Payment</Text>
      </View>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Car Info Card */}
      <View style={styles.carCard}>
        <View style={styles.carInfo}>
          <Text style={styles.carName}>{name}</Text>
          <View style={styles.priceRow}>
            <Text >Rs.{price}/hour</Text>
            {/* <Text style={styles.tripDate}>
              {`${formatDate(startDate)} - ${formatDate(endDate)}`}
            </Text> */}
          </View>
        </View>
      </View>

      {/* Date Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Dates</Text>
        <View style={styles.dateRow}>
          <TouchableOpacity 
            style={[styles.dateBox, pickupDate ? styles.selectedDateBox : {}]} 
            onPress={() => setSelecting('pickup')}
          >
            <Ionicons name="calendar" size={20} color="#4CAF50" />
            <Text style={styles.dateLabel}>Pickup Date</Text>
            <Text style={styles.dateValue}>
              {pickupDate ? new Date(pickupDate).toLocaleDateString() : 'Select'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.dateBox, returnDate ? styles.selectedDateBox : {}]} 
            onPress={() => setSelecting('return')}
          >
            <Ionicons name="calendar" size={20} color="#4CAF50" />
            <Text style={styles.dateLabel}>Return Date</Text>
            <Text style={styles.dateValue}>
              {returnDate ? new Date(returnDate).toLocaleDateString() : 'Select'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {selecting && (
        <View style={styles.calendarContainer}>
          <Calendar
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#4CAF50',
              selectedDayBackgroundColor: '#4CAF50',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#4CAF50',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#4CAF50',
              selectedDotColor: '#ffffff',
              arrowColor: '#4CAF50',
              monthTextColor: '#4CAF50',
              indicatorColor: '#4CAF50',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
            onDayPress={(day) => {
              const isoDate = new Date(day.dateString).toISOString();
              if (selecting === 'pickup') setPickupDate(isoDate);
              if (selecting === 'return') setReturnDate(isoDate);
              setSelecting(null);
            }}
          />
        </View>
      )}

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethodContainer}>
          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'Cash' ? styles.selectedPayment : {}]}
            onPress={() => setPaymentMethod('Cash')}
          >
            <Ionicons name="cash" size={24} color="#4CAF50" />
            <Text style={styles.paymentOptionText}>Cash</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'Razapay' ? styles.selectedPayment : {}]}
            onPress={() => setPaymentMethod('Razapay')}
          >
            <Ionicons name="card" size={24} color="#4CAF50" />
            <Text style={styles.paymentOptionText}>Online Payment</Text>
          </TouchableOpacity>
        </View>
      </View>

       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Info</Text>
        <View style={styles.paymentMethodContainer}>
       <TextInput                      
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
        </View>
        <Text>Time in Hours</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter time in hours"
          value={hour.toString()}
          onChangeText={text => setHour(Number(text))}
          keyboardType='numeric'
        />
      </View>

      {/* Card Details (only shown when Razapay is selected) */}
     

      {/* Summary */}
      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxes & Fees</Text>
          <Text style={styles.summaryValue}>Rs.15</Text>
        </View>
        <View style={styles.divider} />
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Rs.{price*hour}</Text>
        </View>
      </View>

      {/* Pay Button */}
      <TouchableOpacity 
        style={[styles.payButton, loading && styles.payButtonDisabled]} 
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>
            {paymentMethod === 'Razapay' ? 'PAY NOW' : 'CONFIRM BOOKING'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  carImage: {
    width: 100,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBox: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateBox: {
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8e9',
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  calendarContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  driverToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverText: {
    fontSize: 16,
    color: '#333',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paymentOption: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedPayment: {
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8e9',
  },
  paymentOptionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  cardForm: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  summarySection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 10,
  },
  totalRow: {
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  payButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookedDriver;