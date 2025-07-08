import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // Adjust path
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation';


type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
};

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Booking Confirmed',
    message: 'Your booking for Kia Seltos on 18 Apr 2025 is confirmed.',
    date: '17 Apr 2025',
  },
  {
    id: 2,
    title: 'Payment Successful',
    message: 'Payment of ₹4000 for your trip has been processed.',
    date: '17 Apr 2025',
  },
];

const NotificationScreen: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isLoggedIn ? (
          notifications.length > 0 ? (
            notifications.map((notification) => (
              <View key={notification.id} style={styles.notificationCard}>
                <Ionicons name="notifications-outline" size={24} color="#811717" />
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationDate}>{notification.date}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noNotifications}>No notifications available.</Text>
          )
        ) : (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Please log in to view your notifications.</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate({ name: 'Login', params: {} })}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#811717',
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notificationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
  noNotifications: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  loginPrompt: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 40,
  },
  loginPromptText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#811717',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
