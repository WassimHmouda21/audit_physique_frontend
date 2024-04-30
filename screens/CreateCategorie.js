import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import axios from 'axios';

const CreateCategorie = ({ route }) => {
    const { customerSiteId} = route.params;
    console.log("Customer Site ID:", customerSiteId);

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
        return (
            <View>
                
                <View style={{ marginBottom: 20 }}>
                <Button title="Submit custom Categories" onPress={() => handleSubmitSite(customerSiteId)} />
                </View>
            </View>
        );
    }


export default CreateCategorie;

   