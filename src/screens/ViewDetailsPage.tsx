// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RouteProp } from '@react-navigation/core';
// import { useAuth } from '../context/AuthContext';


// type RootStackParamList = {
//   ViewDetails: { carId: number; carName: string; price: string; details: string };
//   Payment: { carId: number; carName: string; price: string; startDate: string; endDate: string };
//   Login: { redirectTo?: { screen: string; params?: any } };
// };

// type ViewDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ViewDetails'>;
// type ViewDetailsRouteProp = RouteProp<RootStackParamList, 'ViewDetails'>;

// const ViewDetailsPage: React.FC = () => {
//   const navigation = useNavigation<ViewDetailsNavigationProp>();
//   const route = useRoute<ViewDetailsRouteProp>();
//   const { isLoggedIn } = useAuth();
//   const { carId, carName, price, details } = route.params;

//   const handleBookNow = () => {
//     if (!isLoggedIn) {
//       navigation.navigate('Login', {
//         redirectTo: { screen: 'Payment', params: { carId, carName, price, startDate: '2025-05-10', endDate: '2025-05-12' } },
//       });
//       return;
//     }
//     navigation.navigate('Payment', {
//       carId,
//       carName,
//       price,
//       startDate: '2025-05-10',
//       endDate: '2025-05-12',
//     });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#811717" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>{carName}</Text>
//       </View>
//       <Image source={require('../../assets/icon1.png')} style={styles.carImage} />
//       <View style={styles.details}>
//         <Text style={styles.price}>{price}</Text>
//         <Text style={styles.detailsText}>{details}</Text>
//       </View>
//       <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
//         <Text style={styles.bookButtonText}>Book Now</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 20 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: { fontSize: 20, fontWeight: 'bold', color: '#811717', marginLeft: 10 },
//   carImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   details: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 2,
//     padding: 15,
//     marginBottom: 20,
//   },
//   price: { fontSize: 18, fontWeight: 'bold', color: '#811717', marginBottom: 10 },
//   detailsText: { fontSize: 14, color: '#666' },
//   bookButton: {
//     backgroundColor: '#811717',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });

// export default ViewDetailsPage;


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/core';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getVehicleById } from '../api/vehicles';
import { RootStackParamList } from '../../App';

type ViewDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ViewDetails'>;
type ViewDetailsRouteProp = RouteProp<RootStackParamList, 'ViewDetails'>;

const ViewDetailsPage: React.FC = () => {
  const navigation = useNavigation<ViewDetailsNavigationProp>();
  const route = useRoute<ViewDetailsRouteProp>();
  const { isLoggedIn } = useAuth();
  const { carId, startDate, endDate } = route.params;

  const { data: car, isLoading, error } = useQuery({
    queryKey: ['vehicle', carId],
    queryFn: () => getVehicleById(carId),
  });

  const handleBookNow = () => {
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Please select start and end dates.');
      return;
    }
    if (!isLoggedIn) {
      navigation.navigate('Login', {
        redirectTo: {
          screen: 'Payment',
          params: { carId, carName: car?.name || '', price: car?.pricePerDay.toString() || '0', startDate, endDate },
        },
      });
      return;
    }
    navigation.navigate('Payment', {
      carId,
      carName: car?.name || '',
      price: car?.pricePerDay.toString() || '0',
      startDate,
      endDate,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#811717" />
      </View>
    );
  }

  if (error) {
    Alert.alert('Error', 'Failed to load car details.');
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#811717" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{car?.name || 'Car'}</Text>
      </View>
      <Image
        source={car?.imageUrl ? { uri: car.imageUrl } : require('../../assets/icon1.png')}
        style={styles.carImage}
      />
      <View style={styles.details}>
        <Text style={styles.price}>${car?.pricePerDay || 'N/A'}/day</Text>
        <Text style={styles.detailsText}>{car?.details || 'No details available'}</Text>
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>Book Now</Text>
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
  price: { fontSize: 18, fontWeight: 'bold', color: '#811717', marginBottom: 10 },
  detailsText: { fontSize: 14, color: '#666' },
  bookButton: {
    backgroundColor: '#811717',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ViewDetailsPage;
