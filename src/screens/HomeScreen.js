import React, {useState, useContext} from 'react';
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
import {ScheduleContext} from '../context/ScheduleContext';
import QuickSchedulePreviewModal from '../modals/QuickSchedulePreviewModal';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {schedules} = useContext(ScheduleContext);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
        </View>
        <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.button, styles.button.home]}
            onPress={() => setIsPreviewVisible(true)}>
            <Text style={styles.buttonText}>Quick Schedule Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button.home]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Add Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button.home]}
            onPress={() => navigation.navigate('UpcomingRentals')}>
            <Text style={styles.buttonText}>Upcoming Rentals</Text>
          </TouchableOpacity>
          <HomeButton
            title="Upcoming Appointments"
            screen="UpcomingAppointments"
          />
          <TouchableOpacity
            style={[styles.button, styles.button.home]}
            onPress={() => navigation.navigate('Calendar')}>
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>
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
        <QuickSchedulePreviewModal
          visible={isPreviewVisible}
          onClose={() => setIsPreviewVisible(false)}
          schedules={schedules}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
