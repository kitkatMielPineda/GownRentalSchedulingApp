import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import styles from '../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const ShowDatePickerModal = ({
  visible,
  selectedDate,
  onClose,
  onDateChange,
  mode = 'date',
}) => {
  // const handleDateChange = selectedDate => {
  //   if (!selectedDate) return;

  //   setEditedRental(prevState => ({
  //     ...prevState,
  //     [datePickerType]:
  //       selectedDate instanceof Date ? selectedDate : new Date(selectedDate), // ✅ Ensures valid Date object
  //   }));
  //   setShowDatePicker(false);
  // };

  const getValidDate = date => (date instanceof Date ? date : new Date());
  const handleConfirm = (event, date) => {
    if (date) {
      onDateChange(date); // ✅ Correctly update state
    }
    onClose(); // ✅ Close only after state updates
  };
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.datePickerModal}>
            <View style={styles.datePickerContainer}>
              {/* <DateTimePicker
                value={selectedDate}
                mode={mode}
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onDateChange}
              /> */}
              {/* <DateTimePicker
                value={getValidDate(editedRental.pickupDate)}
                mode="date"
                display="default"
                minimumDate={new Date()} // Ensures only future dates
                onChange={(event, selectedDate) =>
                  handleDateChange(selectedDate)
                }
              /> */}
              <DateTimePicker
                value={getValidDate(selectedDate)} // Ensure we pass a valid Date object
                mode={mode}
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                minimumDate={new Date()} // Prevent selecting past dates
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    onDateChange(selectedDate);
                  }
                }}
              />
              <TouchableOpacity
                onPress={onClose}
                style={styles.datePickerCloseButton}>
                <Text style={styles.datePickerCloseText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default ShowDatePickerModal;
