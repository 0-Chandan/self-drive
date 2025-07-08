// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { AuthProvider } from './src/context/AuthContext';
// import BottomTabNavigator from './src/navigation/BottomTabNavigator';
// import LocationPickerScreen from './src/screens/LocationPickerScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import SearchResultsPage from './src/screens/SearchResultsPage';
// import CarDetails from './src/screens/CarDetails';
// import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import DocumentsScreen from './src/screens/DocumentsScreen';
// import RatingsReviewScreen from './src/screens/RatingsReviewScreen';
// import SettingsScreen from './src/screens/SettingsScreen';
// import EditProfile from './src/screens/EditProfile';
// import PaymentScreen from './src/screens/PaymentScreen';
// import MobileVerificationScreen from './src/screens/MobileVerificationScreen';
// import MyTripsScreen from './src/screens/MyTripsScreen';
// import LoginScreen from './src/screens/LoginScreen';
// import SignUpScreen from './src/screens/SignUpScreen';
// import LoyaltyRewardsScreen from './src/screens/LoyaltyRewardsScreen';
// import { RootStackParamList } from './src/navigation/navigation';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// // Create one client for the whole app
// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SafeAreaProvider>
//         <AuthProvider>
//           <NavigationContainer>
//             <Stack.Navigator>
//               <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
//               <Stack.Screen name="LocationPicker" component={LocationPickerScreen} options={{ title: 'Pick a Location' }} />
//               <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//               <Stack.Screen name="SearchResults" component={SearchResultsPage} options={{ title: 'Search Results' }} />
//               <Stack.Screen name="CarDetails" component={CarDetails} options={{ title: 'Car Details' }} />
//               <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//               <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
//               <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ title: 'Verify OTP' }} />
//               <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//               <Stack.Screen name="Documents" component={DocumentsScreen} options={{ title: 'Documents' }} />
//               <Stack.Screen name="RatingsReview" component={RatingsReviewScreen} options={{ title: 'Ratings and review' }} />
//               <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
//               <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }} />
//               <Stack.Screen name="Payment" component={PaymentScreen} />
//               <Stack.Screen name="MobileVerification" component={MobileVerificationScreen} options={{ title: 'Mobile Verification' }} />
//               <Stack.Screen name="MyTrips" component={MyTripsScreen} options={{ title: 'My Trips' }} />
//               <Stack.Screen name="LoyaltyRewards" component={LoyaltyRewardsScreen} options={{ title: 'Loyalty Rewards' }} />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </AuthProvider>
//       </SafeAreaProvider>
//     </QueryClientProvider>
//   );
// }




import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './src/context/AuthContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import LocationPickerScreen from './src/screens/LocationPickerScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchResultsPage from './src/screens/SearchResultsPage';
import CarDetails from './src/screens/CarDetails';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import RatingsReviewScreen from './src/screens/RatingsReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import EditProfile from './src/screens/EditProfile';
import PaymentScreen from './src/screens/PaymentScreen';
import MobileVerificationScreen from './src/screens/MobileVerificationScreen';
import MyTripsScreen from './src/screens/MyTripsScreen';
import LoginScreen from './src/screens/LoginScreen';
import LoyaltyRewardsScreen from './src/screens/LoyaltyRewardsScreen';
import ViewDetailsPage from './src/screens/ViewDetailsPage';

export type RootStackParamList = {
  Main: undefined;
  LocationPicker: undefined;
  Home: undefined;
  SearchResults: { location?: string; startDate?: string; endDate?: string };
  CarDetails: { carId: number };
  Login: { redirectTo?: { screen: string; params?: any } };
  SignUp: undefined;
  OTPVerification: { mobileNumber: string; redirectTo?: { screen: string; params?: any } };
  Profile: undefined;
  Documents: undefined;
  RatingsReview: { bookingId: number };
  Settings: undefined;
  EditProfile: undefined;
  Payment: { carId: number; carName: string; price: string; startDate: string; endDate: string };
  MobileVerification: undefined;
  MyTrips: undefined;
  LoyaltyRewards: undefined;
  ViewDetails: { carId: number; startDate?: string; endDate?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="LocationPicker" component={LocationPickerScreen} options={{ title: 'Pick a Location' }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SearchResults" component={SearchResultsPage} options={{ title: 'Search Results' }} />
              <Stack.Screen name="CarDetails" component={CarDetails} options={{ title: 'Car Details' }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              {/* <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} /> */}
              <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ title: 'Verify OTP' }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Documents" component={DocumentsScreen} options={{ title: 'Documents' }} />
              <Stack.Screen name="RatingsReview" component={RatingsReviewScreen} options={{ title: 'Ratings and Review' }} />
              <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
              <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }} />
              <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
              <Stack.Screen name="MobileVerification" component={MobileVerificationScreen} options={{ title: 'Mobile Verification' }} />
              <Stack.Screen name="MyTrips" component={MyTripsScreen} options={{ title: 'My Trips' }} />
              <Stack.Screen name="LoyaltyRewards" component={LoyaltyRewardsScreen} options={{ title: 'Loyalty Rewards' }} />
              <Stack.Screen name="ViewDetails" component={ViewDetailsPage} options={{ title: 'View Details' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}