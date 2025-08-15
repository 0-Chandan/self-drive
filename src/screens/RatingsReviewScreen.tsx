import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  RatingsReview: undefined;
};

type RatingsReviewNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RatingsReview'>;

const RatingsReviewScreen: React.FC = () => {
  const navigation = useNavigation<RatingsReviewNavigationProp>();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (rating === 0 || !review.trim()) {
      Alert.alert('Please provide a rating and review');
      return;
    }
    Alert.alert('Review submitted successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ratings and Review</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Rate your experience</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
            >
              <Ionicons
                name={rating >= star ? 'star' : 'star-outline'}
                size={40}
                color="#006400     "
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.title}>Write your review</Text>
        <TextInput
          style={styles.reviewInput}
          multiline
          placeholder="Share your experience..."
          value={review}
          onChangeText={setReview}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#006400' },
  content: { padding: 16, flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#006400',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RatingsReviewScreen;
