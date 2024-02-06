import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, Image } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';

const HomeScreen = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/customerpage');
        console.log(response.data);
        setCustomers(response.data.customers); // Set customers data from the response
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchCustomers();
  }, []);
  

  return (
    <View style={styles.container}>
      <CustomHeader />
      {customers && customers.length > 0 ? (
        <FlatList
          data={customers}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>
                {item.SN}, {item.LN}, {item.Description}, {item.SecteurActivite}, {item.Categorie},
                {item.Site_Web}, {item.Adresse_mail}, {item.Organigramme}, {item.Network_Design}, {item.Type}
              </Text>
              {item.Logo ? (
                <Image
                  source={{ uri: `http://10.0.2.2:8000/assets/${item.Logo}` }}
                  style={{ width: 100, height: 100 }}
                  onLoadStart={() => console.log('Image loading started')}
                  onLoadEnd={() => console.log('Image loading ended')}
                  onError={(error) => console.log('Image loading error:', error)}
                />
              ) : (
                <Text>No logo available</Text>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No data available</Text>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
