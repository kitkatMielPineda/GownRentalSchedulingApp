import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const CreateAccountScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    if (!userName || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert('Success', 'Account Created Successfully');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: 'white',
            //alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
            width: Dimensions.get('window').width,
            paddingHorizontal: 10,
            marginTop: Dimensions.get('window').height * 0.1,
          }}>
          <Text style={styles.title}>Keith's Gown{'\n'}Scheduling App</Text>
        </View>

        <View style={{paddingHorizontal: 10}}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={text => setUserName(text)}
            value={userName}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>

        <View style={{paddingHorizontal: 10}}>
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text style={styles.bodyText}>
            Already have an account?{' '}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('SignIn')}>
              Sign In
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreateAccountScreen;
