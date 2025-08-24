
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  PermissionsAndroid,
  Platform,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Geolocation from "@react-native-community/geolocation";       
import { startBackgroundLocation, getIsRunning,type Location } from "../../backgroundlocation/BackgroundLocation";
const Splash = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // FIX: create animations once
  const spinValue = useRef(new Animated.Value(0)).current;
  const positionValue = useRef(new Animated.Value(0)).current;

  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [placeName, setPlaceName] = useState("");
  const [running, setRunning] = useState(getIsRunning());
    const [last, setLast] = useState<Location | null>(null);
  

  const startAnimationsAndNavigate = () => {
    // Car rotation animation (360 degrees)
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Car movement animation (left to right)
    Animated.timing(positionValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Navigate after animations complete
    setTimeout(() => {
      navigation.replace("Main", { screen: "Home" });
    }, 2000);
  };

  /** ANDROID 13+ (API 33): ask for posting notifications so foreground service notifications can show */
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
        async(position) => {
          console.log("getCurrentPosition==>>:", position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          startAnimationsAndNavigate();
        },
        (error) => {
          console.log("getCurrentPosition error:", error);
          // Don’t hang on splash. Continue anyway.
          setTimeout(startAnimationsAndNavigate, 800);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (e) {
      console.log("Permissions flow error:", e);
      setTimeout(startAnimationsAndNavigate, 800);
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

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const moveX = positionValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 300],
  });
  useEffect(()=>{
 const backgroundloc = async() =>{
 const ok = await startBackgroundLocation(loc => setLast(loc));
     if (ok) {
       setRunning(true);
       //if (Platform.OS === 'android') promptBatteryOptimizationsHint();
     }

 }
 if(latitude&&longitude)
 {
  backgroundloc();
 }
    
  },[latitude,longitude])

  return (
    <>
      {locationPermission ? (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>Cab Car</Text>
            <Text style={styles.subtitle}>Self-Drive Car Rental</Text>
          </View>

          <Animated.View
            style={[
              styles.carContainer,
              { transform: [{ translateX: moveX }, { rotate: spin }] },
            ]}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Premium Car Rental Service</Text>
          </View>
        </View>
      ) : (
        <View style={styles.permissionContainer}>
          <View style={styles.warningCircle}>
            <Text style={styles.warningText}>!</Text>
          </View>

          <Text style={styles.permissionTitle}>Location Access Needed</Text>
          <Text style={styles.permissionMessage}>
            To proceed, please allow location access to enhance your experience.
          </Text>

          <TouchableOpacity
            style={styles.permissionButton}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.permissionButtonText}>Open Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006400", // Dark green
  },
  logoContainer: { alignItems: "center", marginBottom: 50 },
  title: { fontSize: 36, fontWeight: "bold", color: "#FFFFFF", marginBottom: 8 },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  carContainer: { position: "absolute", width: 100, height: 100 },
  carImage: { width: "100%", height: "100%", resizeMode: "contain" },
  footer: { position: "absolute", bottom: 40 },
  footerText: { fontSize: 16, color: "#FFFFFF", opacity: 0.7 },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006400",
    paddingHorizontal: 30,
  },
  warningCircle: {
    width: 70,
    height: 70,
    borderRadius: 35, 
    backgroundColor: "#90EE90",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  warningText: { fontSize: 36, color: "#006400", fontWeight: "bold" },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  permissionMessage: {
    fontSize: 16,
    color: "#f8f8f8",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
    opacity: 0.9,
  },
  permissionButton: {
    backgroundColor: "#90EE90",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  permissionButtonText: { fontSize: 16, fontWeight: "600", color: "#006400" },
});

export default Splash;
