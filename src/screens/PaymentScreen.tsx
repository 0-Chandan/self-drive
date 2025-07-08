import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput ,Alert} from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Payment: { carId: number; carName: string; price: string; startDate: string; endDate: string;};
  Main: { screen: string };
};

type PaymentNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;
type PaymentRouteProp = RouteProp<RootStackParamList, 'Payment'>;

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation<PaymentNavigationProp>();
  const route = useRoute<PaymentRouteProp>();
  const { carName, price, startDate, endDate } = route.params;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatDate = (dateStr: string) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())){
      return 'Invalid Date';
    }
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
  };

  const handlePayment = () => {
    if (!paymentMethod || !cardNumber || !expiryDate || !cvv) {
      Alert.alert('Please fill all payment details');
      return;
    }
    Alert.alert('Payment Successful!');
    navigation.navigate('Main', { screen: 'My Trips' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment</Text>
      </View>

      <View style={styles.tripDetails}>
        <Text style={styles.carName}>{carName}</Text>
        <Text style={styles.tripDate}>
          {`${formatDate(startDate)} - ${formatDate(endDate)}`}
        </Text>
        <Text style={styles.tripPrice}>{price}</Text>
      </View>

      <View style={styles.paymentMethods}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {['Credit Card', 'Debit Card', 'UPI'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.methodButton,
              paymentMethod === method && styles.methodButtonSelected,
            ]}
            onPress={() => setPaymentMethod(method)}
          >
            <Text style={styles.methodText}>{method}</Text>
            {paymentMethod === method && (
              <Ionicons name="checkmark-circle" size={20} color="#811717" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.paymentForm}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          maxLength={16}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={setExpiryDate}
            maxLength={5}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>PAY NOW</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#811717' },
  tripDetails: { padding: 16 },
  carName: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  tripDate: { fontSize: 14, color: '#666', marginVertical: 4 },
  tripPrice: { fontSize: 16, fontWeight: 'bold', color: '#811717' },
  paymentMethods: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  methodButtonSelected: { borderColor: '#811717' },
  methodText: { flex: 1, fontSize: 14 },
  paymentForm: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
  inputHalf: { width: '48%' },
  payButton: {
    backgroundColor: '#811717',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
