// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import CustomHeader from '../components/CustomHeader'; // Update the path
import axios from 'axios';

const HomeScreen = () => {
  const [customersites, setCustomersites] = useState([]);

  useEffect(() => {
    async function getCustomersitesById() {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/customer_sites/1');
        console.log(response.data);
        setCustomersites(response.data.customer_sites);
      } catch (error) {
        console.log(error);
      }
    }

    getCustomersitesById();
  }, []);

  console.log('Rendering:', customersites);

  return (
    <View style={styles.container}>
      <CustomHeader />
      {customersites.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <>
          <FlatList
            data={customersites}
            renderItem={({ item }) => (
              <Text style={styles.item}>
                {item.Numero_site}, {item.Structure}, {item.Lieu}
              </Text>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
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
  },
  item: {
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
