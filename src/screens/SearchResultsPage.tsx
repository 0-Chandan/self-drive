
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import FilterModal from '../components/FilterModal';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';

// type SearchResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;
// type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

// const SearchResultsPage: React.FC = () => {
//   const route = useRoute<SearchResultsRouteProp>();
//   const navigation = useNavigation<SearchResultsNavigationProp>();
//   const { location, startDate, endDate } = route.params || {
//     location: 'Majestic Bus Stand Ra...',
//     startDate: new Date().toISOString(),
//     endDate: new Date().toISOString(),
//   };

//   const [isFilterVisible, setFilterVisible] = useState(false);
//   const [filters, setFilters] = useState({
//     distance: 45,
//     price: 1000,
//     carType: '',
//     transmission: '',
//     fuelType: '',
//     seats: '',
//   });

//   const cars = [
//     { id: 1, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
//     { id: 2, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
//     { id: 3, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
//     { id: 4, name: 'Kia Seltos', price: '₹400/10km', details: 'Manual | Petrol | Seat - 6', image: require('../../assets/car1.png') },
//   ];

//   const formatDate = (dateStr: string) => {
//     if (!dateStr || isNaN(new Date(dateStr)))
//       {
//         return 'Invalid Date';
//       }
//     const date = new Date(dateStr);
//     return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
//   };

//   const formatTime = (dateStr: string) => {
//     if (!dateStr || isNaN(new Date(dateStr))) return '';
//     const date = new Date(dateStr);
//     return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
//   };

//   const handleView = (carId: number) => {
//     navigation.navigate('CarDetails', { carId });
//   };

//   const handleApplyFilters = (newFilters: typeof filters) => {
//     setFilters(newFilters);
//     console.log('Applied filters:', newFilters);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header Card */}
//       <View style={styles.headerCard}>
//         <View style={styles.headerTopRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="#900" />
//           </TouchableOpacity>
//           <Text style={styles.locationText} numberOfLines={1}>
//             Showing 10 cars at
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
//         <Text style={styles.titleText}>10 CARS NEAR YOU</Text>
//         <View style={styles.line} />
//       </View>

//       {/* Cars List */}
//       {cars.map((car) => (
//         <View key={car.id} style={styles.carCard}>
//           <Image source={car.image} style={styles.carImage} />
//           <View style={styles.carInfo}>
//             <View>
//               <Text style={styles.carName}>{car.name}</Text>
//               <Text style={styles.carPrice}>{car.price}</Text>
//               <Text style={styles.carDetails}>{car.details}</Text>
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
// });

// export default SearchResultsPage;


// // SearchResultsPage.tsx
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useQuery } from '@tanstack/react-query';
// import FilterModal from '../components/FilterModal';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';
// import { getAvailableVehicles, Vehicle } from '../api/auth';

// type SearchResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;
// type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

// const SearchResultsPage: React.FC = () => {
//   const route = useRoute<SearchResultsRouteProp>();
//   const navigation = useNavigation<SearchResultsNavigationProp>();
//   const { location, startDate, endDate, isWithDriver, isSelfDrive } = route.params || {
//     location: 'Majestic Bus Stand Ra...',
//     startDate: new Date().toISOString(),
//     endDate: new Date().toISOString(),
//     isWithDriver: true,
//     isSelfDrive: false,
//   };

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
//     queryKey: ['availableVehicles', location, startDate, endDate, isWithDriver, filters],
//     queryFn: () =>
//       getAvailableVehicles({
//         page: 1,
//         limit: 10,
//         search: location,
//         startDate,
//         endDate,
//         driver: isWithDriver,
//         carType: filters.carType,
//         transmission: filters.transmission,
//         fuelType: filters.fuelType,
//         seats: filters.seats,
//       }),
//   });

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
//     return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
//   };

//   const handleView = (carId: number) => {
//     navigation.navigate('CarDetails', { carId });
//   };

//   const handleApplyFilters = (newFilters: typeof filters) => {
//     setFilters(newFilters);
//     console.log('Applied filters:', newFilters);
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     Alert.alert('Error', 'Failed to load vehicles. Please try again.');
//     return (
//       <View style={styles.container}>
//         <Text>Error loading vehicles: {(error as Error).message}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerCard}>
//         <View style={styles.headerTopRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="#900" />
//           </TouchableOpacity>
//           <Text style={styles.locationText} numberOfLines={1}>
//             Showing {data?.vehicles.length || 0} cars at
//             {'\n'}
//             <Text style={styles.locationBold}>{location}</Text>
//           </Text>
//           <View style={styles.dateBox}>
//             <Text style={styles.dateBoxText}>
//               {formatDate(startDate)} - {formatDate(endDate)}
//             </Text>
//             <Text style={styles.dateBoxText}>
//               {formatTime(startDate)} - {formatTime(endDate)}
//             </Text>
//           </View>
//         </View>
//       </View>

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

//       <View style={styles.titleDivider}>
//         <View style={styles.line} />
//         <Text style={styles.titleText}>{data?.vehicles.length || 0} CARS NEAR YOU</Text>
//         <View style={styles.line} />
//       </View>

//       {data?.vehicles.length === 0 && (
//         <Text style={styles.noCarsText}>No cars available for the selected criteria.</Text>
//       )}

//       {data?.vehicles.map((car: Vehicle) => {
//         // Get the first image URL from the images object
//         const imageUrl = car.images ? Object.values(car.images)[0] : '/assets/default-car.png';
//         return (
//           <View key={car.id} style={styles.carCard}>
//             <Image
//               source={imageUrl.startsWith('/Uploads') ? { uri: `http://192.168.1.8:5000${imageUrl}` } : require('../../assets/car1.png')}
//               style={styles.carImage}
//             />
//             <View style={styles.carInfo}>
//               <View>
//                 <Text style={styles.carName}>{car.name}</Text>
//                 <Text style={styles.carPrice}>₹{car.pricePerDay}/day</Text>
//                 <Text style={styles.carDetails}>
//                   {car.transmission} | {car.fuel} | Seat - {car.seats}
//                 </Text>
//               </View>
//               <TouchableOpacity style={styles.viewButton} onPress={() => handleView(car.id)}>
//                 <Text style={styles.viewButtonText}>VIEW</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         );
//       })}

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
//   noCarsText: { textAlign: 'center', fontSize: 16, color: '#555', marginVertical: 20 },
// });

// export default SearchResultsPage;




import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import FilterModal from '../components/FilterModal';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigation';
import { getAvailableVehicles } from '../api/vehicles';
import { useAuth } from '../context/AuthContext';

type SearchResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchResults'>;
type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

const SearchResultsPage: React.FC = () => {
  const route = useRoute<SearchResultsRouteProp>();
  const navigation = useNavigation<SearchResultsNavigationProp>();
  const { isLoggedIn } = useAuth();
  const { location = 'Majestic Bus Stand', startDate = new Date().toISOString(), endDate = new Date().toISOString(), isWithDriver } = route.params || {};

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    distance: 45,
    price: 1000,
    carType: '',
    transmission: '',
    fuelType: '',
    seats: '',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['vehicles', location, startDate, endDate, isWithDriver, filters],
    queryFn: () => getAvailableVehicles(location, startDate, endDate, isWithDriver, 1, 10),
    enabled: isLoggedIn,
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())){
      return 'Invalid Date';
    }
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())){
      return '';
    }
    const date = new Date(dateStr);
    return `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  };

  // const handleView = (carId: number) => {
  //   navigation.navigate('CarDetails', { carId });
  // };
  const handleView = (carId: number) => {
  navigation.navigate('CarDetails', {
    carId,
    startDate: route.params?.startDate,
    endDate: route.params?.endDate,
    isWithDriver: route.params?.isWithDriver,
  });
};

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    console.log('Applied filters:', newFilters);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please log in to view available cars.</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login', { redirectTo: { screen: 'SearchResults', params: route.params } })}
        >
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
        <Text style={styles.errorText}>Error loading cars: {(error as any).message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#900" />
          </TouchableOpacity>
          <Text style={styles.locationText} numberOfLines={1}>
            Showing {data?.total || 0} cars at
            {'\n'}
            <Text style={styles.locationBold}>{location}</Text>
          </Text>
          <View style={styles.dateBox}>
            <Text style={styles.dateBoxText}>{formatDate(startDate)} - {formatDate(endDate)}</Text>
            <Text style={styles.dateBoxText}>
              {formatTime(startDate)} - {formatTime(endDate)}
            </Text>
          </View>
        </View>
      </View>

      {/* Search + Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputBox}>
          <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for your rides"
            placeholderTextColor="#aaa"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
          <Text style={styles.filterText}>Filter</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Cars Nearby Title */}
      <View style={styles.titleDivider}>
        <View style={styles.line} />
        <Text style={styles.titleText}>{data?.total || 0} CARS NEAR YOU</Text>
        <View style={styles.line} />
      </View>

      {/* Cars List */}
      {data?.vehicles.map((car) => (
        <View key={car.id} style={styles.carCard}>
          <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
          <View style={styles.carInfo}>
            <View>
              <Text style={styles.carName}>{car.name}</Text>
              <Text style={styles.carPrice}>{car.pricePer10Km}</Text>
              <Text style={styles.carDetails}>{`${car.transmission} | ${car.fuelType} | Seat - ${car.seats}`}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleView(car.id)}
            >
              <Text style={styles.viewButtonText}>VIEW</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <FilterModal
        isVisible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
        initialDistance={filters.distance}
        initialPrice={filters.price}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    elevation: 2,
  },
  headerTopRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { flex: 1, fontSize: 14, color: '#333', marginLeft: 10 },
  locationBold: { fontWeight: 'bold', fontSize: 16 },
  dateBox: {
    backgroundColor: '#900',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'flex-end',
  },
  dateBoxText: { color: '#fff', fontSize: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  searchInputBox: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    paddingLeft: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  filterButton: {
    flexDirection: 'row',
    backgroundColor: '#900',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },
  titleDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  titleText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#900',
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  carImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  carInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  carPrice: { color: '#900', fontWeight: 'bold', fontSize: 14 },
  carDetails: { fontSize: 12, color: '#555', marginTop: 2 },
  viewButton: {
    backgroundColor: '#900',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  viewButtonText: { color: '#fff', fontSize: 14 },
  errorText: { color: '#900', fontSize: 16, textAlign: 'center', marginTop: 20 },
  loginButton: {
    backgroundColor: '#006400',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default SearchResultsPage;
