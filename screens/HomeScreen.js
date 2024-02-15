import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../components/CustomHeader'; // Update the path
import CustomButton from '../components/CustomButton';
const HomeScreen = () => {
  const [date, setDate] = useState(new Date());
  const [undoneSurveys, setUndoneSurveys] = useState(3); // Example value

  const handleMissingInspectionsPress = () => {
    // Implement logic for handling Missing Inspections button press
  };

  return (
    <View style={styles.container}>
  <CustomHeader />
  <View style={styles.content}>
    <View style={styles.card}>
      <Image source={require('../assets/images/image_date_picker.png')} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        <Text style={styles.infoText}>Hello, you have {undoneSurveys} undone surveys</Text>
      </View>
      <CustomButton title="Missing inspections" onPress={handleMissingInspectionsPress} />
      {/* <TouchableOpacity style={styles.button} onPress={handleMissingInspectionsPress}>
        <Text style={styles.buttonText}>Missing inspections</Text>
      </TouchableOpacity> */}
    </View>
  </View>
  <View style={[styles.bottomContent, { marginTop: 0, justifyContent: 'center' }]}>
    <Text style={[styles.bottomText, { fontSize: 24, color: '#007bff', fontStyle: 'italic' }]}>
      Join a survey that meets our expectations!
    </Text>
    <Image source={require('../assets/images/illustration_survey.jpg')} style={{ width: 350, height: 300 }} />
  </View>
  <View style={styles.blankSpace} />
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20, // Adjust as needed
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
  },
  // button: {
  //   backgroundColor: '#007bff',
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   borderRadius: 5,
  // },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    marginTop: 20, // Adjust as needed
  },
  bottomText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  blankSpace: {
    flex: 0.5,
  },
});

export default HomeScreen;
