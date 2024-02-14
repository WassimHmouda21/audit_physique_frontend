import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const [customerSiteStructure, setCustomerSiteStructure] = useState('');
  const { siteId } = route.params;
  const navigation = useNavigation();

  class Categorie {
    constructor(id, Nom) {
      this.id = id;
      this.Nom = Nom;
    }
  }

  const handleCategoryPress = (categoryId) => {
    navigation.navigate('QuestionScreen', { categoryId });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const responseCategories = await axios.get('http://10.0.2.2:8000/api/categories');
        if (responseCategories.status === 200) {
          const categ = responseCategories.data.categories.map(categ => new Categorie(categ.id, categ.Nom));
          setCategories(categ);
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
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>Customer Site:</Text>
          <Text style={styles.title}>{customerSiteStructure}</Text>
          <Text style={styles.subtitle}>Categories:</Text>
        </View>
      </View>
      <View style={styles.categoryList}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}>
            <Text style={styles.categoryItemText}>{category.Nom}</Text>
          </TouchableOpacity>
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
    textAlign: 'center',
    color: '#007bff',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'green',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  categoryList: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'white',  // Set background color to white
  },
  categoryItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  categoryItemText: {
    fontSize: 18, // Set font size to make letters big
    color: 'black', // Set text color to black
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CategoryScreen;
