// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import DatePickerModal from '../components/DatePickerModal';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/navigation';

// type TabParamList = {
//   Home: { location?: string } | undefined;
//   'My Trips': undefined;
//   Profile: undefined;
//   Notification: undefined;
// };

// type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
// type HomeScreenRouteProp = RouteProp<TabParamList, 'Home'>;

// type CustomCheckboxProps = {
//   label: string;
//   initialChecked?: boolean;
// };

// const CustomCheckbox = ({ label, initialChecked = false }: CustomCheckboxProps) => {
//   const [isChecked, setIsChecked] = useState(initialChecked);
//   return (
//     <TouchableOpacity
//       style={styles.checkboxContainer}
//       onPress={() => setIsChecked(!isChecked)}
//     >
//       <Ionicons
//         name={isChecked ? 'checkbox-outline' : 'square-outline'}
//         size={24}
//         color="#900"
//       />
//       <Text style={styles.checkboxLabel}>{label}</Text>
//     </TouchableOpacity>
//   );
// };

// const HomeScreen: React.FC = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>();
//   const route = useRoute<HomeScreenRouteProp>();
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const [dateField, setDateField] = useState<'start' | 'end' | null>(null);

//   useEffect(() => {
//     const { location } = route.params || {};
//     if (location) {
//       console.log('HomeScreen route.params:', route.params);
//       setSelectedLocation(location);
//     }
//   }, [route.params]);

//   console.log('HomeScreen rendering, selectedLocation:', selectedLocation, 'startDate:', startDate, 'endDate:', endDate);

//   const showDatePicker = (field: 'start' | 'end') => {
//     setDateField(field);
//     setDatePickerVisible(true);
//   };

//   const handleSelectDates = (newStartDateStr: string, newEndDateStr: string) => {
//     console.log('Selected dates with time for field:', { dateField, newStartDateStr, newEndDateStr });
//     const newStartDate = newStartDateStr ? new Date(newStartDateStr) : null;
//     const newEndDate = newEndDateStr ? new Date(newEndDateStr) : null;

//     if (newStartDate && !isNaN(newStartDate.getTime())) {
//       if (dateField === 'start' || dateField === null) {
//         setStartDate(newStartDate);
//       }
//     }
//     if (newEndDate && !isNaN(newEndDate.getTime())) {
//       if (dateField === 'end') {
//         setEndDate(newEndDate);
//       }
//     }
//     setDatePickerVisible(false);
//   };

//   const formatDateTime = (date: Date | null) => {
//     if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
//       return '';
//     }
//     return `${date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
//   };

//   const handleSearch = () => {
//     if (selectedLocation && startDate && endDate) {
//       if (startDate instanceof Date && !isNaN(startDate.getTime()) && endDate instanceof Date && !isNaN(endDate.getTime())) {
//         navigation.navigate('SearchResults', {
//           location: selectedLocation,
//           startDate: startDate.toISOString(),
//           endDate: endDate.toISOString(),
//         });
//       } else {
//         console.warn('Invalid startDate or endDate:', { startDate, endDate });
//       }
//     } else {
//       console.warn('Please select location and date range before searching');
//     }
//   };

//   const handleViewCar = (carId: number) => {
//     navigation.navigate('CarDetails', { carId });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Banner */}
//       <View style={styles.banner}>
//         <Image source={require('../../assets/banner.png')} style={styles.bannerImage} />
//         <Text style={styles.bannerText}>Your Journey, Your Ride, Your Way</Text>
//       </View>

//       {/* Search Box */}
//       <View style={styles.searchBox}>
//         <TouchableOpacity onPress={() => navigation.navigate('LocationPicker')}>
//           <TextInput
//             placeholder="Search for the location"
//             style={styles.input}
//             value={selectedLocation}
//             editable={false}
//             pointerEvents="none"
//             placeholderTextColor="#888"
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => showDatePicker('start')}>
//           <TextInput
//             placeholder="Trip start"
//             style={styles.input}
//             value={formatDateTime(startDate)}
//             editable={false}
//             pointerEvents="none"
//             placeholderTextColor="#888"
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => showDatePicker('end')}>
//           <TextInput
//             placeholder="Trip end"
//             style={styles.input}
//             value={formatDateTime(endDate)}
//             editable={false}
//             pointerEvents="none"
//             placeholderTextColor="#888"
//           />
//         </TouchableOpacity>
//         <CustomCheckbox label="With Driver" initialChecked={true} />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Text style={styles.searchButtonText}>SEARCH</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Why Carrazo Section */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>WHY CARRAZO ?</Text>
//         <View style={styles.features}>
//           <View style={styles.featureCard}>
//             <FontAwesome5 name="shield-alt" size={24} color="#900" />
//             <Text style={styles.featureText}>100% Hassle Free Secured Trip</Text>
//           </View>
//           <View style={styles.featureCard}>
//             <MaterialIcons name="delivery-dining" size={24} color="#900" />
//             <Text style={styles.featureText}>Delivery Anywhere Anytime</Text>
//           </View>
//           <View style={styles.featureCard}>
//             <Ionicons name="time" size={24} color="#900" />
//             <Text style={styles.featureText}>Endless Pay by hour drive</Text>
//           </View>
//         </View>
//       </View>

//       {/* Best Deals */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>BEST DEALS FOR YOU...</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carList}>
//           {[
//             { id: 1, name: 'Kia Seltos', price: '₹400 / 10km', tags: 'Manual | Petrol | Seat: 6', image: require('../../assets/car1.png') },
//             { id: 2, name: 'Hyundai Creta', price: '₹450 / 10km', tags: 'Automatic | Diesel | Seat: 7', image: require('../../assets/car1.png') },
//             { id: 3, name: 'Hyundai Creta', price: '₹450 / 10km', tags: 'Automatic | Diesel | Seat: 7', image: require('../../assets/car1.png') },
//             { id: 4, name: 'Hyundai Creta', price: '₹450 / 10km', tags: 'Automatic | Diesel | Seat: 7', image: require('../../assets/car1.png') },
//           ].map((car) => (
//             <View key={car.id} style={styles.carCard}>
//               <Image source={car.image} style={styles.carImage} />
//               <Text style={styles.carTitle}>{car.name}</Text>
//               <Text style={styles.carPrice}>{car.price}</Text>
//               <Text style={styles.carTags}>{car.tags}</Text>
//               <TouchableOpacity
//                 style={styles.viewButton}
//                 onPress={() => handleViewCar(car.id)}
//               >
//                 <Text style={styles.viewText}>VIEW</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Why We Are Best */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>WHY WE ARE THE BEST !</Text>
//         <Image source={require('../../assets/red-car.png')} style={styles.redCar} />
//         <View style={styles.benefits}>
//           <View style={styles.benefitContainer}>
//             <View style={styles.benefitHeader}>
//               <Text style={styles.emoji}>🚗</Text>
//               <Text style={[styles.benefit]}>Best Price Guaranteed</Text>
//             </View>
//             <Text style={styles.benefitSubtext}>Get the lowest price in your location</Text>
//           </View>
//           <View style={styles.benefitContainer}>
//             <View style={styles.benefitHeader}>
//               <Text style={styles.emoji}>👨‍✈️</Text>
//               <Text style={styles.benefit}>Experienced Driver</Text>
//             </View>
//             <Text style={styles.benefitSubtext}>Don't drive your car I will provide best experience driver</Text>
//           </View>
//           <View style={styles.benefitContainer}>
//             <View style={styles.benefitHeader}>
//               <Text style={styles.emoji}>🧼</Text>
//               <Text style={styles.benefit}>Clean & Hygienic Cars</Text>
//             </View>
//             <Text style={styles.benefitSubtext}>
//               The cleanest car you can ride.{'\n'}We clean before and after the delivery
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Testimonials */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>CUSTOMER TESTIMONIAL</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonials}>
//           {[1, 2].map((item, i) => (
//             <View key={i} style={styles.testimonialCard}>
//               <Image source={require('../../assets/testimonial1.png')} style={styles.testimonialImage} />
//               <Text style={styles.testimonialText}>Smooth & hassle-free booking. Loved it!</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </View>

//       <DatePickerModal
//         isVisible={isDatePickerVisible}
//         onClose={() => setDatePickerVisible(false)}
//         onSelectDates={handleSelectDates}
//         initialStartDate={startDate ? startDate.toISOString().split('T')[0] : null}
//         initialEndDate={endDate ? endDate.toISOString().split('T')[0] : null}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   banner: { alignItems: 'center', padding: 16, backgroundColor: '#fff0f0' },
//   bannerImage: { width: 300, height: 100, resizeMode: 'contain' },
//   bannerText: { fontSize: 18, fontWeight: 'bold', color: '#900', marginTop: 10 },
//   searchBox: { padding: 16, backgroundColor: '#fff', marginBottom: 8 },
//   input: {
//     backgroundColor: '#f3f3f3',
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     height: 50,
//     width: '100%',
//   },
//   checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
//   checkboxLabel: { marginLeft: 8, fontSize: 16, color: '#333' },
//   searchButton: {
//     backgroundColor: '#900',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//     height: 50,
//   },
//   searchButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
//   sectionContainer: { paddingHorizontal: 16, marginTop: 20 },
//   sectionTitle: { fontSize: 16, fontWeight: 'bold' },
//   features: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
//   featureCard: { alignItems: 'center', width: 100 },
//   featureText: { textAlign: 'center', marginTop: 8, fontSize: 12 },
//   carList: { paddingHorizontal: 16, paddingVertical: 10 },
//   carCard: {
//     width: 160,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 2,
//     marginVertical: 10,
//     marginRight: 10,
//   },
//   carImage: { width: '100%', height: 90, resizeMode: 'cover', borderRadius: 8 },
//   carTitle: { fontWeight: 'bold', fontSize: 14, marginTop: 8 },
//   carPrice: { color: '#900', fontWeight: 'bold' },
//   carTags: { fontSize: 12, color: '#555' },
//   viewButton: { backgroundColor: '#900', padding: 6, borderRadius: 6, marginTop: 8 },
//   viewText: { color: '#fff', textAlign: 'center', fontSize: 12 },
//   redCar: { width: 439, height: 190, alignSelf: 'center', marginTop: 20, marginBottom: 10, resizeMode: 'contain' },
//   benefits: { padding: 24 },
//   benefitContainer: {
//     marginBottom: 24,
//     alignItems: 'center',
//     backgroundColor: '#fff0f0',
//     borderRadius: 10,
//     padding: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   benefitHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
//   emoji: { fontSize: 20, paddingRight: 8 },
//   benefit: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.1)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   benefitSubtext: { fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 20 },
//   testimonials: { padding: 16 },
//   testimonialCard: { backgroundColor: '#ffecec', borderRadius: 12, padding: 12, marginRight: 10, width: 200 },
//   testimonialImage: { width: 100, height: 80, borderRadius: 8 },
//   testimonialText: { fontSize: 13, marginTop: 8 },
// });

// export default HomeScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePickerModal from '../components/DatePickerModal';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigation';

type TabParamList = {
  Home: { location?: string } | undefined;
  'My Trips': undefined;
  Profile: undefined;
  Notification: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type HomeScreenRouteProp = RouteProp<TabParamList, 'Home'>;

type CustomCheckboxProps = {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

const CustomCheckbox = ({ label, isChecked, onChange }: CustomCheckboxProps) => {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onChange(!isChecked)}
    >
      <Ionicons
        name={isChecked ? 'checkbox-outline' : 'square-outline'}
        size={24}
        color="#900"
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [dateField, setDateField] = useState<'start' | 'end' | null>(null);
  const [isWithDriver, setIsWithDriver] = useState(true);
  const [isSelfDrive, setIsSelfDrive] = useState(false);

  useEffect(() => {
    const { location } = route.params || {};
    if (location) {
      console.log('HomeScreen route.params:', route.params);
      setSelectedLocation(location);
    }
  }, [route.params]);

  console.log('HomeScreen rendering, selectedLocation:', selectedLocation, 'startDate:', startDate, 'endDate:', endDate);

  const showDatePicker = (field: 'start' | 'end') => {
    setDateField(field);
    setDatePickerVisible(true);
  };

  const handleSelectDates = (newStartDateStr: string, newEndDateStr: string) => {
    console.log('Selected dates with time for field:', { dateField, newStartDateStr, newEndDateStr });
    const newStartDate = newStartDateStr ? new Date(newStartDateStr) : null;
    const newEndDate = newEndDateStr ? new Date(newEndDateStr) : null;

    if (newStartDate && !isNaN(newStartDate.getTime())) {
      if (dateField === 'start' || dateField === null) {
        setStartDate(newStartDate);
      }
    }
    if (newEndDate && !isNaN(newEndDate.getTime())) {
      if (dateField === 'end') {
        setEndDate(newEndDate);
      }
    }
    setDatePickerVisible(false);
  };

  const formatDateTime = (date: Date | null) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }
    return `${date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  };

  const handleWithDriverChange = (newValue: boolean) => {
    setIsWithDriver(newValue);
    if (newValue) {
      setIsSelfDrive(false);
    }
  };

  const handleSelfDriveChange = (newValue: boolean) => {
    setIsSelfDrive(newValue);
    if (newValue) {
      setIsWithDriver(false);
    }
  };

  const handleSearch = () => {
    if (selectedLocation && startDate && endDate) {
      if (startDate instanceof Date && !isNaN(startDate.getTime()) && endDate instanceof Date && !isNaN(endDate.getTime())) {
        navigation.navigate('SearchResults', {
          location: selectedLocation,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          isWithDriver,
          isSelfDrive,
        });
      } else {
        console.warn('Invalid startDate or endDate:', { startDate, endDate });
      }
    } else {
      console.warn('Please select location and date range before searching');
    }
  };

  const handleViewCar = (carId: number) => {
    navigation.navigate('CarDetails', { carId });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.companyNameContainer}>
          <Text style={styles.companyName}>
            <Text style={styles.companyNameCA}>CA</Text>
            <Text style={styles.companyNameRR}>RR</Text>
            <Text style={styles.companyNameAZO}>AZO</Text>
          </Text>
        </View>
        <View style={styles.bannerContent}>
          <View style={styles.textContainer}>
            <Text style={styles.bannerText}>Your Journey,</Text>
            <Text style={styles.bannerText}>Your Ride,</Text>
            <Text style={styles.bannerText}>Your Way</Text>
          </View>
          <Image source={require('../../assets/banner.png')} style={styles.bannerImage} />
        </View>
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <TouchableOpacity onPress={() => navigation.navigate('LocationPicker')}>
          <TextInput
            placeholder="Search for the location"
            style={styles.input}
            value={selectedLocation}
            editable={false}
            pointerEvents="none"
            placeholderTextColor="#888"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDatePicker('start')}>
          <TextInput
            placeholder="Trip start"
            style={styles.input}
            value={formatDateTime(startDate)}
            editable={false}
            pointerEvents="none"
            placeholderTextColor="#888"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDatePicker('end')}>
          <TextInput
            placeholder="Trip end"
            style={styles.input}
            value={formatDateTime(endDate)}
            editable={false}
            pointerEvents="none"
            placeholderTextColor="#888"
          />
        </TouchableOpacity>
        <View style={styles.checkboxRow}>
          <CustomCheckbox
            label="With Driver"
            isChecked={isWithDriver}
            onChange={handleWithDriverChange}
          />
          <CustomCheckbox
            label="Self Drive"
            isChecked={isSelfDrive}
            onChange={handleSelfDriveChange}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      {/* Why Carrazo Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>WHY CARRAZO ?</Text>
        <View style={styles.features}>
          <View style={styles.featureCard}>
            <FontAwesome5 name="shield-alt" size={24} color="#900" />
            <Text style={styles.featureText}>100% Hassle Free Secured Trip</Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialIcons name="delivery-dining" size={24} color="#900" />
            <Text style={styles.featureText}>Delivery Anywhere Anytime</Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="time" size={24} color="#900" />
            <Text style={styles.featureText}>Endless Pay by hour drive</Text>
          </View>
        </View>
      </View>

      {/* Best Deals */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>BEST DEALS FOR YOU...</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carList}>
          {[
            { id: 1, name: 'Kia Seltos', price: '₹400 / 10km', tags: 'Manual | Petrol | Seat: 6', image: require('../../assets/car1.png') },
            { id: 2, name: 'Hyundai Creta', price: '₹450 / 10km', tags: 'Automatic | Diesel | Seat: 7', image: require('../../assets/car1.png') },
            { id: 3, name: 'Hyundai Creta', price: '₹450 / 10km', tags: 'Automatic | Diesel | Seat: 7', image: require('../../assets/car1.png') },
            { id: 4, name: 'Hyundai Creta', price: '₹450 / 10km', tags: 'Automatic | Diesel | Seat: 7', image: require('../../assets/car1.png') },
          ].map((car) => (
            <View key={car.id} style={styles.carCard}>
              <Image source={car.image} style={styles.carImage} />
              <Text style={styles.carTitle}>{car.name}</Text>
              <Text style={styles.carPrice}>{car.price}</Text>
              <Text style={styles.carTags}>{car.tags}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewCar(car.id)}
              >
                <Text style={styles.viewText}>VIEW</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Why We Are Best */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>WHY WE ARE THE BEST !</Text>
        <Image source={require('../../assets/red-car.png')} style={styles.redCar} />
        <View style={styles.benefits}>
          <View style={styles.benefitContainer}>
            <View style={styles.benefitHeader}>
              <Text style={styles.emoji}>🚗</Text>
              <Text style={[styles.benefit]}>Best Price Guaranteed</Text>
            </View>
            <Text style={styles.benefitSubtext}>Get the lowest price in your location</Text>
          </View>
          <View style={styles.benefitContainer}>
            <View style={styles.benefitHeader}>
              <Text style={styles.emoji}>👨‍✈️</Text>
              <Text style={styles.benefit}>Experienced Driver</Text>
            </View>
            <Text style={styles.benefitSubtext}>Don't drive your car I will provide best experience driver</Text>
          </View>
          <View style={styles.benefitContainer}>
            <View style={styles.benefitHeader}>
              <Text style={styles.emoji}>🧼</Text>
              <Text style={styles.benefit}>Clean & Hygienic Cars</Text>
            </View>
            <Text style={styles.benefitSubtext}>
              The cleanest car you can ride.{'\n'}We clean before and after the delivery
            </Text>
          </View>
        </View>
      </View>

      {/* Testimonials */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>CUSTOMER TESTIMONIAL</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonials}>
          {[1, 2].map((item, i) => (
            <View key={i} style={styles.testimonialCard}>
              <Image source={require('../../assets/testimonial1.png')} style={styles.testimonialImage} />
              <Text style={styles.testimonialText}>Smooth & hassle-free booking. Loved it!</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <DatePickerModal
        isVisible={isDatePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        onSelectDates={handleSelectDates}
        initialStartDate={startDate ? startDate.toISOString().split('T')[0] : null}
        initialEndDate={endDate ? endDate.toISOString().split('T')[0] : null}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { padding: 16, backgroundColor: '#9B1B30', height: 450 },
  bannerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  companyNameContainer: {
    marginBottom: 10,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  companyNameCA: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
    color: '#000',
  },
  companyNameRR: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
    color: '#fff',
  },
  companyNameAZO: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
    color: '#000',
  },
  textContainer: { flexDirection: 'column' },
  bannerImage: { width: 400, height: 200, resizeMode: 'cover' },
  bannerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 24,
    marginBottom: 5,
    marginTop: 10,
    paddingLeft: 15,
    textTransform: 'uppercase',
  },
  searchBox: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 20,
    marginTop: -149,
    marginHorizontal: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#f3f3f3',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    height: 50,
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: { marginLeft: 8, fontSize: 16, color: '#333' },
  searchButton: {
    backgroundColor: '#900',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    height: 50,
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sectionContainer: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  features: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  featureCard: { alignItems: 'center', width: 100 },
  featureText: { textAlign: 'center', marginTop: 8, fontSize: 12 },
  carList: { paddingHorizontal: 16, paddingVertical: 10 },
  carCard: {
    width: 160,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 10,
    marginRight: 10,
  },
  carImage: { width: '100%', height: 90, resizeMode: 'cover', borderRadius: 8 },
  carTitle: { fontWeight: 'bold', fontSize: 14, marginTop: 8 },
  carPrice: { color: '#900', fontWeight: 'bold' },
  carTags: { fontSize: 12, color: '#555' },
  viewButton: { backgroundColor: '#900', padding: 6, borderRadius: 6, marginTop: 8 },
  viewText: { color: '#fff', textAlign: 'center', fontSize: 12 },
  redCar: { width: 439, height: 190, alignSelf: 'center', marginTop: 20, marginBottom: 10, resizeMode: 'contain' },
  benefits: { padding: 24 },
  benefitContainer: {
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  benefitHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  emoji: { fontSize: 20, paddingRight: 8 },
  benefit: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  benefitSubtext: { fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 20 },
  testimonials: { padding: 16 , backgroundColor: '#ffecec'},
  testimonialCard: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginRight: 10, width: 250 },
  testimonialImage: { width: 100, height: 80, borderRadius: 8 },
  testimonialText: { fontSize: 13, marginTop: 8 },
});

export default HomeScreen;
