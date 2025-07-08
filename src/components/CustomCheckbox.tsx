import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomCheckboxProps {
  label: string;
  initialChecked?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, initialChecked = false }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setIsChecked(!isChecked)}
    >
      <Ionicons
        name={isChecked ? 'checkbox-outline' : 'square-outline'}
        size={24}
        color="#900"
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  checkboxLabel: { marginLeft: 8, fontSize: 16, color: '#333' },
});

export default CustomCheckbox;
