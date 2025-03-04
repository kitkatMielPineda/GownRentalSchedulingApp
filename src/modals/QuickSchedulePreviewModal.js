import React from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/styles';

const QuickSchedulePreviewModal = ({visible, onClose, schedules}) => {
  const isWithinNext7Days = date => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset to start of the day

    const futureLimit = new Date();
    futureLimit.setDate(futureLimit.getDate() + 7);
    futureLimit.setHours(23, 59, 59, 999); // Ensure full 7 days are included

    const scheduleDate = new Date(date);
    scheduleDate.setHours(0, 0, 0, 0); // Compare only the date, ignoring time

    console.log('Current Date:', now.toLocaleString());
    console.log('Future Limit (7 Days Ahead):', futureLimit.toLocaleString());
    console.log('Schedule Date:', scheduleDate.toLocaleString());

    return (
      scheduleDate.getTime() >= now.getTime() &&
      scheduleDate.getTime() <= futureLimit.getTime()
    );
  };

  const isFutureAppointment = (date, time) => {
    const now = new Date(); // Current date and time
    const appointmentDateTime = new Date(date); // Appointment date

    // Reset seconds and milliseconds for accurate comparison
    now.setSeconds(0, 0, 0);
    appointmentDateTime.setSeconds(0, 0, 0);

    console.log('Raw Appointment Data:', date, time);
    console.log('!!!', appointmentDateTime);

    if (time) {
      const timeParts = time.match(/(\d+):(\d+)\s?(AM|PM)/i); // Extract time components
      if (timeParts) {
        let hours = parseInt(timeParts[1], 10);
        let minutes = parseInt(timeParts[2], 10);
        const modifier = timeParts[3].toUpperCase(); // AM/PM

        // Convert 12-hour format to 24-hour format
        if (modifier === 'PM' && hours !== 12) {
          hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
          hours = 0;
        }

        // ✅ Properly set time on the appointment date
        appointmentDateTime.setHours(hours, minutes, 0, 0);
      }
    }

    console.log('Current Time:', now.toLocaleString());
    console.log(
      'Parsed Appointment DateTime:',
      appointmentDateTime.toLocaleString(),
    );
    console.log('XXX', appointmentDateTime);

    // ✅ Fix: Ensure today’s appointments are included if the time is in the future
    if (appointmentDateTime.toDateString() === now.toDateString()) {
      return appointmentDateTime.getTime() >= now.getTime();
    }
    return appointmentDateTime >= now;
  };

  const quickSchedulePreview = schedules
    .filter(schedule => {
      if (schedule.type === 'Rental') {
        return isWithinNext7Days(schedule.pickupDate);
      } else if (schedule.type === 'Appointment') {
        const isWithinNext7 = isWithinNext7Days(schedule.date);
        const isFuture = isFutureAppointment(schedule.date, schedule.time);

        console.log(
          `Checking Appointment: ${schedule.name} on ${schedule.date} at ${schedule.time}`,
        );
        console.log(`Within 7 Days: ${isWithinNext7}, Future: ${isFuture}`);

        return isWithinNext7 && isFuture; // ✅ Ensures today's future times are included
      }
      return false;
    })
    .sort(
      (a, b) =>
        new Date(a.date || a.pickupDate) - new Date(b.date || b.pickupDate),
    );

  const renderScheduleItem = ({item}) => (
    <View style={styles.listItemModal}>
      {item.type === 'Rental' ? (
        <>
          <Text style={styles.listItemText}>🏷️ Rental:</Text>
          <Text>
            {new Date(item.pickupDate).toDateString()} - {item.gown}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.listItemText}>📅 Appointment:</Text>
          <Text>
            {new Date(item.date).toDateString()}, {item.time} - {item.name}
          </Text>
        </>
      )}
    </View>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={{fontSize: '25', fontWeight: 'bold'}}>
                Quick Schedule{'\n'} Preview
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
              {quickSchedulePreview.length === 0 ? (
                <Text style={styles.noDataText}>
                  No schedules for the next 7 days
                </Text>
              ) : (
                <FlatList
                  data={quickSchedulePreview}
                  keyExtractor={item => item.id}
                  renderItem={renderScheduleItem}
                  contentContainerStyle={{paddingBottom: 20}}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default QuickSchedulePreviewModal;
