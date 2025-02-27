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
import styles from '../styles/styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (userName === '' || password === '') {
      Alert.alert('Error', 'Please enter a username and password');
      return;
    }
    Alert.alert('Success', 'Login Successful');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
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
        </View>

        <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.button, styles.button.sigin]}
            onPress={handleSignIn}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text style={styles.bodyText}>
            Forgot{' '}
            <Text
              style={styles.linkText}
              onPress={() => console.log('onpress forgot username')}>
              username
            </Text>{' '}
            /{' '}
            <Text
              style={styles.linkText}
              onPress={() => console.log('onpress forgot password')}>
              password
            </Text>{' '}
            or{' '}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('CreateAccount')}
              // onPress={() => console.log('onpress create account')}
            >
              create account
            </Text>{' '}
            or{' '}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Home')}
              // onPress={() => console.log('onpress create account')}
            >
              home
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignInScreen;
