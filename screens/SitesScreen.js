import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';

class Customer_site {
  constructor(id, Numero_site, Structure, Lieu, Customer_Id) {
    this.id = id;
    this.Numero_site = Numero_site;
    this.Structure = Structure;
    this.Lieu = Lieu;
    this.Customer_Id = Customer_Id;
  }
}

const SitesScreen = ({ route, navigation }) => {
  const { customerId } = route.params; // Get customerId from route params
  const [customerSites, setCustomerSites] = useState([]);

  useEffect(() => {
    async function fetchCustomerSites() {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/api/customer_sites/${customerId}`);
        console.log(response.data);
        if (response.data.status === 200) {
          // Map the response data to instances of Customer_site class
          const sites = response.data.customer_sites.map(site => new Customer_site(site.id, site.Numero_site, site.Structure, site.Lieu, site.Customer_Id));
          setCustomerSites(sites);
        } else {
          console.log(response.data.message); // Log error message if status is not 200
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchCustomerSites();
  }, [customerId]); // Include customerId in dependency array to re-fetch data when it changes

  const handleCardPress = (customerSite) => {
    // Log the customerSite object to inspect its structure and properties
    console.log("Customer Site:", customerSite);
    
    // Navigate to CategoryScreen and pass the site ID as a parameter
    console.log("Navigating to CategoryScreen with site ID:", customerSite.id);
    navigation.navigate('CategoryScreen', { siteId: customerSite.id });
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.infoTextet}>Audit de Conformité ISO 27002 / Rapport d’Audit de Vérification des Aspects de Sécurité Physique</Text>
            <Text style={styles.infoTexte}>Référence normative : ISO 27002 (Chapitre A.11)
              Méthode : MEHARI 2017 (Sécurité des Sites et locaux informatiques)
            </Text>
          </View>
        </View>
        <Text style={styles.infoText}>Select Customer Site:</Text>
        {customerSites.length > 0 ? (
          customerSites.map((site, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(site)}>
              <View style={styles.cardContent}>
                <View style={styles.labelValueContainer}>
                  <View style={styles.rectangle} />
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: 'blue' }]}>Numero_site:</Text>
                    <Text style={[styles.detailValue]}>{site.Numero_site}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: 'blue' }]}>Structure:</Text>
                  <Text style={[styles.detailValue]}>{site.Structure}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: 'blue' }]}>Lieu:</Text>
                  <Text style={[styles.detailValue]}>{site.Lieu}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: 'blue' }]}>Customer_Id:</Text>
                  <Text style={[styles.detailValue]}>{site.Customer_Id}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No customer sites available</Text>
        )}
      </ScrollView>
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
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'green',
  },
  infoTexte: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    color: 'blue',
  },
  infoTextet: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#007bff',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  rectangle: {
    width: 20,
    height: 25,
    backgroundColor: 'red',
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  labelValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: 'blue',
  },
  detailValue: {
    marginLeft: 5,
    color: 'black',
    flexWrap: 'wrap', // Allow text to wrap to the next line if it exceeds the width
    flex: 1, // Allow the text to expand to take up available space
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  scrollView: {
    width: '100%',
  },
});

export default SitesScreen;
