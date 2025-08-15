
import React, { useEffect,useState } from 'react';
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
import TermCondition from './src/screens/termcondition/TermCondition';
import PrivacyPolicy from './src/screens/policy/PrivacyPolicy';
import ReturnPolicy from './src/screens/policy/ReturnPolicy';
import Splash from './src/screens/splash/Splash';
import ExperienceDriver from './src/screens/experiencesdriver/ExperienceDriver';
import  DriverDetails from './src/screens/experiencesdriver/DriverDetails';
import { startBackgroundLocation ,getIsRunning,type Location} from './src/backgroundlocation/BackgroundLocation';
import { Platform,PermissionsAndroid,Linking,Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';


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
  TermCondition: undefined;
  PrivacyPolicy: undefined;
  ReturnPolicy: undefined;
  EditProfile: undefined;
  Payment: { carId: number; carName: string; price: string; startDate: string; endDate: string };
  MobileVerification: undefined;
  MyTrips: undefined;
  Splash: undefined;
  LoyaltyRewards: undefined;
  ViewDetails: { carId: number; startDate?: string; endDate?: string };
ExperienceDriver: undefined;
DriverDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
    const [locationPermission, setLocationPermission] = useState<boolean>(false);
     const [latitude, setLatitude] = useState<number>(0);
     console.log("latitude",latitude);
     const [longitude, setLongitude] = useState<number>(0);
     const [placeName, setPlaceName] = useState("");
     const [running, setRunning] = useState(getIsRunning());
       const [last, setLast] = useState<Location | null>(null);
       console.log("running",running);
       console.log("last",last);  
     
     
const requestPostNotificationsIfNeeded = async () => {
    if (Platform.OS !== "android") return;
    if (Platform.Version < 33) return;
    try {
      // @ts-ignore: Some RN types don’t include this constant, but it exists on Android 13+
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    } catch {
      // no-op
    }
  };

  /** Foreground location request (FINE + COARSE) */
  const requestForegroundLocation = async (): Promise<boolean> => {
    if (Platform.OS !== "android") return true;

    const fine = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "This app needs access to your location.",
        buttonPositive: "OK",
        buttonNegative: "Cancel",
      }
    );
    const coarse = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    const ok =
      fine === PermissionsAndroid.RESULTS.GRANTED &&
      coarse === PermissionsAndroid.RESULTS.GRANTED;

    if (!ok) {
      Alert.alert(
        "Permission required",
        "Please allow location access in Settings.",
        [
          { text: "Open Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }

    return ok;
  };

  /** Background location request (Android 10+/API 29+) — must be after foreground is granted */
  const requestBackgroundLocation = async (): Promise<boolean> => {
    if (Platform.OS !== "android") return true;
    if (Platform.Version < 29) return true;

    const bg = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: "Background Location",
        message: "Allow background location so the app can work when closed.",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      }
    );

    const ok = bg === PermissionsAndroid.RESULTS.GRANTED;
    if (!ok) {
      // On Android 11+ users often must flip to “Allow all the time” in Settings
      Alert.alert(
        'Allow "All the time"',
        'For full background updates, set Location to "Allow all the time" in Settings.',
        [
          { text: "Open Settings", onPress: () => Linking.openSettings() },
          { text: "Later", style: "cancel" },
        ]
      );
    }
    return ok;
  };

  const requestPermissionsAndLoad = async () => {
    try {
      if (Platform.OS === "android") {
        await requestPostNotificationsIfNeeded();

        const foreground = await requestForegroundLocation();
        if (!foreground) {
          setLocationPermission(false);
          return; // show your "Open Settings" UI
        }

        // We try to get background too (best effort). Even if it's denied,
        // we still proceed to get current position and navigate.
        await requestBackgroundLocation();

        setLocationPermission(true);
      }

      // Get a single location fix so you can reverse-geocode & show something useful
      Geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log("getCurrentPosition error:", error);
          // Don’t hang on splash. Continue anyway.
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (e) {
      console.log("Permissions flow error:", e);
    }
  };

  useEffect(() => {
    requestPermissionsAndLoad();
  }, []);

  useEffect(() => {
    if (latitude && longitude) getPlaceName();
  }, [latitude, longitude]);

  const getPlaceName = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setPlaceName(data?.display_name || "");
    } catch (error) {
      console.error("Error fetching place name:", error);
    }
  };

 
  useEffect(()=>{
 const backgroundloc = async() =>{
 const ok = await startBackgroundLocation((loc) =>{ 
  console.log("latitude and longitude:",loc);
  setLast(loc)});
     if (ok) {
       setRunning(true);
       //if (Platform.OS === 'android') promptBatteryOptimizationsHint();
     }

 }
  backgroundloc();
 
    
  },[latitude,longitude])


  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{
               headerShown: false 
               
            }}>
              <Stack.Screen name="Splash" component={Splash} />
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
              <Stack.Screen name="TermCondition" component={TermCondition} />
              <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}/>
              <Stack.Screen name='ReturnPolicy' component={ReturnPolicy}/>
              <Stack.Screen name='ExperienceDriver' component={ExperienceDriver}/>
              <Stack.Screen name='DriverDetails' component={DriverDetails}/>
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}