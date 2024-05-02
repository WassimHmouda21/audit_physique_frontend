import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const CreateCategorie = ({ route }) => {
  const { customerSiteId } = route.params;
  console.log("Customer Site ID:", customerSiteId);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  class Categorie {
    constructor(id, Nom) {
      this.id = id;
      this.Nom = Nom;
    }
  }

  const handleCategoryPress = (categorie) => {
    console.log("Categorie :", categorie);
    // Navigate to CategoryScreen and pass the site ID as a parameter
    console.log("Navigating to QuestionScreen with category ID:", categorie.id);
    navigation.navigate('CreateQuestion', { categoryId: categorie.id});
  };

  const [categorieData, setCategorieSiteData] = useState({
    Nom: '',
    CustomerSite_Id: ''
  });

  const handleSiteInputChange = (key, value) => {
    setCategorieSiteData({
      ...categorieData,
      [key]: value.toString() // Convert value to string
    });
  };

  const handleSubmitSite = (customerSiteId) => {
    // Now projectId is available here
    const updatedCategorieData = {
      ...categorieData,
      CustomerSite_Id: customerSiteId
    };

    console.log('Submitting Customer_site data:', updatedCategorieData);
    axios.post(`http://10.0.2.2:8000/api/create_categories/1/${customerSiteId}`, updatedCategorieData)
      .then(response => {
        console.log('Categorie created successfully:', response.data);
        // Navigate to the next screen or perform any other actions
      })
      .catch(error => {
        console.error('Failed to create Customer_site:', error);
      });
  };

  const handleDisplayCategories = async () => {
    console.log("Fetching categories...");
    try {
      // Fetch categories
      const responseCategories = await axios.get(`http://10.0.2.2:8000/api/categorie/${customerSiteId}`);
      console.log("Response from API:", responseCategories.data); // Log the response received from the API
      if (responseCategories.status === 200) {
        const categs = responseCategories.data.categories.map(categ => new Categorie(categ.id, categ.Nom));
        setCategories(categs);
        console.log("Categories fetched successfully:", categs);
      } else {
        console.log('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleDisplayCategories();
  
      // Clean up function
      return () => {};
    }, []) // Empty dependency array to run only on mount
  );

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Button title="Submit custom Categories" onPress={() => handleSubmitSite(customerSiteId)} />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Button title="Display Categories" onPress={handleDisplayCategories} />
      </View>
  
        
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.subtitle}>Categories:</Text>
            </View>
            {categories.map((category, index) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category)}
                key={index}>
                <Text style={styles.categoryItemText}>{category.Nom}</Text>
              </TouchableOpacity>
            ))}
          </View>
        
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#DAA520',
  },
  scrollView: {
    flex: 1,
    width: '100%',
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
  categoryItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  categoryItemText: {
    fontSize: 18,
    color: 'black',
  },
});

export default CreateCategorie;
