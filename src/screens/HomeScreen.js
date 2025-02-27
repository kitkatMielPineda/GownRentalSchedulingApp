import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/styles';
import HomeButton from '../components/Homebutton';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
        </View>
        <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
          <HomeButton
            title="Quick Schedule Preview"
            screen="QuickSchedulePreview"
          />
          <HomeButton title="Add Schedule" screen="AddSchedule" />
          <HomeButton title="Upcoming Rentals" screen="UpcomingRentals" />
          <HomeButton
            title="Upcoming Appointments"
            screen="UpcomingAppointments"
          />
          <HomeButton title="Calendar" screen="Calendar" />
          <HomeButton title="Unavailable Items" screen="UnavailableItems" />
          <HomeButton title="Notifications" screen="Notifications" />
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('SignIn')}>
            Log out
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
