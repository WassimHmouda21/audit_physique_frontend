import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

class Customer {
  constructor(id, SN, LN, Logo, Description, SecteurActivite, Categorie, Site_Web, Adresse_mail, Organigramme, Network_Design, Type) {
    this.id = id;
    this.SN = SN;
    this.LN = LN;
    this.Logo = Logo;
    this.Description = Description;
    this.SecteurActivite = SecteurActivite;
    this.Categorie = Categorie;
    this.Site_Web = Site_Web;
    this.Adresse_mail = Adresse_mail;
    this.Organigramme = Organigramme;
    this.Network_Design = Network_Design;
    this.Type = Type;
  }
}

const API_ENDPOINT = 'http://10.0.2.2:8000/api/customerpage';

const SearchCustomerScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomers] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/customerpage');
      console.log(response.data);
      setCustomers(response.data.customers); // Assuming `customers` is the correct property containing the data array
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error in fetching data ... Please check your internet connection</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      {customer && customer.length > 0 ? (
        <FlatList
          data={customer}
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
      {/* Additional logs */}
      {console.log('Customer:', customer)}
      {console.log('Error:', error)}
    </SafeAreaView>
  );
      }  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SearchCustomerScreen;
