import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';

const SitesScreen = ({ route }) => {
  const { customerId } = route.params; // Get customerId from route params
  const [customerSites, setCustomerSites] = useState([]);

  useEffect(() => {
    async function fetchCustomerSites() {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/api/customer_sites/${customerId}`);
        console.log(response.data);
        if (response.data.status === 200) {
          setCustomerSites(response.data.customer_sites);
        } else {
          console.log(response.data.message); // Log error message if status is not 200
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchCustomerSites();
  }, [customerId]); // Include customerId in dependency array to re-fetch data when it changes

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Customer Sites:</Text>
      {customerSites.length > 0 ? (
        customerSites.map((site, index) => (
          <View key={index} style={styles.siteContainer}>
            {/* Render site information here */}
            <Text>Site: {site.Structure}</Text>
          </View>
        ))
      ) : (
        <Text>No customer sites available</Text>
      )}
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
  infoText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'green',
  },
  siteContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  // Add more styles as needed
});

export default SitesScreen;
