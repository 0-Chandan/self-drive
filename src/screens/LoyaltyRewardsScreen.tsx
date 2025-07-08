import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // Adjust path

type Reward = {
  id: string;
  name: string;
  points: number;
  icon: string;
};

const rewards: Reward[] = [
  { id: '1', name: '$10 Discount Voucher', points: 200, icon: 'pricetag-outline' },
  { id: '2', name: 'Free Car Wash', points: 500, icon: 'water-outline' },
  { id: '3', name: 'Priority Booking', points: 800, icon: 'calendar-outline' },
  { id: '4', name: '$50 Gift Card', points: 1000, icon: 'gift-outline' },
];

const LoyaltyRewardsScreen = () => {
  const navigation = useNavigation();
  const { userData, updatePoints } = useAuth();
  const userPoints = userData.loyaltyPoints;

  const handleRedeem = async (reward: Reward) => {
    if (userPoints >= reward.points) {
      Alert.alert(
        'Confirm Redemption',
        `Redeem ${reward.name} for ${reward.points} points?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Redeem',
            onPress: async () => {
              try {
                await updatePoints(userPoints - reward.points);
                Alert.alert('Success', `${reward.name} redeemed successfully!`);
              } catch (error) {
                Alert.alert('Error', 'Failed to redeem reward.');
              }
            },
          },
        ],
      );
    } else {
      Alert.alert('Insufficient Points', `You need ${reward.points} points to redeem ${reward.name}.`);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Points Balance */}
        <View style={styles.pointsCard}>
          <Ionicons name="gift-outline" size={30} color="#811717" />
          <Text style={styles.pointsText}>Your Points: {userPoints}</Text>
        </View>

        {/* How to Earn */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>How to Earn Points</Text>
          <View style={styles.infoRow}>
            <Ionicons name="car-outline" size={20} color="#811717" />
            <Text style={styles.infoText}>Earn 100 points for every car booking.</Text>
          </View>
        </View>

        {/* Rewards List */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.rewardItem}>
              <Ionicons name="gift-outline" size={24} color="#811717" />
              <View style={styles.rewardDetails}>
                <Text style={styles.rewardName}>{reward.name}</Text>
                <Text style={styles.rewardPoints}>{reward.points} Points</Text>
              </View>
              <TouchableOpacity
                style={userPoints >= reward.points ? styles.redeemButton : styles.redeemButtonDisabled}
                onPress={() => handleRedeem(reward)}
                disabled={userPoints < reward.points}
              >
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 20, // Avoid status bar overlap
    paddingBottom: 20, // Avoid navigation bar overlap
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row', // Place back button and title on the same line
    alignItems: 'center', // Vertically center items
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12, // Space between back button and title
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#811717',
    flex: 1, // Take remaining space, push title to center/right
    textAlign: 'center', // Center the title text
  },
  pointsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#811717',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  rewardDetails: {
    flex: 1,
    marginLeft: 12,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  rewardPoints: {
    fontSize: 14,
    color: '#777',
  },
  redeemButton: {
    backgroundColor: '#811717',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  redeemButtonDisabled: {
    backgroundColor: '#811717',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    opacity: 0.6,
  },
  redeemButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoyaltyRewardsScreen;
