
// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { useRoute, useNavigation } from '@react-navigation/native';
// // import FilterModal from '../components/FilterModal';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import type { RouteProp } from '@react-navigation/native';
// // import { RootStackParamList } from '../navigation/navigation';

// // type SearchResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;
// // type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

// // const SearchResultsPage: React.FC = () => {
// //   const route = useRoute<SearchResultsRouteProp>();
// //   const navigation = useNavigation<SearchResultsNavigationProp>();
// //   const { location, startDate, endDate } = route.params || {
// //     location: 'Majestic Bus Stand Ra...',
// //     startDate: new Date().toISOString(),
// //     endDate: new Date().toISOString(),
// //   };

// //   const [isFilterVisible, setFilterVisible] = useState(false);
// //   const [filters, setFilters] = useState({
// //     distance: 45,
// //     price: 1000,
// //     carType: '',
// //     transmission: '',
// //     fuelType: '',
// //     seats: '',
// //   });

// //   const cars = [
// //     { id: 1, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
// //     { id: 2, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
// //     { id: 3, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
// //     { id: 4, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
// //   ];

// //   const formatDate = (dateStr: string) => {
// //     if (!dateStr || isNaN(new Date(dateStr)))
// //       {
// //         return 'Invalid Date';
// //       }
// //     const date = new Date(dateStr);
// //     return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
// //   };

// //   const formatTime = (dateStr: string) => {
// //     if (!dateStr || isNaN(new Date(dateStr))) return '';
// //     const date = new Date(dateStr);
// //     return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
// //   };

// //   const handleView = (carId: number) => {
// //     navigation.navigate('CarDetails', { carId });
// //   };

// //   const handleApplyFilters = (newFilters: typeof filters) => {
// //     setFilters(newFilters);
// //     console.log('Applied filters:', newFilters);
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       {/* Header Card */}
// //       <View style={styles.headerCard}>
// //         <View style={styles.headerTopRow}>
// //           <TouchableOpacity onPress={() => navigation.goBack()}>
// //             <Ionicons name="arrow-back" size={24} color="#900" />
// //           </TouchableOpacity>
// //           <Text style={styles.locationText} numberOfLines={1}>
// //             Showing 10 cars at
// //             {'\n'}
// //             <Text style={styles.locationBold}>{location}</Text>
// //           </Text>
// //           <View style={styles.dateBox}>
// //             <Text style={styles.dateBoxText}>{formatDate(startDate)} - {formatDate(endDate)}</Text>
// //             <Text style={styles.dateBoxText}>
// //               {formatTime(startDate)} - {formatTime(endDate)}
// //             </Text>
// //           </View>
// //         </View>
// //       </View>

// //       {/* Search + Filter */}
// //       <View style={styles.searchContainer}>
// //         <View style={styles.searchInputBox}>
// //           <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
// //           <TextInput
// //             placeholder="Search for your rides"
// //             placeholderTextColor="#aaa"
// //             style={styles.searchInput}
// //           />
// //         </View>
// //         <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
// //           <Text style={styles.filterText}>Filter</Text>
// //           <Ionicons name="chevron-forward" size={16} color="#fff" />
// //         </TouchableOpacity>
// //       </View>

// //       {/* Cars Nearby Title */}
// //       <View style={styles.titleDivider}>
// //         <View style={styles.line} />
// //         <Text style={styles.titleText}>10 CARS NEAR YOU</Text>
// //         <View style={styles.line} />
// //       </View>

// //       {/* Cars List */}
// //       {cars.map((car) => (
// //         <View key={car.id} style={styles.carCard}>
// //           <Image source={car.image} style={styles.carImage} />
// //           <View style={styles.carInfo}>
// //             <View>
// //               <Text style={styles.carName}>{car.name}</Text>
// //               <Text style={styles.carPrice}>{car.price}</Text>
// //               <Text style={styles.carDetails}>{car.details}</Text>
// //             </View>
// //             <TouchableOpacity
// //               style={styles.viewButton}
// //               onPress={() => handleView(car.id)}
// //             >
// //               <Text style={styles.viewButtonText}>VIEW</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       ))}

// //       <FilterModal
// //         isVisible={isFilterVisible}
// //         onClose={() => setFilterVisible(false)}
// //         onApply={handleApplyFilters}
// //         initialDistance={filters.distance}
// //         initialPrice={filters.price}
// //       />
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
// //   headerCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     marginTop: 12,
// //     elevation: 2,
// //   },
// //   headerTopRow: { flexDirection: 'row', alignItems: 'center' },
// //   locationText: { flex: 1, fontSize: 14, color: '#333', marginLeft: 10 },
// //   locationBold: { fontWeight: 'bold', fontSize: 16 },
// //   dateBox: {
// //     backgroundColor: '#900',
// //     borderRadius: 8,
// //     paddingHorizontal: 8,
// //     paddingVertical: 4,
// //     alignItems: 'flex-end',
// //   },
// //   dateBoxText: { color: '#fff', fontSize: 10 },

// //   searchContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: 16,
// //   },
// //   searchInputBox: {
// //     flexDirection: 'row',
// //     backgroundColor: '#f3f3f3',
// //     borderRadius: 10,
// //     flex: 1,
// //     alignItems: 'center',
// //     paddingLeft: 10,
// //     marginRight: 10,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     height: 40,
// //     fontSize: 14,
// //     paddingLeft: 8,
// //   },
// //   searchIcon: {
// //     marginRight: 4,
// //   },
// //   filterButton: {
// //     flexDirection: 'row',
// //     backgroundColor: '#900',
// //     borderRadius: 10,
// //     paddingVertical: 10,
// //     paddingHorizontal: 12,
// //     alignItems: 'center',
// //   },
// //   filterText: {
// //     color: '#fff',
// //     fontSize: 14,
// //     marginRight: 4,
// //   },

// //   titleDivider: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 20,
// //   },
// //   line: {
// //     flex: 1,
// //     height: 1,
// //     backgroundColor: '#ccc',
// //   },
// //   titleText: {
// //     marginHorizontal: 10,
// //     fontWeight: 'bold',
// //     fontSize: 14,
// //     color: '#900',
// //   },

// //   carCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     elevation: 3,
// //     marginBottom: 20,
// //   },
// //   carImage: {
// //     width: '100%',
// //     height: 160,
// //     borderTopLeftRadius: 12,
// //     borderTopRightRadius: 12,
// //   },
// //   carInfo: {
// //     padding: 12,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   carName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
// //   carPrice: { color: '#900', fontWeight: 'bold', fontSize: 14 },
// //   carDetails: { fontSize: 12, color: '#555', marginTop: 2 },
// //   viewButton: {
// //     backgroundColor: '#900',
// //     paddingVertical: 6,
// //     paddingHorizontal: 16,
// //     borderRadius: 6,
// //     alignSelf: 'flex-start',
// //     justifyContent: 'center',
// //   },
// //   viewButtonText: { color: '#fff', fontSize: 14 },
// // });

// // export default SearchResultsPage;


// // // SearchResultsPage.tsx
// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { useRoute, useNavigation } from '@react-navigation/native';
// // import { useQuery } from '@tanstack/react-query';
// // import FilterModal from '../components/FilterModal';
// // import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import type { RouteProp } from '@react-navigation/native';
// // import { RootStackParamList } from '../navigation/navigation';
// // import { getAvailableVehicles, Vehicle } from '../api/auth';

// // type SearchResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;
// // type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

// // const SearchResultsPage: React.FC = () => {
// //   const route = useRoute<SearchResultsRouteProp>();
// //   const navigation = useNavigation<SearchResultsNavigationProp>();
// //   const { location, startDate, endDate, isWithDriver, isSelfDrive } = route.params || {
// //     location: 'Majestic Bus Stand Ra...',
// //     startDate: new Date().toISOString(),
// //     endDate: new Date().toISOString(),
// //     isWithDriver: true,
// //     isSelfDrive: false,
// //   };

// //   const [isFilterVisible, setFilterVisible] = useState(false);
// //   const [filters, setFilters] = useState({
// //     distance: 45,
// //     price: 1000,
// //     carType: '',
// //     transmission: '',
// //     fuelType: '',
// //     seats: '',
// //   });

// //   const { data, isLoading, error } = useQuery({
// //     queryKey: ['availableVehicles', location, startDate, endDate, isWithDriver, filters],
// //     queryFn: () =>
// //       getAvailableVehicles({
// //         page: 1,
// //         limit: 10,
// //         search: location,
// //         startDate,
// //         endDate,
// //         driver: isWithDriver,
// //         carType: filters.carType,
// //         transmission: filters.transmission,
// //         fuelType: filters.fuelType,
// //         seats: filters.seats,
// //       }),
// //   });

// //   const formatDate = (dateStr: string) => {
// //     if (!dateStr || isNaN(new Date(dateStr).getTime())) {
// //       return 'Invalid Date';
// //     }
// //     const date = new Date(dateStr);
// //     return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
// //   };

// //   const formatTime = (dateStr: string) => {
// //     if (!dateStr || isNaN(new Date(dateStr).getTime())) {
// //       return '';
// //     }
// //     const date = new Date(dateStr);
// //     return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
// //   };

// //   const handleView = (carId: number) => {
// //     navigation.navigate('CarDetails', { carId });
// //   };

// //   const handleApplyFilters = (newFilters: typeof filters) => {
// //     setFilters(newFilters);
// //     console.log('Applied filters:', newFilters);
// //   };

// //   if (isLoading) {
// //     return (
// //       <View style={styles.container}>
// //         <Text>Loading...</Text>
// //       </View>
// //     );
// //   }

// //   if (error) {
// //     Alert.alert('Error', 'Failed to load vehicles. Please try again.');
// //     return (
// //       <View style={styles.container}>
// //         <Text>Error loading vehicles: {(error as Error).message}</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView style={styles.container}>
// //       <View style={styles.headerCard}>
// //         <View style={styles.headerTopRow}>
// //           <TouchableOpacity onPress={() => navigation.goBack()}>
// //             <Ionicons name="arrow-back" size={24} color="#900" />
// //           </TouchableOpacity>
// //           <Text style={styles.locationText} numberOfLines={1}>
// //             Showing {data?.vehicles.length || 0} cars at
// //             {'\n'}
// //             <Text style={styles.locationBold}>{location}</Text>
// //           </Text>
// //           <View style={styles.dateBox}>
// //             <Text style={styles.dateBoxText}>
// //               {formatDate(startDate)} - {formatDate(endDate)}
// //             </Text>
// //             <Text style={styles.dateBoxText}>
// //               {formatTime(startDate)} - {formatTime(endDate)}
// //             </Text>
// //           </View>
// //         </View>
// //       </View>

// //       <View style={styles.searchContainer}>
// //         <View style={styles.searchInputBox}>
// //           <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
// //           <TextInput
// //             placeholder="Search for your rides"
// //             placeholderTextColor="#aaa"
// //             style={styles.searchInput}
// //           />
// //         </View>
// //         <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
// //           <Text style={styles.filterText}>Filter</Text>
// //           <Ionicons name="chevron-forward" size={16} color="#fff" />
// //         </TouchableOpacity>
// //       </View>

// //       <View style={styles.titleDivider}>
// //         <View style={styles.line} />
// //         <Text style={styles.titleText}>{data?.vehicles.length || 0} CARS NEAR YOU</Text>
// //         <View style={styles.line} />
// //       </View>

// //       {data?.vehicles.length === 0 && (
// //         <Text style={styles.noCarsText}>No cars available for the selected criteria.</Text>
// //       )}

// //       {data?.vehicles.map((car: Vehicle) => {
// //         // Get the first image URL from the images object
// //         const imageUrl = car.images ? Object.values(car.images)[0] : '/assets/default-car.png';
// //         return (
// //           <View key={car.id} style={styles.carCard}>
// //             <Image
// //               source={imageUrl.startsWith('/Uploads') ? { uri: `http://192.168.1.8:5000${imageUrl}` } : require('../../assets/car1.png')}
// //               style={styles.carImage}
// //             />
// //             <View style={styles.carInfo}>
// //               <View>
// //                 <Text style={styles.carName}>{car.name}</Text>
// //                 <Text style={styles.carPrice}>₹{car.pricePerDay}/day</Text>
// //                 <Text style={styles.carDetails}>
// //                   {car.transmission} | {car.fuel} | Seat - {car.seats}
// //                 </Text>
// //               </View>
// //               <TouchableOpacity style={styles.viewButton} onPress={() => handleView(car.id)}>
// //                 <Text style={styles.viewButtonText}>VIEW</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         );
// //       })}

// //       <FilterModal
// //         isVisible={isFilterVisible}
// //         onClose={() => setFilterVisible(false)}
// //         onApply={handleApplyFilters}
// //         initialDistance={filters.distance}
// //         initialPrice={filters.price}
// //       />
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
// //   headerCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     padding: 16,
// //     marginTop: 12,
// //     elevation: 2,
// //   },
// //   headerTopRow: { flexDirection: 'row', alignItems: 'center' },
// //   locationText: { flex: 1, fontSize: 14, color: '#333', marginLeft: 10 },
// //   locationBold: { fontWeight: 'bold', fontSize: 16 },
// //   dateBox: {
// //     backgroundColor: '#900',
// //     borderRadius: 8,
// //     paddingHorizontal: 8,
// //     paddingVertical: 4,
// //     alignItems: 'flex-end',
// //   },
// //   dateBoxText: { color: '#fff', fontSize: 10 },
// //   searchContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: 16,
// //   },
// //   searchInputBox: {
// //     flexDirection: 'row',
// //     backgroundColor: '#f3f3f3',
// //     borderRadius: 10,
// //     flex: 1,
// //     alignItems: 'center',
// //     paddingLeft: 10,
// //     marginRight: 10,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     height: 40,
// //     fontSize: 14,
// //     paddingLeft: 8,
// //   },
// //   searchIcon: {
// //     marginRight: 4,
// //   },
// //   filterButton: {
// //     flexDirection: 'row',
// //     backgroundColor: '#900',
// //     borderRadius: 10,
// //     paddingVertical: 10,
// //     paddingHorizontal: 12,
// //     alignItems: 'center',
// //   },
// //   filterText: {
// //     color: '#fff',
// //     fontSize: 14,
// //     marginRight: 4,
// //   },
// //   titleDivider: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 20,
// //   },
// //   line: {
// //     flex: 1,
// //     height: 1,
// //     backgroundColor: '#ccc',
// //   },
// //   titleText: {
// //     marginHorizontal: 10,
// //     fontWeight: 'bold',
// //     fontSize: 14,
// //     color: '#900',
// //   },
// //   carCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     elevation: 3,
// //     marginBottom: 20,
// //   },
// //   carImage: {
// //     width: '100%',
// //     height: 160,
// //     borderTopLeftRadius: 12,
// //     borderTopRightRadius: 12,
// //   },
// //   carInfo: {
// //     padding: 12,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   carName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
// //   carPrice: { color: '#900', fontWeight: 'bold', fontSize: 14 },
// //   carDetails: { fontSize: 12, color: '#555', marginTop: 2 },
// //   viewButton: {
// //     backgroundColor: '#900',
// //     paddingVertical: 6,
// //     paddingHorizontal: 16,
// //     borderRadius: 6,
// //     alignSelf: 'flex-start',
// //     justifyContent: 'center',
// //   },
// //   viewButtonText: { color: '#fff', fontSize: 14 },
// //   noCarsText: { textAlign: 'center', fontSize: 16, color: '#555', marginVertical: 20 },
// // });

// // export default SearchResultsPage;




// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useQuery } from '@tanstack/react-query';
// import FilterModal from '../components/FilterModal';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';
// import { getAvailableVehicles } from '../api/vehicles';
// import { useAuth } from '../context/AuthContext';

// type SearchResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;
// type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

// const SearchResultsPage: React.FC = () => {
//   const route = useRoute<SearchResultsRouteProp>();
//   const navigation = useNavigation<SearchResultsNavigationProp>();
//   const { isLoggedIn } = useAuth();
//   const { location = 'Majestic Bus Stand', startDate = new Date().toISOString(), endDate = new Date().toISOString(), isWithDriver } = route.params || {};

//   const [isFilterVisible, setFilterVisible] = useState(false);
//   const [filters, setFilters] = useState({
//     distance: 45,
//     price: 1000,
//     carType: '',
//     transmission: '',
//     fuelType: '',
//     seats: '',
//   });

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['vehicles', location, startDate, endDate, isWithDriver, filters],
//     queryFn: () => getAvailableVehicles(location, startDate, endDate, isWithDriver, 1, 10),
//     enabled: isLoggedIn,
//   });

//   const formatDate = (dateStr: string) => {
//     if (!dateStr || isNaN(new Date(dateStr).getTime())){
//       return 'Invalid Date';
//     }
//     const date = new Date(dateStr);
//     return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
//   };

//   const formatTime = (dateStr: string) => {
//     if (!dateStr || isNaN(new Date(dateStr).getTime())){
//       return '';
//     }
//     const date = new Date(dateStr);
//     return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
//   };

//   // const handleView = (carId: number) => {
//   //   navigation.navigate('CarDetails', { carId });
//   // };
//   const handleView = (carId: number) => {
//   navigation.navigate('CarDetails', {
//     carId,
//     startDate: route.params?.startDate,
//     endDate: route.params?.endDate,
//     isWithDriver: route.params?.isWithDriver,
//   });
// };

//   const handleApplyFilters = (newFilters: typeof filters) => {
//     setFilters(newFilters);
//     console.log('Applied filters:', newFilters);
//   };

//   if (!isLoggedIn) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Please log in to view available cars.</Text>
//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={() => navigation.navigate('Login', { redirectTo: { screen: 'SearchResults', params: route.params } })}
//         >
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
//         <Text style={styles.errorText}>Error loading cars: {(error as any).message}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header Card */}
//       <View style={styles.headerCard}>
//         <View style={styles.headerTopRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="#900" />
//           </TouchableOpacity>
//           <Text style={styles.locationText} numberOfLines={1}>
//             Showing {data?.total || 0} cars at
//             {'\n'}
//             <Text style={styles.locationBold}>{location}</Text>
//           </Text>
//           <View style={styles.dateBox}>
//             <Text style={styles.dateBoxText}>{formatDate(startDate)} - {formatDate(endDate)}</Text>
//             <Text style={styles.dateBoxText}>
//               {formatTime(startDate)} - {formatTime(endDate)}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Search + Filter */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchInputBox}>
//           <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
//           <TextInput
//             placeholder="Search for your rides"
//             placeholderTextColor="#aaa"
//             style={styles.searchInput}
//           />
//         </View>
//         <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
//           <Text style={styles.filterText}>Filter</Text>
//           <Ionicons name="chevron-forward" size={16} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* Cars Nearby Title */}
//       <View style={styles.titleDivider}>
//         <View style={styles.line} />
//         <Text style={styles.titleText}>{data?.total || 0} CARS NEAR YOU</Text>
//         <View style={styles.line} />
//       </View>

//       {/* Cars List */}
//       {data?.vehicles.map((car) => (
//         <View key={car.id} style={styles.carCard}>
//           <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
//           <View style={styles.carInfo}>
//             <View>
//               <Text style={styles.carName}>{car.name}</Text>
//               <Text style={styles.carPrice}>{car.pricePer10Km}</Text>
//               <Text style={styles.carDetails}>{`${car.transmission} | ${car.fuelType} | Seat - ${car.seats}`}</Text>
//             </View>
//             <TouchableOpacity
//               style={styles.viewButton}
//               onPress={() => handleView(car.id)}
//             >
//               <Text style={styles.viewButtonText}>VIEW</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}

//       <FilterModal
//         isVisible={isFilterVisible}
//         onClose={() => setFilterVisible(false)}
//         onApply={handleApplyFilters}
//         initialDistance={filters.distance}
//         initialPrice={filters.price}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
//   headerCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginTop: 12,
//     elevation: 2,
//   },
//   headerTopRow: { flexDirection: 'row', alignItems: 'center' },
//   locationText: { flex: 1, fontSize: 14, color: '#333', marginLeft: 10 },
//   locationBold: { fontWeight: 'bold', fontSize: 16 },
//   dateBox: {
//     backgroundColor: '#900',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     alignItems: 'flex-end',
//   },
//   dateBoxText: { color: '#fff', fontSize: 10 },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   searchInputBox: {
//     flexDirection: 'row',
//     backgroundColor: '#f3f3f3',
//     borderRadius: 10,
//     flex: 1,
//     alignItems: 'center',
//     paddingLeft: 10,
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     fontSize: 14,
//     paddingLeft: 8,
//   },
//   searchIcon: {
//     marginRight: 4,
//   },
//   filterButton: {
//     flexDirection: 'row',
//     backgroundColor: '#900',
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//   },
//   filterText: {
//     color: '#fff',
//     fontSize: 14,
//     marginRight: 4,
//   },
//   titleDivider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ccc',
//   },
//   titleText: {
//     marginHorizontal: 10,
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#900',
//   },
//   carCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   carImage: {
//     width: '100%',
//     height: 160,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   carInfo: {
//     padding: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   carName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
//   carPrice: { color: '#900', fontWeight: 'bold', fontSize: 14 },
//   carDetails: { fontSize: 12, color: '#555', marginTop: 2 },
//   viewButton: {
//     backgroundColor: '#900',
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//     justifyContent: 'center',
//   },
//   viewButtonText: { color: '#fff', fontSize: 14 },
//   errorText: { color: '#900', fontSize: 16, textAlign: 'center', marginTop: 20 },
//   loginButton: {
//     backgroundColor: '#006400',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });

// export default SearchResultsPage;


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
  available: boolean;
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

const SearchResultsPage: React.FC = () => {
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
      const url = `${baseURL}/vehicles?page=${pageNum}&limit=10&available=true&search=${search}`;
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
        available: car.available || false,
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
                 {
  trip.available ? (
    <Text
      style={styles.available}
    >
      ✅ Available
    </Text>
  ) : (
    <Text
      style={styles.notAvailable}
    >
      Not Available
    </Text>
  )
};

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
  available:{
backgroundColor: "#4CAF50", // Green
        color: "#fff",
        fontWeight:500,
        fontSize:12,
        paddingVertical: 2,
        paddingHorizontal: 3,
        borderRadius: 12,
        textAlign: "center",
        overflow: "hidden",
  },
  notAvailable:{
     backgroundColor: "#F44336", // Red
        color: "#fff",
        fontWeight:500,
        fontSize:12,
        paddingVertical: 2,
        paddingHorizontal: 3,
        borderRadius: 12,
        textAlign: "center",
        overflow: "hidden",
  }
});

export default SearchResultsPage;