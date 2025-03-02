import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/styles';
import HomeButton from '../components/Homebutton';
import AddScheduleModal from '../modals/AddScheduleModal';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

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
          <TouchableOpacity
            style={[styles.button, styles.button.home]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Add Schedule</Text>
          </TouchableOpacity>
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
        <AddScheduleModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
