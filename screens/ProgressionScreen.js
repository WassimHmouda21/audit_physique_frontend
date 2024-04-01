import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';

const ProgressionScreen = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
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
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchData();
  }, []);

  console.log('Projects state:', projects);

  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Text style={styles.detailLabel}>Progression Screen</Text>
        <Text style={styles.detailLabel}>these are done projects</Text>
        {projects.length > 0 ? (
          projects.map(project => (
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
});

export default ProgressionScreen;
