import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigation";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import { baseURL } from "../../constant/Base_Url";

const { width } = Dimensions.get('window');

const ExperienceDriver = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedKeyword, setSelectedKeyword] = useState("All");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [driversData, setDriversData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );

    if (latitude && longitude) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocation(data.display_name || "Unknown Location");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getExperienceDrivers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/drivers?page=${page}&limit=10&search=${searchQuery}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Experience Drivers Data:", response.data.data.drivers);
      const newDrivers = response.data.data.drivers || [];
      setDriversData((prevData: any) =>
        page === 1 ? newDrivers : [...prevData, ...newDrivers]
      );
      setTotalPages(response.data.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching experience drivers:", err);
      Alert.alert(
        "Error",
        "Failed to fetch experience drivers. Please try again later.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const fetchMoreDrivers = () => {
    if (!isFetchingMore && page < totalPages) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    getLocation();
    setDriversData([]);
    setPage(1);
    getExperienceDrivers();
  }, [selectedKeyword]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setDriversData([]);
      setPage(1);
      getExperienceDrivers();
    }, 500);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) {
      getExperienceDrivers();
    }
  }, [page]);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  };

  if (isLoading && driversData.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  const handleDriverPress = (driverId: number) => {
    navigation.navigate("DriverDetails", { driverId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Experience Driver</Text>
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {location || "Getting location..."}
            </Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>CABCAR</Text>
          <Text style={styles.subtitle}>Available All Experienced Drivers</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or location..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Driver Cards */}
        <Text style={styles.sectionTitle}>Available Drivers</Text>
        
        <FlatList
          scrollEnabled={false}
          data={driversData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => handleDriverPress(item.id)}
              android_ripple={{ color: "#f0f0f0" }}
            >
              <View style={styles.cardContent}>
                <Image
                  source={{
                    uri: item.image?.url || "https://via.placeholder.com/100",
                  }}
                  style={styles.avatar}
                />
                
                <View style={styles.driverInfo}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={[
                      styles.availabilityBadge,
                      item.available ? styles.available : styles.unavailable
                    ]}>
                      <Text style={styles.availabilityText}>
                        {item.available ? "Available" : "Booked"}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.detailsRow}>
                    <Icon name="time-outline" size={14} color="#555" />
                    <Text style={styles.detailsText}>
                      {item.experienceYears} years experience
                    </Text>
                  </View>
                  
                  <View style={styles.detailsRow}>
                    <Icon name="card-outline" size={14} color="#555" />
                    <Text style={styles.detailsText}>
                      {item.licenseNumber || "License not specified"}
                    </Text>
                  </View>
                  
                  <View style={styles.detailsRow}>
                    <Icon name="location-outline" size={14} color="#555" />
                    <Text style={styles.detailsText} numberOfLines={1} ellipsizeMode="tail">
                      {item.location || "Location not specified"}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.ratingContainer}>
                  <View style={styles.ratingBox}>
                    {/* <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>4.5</Text> */}
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          )}
          onEndReached={fetchMoreDrivers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  locationContainer: {
    flex: 1,
    marginLeft: 16,
  },
  locationLabel: {
    fontSize: 12,
    color: "#888",
  },
  locationText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
    maxWidth: width - 100,
  },
  titleContainer: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#006400",
    fontStyle: "italic",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#006400",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#006400",
  },
  driverInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#006400",
    marginRight: 8,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  available: {
    backgroundColor: "#e6f7ee",
  },
  unavailable: {
    backgroundColor: "#ffebee",
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: "500",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  detailsText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 6,
    flexShrink: 1,
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8e1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffe0b2",
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "600",
    color: "#ff9800",
  },
  viewButton: {
    backgroundColor: "#006400",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default ExperienceDriver;