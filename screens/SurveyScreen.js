import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar ,ScrollView} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
const SurveyScreen = ({ route }) => {
  const [customer, setCustomer] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();
  const [sortedProjects, setSortedProjects] = useState([]);
  const [sortByYear, setSortByYear] = useState(false);
  const { customerId } = route.params;

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/api/customer/${customerId}`);
        if (response.status === 200) {
          setCustomer(response.data);
        } else {
          console.log('Failed to fetch customer data');
        }
  
        const responseProject = await axios.get(`http://10.0.2.2:8000/api/projects/${customerId}`);
        const fetchedProjects = responseProject.data.projects;
        setProjects(fetchedProjects);
        setSortedProjects([...fetchedProjects]); // Initialize sortedProjects with fetched projects
      } catch (error) {
        console.log('Error fetching customer data:', error);
      }
    }
  
    fetchCustomer();
  }, [customerId]);
  

  const handletheMissingInspectionsPress = () => {
    console.log('Button pressed');
    // Implement navigation logic
    navigation.navigate('SitesScreen', { customerId: customer.id });

  };
  const handleSortByYear = () => {
    const sorted = [...projects]; // Copy projects array
    console.log('Unsorted projects:', sorted); // Log unsorted projects
    if (sortByYear) {
      // Sort in ascending order
      sorted.sort((a, b) => a.year.localeCompare(b.year));
      console.log('Sorted projects (ascending):', sorted); // Log sorted projects
    } else {
      // Sort in descending order
      sorted.sort((a, b) => b.year.localeCompare(a.year));
      console.log('Sorted projects (descending):', sorted); // Log sorted projects
    }
    setSortedProjects(sorted);
    setSortByYear(!sortByYear);
  };
  
   
  return (
    <View style={styles.container}>
      {customer && customer.Logo ? (
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: `http://10.0.2.2:8000/assets/${customer.Logo}` }}
            style={styles.logo}
          />
        </View>
      ) : (
        <Text>No logo available</Text>
      )}
      {customer && (
              <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRowe}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>SN:</Text>
                <Text style={styles.detailValue}>{customer.SN}</Text>
              </View>
            </View>
            <CustomButton title="Join Survey Project" onPress={handletheMissingInspectionsPress} />
          </View>
          <CustomButton
                title={sortByYear ? 'Sort Ascending' : 'Sort Descending'}
                onPress={handleSortByYear}
              />
           <Text style={styles.infoText}>Associated projects :</Text>
      {sortedProjects.length > 0 ? (
        sortedProjects.map((project, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Project Name:</Text>
                  <Text style={styles.detailValue}>{project.Nom}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Project Year:</Text>
                  <Text style={styles.detailValue}>{project.year}</Text>
                </View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text>No projects available</Text>
      )}
        </View>
        </ScrollView>
      )}
     
      <StatusBar style="auto" />
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
  scrollView: {
    flex: 1,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    marginTop: 20,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 50,
  },
   detailRowe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 150,
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
    color: '#DAA520',
  },
});

export default SurveyScreen;