import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Ionicons  from 'react-native-vector-icons/Ionicons';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

interface DatePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectDates: (startDate: string, endDate: string) => void;
  initialStartDate?: string | null;
  initialEndDate?: string | null;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  onClose,
  onSelectDates,
  initialStartDate,
  initialEndDate,
}) => {
  const [startDate, setStartDate] = useState(initialStartDate || '');
  const [endDate, setEndDate] = useState(initialEndDate || '');
  const [markedDates, setMarkedDates] = useState({});
  const [rangeMode, setRangeMode] = useState<'start' | 'end'>('start');

  const onDayPress = (day: { dateString: string }) => {
    const dateStr = day.dateString;
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate('');
      setMarkedDates({ [dateStr]: { startingDay: true, color: '#900', textColor: '#fff' } });
      setRangeMode('end');
    } else if (startDate && !endDate && rangeMode === 'end') {
      if (new Date(dateStr) >= new Date(startDate)) {
        setEndDate(dateStr);
        const marked: { [key: string]: any } = {};
        const start = new Date(startDate);
        const end = new Date(dateStr);
        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          const dateKey = d.toISOString().split('T')[0];
          marked[dateKey] = { color: '#f0f0f0', textColor: '#000' };
          if (dateKey === startDate) marked[dateKey] = { ...marked[dateKey], startingDay: true, color: '#900', textColor: '#fff' };
          if (dateKey === dateStr) marked[dateKey] = { ...marked[dateKey], endingDay: true, color: '#900', textColor: '#fff' };
        }
        setMarkedDates(marked);
        onSelectDates(startDate, dateStr);
      } else {
        console.warn('End date must be after start date');
      }
    }
  };

  const clearSelection = () => {
    setStartDate('');
    setEndDate('');
    setMarkedDates({});
    onSelectDates('', '');
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Start and End Date</Text>
          <TouchableOpacity onPress={clearSelection}>
            <Text style={styles.clearButton}>CLEAR</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dateRange}>
          {startDate ? `Start: ${new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' })}` : 'Start: Not selected'}{' '}
          {endDate ? `End: ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' })}` : 'End: Not selected'}
        </Text>
        <Calendar
          current={new Date().toISOString().split('T')[0]}
          minDate={new Date().toISOString().split('T')[0]}
          onDayPress={onDayPress}
          markedDates={markedDates}
          markingType={'period'}
          theme={{
            selectedDayBackgroundColor: '#900',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#900',
          }}
        />
        <TouchableOpacity style={styles.searchButton} onPress={onClose}>
          <Text style={styles.searchButtonText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { margin: 0, justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  clearButton: { fontSize: 16, color: 'red', fontWeight: 'bold' },
  dateRange: { fontSize: 14, color: '#666', marginBottom: 10 },
  searchButton: {
    backgroundColor: '#900',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default DatePickerModal;
