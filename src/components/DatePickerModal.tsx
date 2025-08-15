import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  dayNames: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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
  const [startDate, setStartDate] = useState(initialStartDate ? new Date(initialStartDate) : null);
  const [endDate, setEndDate] = useState(initialEndDate ? new Date(initialEndDate) : null);
  const [markedDates, setMarkedDates] = useState({});
  const [rangeMode, setRangeMode] = useState<'start' | 'end'>('start');

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentSelecting, setCurrentSelecting] = useState<'start' | 'end'>('start');

  useEffect(() => {
    if (startDate && endDate) {
      markRange(startDate, endDate);
    }
  }, [startDate, endDate]);

  const markRange = (start: Date, end: Date) => {
    const range: { [date: string]: any } = {};
    let current = new Date(start);
    const endDateObj = new Date(end);

    while (current <= endDateObj) {
      const dateStr = current.toISOString().split('T')[0];
      range[dateStr] = {
        color: '#f0f0f0',
        textColor: '#000',
      };
      current.setDate(current.getDate() + 1);
    }

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    range[startStr] = {
      ...range[startStr],
      startingDay: true,
      color: '#006400',
      textColor: '#fff',
    };

    range[endStr] = {
      ...range[endStr],
      endingDay: true,
      color: '#006400',
      textColor: '#fff',
    };

    setMarkedDates(range);
  };

  const onDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString);

    if (!startDate || (startDate && endDate)) {
      setStartDate(new Date(selectedDate));
      setEndDate(null);
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          color: '#006400',
          textColor: '#fff',
        },
      });
      setRangeMode('end');
      setCurrentSelecting('start');
      setShowTimePicker(true);
    } else if (startDate && !endDate && rangeMode === 'end') {
      if (selectedDate >= startDate) {
        setEndDate(new Date(selectedDate));
        setCurrentSelecting('end');
        setShowTimePicker(true);
      } else {
        setStartDate(new Date(selectedDate));
        setMarkedDates({
          [day.dateString]: {
            startingDay: true,
            color: '#006400',
            textColor: '#fff',
          },
        });
        setCurrentSelecting('start');
        setShowTimePicker(true);
      }
    }
  };

  const handleTimeChange = (_event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (!selectedTime) return;

    if (currentSelecting === 'start' && startDate) {
      const newStart = new Date(startDate);
      newStart.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setStartDate(newStart);
    } else if (currentSelecting === 'end' && endDate) {
      const newEnd = new Date(endDate);
      newEnd.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setEndDate(newEnd);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      onSelectDates(startDate.toISOString(), endDate.toISOString());
    }
  }, [startDate, endDate]);

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setMarkedDates({});
    setRangeMode('start');
    onSelectDates('', '');
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return 'Not selected';
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <Modal  
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      useNativeDriver
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Start and End Date & Time</Text>
          <TouchableOpacity onPress={clearSelection}>
            <Text style={styles.clearButton}>CLEAR</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.dateRange}>
          Start: {formatDateTime(startDate)}{'\n'}
          End: {formatDateTime(endDate)}
        </Text>

        <Calendar
          current={new Date().toISOString().split('T')[0]}
          minDate={new Date().toISOString().split('T')[0]}
          markingType="period"
          markedDates={markedDates}
          onDayPress={onDayPress}
          theme={{
            selectedDayBackgroundColor: '#006400',
            todayTextColor: '#006400',
            arrowColor: '#006400',
          }}
        />

        <TouchableOpacity style={styles.doneButton} onPress={onClose}>
          <Text style={styles.doneButtonText}>DONE</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  clearButton: {
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: '#006400',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DatePickerModal;
