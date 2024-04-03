import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
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

class Project {
  constructor(id, Nom, URL, Description, customer_id, year, QualityChecked, QualityCheckedDateTime, QualityCheckedMessage, Preuve, is_submitted) {
    this.id = id;
    this.Nom = Nom;
    this.URL = URL;
    this.Description = Description;
    this.customer_id = customer_id;
    this.year = year;
    this.QualityChecked = QualityChecked;
    this.QualityCheckedDateTime = QualityCheckedDateTime;
    this.QualityCheckedMessage = QualityCheckedMessage;
    this.Preuve = Preuve;
    this.is_submitted = is_submitted;
  }
}

const SitesScreen = ({ route, navigation }) => {
  const { ProjetId, customerId } = route.params;
  const [customerSites, setCustomerSites] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [project, setProject] = useState(null);

  // Define the fetchData function outside of useEffect
  const fetchData = async () => {
    try {
      const responseSites = await axios.get(`http://10.0.2.2:8000/api/project_sites/${ProjetId}`);
      if (responseSites.data.status === 200) {
        const sites = responseSites.data.customer_sites.map(site => new Customer_site(site.id, site.Numero_site, site.Structure, site.Lieu, site.Customer_Id));
        setCustomerSites(sites);
      } else {
        console.log(responseSites.data.message);
      }

      const responseCustomer = await axios.get(`http://10.0.2.2:8000/api/customer/${customerId}`);
      setCustomer(responseCustomer.data);

      console.log('Fetching project data for ProjetId:', ProjetId);
      const responseProject = await axios.get(`http://10.0.2.2:8000/api/projet/${ProjetId}`);
      console.log('Response data for ProjetId:', ProjetId, responseProject.data);

      if (responseProject.data && responseProject.data.project) {
        const projData = responseProject.data.project;
        const proj = new Project(
          projData.id,
          projData.Nom,
          projData.URL,
          projData.Description,
          projData.customer_id,
          projData.year,
          projData.QualityChecked,
          projData.QualityCheckedDateTime,
          projData.QualityCheckedMessage,
          projData.Preuve,
          projData.is_submitted
        );
        setProject(proj); // Set project data directly without using an array
      } else {
        console.log('Project data not found for ProjetId:', ProjetId);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData function on component mount
  }, [customerId, ProjetId]);

  const handleCardPress = (customerSite) => {
    console.log("Customer Site:", customerSite);
    console.log("Navigating to CategoryScreen with site ID:", customerSite.id);
    console.log("Customer ID:", customerId);
    console.log("Project ID:", ProjetId);
    navigation.navigate('CategoryScreen', { siteId: customerSite.id, customerId: customerId, ProjetId: ProjetId });
  };

  const submitProject = async (projectId) => {
    try {
      await axios.post(`http://10.0.2.2:8000/api/updateproj/${projectId}`, { is_submitted: true });
      console.log('Project submitted successfully.');
      // Refresh project data after submission
      fetchData();
      // Navigate to ProgressionScreen with project data
      // navigation.navigate('ProgressionScreen', { project: project });
    } catch (error) {
      console.log('Error submitting project:', error);
    }
  };
  
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {project ? (
            <View style={styles.cardContent}>
              <Text style={styles.detailValue}> {project.Nom}</Text>
              <Text style={styles.detailValue}> Year: {project.year}</Text>
            </View>
          ) : (
            <Text>No project available</Text>
          )}
          <Text style={styles.infoText}>Select Customer Site:</Text>
        </View>

        {customerSites.length > 0 ? (
          customerSites.map((site, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(site)}>
              <View style={styles.cardContent}>
                <View style={styles.labelValueContainer}>
                  <View style={styles.rectangle} />
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: 'blue' }]}>Site </Text>
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
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No customer sites available</Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => submitProject(project.id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Submit Project</Text>
          </TouchableOpacity>
        </View>
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
    color: '#DAA520',
    marginLeft: 30
  },
  infoTexte: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    color: 'blue',
  },
  deleteButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10, // Adjust as needed for spacing
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // to make it circular
  },
  rectangle: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    marginRight: 10,
    borderRadius: 25 / 2, // Set borderRadius to half of the height for vertical oval or half of the width for horizontal oval
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
    fontSize: 16,
    color: 'blue',
  },
  detailValue: {
    marginLeft: 5,
    fontSize: 16,
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
