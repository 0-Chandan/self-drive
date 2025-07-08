import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

interface PricingDetails {
  pricePerDay: number;
  driverCharge: number;
  deposit: number;
  convenienceFee: number;
  tripProtectionFee: number;
  startDate?: string;
  endDate?: string;
}

interface PriceBreakupProps {
  visible: boolean;
  onClose: () => void;
  pricingDetails: PricingDetails;
}

const PriceBreakup: React.FC<PriceBreakupProps> = ({ visible, onClose, pricingDetails }) => {
  const calculateDays = () => {
    if (!pricingDetails.startDate || !pricingDetails.endDate)
        {
        return 1;
        }
    const start = new Date(pricingDetails.startDate);
    const end = new Date(pricingDetails.endDate);
    const diffTime = end.getTime() - start.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const days = calculateDays();

  const calculateTotalPrice = () => {
    let total = pricingDetails.pricePerDay * days;
    if (pricingDetails.driverCharge) { total += pricingDetails.driverCharge * days; }
    if (pricingDetails.deposit) { total += pricingDetails.deposit; }
    if (pricingDetails.convenienceFee) { total += pricingDetails.convenienceFee; }
    if (pricingDetails.tripProtectionFee) { total += pricingDetails.tripProtectionFee; }
    return total;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Price Breakup</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#900" />
            </TouchableOpacity>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.priceItemLabel}>
              Base Price (₹{pricingDetails.pricePerDay}/day x {days} day{days > 1 ? 's' : ''})
            </Text>
            <Text style={styles.priceItemValue}>₹{pricingDetails.pricePerDay * days}</Text>
          </View>
          {pricingDetails.driverCharge ? (
            <View style={styles.priceItem}>
              <Text style={styles.priceItemLabel}>
                Driver Charge (₹{pricingDetails.driverCharge}/day x {days} day{days > 1 ? 's' : ''})
              </Text>
              <Text style={styles.priceItemValue}>₹{pricingDetails.driverCharge * days}</Text>
            </View>
          ) : null}
          {pricingDetails.deposit ? (
            <View style={styles.priceItem}>
              <Text style={styles.priceItemLabel}>Deposit (Refundable)</Text>
              <Text style={styles.priceItemValue}>₹{pricingDetails.deposit}</Text>
            </View>
          ) : null}
          {pricingDetails.convenienceFee ? (
            <View style={styles.priceItem}>
              <Text style={styles.priceItemLabel}>Convenience Fee</Text>
              <Text style={styles.priceItemValue}>₹{pricingDetails.convenienceFee}</Text>
            </View>
          ) : null}
          {pricingDetails.tripProtectionFee ? (
            <View style={styles.priceItem}>
              <Text style={styles.priceItemLabel}>Trip Protection Fee</Text>
              <Text style={styles.priceItemValue}>₹{pricingDetails.tripProtectionFee}</Text>
            </View>
          ) : null}
          <View style={styles.priceTotal}>
            <Text style={styles.priceTotalLabel}>Total Estimated Cost</Text>
            <Text style={styles.priceTotalValue}>₹{calculateTotalPrice()}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: height * 0.6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceItemLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  priceItemValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  priceTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  priceTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  priceTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#900',
  },
});

export default PriceBreakup;
