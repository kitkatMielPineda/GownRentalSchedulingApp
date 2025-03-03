import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native';
import styles from '../styles/styles';
import TimeSelectionModal from './TimeSelectionModal';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ShowDatePickerModal from './ShowDatePickerModal';

const EditAppointmentModal = ({visible, appointment, onClose, onSave}) => {
  if (!appointment) {
    return null;
  }
  const [editedAppointment, setEditedAppointment] = useState(appointment);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [datePickerType, setDatePickerType] = useState(null); // 'date' or 'time'

  const handleInputChange = (field, value) => {
    setEditedAppointment(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = selectedDate => {
    if (selectedDate) {
      setEditedAppointment(prev => ({
        ...prev,
        date: selectedDate,
      }));
    }
    setShowDatePicker(false);
  };

  const handleSave = () => {
    onSave(editedAppointment);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={{fontSize: '25', fontWeight: 'bold'}}>
                Edit Appointment
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
              <View style={styles.modalBodyColumn}>
                {/* Date Picker */}
                <TouchableOpacity
                  onPress={() => {
                    setDatePickerType('date'); // Set the picker mode
                    setShowDatePickerModal(true); // Open modal
                  }}>
                  <Text style={styles.inputText}>
                    Date: Date:{' '}
                    {editedAppointment.date
                      ? new Date(editedAppointment.date).toDateString()
                      : 'Select Date'}
                  </Text>
                </TouchableOpacity>

                {/* Time Picker */}
                <TouchableOpacity
                  onPress={() => {
                    setShowTimeModal(true);
                  }}>
                  <Text style={styles.inputText}>
                    Time: {editedAppointment.time || 'Select Time'}
                  </Text>
                </TouchableOpacity>

                {/* Name Input */}
                <TextInput
                  style={styles.inputText}
                  placeholder="Name"
                  value={editedAppointment.name}
                  onChangeText={text => handleInputChange('name', text)}
                />

                {/* Contact Input */}
                <TextInput
                  style={styles.inputText}
                  placeholder="Contact"
                  value={editedAppointment.contact}
                  onChangeText={text => handleInputChange('contact', text)}
                />

                {/* Save Button */}
                <TouchableOpacity
                  style={[styles.button, styles.button.submit]}
                  onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Date Picker Modal */}
          <ShowDatePickerModal
            visible={showDatePickerModal}
            selectedDate={editedAppointment.date || new Date()}
            mode="date"
            onClose={() => setShowDatePickerModal(false)}
            onDateChange={selectedDate => {
              handleInputChange('date', selectedDate); // ✅ Update the date
              setShowDatePickerModal(false);
            }}
          />
          {/* Time Selection Modal */}
          <TimeSelectionModal
            visible={showTimeModal}
            onClose={() => setShowTimeModal(false)}
            onSelectTime={selectedTime =>
              handleInputChange('time', selectedTime)
            }
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default EditAppointmentModal;
