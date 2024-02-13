import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';

const CategoryScreen = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const [customerSiteStructure, setCustomerSiteStructure] = useState('');
  const { siteId } = route.params;

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const responseCategories = await axios.get('http://10.0.2.2:8000/api/categories');
        if (responseCategories.status === 200) {
          setCategories(responseCategories.data.categories);
        } else {
          console.log('Failed to fetch categories');
        }

        // Fetch Customer_site by ID to get the Structure
        const responseCustomerSite = await axios.get(`http://10.0.2.2:8000/api/customer_site/${siteId}`);
        if (responseCustomerSite.status === 200) {
          setCustomerSiteStructure(responseCustomerSite.data.Structure);
        } else {
          console.log('Failed to fetch customer site');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [siteId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Site: {customerSiteStructure}</Text>
      <Text style={styles.subtitle}>Categories:</Text>
      <View style={styles.categoryList}>
        {categories.map((category) => (
          <Text key={category.id} style={styles.categoryItem}>{category.Nom}</Text>
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  categoryItem: {
    fontSize: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CategoryScreen;
