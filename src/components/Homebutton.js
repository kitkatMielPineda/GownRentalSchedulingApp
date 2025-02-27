import React from 'react';
import styles from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity} from 'react-native';

const HomeButton = ({title, screen}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.button, styles.button.home]}
      onPress={() => navigation.navigate(screen)}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
export default HomeButton;
