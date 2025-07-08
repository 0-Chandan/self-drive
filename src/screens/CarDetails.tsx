// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useAuth } from '../context/AuthContext';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';

// type RootStackParamList = {
//   Login: { redirectTo?: { screen: string; params: any } };
//   Payment: { carId: number; carName: string; price: string; startDate: string; endDate: string };
//   CarDetails: { carId: number };
// };

// type CarDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;
// type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

// const CarDetails: React.FC = () => {
//   const route = useRoute<CarDetailsRouteProp>();
//   const navigation = useNavigation<CarDetailsNavigationProp>();
//   const { isLoggedIn } = useAuth();
//   const { carId } = route.params || { carId: 1 };
//   const car = {
//     id: carId,
//     name: 'Kia Seltos 2024',
//     price: '₹400/10km',
//     details: 'Manual | Petrol | Seat - 8',
//     image: require('../../assets/car1.png'),
//     rating: 5.0,
//     startDate: '2025-04-18T05:30:00',
//     endDate: '2025-04-19T05:30:00',
//   };

//   const formatDate = (dateStr: string) => {
//     if (!dateStr || isNaN(new Date(dateStr).getTime())) {
//       return 'Invalid Date';
//     }
//     const date = new Date(dateStr);
//     return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
//   };

//   const formatTime = (dateStr: string) => {
//     if (!dateStr || isNaN(new Date(dateStr).getTime())) {
//       return '';
//     }
//     const date = new Date(dateStr);
//     return `${date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     })}`;
//   };

//   const similarCars = [
//     { id: 2, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
//     { id: 3, name: 'Kia Seltos', price: '₹4000/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
//   ];

//   const faqs = [
//     'How do I book a car ?',
//     'How to cancel a car ?',
//     'How do I book a car ?',
//   ];

//   const handleButtonPress = () => {
//     if (!isLoggedIn) {
//       navigation.navigate('Login', {
//         redirectTo: {
//           screen: 'CarDetails',
//           params: { carId: car.id },
//         },
//       });
//     } else {
//       navigation.navigate('Payment', {
//         carId: car.id,
//         carName: car.name,
//         price: car.price,
//         startDate: car.startDate,
//         endDate: car.endDate,
//       });
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerCard}>
//         <Image source={car.image} style={styles.carImage} />
//         <View style={styles.headerInfo}>
//           <Text style={styles.carName}>
//             {car.name} <Ionicons name="star" size={16} color="#900" />
//           </Text>
//           <Text style={styles.carDetails}>{car.details}</Text>
//           <View style={styles.dateBox}>
//             <Text style={styles.dateBoxText}>{car.price}</Text>
//             <Text style={styles.dateBoxText}>{`${formatDate(car.startDate)} - ${formatDate(car.endDate)} | ${formatTime(car.startDate)} - ${formatTime(car.endDate)}`}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Features</Text>
//         <View style={styles.featureList}>
//           {['Spare Tyres', 'ADAS (2 Front Airbags)', 'ToolKit', 'Anti-lock Braking System (ABS)', '2J Rear Airbags', 'Child Seat'].map((feature, index) => (
//             <View key={index} style={styles.featureItem}>
//               <Text style={styles.featureText}>{feature}</Text>
//               <View style={styles.badge} />
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Benefits</Text>
//         <View style={styles.featureList}>
//           {['Unlimited Kms with no extra charge', 'Zero Deposit no security deposits or fees'].map((benefit, index) => (
//             <View key={index} style={styles.featureItem}>
//               <Text style={styles.featureText}>{benefit}</Text>
//               <View style={styles.badge} />
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Cancellation</Text>
//         <View style={styles.featureItem}>
//           <Text style={styles.featureText}>Cancellation Unavailable</Text>
//           <View style={styles.badge} />
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Reviews</Text>
//         <View style={styles.reviewCard}>
//           <View style={styles.reviewHeader}>
//             <Text style={styles.reviewName}>
//               Amit Kumar <Ionicons name="star" size={16} color="#900" />
//             </Text>
//             <Text style={styles.reviewDate}>18 Apr 2025 | 04:26:50 PM</Text>
//           </View>
//           <Text style={styles.reviewText}>
//             Rented a car just a day before and get an affordable price. The host was very responsive and friendly.
//           </Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Similar cars</Text>
//         {similarCars.map((similarCar) => (
//           <View key={similarCar.id} style={styles.similarCarCard}>
//             <Image source={similarCar.image} style={styles.similarCarImage} />
//             <View style={styles.similarCarInfo}>
//               <Text style={styles.carName}>{similarCar.name}</Text>
//               <Text style={styles.carPrice}>{similarCar.price}</Text>
//               <Text style={styles.carDetails}>{similarCar.details}</Text>
//               <TouchableOpacity style={styles.viewButton}>
//                 <Text style={styles.viewButtonText}>VIEW</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>FAQs</Text>
//         {faqs.map((faq, index) => (
//           <TouchableOpacity key={index} style={styles.faqItem}>
//             <Text style={styles.faqText}>{faq}</Text>
//             <Ionicons name="chevron-forward" size={16} color="#900" />
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.footerPrice}>₹4000/-</Text>
//         <TouchableOpacity style={styles.loginButton} onPress={handleButtonPress}>
//           <Text style={styles.loginButtonText}>
//             {isLoggedIn ? 'Continue to Pay' : 'Log in to Continue'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
//   headerCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   carImage: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   headerInfo: {
//     padding: 12,
//     alignItems: 'center',
//   },
//   carName: { fontWeight: 'bold', fontSize: 18, color: '#000' },
//   carDetails: { fontSize: 14, color: '#555', marginVertical: 4 },
//   carPrice: { color: '#900', fontWeight: 'bold', fontSize: 14, marginVertical: 4 },
//   dateBox: {
//     backgroundColor: '#900',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     alignItems: 'center',
//   },
//   dateBoxText: { color: '#fff', fontSize: 12 },
//   section: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginVertical: 12,
//     padding: 12,
//   },
//   sectionTitle: { fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 8 },
//   featureList: { flexDirection: 'column' },
//   featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
//   featureText: { fontSize: 14, color: '#333', flex: 1 },
//   badge: {
//     width: 10,
//     height: 10,
//     backgroundColor: '#900',
//     borderRadius: 5,
//     marginLeft: 8,
//   },
//   reviewCard: { padding: 12 },
//   reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
//   reviewName: { fontSize: 14, color: '#000' },
//   reviewDate: { fontSize: 12, color: '#555' },
//   reviewText: { fontSize: 14, color: '#333' },
//   similarCarCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginVertical: 8,
//     padding: 8,
//   },
//   similarCarImage: { width: 80, height: 60, borderRadius: 8 },
//   similarCarInfo: { flex: 1, marginLeft: 8 },
//   viewButton: {
//     backgroundColor: '#900',
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//   },
//   viewButtonText: { color: '#fff', fontSize: 12 },
//   faqItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   faqText: { fontSize: 14, color: '#333' },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     padding: 12,
//     marginVertical: 12,
//   },
//   footerPrice: { fontWeight: 'bold', fontSize: 18, color: '#000' },
//   loginButton: {
//     backgroundColor: '#900',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   loginButtonText: { color: '#fff', fontSize: 14 },
// });

// export default CarDetails;






// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../context/AuthContext';
// import { getVehicleById, VehicleDetails } from '../api/vehicles';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';

// type CarDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;
// type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

// const CarDetails: React.FC = () => {
//   const route = useRoute<CarDetailsRouteProp>();
//   const navigation = useNavigation<CarDetailsNavigationProp>();
//   const { isLoggedIn } = useAuth();
//   const { carId, startDate, endDate } = route.params || { carId: 1 };

//   const { data: car, isLoading, error } = useQuery<VehicleDetails, Error>({
//     queryKey: ['vehicle', carId],
//     queryFn: () => getVehicleById(carId),
//     enabled: isLoggedIn,
//   });

//   const formatDate = (dateStr?: string) => {
//     if (!dateStr || isNaN(new Date(dateStr).getTime())) {
//       return 'Invalid Date';
//     }
//     const date = new Date(dateStr);
//     return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
//   };

//   const formatTime = (dateStr?: string) => {
//     if (!dateStr || isNaN(new Date(dateStr).getTime())) {
//       return '';
//     }
//     const date = new Date(dateStr);
//     return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
//   };

//   const handleButtonPress = () => {
//     if (!isLoggedIn) {
//       navigation.navigate('Login', {
//         redirectTo: { screen: 'CarDetails', params: { carId, startDate, endDate } },
//       });
//     } else if (car) {
//       navigation.navigate('Payment', {
//         carId: car.id,
//         carName: car.name,
//         price: car.pricePer10Km,
//         startDate: startDate || new Date().toISOString(),
//         endDate: endDate || new Date().toISOString(),
//       });
//     }
//   };

//   if (!isLoggedIn) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Please log in to view car details.</Text>
//         <TouchableOpacity style={styles.loginButton} onPress={handleButtonPress}>
//           <Text style={styles.loginButtonText}>Go to Login</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#900" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//       </View>
//     );
//   }

//   if (!car) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Car not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerCard}>
//         <Image source={{ uri: `http://192.168.1.8:5000${car.imageUrl}` }} style={styles.carImage} />
//         <View style={styles.headerInfo}>
//           <Text style={styles.carName}>
//             {car.name} <Ionicons name="star" size={16} color="#900" />
//           </Text>
//           <Text style={styles.carDetails}>
//             {`${car.transmission} | ${car.fuelType} | Seat - ${car.seats}`}
//           </Text>
//           <View style={styles.dateBox}>
//             <Text style={styles.dateBoxText}>{car.pricePer10Km}</Text>
//             <Text style={styles.dateBoxText}>
//               {`${formatDate(startDate)} - ${formatDate(endDate)} | ${formatTime(startDate)} - ${formatTime(endDate)}`}
//             </Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Features</Text>
//         <View style={styles.featureList}>
//           {Object.entries(car.features || {}).map(([key, value], index) => (
//             <View key={index} style={styles.featureItem}>
//               <Text style={styles.featureText}>{key}: {value.toString()}</Text>
//               <View style={styles.badge} />
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Benefits</Text>
//         <View style={styles.featureList}>
//           {Object.entries(car.benefits || {}).map(([key, value], index) => (
//             <View key={index} style={styles.featureItem}>
//               <Text style={styles.featureText}>{key}: {value.toString()}</Text>
//               <View style={styles.badge} />
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Cancellation</Text>
//         <View style={styles.featureItem}>
//           <Text style={styles.featureText}>
//             {car.cancellationPolicy || 'Cancellation Unavailable'}
//           </Text>
//           <View style={styles.badge} />
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Reviews</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Similar Cars</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>FAQs</Text>
//         {['How do I book a car?', 'How do I cancel a car?', 'What are the payment options?'].map((faq, index) => (
//           <TouchableOpacity key={index} style={styles.faqItem}>
//             <Text style={styles.faqText}>{faq}</Text>
//             <Ionicons name="chevron-forward" size={16} color="#900" />
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.footerPrice}>₹{car.pricePerDay}/day</Text>
//         <TouchableOpacity style={styles.loginButton} onPress={handleButtonPress}>
//           <Text style={styles.loginButtonText}>
//             {isLoggedIn ? 'Continue to Pay' : 'Log in to Continue'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
//   errorText: { color: '#900', fontSize: 16, textAlign: 'center', marginTop: 20 },
//   loginButton: {
//     backgroundColor: '#900',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   headerCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   carImage: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   headerInfo: {
//     padding: 12,
//     alignItems: 'center',
//   },
//   carName: { fontWeight: 'bold', fontSize: 18, color: '#000' },
//   carDetails: { fontSize: 14, color: '#555', marginVertical: 4 },
//   dateBox: {
//     backgroundColor: '#900',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     alignItems: 'center',
//   },
//   dateBoxText: { color: '#fff', fontSize: 12 },
//   section: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginVertical: 12,
//     padding: 12,
//   },
//   sectionTitle: { fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 8 },
//   featureList: { flexDirection: 'column' },
//   featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
//   featureText: { fontSize: 14, color: '#333', flex: 1 },
//   badge: {
//     width: 10,
//     height: 10,
//     backgroundColor: '#900',
//     borderRadius: 5,
//     marginLeft: 8,
//   },
//   reviewCard: { padding: 12 },
//   reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
//   reviewName: { fontSize: 14, color: '#000' },
//   reviewDate: { fontSize: 12, color: '#555' },
//   reviewText: { fontSize: 14, color: '#333' },
//   similarCarCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginVertical: 8,
//     padding: 8,
//   },
//   similarCarImage: { width: 80, height: 60, borderRadius: 8 },
//   similarCarInfo: { flex: 1, marginLeft: 8 },
//   viewButton: {
//     backgroundColor: '#900',
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//   },
//   viewButtonText: { color: '#fff', fontSize: 12 },
//   faqItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   faqText: { fontSize: 14, color: '#333' },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     padding: 12,
//     marginVertical: 12,
//   },
//   footerPrice: { fontWeight: 'bold', fontSize: 18, color: '#000' },
// });

// export default CarDetails;




// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../context/AuthContext';
// import { getVehicleById, VehicleDetails } from '../api/vehicles';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';

// type CarDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;
// type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

// const CarDetails: React.FC = () => {
//   const route = useRoute<CarDetailsRouteProp>();
//   const navigation = useNavigation<CarDetailsNavigationProp>();
//   const { isLoggedIn } = useAuth();
//   const { carId, startDate, endDate, isWithDriver } = route.params || { carId: 1 };

//   const { data: car, isLoading, error } = useQuery<VehicleDetails, Error>({
//     queryKey: ['vehicle', carId],
//     queryFn: () => getVehicleById(carId),
//     enabled: isLoggedIn,
//   });

//   const formatDate = (dateStr?: string) => {
//     if (!dateStr || isNaN(new Date(dateStr).getTime())) {
//       return 'Invalid Date';
//     }
//     const date = new Date(dateStr);
//     return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
//   };

//   const formatTime = (dateStr?: string) => {
//     if (!dateStr || isNaN(new Date(dateStr).getTime())) {
//       return '';
//     }
//     const date = new Date(dateStr);
//     return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
//   };

//   const handleButtonPress = () => {
//     if (!isLoggedIn) {
//       navigation.navigate('Login', {
//         redirectTo: { screen: 'CarDetails', params: { carId, startDate, endDate, isWithDriver } },
//       });
//     } else if (car) {
//       navigation.navigate('Payment', {
//         carId: car.id,
//         carName: car.name,
//         price: car.pricePer10Km,
//         startDate: startDate || new Date().toISOString(),
//         endDate: endDate || new Date().toISOString(),
//         isWithDriver,
//       });
//     }
//   };

//   const handleViewSimilarCar = (similarCarId: number) => {
//     navigation.navigate('CarDetails', {
//       carId: similarCarId,
//       startDate,
//       endDate,
//       isWithDriver,
//     });
//   };

//   if (!isLoggedIn) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Please log in to view car details.</Text>
//         <TouchableOpacity style={styles.loginButton} onPress={handleButtonPress}>
//           <Text style={styles.loginButtonText}>Go to Login</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#900" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//       </View>
//     );
//   }

//   if (!car) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Car not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerCard}>
//         <Image
//           source={{ uri: `http://192.168.1.8:5000${car.imageUrl}` }}
//           style={styles.carImage}
//           resizeMode="cover"
//         />
//         <View style={styles.headerInfo}>
//           <Text style={styles.carName}>
//             {car.name} <Ionicons name="star" size={16} color="#900" />
//           </Text>
//           <Text style={styles.carDetails}>
//             {`${car.transmission} | ${car.fuelType} | Seat - ${car.seats}`}
//           </Text>
//           <View style={styles.dateBox}>
//             <Text style={styles.dateBoxText}>{car.pricePer10Km}</Text>
//             <Text style={styles.dateBoxText}>
//               {`${formatDate(startDate)} - ${formatDate(endDate)} | ${formatTime(startDate)} - ${formatTime(endDate)}`}
//             </Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Features</Text>
//         <View style={styles.featureList}>
//           {Object.entries(car.features || {}).map(([key, value], index) => (
//             <View key={index} style={styles.featureItem}>
//               <Text style={styles.featureText}>{key}: {value.toString()}</Text>
//               <View style={styles.badge} />
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Benefits</Text>
//         <View style={styles.featureList}>
//           {Object.entries(car.benefits || {}).map(([key, value], index) => (
//             <View key={index} style={styles.featureItem}>
//               <Text style={styles.featureText}>{key}: {value.toString()}</Text>
//               <View style={styles.badge} />
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Cancellation</Text>
//         <View style={styles.featureItem}>
//           <Text style={styles.featureText}>
//             {car.cancellationPolicy || 'Cancellation Unavailable'}
//           </Text>
//           <View style={styles.badge} />
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Reviews</Text>
//         <Text style={styles.reviewText}>
//           Reviews not implemented. Add API call to fetch reviews for vehicle ID {carId}.
//         </Text>
//         {/* Example static review; replace with API call */}
//         <View style={styles.reviewCard}>
//           <View style={styles.reviewHeader}>
//             <Text style={styles.reviewName}>
//               Amit Kumar <Ionicons name="star" size={16} color="#900" />
//             </Text>
//             <Text style={styles.reviewDate}>18 Apr 2025 | 04:26:50 PM</Text>
//           </View>
//           <Text style={styles.reviewText}>
//             Rented a car just a day before and got an affordable price. The host was very responsive and friendly.
//           </Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Similar Cars</Text>
//         <Text style={styles.reviewText}>
//           Similar cars not implemented. Add API call to fetch similar vehicles.
//         </Text>
//         {/* Example static similar car; replace with API call */}
//         {[
//           {
//             id: 2,
//             name: 'Similar Car',
//             pricePer10Km: '₹400/10km',
//             transmission: 'Manual',
//             fuelType: 'Petrol',
//             seats: 6,
//             imageUrl: '/assets/default-car.png',
//           },
//         ].map((similarCar) => (
//           <View key={similarCar.id} style={styles.similarCarCard}>
//             <Image
//               source={{ uri: `http://192.168.1.8:5000${similarCar.imageUrl}` }}
//               style={styles.similarCarImage}
//               resizeMode="cover"
//             />
//             <View style={styles.similarCarInfo}>
//               <Text style={styles.carName}>{similarCar.name}</Text>
//               <Text style={styles.carPrice}>{similarCar.pricePer10Km}</Text>
//               <Text style={styles.carDetails}>
//                 {`${similarCar.transmission} | ${similarCar.fuelType} | Seat - ${similarCar.seats}`}
//               </Text>
//               <TouchableOpacity
//                 style={styles.viewButton}
//                 onPress={() => handleViewSimilarCar(similarCar.id)}
//               >
//                 <Text style={styles.viewButtonText}>VIEW</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>FAQs</Text>
//         {['How do I book a car?', 'How do I cancel a car?', 'What are the payment options?'].map(
//           (faq, index) => (
//             <TouchableOpacity key={index} style={styles.faqItem}>
//               <Text style={styles.faqText}>{faq}</Text>
//               <Ionicons name="chevron-forward" size={16} color="#900" />
//             </TouchableOpacity>
//           )
//         )}
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.footerPrice}>₹{car.pricePerDay}/day</Text>
//         <TouchableOpacity style={styles.loginButton} onPress={handleButtonPress}>
//           <Text style={styles.loginButtonText}>
//             {isLoggedIn ? 'Continue to Pay' : 'Log in to Continue'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
//   errorText: { color: '#900', fontSize: 16, textAlign: 'center', marginTop: 20 },
//   loginButton: {
//     backgroundColor: '#900',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   headerCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   carImage: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   headerInfo: {
//     padding: 12,
//     alignItems: 'center',
//   },
//   carName: { fontWeight: 'bold', fontSize: 18, color: '#000' },
//   carDetails: { fontSize: 14, color: '#555', marginVertical: 4 },
//   carPrice: { color: '#900', fontWeight: 'bold', fontSize: 14, marginVertical: 4 },
//   dateBox: {
//     backgroundColor: '#900',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     alignItems: 'center',
//   },
//   dateBoxText: { color: '#fff', fontSize: 12 },
//   section: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginVertical: 12,
//     padding: 12,
//   },
//   sectionTitle: { fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 8 },
//   featureList: { flexDirection: 'column' },
//   featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
//   featureText: { fontSize: 14, color: '#333', flex: 1 },
//   badge: {
//     width: 10,
//     height: 10,
//     backgroundColor: '#900',
//     borderRadius: 5,
//     marginLeft: 8,
//   },
//   reviewCard: { padding: 12 },
//   reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
//   reviewName: { fontSize: 14, color: '#000' },
//   reviewDate: { fontSize: 12, color: '#555' },
//   reviewText: { fontSize: 14, color: '#333' },
//   similarCarCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     marginVertical: 8,
//     padding: 8,
//   },
//   similarCarImage: { width: 80, height: 60, borderRadius: 8 },
//   similarCarInfo: { flex: 1, marginLeft: 8 },
//   viewButton: {
//     backgroundColor: '#900',
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//   },
//   viewButtonText: { color: '#fff', fontSize: 12 },
//   faqItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   faqText: { fontSize: 14, color: '#333' },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 2,
//     padding: 12,
//     marginVertical: 12,
//   },
//   footerPrice: { fontWeight: 'bold', fontSize: 18, color: '#000' },
// });

// export default CarDetails;




import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getVehicleById, VehicleDetails } from '../api/vehicles';
import PriceBreakup from './PriceBreakup';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigation';

type CarDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;
type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

const CarDetails: React.FC = () => {
  const route = useRoute<CarDetailsRouteProp>();
  const navigation = useNavigation<CarDetailsNavigationProp>();
  const { isLoggedIn } = useAuth();
  const { carId, startDate, endDate, isWithDriver } = route.params || { carId: 1 };
  const [isPriceBreakupOpen, setIsPriceBreakupOpen] = useState(false);

  const { data: car, isLoading, error } = useQuery<VehicleDetails, Error>({
    queryKey: ['vehicle', carId],
    queryFn: () => getVehicleById(carId),
    enabled: isLoggedIn,
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())) {
      return 'Invalid Date';
    }
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())) {
      return '';
    }
    const date = new Date(dateStr);
    return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  };

  const handleButtonPress = () => {
    if (!isLoggedIn) {
      navigation.navigate('Login', {
        redirectTo: { screen: 'CarDetails', params: { carId, startDate, endDate, isWithDriver } },
      });
    } else if (car) {
      navigation.navigate('Payment', {
        carId: car.id,
        carName: car.name,
        price: car.pricePer10Km,
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || new Date().toISOString(),
        isWithDriver,
      });
    }
  };
  

  const handleViewSimilarCar = (similarCarId: number) => {
    navigation.navigate('CarDetails', {
      carId: similarCarId,
      startDate,
      endDate,
      isWithDriver,
    });
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please log in to view car details.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleButtonPress}>
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#900" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!car) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Car not found.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerCard}>
          <Image
            source={{ uri: `http://192.168.1.8:5000${car.imageUrl}` }}
            style={styles.carImage}
            resizeMode="cover"
          />
          <View style={styles.headerInfo}>
            <Text style={styles.carName}>
              {car.name} <Ionicons name="star" size={16} color="#900" />
            </Text>
            <Text style={styles.carDetails}>
              {`${car.transmission} | ${car.fuelType} | Seat - ${car.seats}`}
            </Text>
            <View style={styles.dateBox}>
              <Text style={styles.dateBoxText}>{car.pricePer10Km}</Text>
              <Text style={styles.dateBoxText}>
                {`${formatDate(startDate)} - ${formatDate(endDate)} | ${formatTime(startDate)} - ${formatTime(endDate)}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            {Object.entries(car.features || {}).map(([key, value], index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureText}>{key}: {value.toString()}</Text>
                <View style={styles.badge} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <View style={styles.featureList}>
            {Object.entries(car.benefits || {}).map(([key, value], index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureText}>{key}: {value.toString()}</Text>
                <View style={styles.badge} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cancellation</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>
              {car.cancellationPolicy || 'Cancellation Unavailable'}
            </Text>
            <View style={styles.badge} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <Text style={styles.reviewText}>
            Reviews not implemented. Add API call to fetch reviews for vehicle ID {carId}.
          </Text>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>
                Amit Kumar <Ionicons name="star" size={16} color="#900" />
              </Text>
              <Text style={styles.reviewDate}>18 Apr 2025 | 04:26:50 PM</Text>
            </View>
            <Text style={styles.reviewText}>
              Rented a car just a day before and got an affordable price. The host was very responsive and friendly.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Similar Cars</Text>
          <Text style={styles.reviewText}>
            Similar cars not implemented. Add API call to fetch similar vehicles.
          </Text>
          {[
            {
              id: 2,
              name: 'Similar Car',
              pricePer10Km: '₹400/10km',
              transmission: 'Manual',
              fuelType: 'Petrol',
              seats: 6,
              imageUrl: '/assets/default-car.png',
            },
          ].map((similarCar) => (
            <View key={similarCar.id} style={styles.similarCarCard}>
              <Image
                source={{ uri: `http://192.168.1.8:5000${similarCar.imageUrl}` }}
                style={styles.similarCarImage}
                resizeMode="cover"
              />
              <View style={styles.similarCarInfo}>
                <Text style={styles.carName}>{similarCar.name}</Text>
                <Text style={styles.carPrice}>{similarCar.pricePer10Km}</Text>
                <Text style={styles.carDetails}>
                  {`${similarCar.transmission} | ${similarCar.fuelType} | Seat - ${similarCar.seats}`}
                </Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => handleViewSimilarCar(similarCar.id)}
                >
                  <Text style={styles.viewButtonText}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          {['How do I book a car?', 'How do I cancel a car?', 'What are the payment options?'].map(
            (faq, index) => (
              <TouchableOpacity key={index} style={styles.faqItem}>
                <Text style={styles.faqText}>{faq}</Text>
                <Ionicons name="chevron-forward" size={16} color="#900" />
              </TouchableOpacity>
            )
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerPrice}>₹{car.pricePerDay}/day</Text>
            <TouchableOpacity onPress={() => setIsPriceBreakupOpen(true)}>
              <Text style={styles.priceBreakupLink}>View Price Breakup</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleButtonPress}>
            <Text style={styles.loginButtonText}>
              {isLoggedIn ? 'Continue to Pay' : 'Log in to Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isPriceBreakupOpen && car && (
        <PriceBreakup
          visible={isPriceBreakupOpen}
          onClose={() => setIsPriceBreakupOpen(false)}
          pricingDetails={{
            pricePerDay: car.pricePerDay,
            driverCharge: isWithDriver ? car.driverCharge : 0,
            deposit: car.deposit,
            convenienceFee: 0,
            tripProtectionFee: 0,
            startDate,
            endDate,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  errorText: { color: '#900', fontSize: 16, textAlign: 'center', marginTop: 20 },
  loginButton: {
    backgroundColor: '#900',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginTop: 12,
    alignItems: 'center',
  },
  carImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerInfo: {
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  carName: { fontWeight: 'bold', fontSize: 18, color: '#000' },
  carDetails: { fontSize: 14, color: '#555', marginVertical: 4 },
  carPrice: { color: '#900', fontWeight: 'bold', fontSize: 14, marginVertical: 4 },
  dateBox: {
    backgroundColor: '#900',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    marginTop: 4,
  },
  dateBoxText: { color: '#fff', fontSize: 12 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginVertical: 12,
    padding: 12,
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 8 },
  featureList: { flexDirection: 'column' },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  featureText: { fontSize: 14, color: '#333', flex: 1 },
  badge: {
    width: 10,
    height: 10,
    backgroundColor: '#900',
    borderRadius: 5,
    marginLeft: 8,
  },
  reviewCard: { padding: 12 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  reviewName: { fontSize: 14, color: '#000' },
  reviewDate: { fontSize: 12, color: '#555' },
  reviewText: { fontSize: 14, color: '#333' },
  similarCarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginVertical: 8,
    padding: 8,
  },
  similarCarImage: { width: 80, height: 60, borderRadius: 8 },
  similarCarInfo: { flex: 1, marginLeft: 8 },
  viewButton: {
    backgroundColor: '#900',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  viewButtonText: { color: '#fff', fontSize: 12 },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
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
    elevation: 2,
    padding: 12,
    marginVertical: 12,
  },
  footerLeft: {
    flexDirection: 'column',
  },
  footerPrice: { fontWeight: 'bold', fontSize: 18, color: '#000' },
  priceBreakupLink: {
    fontSize: 14,
    color: '#900',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
});

export default CarDetails;
