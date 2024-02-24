// CustomHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToSurvey = () => {
    navigation.navigate('SearchCustomerScreen');
  };

  const handleNavigateToAlbum = () => {
    navigation.navigate('Album');
  };

  const handleNavigateToProgression = () => {
    navigation.navigate('Progression');
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
