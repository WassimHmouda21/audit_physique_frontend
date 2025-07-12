import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const CreateQuestion = ({ route }) => {
  const { categoryId } = route.params;
  console.log("Category ID:", categoryId);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const [questionData, setQuestionData] = useState({
    ordre: '',
    Ref: '',
    Question: '',
    categorie_id: ''
  });

  const handleSiteInputChange = (key, value) => {
    setQuestionData({
      ...questionData,
      [key]: value.toString() // Convert value to string
    });
  };

  const handleSubmitCategorie = (index, categoryId) => {
    const updatedQuestionData = {
      ...questionData,
      categorie_id: categoryId
    };

    console.log('Submitting Customer_site data:', updatedQuestionData);
    axios.post(`http://10.0.2.2:8000/api/create_questions/${index}/${categoryId}`, updatedQuestionData)
      .then(response => {
        console.log('Question created successfully:', response.data);
        // Navigate to the next screen or perform any other actions
      })
      .catch(error => {
        console.error('Failed to create Question:', error);
      });
  };

  return (
    <View>
      {[...Array(6)].map((_, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Button title={`Submit custom Questions ${index + 1}`} onPress={() => handleSubmitCategorie(index + 1, categoryId)} />
        </View>
      ))}
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

export default CreateQuestion;
