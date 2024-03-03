import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
const SurveyScreen = ({ route }) => {
  const [customer, setCustomer] = useState(null);
  const navigation = useNavigation();
  const { customerId } = route.params;

  const handletheMissingInspectionsPress = () => {
    // Implement logic for handling Missing Inspections button press
    console.log('Button pressed');
    
    // Navigate to SitesScreen
    navigation.navigate('SitesScreen', { customerId: customer.id });
  };
  
  useEffect(() => {
    async function fetchCustomer() {
      try {
        console.log('Customer ID:', customerId); // Log the customerId
        const response = await axios.get(`http://10.0.2.2:8000/api/customer/${customerId}`);
        console.log('Response data:', response.data); // Log the response data
        setCustomer(response.data); // Set customer data from the response
      } catch (error) {
        console.log('Error fetching customer data:', error); // Log any errors
      }
    }
  
    fetchCustomer();
  }, [customerId]);
  return (
    <View style={styles.container}>
     
      {customer && customer.Logo ? (
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: `http://10.0.2.2:8000/assets/${customer.Logo}` }}
            style={styles.logo}
            onLoadStart={() => console.log('Image loading started')}
            onLoadEnd={() => console.log('Image loading ended')}
            onError={(error) => console.log('Image loading error:', error)}
          />
        </View>
      ) : (
        <Text>No logo available</Text>
      )}
      {customer && (
        <View style={styles.card}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>SN:</Text>
                <Text style={styles.detailValue}>{customer.SN}</Text>
              </View>
              {/* Add other rows of fields here */}
            </View>
            <CustomButton title="Join Survey Project" onPress={handletheMissingInspectionsPress} />
          </View>
        </View>
      )}
       <Text style={styles.infoText}>associated pojects :</Text>
      <StatusBar style="auto" />
      <View style={styles.footer}>
        <CustomHeader />
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // to make it circular
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
    width: '80%', // Adjust the width as needed
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    flex: 1,
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'green',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SurveyScreen;
