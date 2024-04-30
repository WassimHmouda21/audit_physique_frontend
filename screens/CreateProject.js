import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CreateProject = ({ route }) => {
    const { customerId } = route.params;
    const navigation = useNavigation();
    console.log("Customer ID:", customerId);

    const [projectData, setProjectData] = useState({
        Nom: '',
        URL: '',
        Description: '',
        year: '',
        QualityChecked: 0,
        QualityCheckedDateTime: '',
        QualityCheckedMessage: '',
        Preuve: '',
        is_submitted: false,
        customer_id: customerId // Include customer_id in projectData
    });

    const handleInputChange = (key, value) => {
        setProjectData(prevData => ({
            ...prevData,
            [key]: typeof value === 'number' ? value : value.toString() // Convert to string only if it's not a number
        }));
    };
    

    const handleSubmit = () => {
        console.log('Submitting project data:', projectData);
        axios.post(`http://10.0.2.2:8000/api/create_project/${customerId}`, projectData)
            .then(response => {
                console.log('Project created successfully:', response.data);
                // Set projectId in state
                const createdProjectId = response.data.project.id;
                setProjectData({
                    ...projectData,
                    id: createdProjectId // Make sure the project ID is set in the state
                });
                // Navigate to the next screen
                navigation.navigate('CreateSite', { customerId, projectId: createdProjectId });
            })
            .catch(error => {
                console.error('Failed to create project:', error);
                // Handle error
            });
    };
    
    

    const handleSiteSubmit = () => {
        console.log('Button pressed');
        // Implement navigation logic
        navigation.navigate('CreateSite', { customerId });
    };
    
    return (
        <View>
            <TextInput
                placeholder="Nom"
                value={projectData.Nom}
                onChangeText={text => handleInputChange('Nom', text)}
            />
            <TextInput
                placeholder="URL"
                value={projectData.URL}
                onChangeText={text => handleInputChange('URL', text)}
            />
            <TextInput
                placeholder="Description"
                value={projectData.Description}
                onChangeText={text => handleInputChange('Description', text)}
            />
            <TextInput
                placeholder="year"
                value={projectData.year}
                onChangeText={text => handleInputChange('year', text)}
            />
            <TextInput
    placeholder="QualityChecked"
    value={projectData.QualityChecked.toString()} // Convert to string explicitly
    onChangeText={text => handleInputChange('QualityChecked', text)}
/>

            <TextInput
                placeholder="QualityCheckedDateTime"
                value={projectData.QualityCheckedDateTime}
                onChangeText={text => handleInputChange('QualityCheckedDateTime', text)}
            />
            <TextInput
                placeholder="QualityCheckedMessage"
                value={projectData.QualityCheckedMessage}
                onChangeText={text => handleInputChange('QualityCheckedMessage', text)}
            />
            <TextInput
                placeholder="Preuve"
                value={projectData.Preuve}
                onChangeText={text => handleInputChange('Preuve', text)}
            />
            <Button title="Submit Project" onPress={handleSubmit} />
        
        </View>
    );
}

export default CreateProject;
