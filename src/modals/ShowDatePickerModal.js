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
              <DateTimePicker
                value={selectedDate}
                mode={mode}
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onDateChange}
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
