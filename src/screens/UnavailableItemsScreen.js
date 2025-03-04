import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {ScheduleContext} from '../context/ScheduleContext';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/styles';

const UnavailableItemsScreen = () => {
  const {schedules} = useContext(ScheduleContext);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const groupedSchedules = {};

    schedules
      .filter(schedule => schedule.type === 'Rental')
      .forEach(schedule => {
        const dateRange = `${new Date(
          schedule.pickupDate,
        ).toDateString()} - ${new Date(schedule.returnDate).toDateString()}`;

        if (!groupedSchedules[dateRange]) {
          groupedSchedules[dateRange] = [];
        }

        groupedSchedules[dateRange].push(schedule.gown);
      });

    setFilteredSchedules(groupedSchedules);
  }, [schedules]);

  const handleSearch = text => {
    setSearchText(text);

    const filtered = {};
    schedules
      .filter(schedule => schedule.type === 'Rental')
      .forEach(schedule => {
        const dateRange = `${new Date(
          schedule.pickupDate,
        ).toDateString()} - ${new Date(schedule.returnDate).toDateString()}`;

        if (schedule.gown.toLowerCase().includes(text.toLowerCase())) {
          if (!filtered[dateRange]) {
            filtered[dateRange] = [];
          }
          filtered[dateRange].push(schedule.gown);
        }
      });

    setFilteredSchedules(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, styles.header.main]}>
        <Text style={styles.title}>Unavailable Items</Text>
      </View>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by gown name..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* List of Unavailable Items */}
      <FlatList
        data={Object.entries(filteredSchedules)}
        keyExtractor={([dateRange]) => dateRange}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.dateRange}>{item[0]}</Text>
            {item[1].map((gown, index) => (
              <Text key={index} style={styles.gownItem}>
                - {gown}
              </Text>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noDataText}>No unavailable items</Text>
        }
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UnavailableItemsScreen;
