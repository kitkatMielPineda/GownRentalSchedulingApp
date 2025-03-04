import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScheduleContext} from '../context/ScheduleContext';
import styles from '../styles/styles';
import EditAppointmentModal from '../modals/EditAppointmentModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SwipeListView} from 'react-native-swipe-list-view';

const UpcomingAppointmentsScreen = () => {
  const {schedules, updateSchedule, cancelSchedule} =
    useContext(ScheduleContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const navigation = useNavigation();

  const isFutureAppointment = (date, time) => {
    const now = new Date(); // Current date and time
    const appointmentDateTime = new Date(date); // Appointment date

    // Reset seconds and milliseconds for accurate comparison
    now.setSeconds(0, 0, 0);
    appointmentDateTime.setSeconds(0, 0, 0);

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

    // ✅ Fix: Ensure today's appointments are included if the time is in the future
    return appointmentDateTime.getTime() >= now.getTime();
  };

  const upcomingAppointments = schedules
    .filter(
      schedule =>
        schedule.type === 'Appointment' &&
        isFutureAppointment(schedule.date, schedule.time), // ✅ Fix ensures today’s future times are included
    )
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date) || a.time.localeCompare(b.time),
    );

  const handleEdit = appointment => {
    setSelectedAppointment(appointment);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = updatedAppointment => {
    updateSchedule(updatedAppointment);
    setIsEditModalVisible(false);
  };

  const handleCancel = appointmentId => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => cancelSchedule(appointmentId),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, styles.header.main]}>
        <Text style={styles.title}>Upcoming Appointments</Text>
      </View>

      {upcomingAppointments.length === 0 ? (
        <Text style={styles.noDataText}>No upcoming appointments</Text>
      ) : (
        <SwipeListView
          data={upcomingAppointments}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={[styles.listItem]}>
              <Text style={styles.listItemText}>
                {new Date(item.date).toDateString()} - {item.time}
              </Text>
              <Text style={styles.listItemSubText}>
                {item.name} | {item.contact}
              </Text>
            </View>
          )}
          renderHiddenItem={({item}) => (
            <View style={styles.hiddenButtonsContainer}>
              {/* Edit Button */}
              <TouchableOpacity
                style={[styles.swipeButton, styles.editButton]}
                onPress={() => handleEdit(item)}>
                <Text style={styles.swipeButtonText}>Edit</Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity
                style={[styles.swipeButton, styles.deleteButton]}
                onPress={() => handleCancel(item.id)}>
                <Text style={styles.swipeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={100} // Swipe left to Edit
          rightOpenValue={-100} // Swipe right to Cancel
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Edit Appointment Modal */}
      <EditAppointmentModal
        visible={isEditModalVisible}
        appointment={selectedAppointment}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleSaveEdit}
      />
    </SafeAreaView>
  );
};

export default UpcomingAppointmentsScreen;
