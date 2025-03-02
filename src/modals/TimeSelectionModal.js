import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import styles from '../styles/styles';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const timeSlots = [
  '10:00 - 10:30 AM',
  '10:30 - 11:00 AM',
  '11:00 - 11:30 AM',
  '11:30 - 12:00 NN',
  '12:00 - 12:30 PM',
  '12:30 - 1:00 PM',
  '1:00 - 1:30 PM',
  '1:30 - 2:00 PM',
  '2:00 - 2:30 PM',
  '2:30 - 3:00 PM',
  '3:00 - 3:30 PM',
  '3:30 - 4:00 PM',
  '5:00 - 5:30 PM',
  '5:30 - 6:00 PM',
  '6:00 - 6:30 PM',
  '6:30 - 7:00 PM',
  '7:00 - 7:30 PM',
  '7:30 - 8:00 PM',
  '8:00 - 8:30 PM',
  '8:30 - 9:00 PM',
  '9:00 - 9:30 PM',
  '9:30 - 10:00 PM',
  'custom time',
];

const TimeSelectionModal = ({visible, onClose, onSelectTime}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalHeader, {marginBottom: 30}]}>
              <Text style={{fontSize: '25', fontWeight: 'bold'}}>
                Select Time
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={onClose}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '25',
                  }}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.modalBodyRow}>
                {timeSlots.map((timeSlot, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onSelectTime(timeSlot)}>
                    <Text style={[styles.inputText, styles.inputText.time]}>
                      {timeSlot}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={[styles.button, {position: 'absolute', bottom: 20}]}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.button, , styles.button.submit]}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default TimeSelectionModal;
