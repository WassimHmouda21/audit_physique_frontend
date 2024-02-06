// SearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import CustomHeader from '../components/CustomHeader'; // Update the path
import axios from 'axios';
const SearchScreen = () => {
  const [customersites, setCustomersites] = useState([]);

  useEffect(() => {
    async function getCustomersitesById() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customer-sites/1');
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
      {/* Content of the screen */}
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
      
      {/* CustomHeader at the bottom */}
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
});
    
    export default SearchScreen;