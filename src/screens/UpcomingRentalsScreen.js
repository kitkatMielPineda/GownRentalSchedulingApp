import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import styles from '../styles/styles';
import {ScheduleContext} from '../context/ScheduleContext';
import {useNavigation} from '@react-navigation/native';
import RentalDetailsModal from '../modals/RentalDetailsModal';

const UpcomingRentalsScreen = () => {
  const {schedules, updateSchedule, cancelSchedule} =
    useContext(ScheduleContext);
  const [selectedRental, setSelectedRental] = useState(null);
  const navigation = useNavigation();

  const isFutureRental = pickupDate => {
    const now = new Date();
    const rentalPickupDate = new Date(pickupDate);

    // Reset time to midnight to compare only the date
    now.setHours(0, 0, 0, 0);
    rentalPickupDate.setHours(0, 0, 0, 0);

    return rentalPickupDate.getTime() >= now.getTime(); // Ensures today's rentals still display
  };

  const upcomingRentals = schedules
    .filter(
      schedule =>
        schedule.type === 'Rental' && isFutureRental(schedule.pickupDate),
    )
    .sort((a, b) => new Date(a.pickupDate) - new Date(b.pickupDate));

  const handleUpdateRental = updatedRental => {
    updateSchedule(updatedRental);
    setSelectedRental(updatedRental);
  };

  const handleCancelRental = rentalId => {
    cancelSchedule(rentalId);
    setSelectedRental(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, styles.header.main]}>
        <Text style={styles.title}>Upcoming Rentals</Text>
      </View>

      {upcomingRentals.length === 0 ? (
        <Text style={styles.noDataText}>No upcoming rentals</Text>
      ) : (
        <FlatList
          data={upcomingRentals}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => setSelectedRental(item)}>
              <Text style={styles.listItemText}>
                {new Date(item.pickupDate).toDateString()} {'\n'}
                {item.gown}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <RentalDetailsModal
        visible={!!selectedRental}
        rental={selectedRental}
        onClose={() => setSelectedRental(null)}
        onSave={handleUpdateRental}
        onCancel={handleCancelRental}
      />
    </SafeAreaView>
  );
};

export default UpcomingRentalsScreen;
