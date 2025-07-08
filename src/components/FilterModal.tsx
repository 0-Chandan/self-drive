import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import Ionicons  from 'react-native-vector-icons/Ionicons';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: {
    distance: number;
    price: number;
    carType: string;
    transmission: string;
    fuelType: string;
    seats: string;
  }) => void;
  initialDistance?: number;
  initialPrice?: number;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialDistance,
  initialPrice,
}) => {
  const [distance, setDistance] = useState(initialDistance || 45);
  const [price, setPrice] = useState(initialPrice || 1000);
  const [carType, setCarType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [seats, setSeats] = useState('');
  const [selectedTab, setSelectedTab] = useState('Distance');

  const resetFilters = () => {
    setDistance(45);
    setPrice(1000);
    setCarType('');
    setTransmission('');
    setFuelType('');
    setSeats('');
    setSelectedTab('Distance');
  };

  const applyFilters = () => {
    onApply({
      distance,
      price,
      carType,
      transmission,
      fuelType,
      seats,
    });
    onClose();
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Distance':
        return (
          <View style={styles.sliderWrapper}>
            <Text style={styles.verticalLabel}>Far</Text>
            <View style={styles.rotatedSliderContainer}>
              <Slider
                style={styles.rotatedSlider}
                minimumValue={0}
                maximumValue={100}
                value={distance}
                onValueChange={setDistance}
                minimumTrackTintColor="#900"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#900"
              />
            </View>
            <Text style={styles.verticalLabel}>Near</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{distance}km</Text>
            </View>
          </View>
        );

      case 'Price range':
        return (
          <View style={styles.sliderWrapper}>
            <Text style={styles.verticalLabel}>MaxPrice</Text>
            <View style={styles.rotatedSliderContainer}>
              <Slider
                style={styles.rotatedSlider}
                minimumValue={0}
                maximumValue={5000}
                value={price}
                onValueChange={setPrice}
                minimumTrackTintColor="#900"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#900"
              />
            </View>
            <Text style={styles.verticalLabel}>MinPrice</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>₹{price}/-</Text>
            </View>
          </View>
        );

      case 'Car details':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.subCategory}>Car type</Text>
            {['SUV', 'Sedan', 'Hatchback', 'Luxury'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.checkboxContainer}
                onPress={() => setCarType(carType === type ? '' : type)}
              >
                <Ionicons
                  name={carType === type ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color="#900"
                />
                <Text style={styles.checkboxText}>{type}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.subCategory}>Transmission Type</Text>
            {['Manual', 'Automatic'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.checkboxContainer}
                onPress={() => setTransmission(transmission === type ? '' : type)}
              >
                <Ionicons
                  name={transmission === type ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color="#900"
                />
                <Text style={styles.checkboxText}>{type}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.subCategory}>Fuel Type</Text>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setFuelType(fuelType === 'Petrol' ? '' : 'Petrol')}
            >
              <Ionicons
                name={fuelType === 'Petrol' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color="#900"
              />
              <Text style={styles.checkboxText}>Petrol</Text>
            </TouchableOpacity>
          </View>
        );

      case 'Seats':
        return (
          <View style={styles.tabContent}>
            {['4/5 Seater', '4/7 Seater'].map((seat) => (
              <TouchableOpacity
                key={seat}
                style={styles.checkboxContainer}
                onPress={() => setSeats(seats === seat ? '' : seat)}
              >
                <Ionicons
                  name={seats === seat ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color="#900"
                />
                <Text style={styles.checkboxText}>{seat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={resetFilters}>
            <Text style={styles.clearButton}>CLEAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <View style={styles.categoryColumn}>
            {['Distance', 'Price range', 'Car details', 'Seats'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={[
                  styles.categoryButton,
                  selectedTab === tab && styles.activeCategoryButton,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedTab === tab && styles.activeCategoryText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.optionsColumn}>
            {renderTabContent()}
          </ScrollView>
        </View>

        <View style={styles.applyButtonContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>APPLY FILTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { margin: 0, justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#900',
    padding: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  clearButton: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  closeButton: { position: 'absolute', right: 10, top: 10 },
  filterContainer: { flexDirection: 'row', height: 400 },
  categoryColumn: {
    backgroundColor: '#900',
    width: '30%',
    paddingTop: 16,
    borderBottomLeftRadius: 20,
  },
  categoryButton: { paddingVertical: 16, paddingHorizontal: 10 },
  activeCategoryButton: { backgroundColor: '#fff', alignItems: 'center' },
  categoryText: { fontSize: 16, color: '#fff' },
  activeCategoryText: { color: '#900', fontWeight: 'bold' },
  optionsColumn: {
    width: '70%',
    padding: 10,
  },
  sliderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    marginTop: 10,
  },
  rotatedSliderContainer: {
    transform: [{ rotate: '-90deg' }],
    width: 200,
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
  },
  rotatedSlider: {
    width: '100%',
    height: 40,
  },
  verticalLabel: {
    fontSize: 14,
    color: '#000',
    marginVertical: 4,
  },
  badge: {
    backgroundColor: '#900',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  subCategory: { fontSize: 14, color: '#666', marginTop: 10, marginBottom: 5 },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: { fontSize: 14, color: '#333', marginLeft: 8 },
  tabContent: { padding: 10 },
  applyButtonContainer: {
    backgroundColor: '#ffe0e0',
    padding: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  applyButton: {
    backgroundColor: '#900',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default FilterModal;
