import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../components/CustomHeader'; // Update the path
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const [date, setDate] = useState(new Date());
  const [totalSurveys, setTotalSurveys] = useState(17);
  const [undoneSites, setUndoneSites] = useState(145);
  const [doneSites, setDoneSites] = useState(50);
  const [undoneProjects, setUndoneProjects] = useState(13);
  const [doneProjects, setDoneProjects] = useState(4);
  const data = [
    { label: 'Total Projects:', value: `${totalSurveys} projects` },
    { label: 'Undone Sites:', value: `${undoneSites} sites` },
    { label: 'Undone Projects:', value: `${undoneProjects} projects` },
    { label: 'Done Sites:', value: `${doneSites} sites` },
    { label: 'Done Projects:', value: `${doneProjects} projects` },
  ];  // Example value
  const navigation = useNavigation();
  const handleMissingInspectionsPress = () => {
    navigation.navigate('SearchCustomerScreen');// Implement logic for handling Missing Inspections button press
  };

  const handleMissingInspectionsPresse = () => {
    // Implement logic for handling Missing Inspections button press
  };
  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.content}>
      <View style={styles.card}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={require('../assets/images/image_date_picker.png')} style={styles.logo} />
    <View style={styles.imageContent}>
      <Text style={styles.dateText}>{date.toDateString()}</Text>
    </View>
  </View>
  <View style={styles.textContainer}>
    {data.map((item, index) => (
      <View key={index} style={{ flexDirection: 'row' }}>
        <Text style={[styles.infoText, styles.labelStyle]}>{item.label}</Text>
        <Text style={[styles.infoText, styles.valueStyle]}>{item.value}</Text>
      </View>
    ))}
  </View>
 
</View>


      </View>
      <View style={[styles.bottomContent, { marginTop: 0, justifyContent: 'center' }]}>
    <CustomButton title="audit physique en cours" onPress={handleMissingInspectionsPress} />
  </View>
      <View style={styles.blankSpace} />
      <View style={[styles.bottomContent, { marginTop: 0, justifyContent: 'center' }]}>
        <CustomButton title="audit physique à faire" onPress={handleMissingInspectionsPress} />
        <View style={{ marginVertical: 10 }}> 
        </View> 
        <Image source={require('../assets/images/illustration_survey.jpg')} style={{ width: 350, height: 350 }} />
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
    width: 45,
    height: 45,
    marginRight: 5,
    marginLeft: 0,
  },
  textContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 5,
  },
  // infoText: {
  //   fontSize: 16,
  // },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  labelStyle: {
    fontWeight: 'bold',
    color: 'blue', // Example color for label
  },
  valueStyle: {
    color: 'black', // Example color for value
  },

  // button: {
  //   backgroundColor: '#007bff',
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   color: '#ffffff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
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
