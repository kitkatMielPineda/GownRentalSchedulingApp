import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import styles from '../styles/styles';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import ShowDatePickerModal from './ShowDatePickerModal';

const RentalDetailsModal = ({visible, rental, onClose, onSave, onCancel}) => {
  if (!rental) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedRental, setEditedRental] = useState(rental);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState(null);

  // Handle Input Change
  const handleInputChange = (field, value) => {
    setEditedRental(prevState => ({
      ...prevState,
      [field]:
        field === 'pickupDate' || field === 'returnDate'
          ? new Date(value)
          : value, // ✅ Ensures proper Date conversion
    }));
  };

  // Handle Date Change
  const handleDateChange = selectedDate => {
    if (!selectedDate) return;

    setEditedRental(prevState => ({
      ...prevState,
      [datePickerType]:
        selectedDate instanceof Date ? selectedDate : new Date(selectedDate), // ✅ Ensures valid Date object
    }));
    setShowDatePicker(false);
  };

  // Compute Balance
  const balance = editedRental.totalPrice - editedRental.downpayment;

  // Handle Save
  const handleSave = () => {
    onSave(editedRental);
    setIsEditing(false);
  };

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
                Rental Details
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
                {isEditing ? (
                  <>
                    <TextInput
                      style={styles.inputText}
                      value={editedRental.name}
                      onChangeText={text => handleInputChange('name', text)}
                    />
                    <TextInput
                      style={styles.inputText}
                      value={editedRental.contact}
                      onChangeText={text => handleInputChange('contact', text)}
                    />
                    {/* Pickup Date */}
                    <TouchableOpacity
                      onPress={() => {
                        setDatePickerType('pickupDate');
                        setShowDatePicker(true);
                      }}>
                      <Text style={[styles.inputText, styles.inputText.date]}>
                        Pick-up Date:{' '}
                        {editedRental.pickupDate
                          ? new Date(editedRental.pickupDate).toDateString()
                          : 'Select a Date'}
                      </Text>
                    </TouchableOpacity>
                    {/* Return Date */}
                    <TouchableOpacity
                      onPress={() => {
                        setDatePickerType('returnDate');
                        setShowDatePicker(true);
                      }}>
                      <Text style={[styles.inputText, styles.inputText.date]}>
                        Return Date: {editedRental.returnDate.toDateString()}
                      </Text>
                    </TouchableOpacity>

                    <TextInput
                      style={styles.inputText}
                      value={editedRental.gown}
                      onChangeText={text => handleInputChange('gown', text)}
                    />
                    {/* Downpayment */}
                    <TextInput
                      style={styles.inputText}
                      value={editedRental.downpayment.toString()}
                      onChangeText={text =>
                        handleInputChange('downpayment', Number(text))
                      }
                      keyboardType="numeric"
                    />
                    {/* Total Price */}
                    <TextInput
                      style={styles.inputText}
                      value={editedRental.totalPrice.toString()}
                      onChangeText={text =>
                        handleInputChange('totalPrice', Number(text))
                      }
                      keyboardType="numeric"
                    />
                    {/* Balance - Computed Automatically */}
                    <Text style={styles.inputText}>
                      Balance: ₱{balance.toFixed(2)}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.inputText}>Name: {rental.name}</Text>
                    <Text style={styles.inputText}>
                      Contact: {rental.contact}
                    </Text>
                    <Text style={styles.inputText}>
                      Pick-up Date: {new Date(rental.pickupDate).toDateString()}
                    </Text>
                    <Text style={styles.inputText}>
                      Return Date: {new Date(rental.returnDate).toDateString()}
                    </Text>
                    <Text style={styles.inputText}>
                      Gown & Accessories: {`\n`}
                      {rental.gown}
                    </Text>
                    <Text style={styles.inputText}>
                      Downpayment: {rental.downpayment}
                    </Text>
                    <Text style={styles.inputText}>
                      Total Price: {rental.totalPrice}
                    </Text>
                    <Text style={styles.inputText}>
                      Balance: ₱{rental.balance}
                    </Text>
                  </>
                )}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
              }}>
              {/* Edit & Save Buttons */}
              {isEditing ? (
                <TouchableOpacity
                  style={[styles.button, , styles.button.submit]}
                  onPress={() => {
                    onSave({...editedRental, balance});
                    setIsEditing(false);
                  }}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, , styles.button.submit]}
                  onPress={() => setIsEditing(true)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, , styles.button.submit]}
                onPress={() => onCancel(rental.id)}>
                <Text style={styles.buttonText}>Cancel Rental</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ShowDatePickerModal
            visible={showDatePicker}
            selectedDate={
              editedRental[datePickerType] instanceof Date
                ? editedRental[datePickerType]
                : new Date()
            }
            mode="date"
            onClose={() => setShowDatePicker(false)}
            onDateChange={selectedDate => {
              setEditedRental(prevState => ({
                ...prevState,
                [datePickerType]: selectedDate, // Store as Date object
              }));
              setShowDatePicker(false);
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default RentalDetailsModal;
