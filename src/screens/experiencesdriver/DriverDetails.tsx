import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Dimensions,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigation";
import axios from "axios";
import { baseURL } from "../../constant/Base_Url";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const DriverDetails: React.FC = () => {
  const [driverDetails, setDriverDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { driverId } = useRoute().params as { driverId: number };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getDriverDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURL}/drivers/${driverId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDriverDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching driver details:", error);
      Alert.alert("Error", "Failed to load driver details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (driverId) {
      getDriverDetails();
    }
  }, [driverId]);

  const handleBookDriver = () => {
    Alert.alert(
      "Book Driver",
      `Are you sure you want to book ${driverDetails?.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Confirm", 
          onPress: () => {
            // Uncomment when booking functionality is implemented
            // navigation.navigate("Booking", { 
            //   driverId: driverDetails.id, 
            //   driverName: driverDetails.name 
            // });
            Alert.alert("Success", "Driver booked successfully!");
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar backgroundColor="#006400" />
        <ActivityIndicator size="large" color="#006400" />
        <Text style={styles.loadingText}>Loading driver details...</Text>
      </View>
    );
  }

  if (!driverDetails) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar backgroundColor="#006400" />
        <Icon name="alert-circle" size={50} color="#ff4444" />
        <Text style={styles.errorText}>Failed to load driver details</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={getDriverDetails}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#006400" />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#006400', '#228B22']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Driver Profile</Text>
        <View style={styles.headerRightPlaceholder} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: driverDetails.image?.url || "https://via.placeholder.com/150" }}
              style={styles.profileImage}
            />
            {driverDetails.available && (
              <View style={styles.availableBadge}>
                <Text style={styles.availableText}>AVAILABLE</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.name}>{driverDetails.name.replace(/"/g, "")}</Text>
          <Text style={styles.location}>
            <Icon name="location-outline" size={16} color="#666" /> 
            {driverDetails.location.replace(/"/g, "")}
          </Text>
          
          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>4.8 (120 reviews)</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Driver Information</Text>
          
          <View style={styles.detailRow}>
            <Icon name="card-outline" size={20} color="#006400" style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>License Number</Text>
              <Text style={styles.detailValue}>{driverDetails.licenseNumber || 'Not specified'}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="time-outline" size={20} color="#006400" style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Experience</Text>
              <Text style={styles.detailValue}>{driverDetails.experienceYears} years</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="shield-checkmark-outline" size={20} color="#006400" style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={[
                styles.detailValue,
                driverDetails.isActive ? styles.activeStatus : styles.inactiveStatus
              ]}>
                {driverDetails.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="car-sport-outline" size={20} color="#006400" style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Vehicle Type</Text>
              <Text style={styles.detailValue}>Sedan (Toyota Camry)</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>About Driver</Text>
          <Text style={styles.aboutText}>
            Professional driver with {driverDetails.experienceYears} years of experience. 
            Excellent knowledge of city routes and committed to providing safe and 
            comfortable rides. Fluent in English and Hindi.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Booking Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.bookButton,
            !driverDetails.available && styles.disabledButton
          ]} 
          onPress={handleBookDriver}
          disabled={!driverDetails.available}
        >
          <Text style={styles.bookButtonText}>
            {driverDetails.available ? "BOOK NOW" : "NOT AVAILABLE"}
          </Text>
          <Text style={styles.bookButtonSubtext}>
            {driverDetails.available ? "₹500/hour (minimum 2 hours)" : "Check back later"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  backButton: {
    padding: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#006400',
  },
  availableBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  availableText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  aboutCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailIcon: {
    marginRight: 15,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activeStatus: {
    color: '#4CAF50',
  },
  inactiveStatus: {
    color: '#F44336',
  },
  aboutText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    backgroundColor: '#006400',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginTop: 15,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#006400',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DriverDetails;