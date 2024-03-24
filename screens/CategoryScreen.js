import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity,Image ,ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const [customerSiteStructure, setCustomerSiteStructure] = useState('');
  const { siteId,customerId  } = route.params;
  const [customer, setCustomer] = useState(null);
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
    console.log("Site ID:", siteId);
    navigation.navigate('QuestionScreen', { categoryId: categorie.id, siteId: siteId });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const responseCategories = await axios.get(`http://10.0.2.2:8000/api/categorie/${siteId}`);
        if (responseCategories.status === 200) {
          const categs = responseCategories.data.categories.map(categ => new Categorie(categ.id, categ.Nom));

          setCategories(categs);
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

        const responseCustomer = await axios.get(`http://10.0.2.2:8000/api/customer/${customerId}`);
        console.log('Response data:', responseCustomer.data); // Log the response data
        setCustomer(responseCustomer.data); // Set customer data from the response

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [siteId]);

  return (
    <View style={styles.container}>
      {customer && customer.Logo ? (
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: `http://10.0.2.2:8000/assets/${customer.Logo}` }}
            style={styles.logo}
            onLoadStart={() => console.log('Image loading started')}
            onLoadEnd={() => console.log('Image loading ended')}
            onError={(error) => console.log('Image loading error:', error)}
          />
        </View>
      ) : (
        <Text>No logo available</Text>
      )}

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Customer Site:</Text>
            <Text style={styles.title}>{customerSiteStructure}</Text>
            <Text style={styles.subtitle}>Categories:</Text>
          </View>
          {categories.map((category, index) => (
            <View style={styles.categoryCard} key={index}>
              <ScrollView style={styles.categoryScrollView}>
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(category)}>
                  <Text style={styles.categoryItemText}>{category.Nom}</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomHeader />
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // to make it circular
  },
  categoryCard: {
    marginVertical: 10,
  },
  categoryScrollView: {
    maxHeight: 150, // Adjust the maximum height of each card as per your requirement
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});


export default CategoryScreen;
