import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader'; // Update the path
import axios from 'axios';

const API_ENDPOINT = 'http://10.0.2.2:8000/api/customerpage';

const SearchCustomerScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      console.log('Response:', response); // Log the full response object
      setData(response.data);
      console.log('Data fetched successfully:', response.data);
    } catch (error) {
      setError(error);
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }
  

  const handleSearch = (query) => {
    setSearchQuery(query);
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
    </SafeAreaView>
  );
};

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
