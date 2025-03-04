import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import styles from '../styles/styles';
import {Picker} from '@react-native-picker/picker';
import ShowDatePickerModal from './ShowDatePickerModal';
import TimeSelectionModal from './TimeSelectionModal';
import {ScheduleContext} from '../context/ScheduleContext';

const AddScheduleModal = ({visible, onClose}) => {
  // Dropdown state
  const [scheduleType, setScheduleType] = useState('');

  // Rental State
  const [rentalData, setRentalData] = useState({
    name: '',
    contact: '',
    pickupDate: new Date(),
    returnDate: new Date(),
    gown: '',
    downpayment: '',
    totalPrice: '',
  });

  // Appointment State
  const [appointmentData, setAppointmentData] = useState({
    date: new Date(),
    time: '',
    name: '',
    contact: '',
  });

  const [datePickerType, setDatePickerType] = useState(null); // 'pickupDate' or 'returnDate'
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const {addSchedule} = useContext(ScheduleContext);

  const handleDateChange = (event, selectedDate) => {
    if (!selectedDate) {
      setShowDatePickerModal(false);
      return; // ✅ Prevents unnecessary state updates
    }

    setShowDatePickerModal(false);

    if (datePickerType === 'pickupDate' || datePickerType === 'returnDate') {
      setRentalData(prevState => ({
        ...prevState,
        [datePickerType]:
          selectedDate instanceof Date ? selectedDate : new Date(),
      }));
    } else if (datePickerType === 'time') {
      setAppointmentData(prevState => ({
        ...prevState,
        time:
          selectedDate instanceof Date
            ? selectedDate.toLocaleTimeString()
            : new Date().toLocaleTimeString(),
      }));
    } else {
      setAppointmentData(prevState => ({
        ...prevState,
        date: selectedDate instanceof Date ? selectedDate : new Date(),
      }));
    }
  };
  const handleAddSchedule = () => {
    if (!scheduleType) {
      Alert.alert('Error', 'Please select a schedule type');
      return;
    }

    let newSchedule = {};

    if (scheduleType === 'Rental') {
      const {
        name,
        contact,
        pickupDate,
        returnDate,
        gown,
        downpayment,
        totalPrice,
      } = rentalData;

      if (
        !name ||
        !contact ||
        !pickupDate ||
        !returnDate ||
        !gown ||
        !downpayment ||
        !totalPrice
      ) {
        Alert.alert('Error', 'Please fill in all rental details');
        return;
      }

      newSchedule = {
        id: Date.now().toString(), // Unique ID for list management
        type: 'Rental',
        ...rentalData,
        balance: totalPrice - downpayment,
      };
    } else {
      const {date, time, name, contact} = appointmentData;

      if (!date || !time || !name || !contact) {
        Alert.alert('Error', 'Please fill in all appointment details');
        return;
      }

      newSchedule = {
        id: Date.now().toString(), // Unique ID
        type: 'Appointment',
        ...appointmentData,
      };
    }

    // Save schedule in context
    addSchedule(newSchedule);

    Alert.alert('Success', 'Schedule Added Successfully');
    onClose(); // Close modal
  };
  // Render Rental Form
  const renderRentalForm = () => (
    <>
      <TextInput
        style={styles.inputText}
        placeholder="Name"
        onChangeText={text => setRentalData({...rentalData, name: text})}
        value={rentalData.name}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Contact"
        onChangeText={text => setRentalData({...rentalData, contact: text})}
        value={rentalData.contact}
      />

      {/* Pick-up Date */}
      <TouchableOpacity
        onPress={() => {
          setDatePickerType('pickupDate');
          setShowDatePickerModal(true);
        }}>
        <Text style={[styles.inputText, styles.inputText.date]}>
          Pick-up Date:{' '}
          {rentalData.pickupDate instanceof Date
            ? rentalData.pickupDate.toDateString()
            : 'Select a Date'}
        </Text>
      </TouchableOpacity>

      {/* Return Date */}
      <TouchableOpacity
        onPress={() => {
          setDatePickerType('returnDate');
          setShowDatePickerModal(true);
        }}>
        <Text style={[styles.inputText, styles.inputText.date]}>
          Return Date:{' '}
          {rentalData.pickupDate instanceof Date
            ? rentalData.returnDate.toDateString()
            : 'Select a Date'}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.inputText}
        placeholder="Gown & Accessories"
        onChangeText={text => setRentalData({...rentalData, gown: text})}
        value={rentalData.gown}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Downpayment"
        keyboardType="numeric"
        onChangeText={text => setRentalData({...rentalData, downpayment: text})}
        value={rentalData.downpayment}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Total Price"
        keyboardType="numeric"
        onChangeText={text => setRentalData({...rentalData, totalPrice: text})}
        value={rentalData.totalPrice}
      />
    </>
  );

  // Render Appointment Form
  const renderAppointmentForm = () => (
    <>
      {/* Appointment Date */}
      <TouchableOpacity
        onPress={() => {
          setDatePickerType('date'); // Open Date Picker
          setShowDatePickerModal(true);
        }}>
        <Text style={[styles.inputText, styles.inputText.date]}>
          Appointment Date:{' '}
          {appointmentData.date
            ? appointmentData.date.toDateString()
            : 'Select a Date'}
        </Text>
      </TouchableOpacity>

      {/* Appointment Time */}
      <TouchableOpacity
        onPress={() => {
          setShowTimeModal(true); // Open Time Selection Modal
        }}>
        <Text style={[styles.inputText, styles.inputText.date]}>
          Time: {appointmentData.time ? appointmentData.time : 'Select Time'}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.inputText}
        placeholder="Name"
        onChangeText={text =>
          setAppointmentData({...appointmentData, name: text})
        }
        value={appointmentData.name}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Contact"
        onChangeText={text =>
          setAppointmentData({...appointmentData, contact: text})
        }
        value={appointmentData.contact}
      />
    </>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={{fontSize: '25', fontWeight: 'bold'}}>
                Add Schedule
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
            <Picker
              selectedValue={scheduleType}
              onValueChange={itemValue => setScheduleType(itemValue)}
              style={{width: '100%'}}>
              <Picker.Item label="Select Schedule Type" value="" />
              <Picker.Item label="Rental" value="Rental" />
              <Picker.Item label="Appointment" value="Appointment" />
            </Picker>
            <View
              style={{
                width: '100%',
                marginBottom: 10,
              }}>
              {/* <ScrollView style={{width: '100%', marginBottom: 10}}> */}
              {scheduleType === 'Rental'
                ? renderRentalForm()
                : scheduleType === 'Appointment'
                ? renderAppointmentForm()
                : null}
              {/* </ScrollView> */}
            </View>
            <View style={styles.button}>
              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.button, , styles.button.submit]}
                onPress={handleAddSchedule}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>

      <ShowDatePickerModal
        visible={showDatePickerModal}
        selectedDate={
          scheduleType === 'Appointment'
            ? appointmentData.date instanceof Date
              ? appointmentData.date
              : new Date()
            : rentalData[datePickerType] instanceof Date
            ? rentalData[datePickerType]
            : new Date()
        }
        mode="date"
        onClose={() => setShowDatePickerModal(false)}
        onDateChange={selectedDate => {
          if (scheduleType === 'Appointment') {
            setAppointmentData(prevState => ({
              ...prevState,
              date: selectedDate, // ✅ Fix: Now updates appointment date properly
            }));
          } else {
            setRentalData(prevState => ({
              ...prevState,
              [datePickerType]: selectedDate, // ✅ Still works for rental
            }));
          }
          setShowDatePickerModal(false);
        }}
      />

      {/* Time Selection Modal (For Selecting Time Slots) */}
      <TimeSelectionModal
        visible={showTimeModal}
        onClose={() => setShowTimeModal(false)}
        onSelectTime={selectedTime =>
          setAppointmentData({...appointmentData, time: selectedTime})
        }
      />
    </Modal>
  );
};

export default AddScheduleModal;
