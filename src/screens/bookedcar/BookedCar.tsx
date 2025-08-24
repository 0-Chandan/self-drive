import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  ListRenderItem
} from 'react-native';
import axios from 'axios';
import { baseURL } from '../../constant/Base_Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define TypeScript interfaces
interface Car {
  id: number;
  carName?: string;
  carImage?: string;
  status: string;
  pickupDate: string;
  returnDate: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  driver: boolean;
  address?: string | null;
  customerId: number;
  createdAt: string;
  updatedAt: string;
  vehicleId: number;
  razarPayId?: string | null;
}

interface User {
  id: string;
  // Add other user properties as needed
}

interface ApiResponse {
  data: {
    bookings: Car[];
    totalPages?: number;
  };
}

const BookedCar: React.FC = () => {
  const [bookedCar, setBookedCar] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customerId, setCustomerId] = useState<number>(0);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigation = useNavigation();

  // Get customer ID from storage
  const getcustomerId = async (): Promise<void> => {
    try {
      const value = await AsyncStorage.getItem('user');
      const user: User | null = value ? JSON.parse(value) : null;
      if (user !== null) {
        setCustomerId(parseInt(user.id));
      }
    } catch (error) {
      console.error('Error fetching customer ID:', error);
    }
  };

  // Fetch booked cars with pagination and search
  const getBookedCar = useCallback(async (pageNum: number = 1, search: string = ''): Promise<void> => {
    if (!customerId) return;
    
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `${baseURL}/order/all?page=${pageNum}&limit=4&customerId=${customerId}&search=${search}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (pageNum === 1) {
        console.log("response data",response.data.data?.bookings);
        setBookedCar(response.data.data?.bookings);
      } else {
        setBookedCar(prev => [...prev, ...response.data.data?.bookings]);
      }
      
      setTotalPages(response.data.data.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [customerId]);

  // Manual debouncing for search
  const handleSearch = (text: string): void => {
    setSearchQuery(text);
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout for debouncing
    const timeout = setTimeout(() => {
      setPage(1);
      getBookedCar(1, text);
    }, 500);
    
    setSearchTimeout(timeout);
  };

  // Load more data when reaching end of list
  const loadMore = (): void => {
    if (page < totalPages && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getBookedCar(nextPage, searchQuery);
    }
  };

  // Pull to refresh
  const onRefresh = (): void => {
    setRefreshing(true);
    setPage(1);
    getBookedCar(1, searchQuery);
  };

  useEffect(() => {
    getcustomerId();
  }, []);

  useEffect(() => {
    if (customerId) {
      getBookedCar(1, searchQuery);
    }
  }, [customerId, getBookedCar]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Render each booked car item
  const renderCarItem: ListRenderItem<Car> = ({ item }) => (
    <TouchableOpacity 
      style={styles.carCard}
      //onPress={() => navigation.navigate('BookingDetails', { booking: item })}
    >
   
       
        <View style={[styles.statusBadge, 
          { backgroundColor: item.status === 'Upcoming' ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      
      <View style={styles.carDetails}>
        <Text style={styles.carName}>{item.carName || 'Car Name Not Available'}</Text>
        
        <View style={styles.dateContainer}>
          <View style={styles.dateItem}>
            <Icon name="event-available" size={16} color="#555" />
            <Text style={styles.dateText}>{formatDate(item.pickupDate)}</Text>
          </View>
          <View style={styles.dateItem}>
            <Icon name="event-busy" size={16} color="#555" />
            <Text style={styles.dateText}>{formatDate(item.returnDate)}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon name="attach-money" size={16} color="#555" />
            <Text style={styles.infoText}>Rs.{item.amount.toFixed(2)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="payment" size={16} color="#555" />
            <Text style={styles.infoText}>{item.paymentMethod}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="person" size={16} color="#555" />
            <Text style={styles.infoText}>{item.driver ? 'With Driver' : 'Self Drive'}</Text>
          </View>
        </View>
        
        <View style={styles.paymentStatus}>
          <Text style={[
            styles.paymentStatusText,
            { color: item.paymentStatus === 'Pending' ? '#FF9800' : '#4CAF50' }
          ]}>
            {item.paymentStatus}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render footer with loading indicator
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#2E7D32" />
      </View>
    );
  };

  // Render empty state when no bookings found
  const renderEmpty = ()=> (
    <View style={styles.emptyContainer}>
      <Icon name="directions-car" size={80} color="#ccc" />
      <Text style={styles.emptyText}>No booked cars found</Text>
      <Text style={styles.emptySubText}>
        {searchQuery ? 'Try a different search term' : 'Your bookings will appear here'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bookings..."
            value={searchQuery}
            onChangeText={handleSearch}
            clearButtonMode="while-editing"
          />
        </View>
      </View>
      
      {/* Content */}
      {loading && page === 1 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading your bookings...</Text>
        </View>
      ) : (
        <FlatList
          data={bookedCar}
          renderItem={renderCarItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2E7D32']}
              tintColor={'#2E7D32'}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImageContainer: {
    position: 'relative',
    height: 160,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  carDetails: {
    padding: 16,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  paymentStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  paymentStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footerLoader: {
    paddingVertical: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#888',
  },
});

export default BookedCar;