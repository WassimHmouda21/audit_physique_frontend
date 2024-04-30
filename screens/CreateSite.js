import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const CreateSite = ({ route }) => {
    const { customerId, projectId } = route.params;
    console.log("Customer ID:", customerId);
    console.log("Project ID:", projectId);
    const navigation = useNavigation();

    const [customerSiteData, setCustomerSiteData] = useState({
        Numero_site: '',
        Structure: '',
        Lieu: '',
        Customer_Id: customerId,
        Project_id: ''
    });


    const handleSiteInputChange = (key, value) => {
        setCustomerSiteData({
            ...customerSiteData,
            [key]: value.toString() // Convert value to string
        });
    };

  
    const handleSubmitSite = (projectId) => {
        // Now projectId is available here
        const updatedCustomerSiteData = {
            ...customerSiteData,
            Project_id: projectId
        };

        console.log('Submitting Customer_site data:', updatedCustomerSiteData);
        axios.post(`http://10.0.2.2:8000/api/create_site/${customerId}/${projectId}`, updatedCustomerSiteData)
            .then(response => {
                console.log('Customer_site created successfully:', response.data);

                const createdCustomerSiteId = response.data.customer_site.id;

                setCustomerSiteData({
                    ...customerSiteData,
                    id: createdCustomerSiteId // Make sure the project ID is set in the state
                });
                // Navigate to the next screen
                navigation.navigate('CreateCategorie', {  customerSiteId: createdCustomerSiteId });
                // Navigate to the next screen or perform any other actions
            })
            .catch(error => {
                console.error('Failed to create Customer_site:', error);
            });
    };
    return (
        <View>
            
            <View style={{ marginBottom: 20 }}>
            <TextInput
                    placeholder="Numero_site"
                    value={customerSiteData.Numero_site}
                    onChangeText={text => handleSiteInputChange('Numero_site', text)}
                />
                <TextInput
                    placeholder="Structure"
                    value={customerSiteData.Structure}
                    onChangeText={text => handleSiteInputChange('Structure', text)}
                />
                <TextInput
                    placeholder="Lieu"
                    value={customerSiteData.Lieu}
                    onChangeText={text => handleSiteInputChange('Lieu', text)}
                />
            <Button title="Submit Site" onPress={() => handleSubmitSite(projectId)} />
            </View>
        </View>
    );
}

export default CreateSite;

   