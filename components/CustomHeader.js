import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ user_id }) => {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('Home', { user_id });
  };

  const handleNavigateToSurvey = () => {
    navigation.navigate('SearchCustomerScreen', { user_id });
  };

  const handleNavigateToAlbum = () => {
    navigation.navigate('Album', { user_id });
  };

  const handleNavigateToProgression = () => {
    navigation.navigate('Progression', { user_id });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateToHome} style={styles.button}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToSurvey} style={styles.button}>
        <Text style={styles.buttonText}>Survey</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToAlbum} style={styles.button}>
        <Text style={styles.buttonText}>Album</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToProgression} style={styles.button}>
        <Text style={styles.buttonText}>Progression</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#001F3F', // Dark blue color
    padding: 10,
  },
  button: {
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
  },
});

export default CustomHeader;
