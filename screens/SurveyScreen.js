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
        <Text style={styles.infoText}>Your customer today is</Text>
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
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>LN:</Text>
                <Text style={styles.detailValue}>{customer.LN}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={styles.detailValue}>{customer.Description}</Text>
              </View>
              </View>
              <View style={styles.detailRow}>
              <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>SecteurActivite:</Text>
                <Text style={styles.detailValue}>{customer.SecteurActivite}</Text>
              {/* Add the fourth field here */}
            </View>
           
          
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Categorie:</Text>
                <Text style={styles.detailValue}>{customer.Categorie}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Site_Web:</Text>
                <Text style={styles.detailValue}>{customer.Site_Web}</Text>
              </View>
              </View>
              <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Adresse_mail:</Text>
                <Text style={styles.detailValue}>{customer.Adresse_mail}</Text>
              </View>
              <Text style={styles.detailLabel}>Organigramme:</Text>
                <Text style={styles.detailValue}>{customer.Organigramme}</Text>
              {/* Add the fourth field here */}
            </View>
            
           
              
              </View>
              <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{customer.Type}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Network_Design:</Text>
                <Text style={styles.detailValue}>{customer.Network_Design}</Text>
              </View>
            
            
            {/* Add other rows of fields here */}
          </View>
          <CustomButton title="Join Survey Project" onPress={handletheMissingInspectionsPress} />
        </View>
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
