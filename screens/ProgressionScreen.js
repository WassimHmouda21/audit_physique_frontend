import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet ,Button ,TouchableOpacity,ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
const ProgressionScreen = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([]);

  const navigation = useNavigation();

  // Use useFocusEffect instead of useEffect
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
      try {
        console.log('Fetching projects...');
        const response = await axios.get(`http://10.0.2.2:8000/api/getprojsubmit`);
        console.log('Response data:', response.data);

        if (response.data && response.data.projects) {
          console.log('Projects found:', response.data.projects);
          setProjects(response.data.projects);
        } else {
          console.log('No projects found in response.');
        }


        const unsubmitresponse = await axios.get(`http://10.0.2.2:8000/api/getprojunsubmit`);
        console.log('Response data:', unsubmitresponse.data);

        if (unsubmitresponse.data && unsubmitresponse.data.projects) {
          console.log('Projects found:', unsubmitresponse.data.projects);
          setProject(unsubmitresponse.data.projects);
        } else {
          console.log('No projects found in response.');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchData(); 
    return () => {};
  }, []) // Empty dependency array to run only on mount
);

  console.log('Projects state:', projects);

  const handleReclamationButtonPress = () => {
    // Handle the button press here
    // For example, you can navigate to another screen or make an API call
    // For sending a reclamation email, you can call the API here
    axios.post('http://10.0.2.2:8000/api/send-reclamation-email')
      .then(response => {
        // Handle successful response if needed
        console.log('Reclamation email sent successfully:', response.data);

        console.warn('Reclamation email sent successfully');

      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server responded with error status:', error.response.status);
          console.error('Error response data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from server:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
        // Handle error if needed
        console.error('Error sending reclamation email:', error);
      });
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.detailLabell}>Progression History</Text>
          <ScrollView style={styles.scrollView}>
          <Text style={styles.detailLabel}>These are done projects</Text>
          {projects.length > 0 ? (
            projects.map((project) => (
              <View key={project.id}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>Project Name:</Text>
                  <Text style={styles.detailValue}>{project.Nom}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>Year:</Text>
                  <Text style={styles.detailValue}>{project.year}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>No projects available</Text>
          )}
           <Text style={styles.detailLabel}>These are undone projects</Text>
          {project.length > 0 ? (
            project.map((project) => (
              <View key={project.id}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>Project Name:</Text>
                  <Text style={styles.detailValue}>{project.Nom}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>Year:</Text>
                  <Text style={styles.detailValue}>{project.year}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>No projects available</Text>
          )}
              </ScrollView>
                 <TouchableOpacity onPress={handleReclamationButtonPress} style={styles.button}>

            <Text style={styles.buttonText}>Send email Reclamation</Text>

          </TouchableOpacity>
      
        </View>
        <View style={styles.blankSpace} />
      </View>
    
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
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardContent: {
    flex: 1,
    margin: 10, 
  },
  blankSpace: {
    height: 5,
    flex: 0.1,
    bottom: 1,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailValue: {
    marginLeft: 5,
    fontSize: 18,
    color: 'black',
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'blue',
    marginBottom: 10,
  },
  detailLabell: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DAA520',
    marginLeft: 30
  },
});

export default ProgressionScreen;
