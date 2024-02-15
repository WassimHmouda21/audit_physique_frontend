import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'; // Import ScrollView
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

class Question {
  constructor(id, ordre, Ref, Question, categorie_id) {
    this.id = id;
    this.ordre = ordre;
    this.Ref = Ref;
    this.Question = Question;
    this.categorie_id = categorie_id;
  }
}

const QuestionScreen = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const [customerSiteStructure, setCustomerSiteStructure] = useState('');
  const [categorieStructure, setCategorieStructure] = useState('');
  const { categoryId,siteId } = route.params; // Corrected variable name
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch questions by categoryId
        const responseQuestions = await axios.get(`http://10.0.2.2:8000/api/questions/${categoryId}`);
        if (responseQuestions.status === 200) {
          const quests = responseQuestions.data.questions.map(quest => new Question(quest.id, quest.ordre, quest.Ref, quest.Question, quest.categorie_id));
          setQuestions(quests);
        } else {
          console.log('Failed to fetch questions');
        }
  
        // Fetch Customer_site by ID to get the Structure
        const responseCustomerSite = await axios.get(`http://10.0.2.2:8000/api/customer_site/${siteId}`);
        if (responseCustomerSite.status === 200) {
          setCustomerSiteStructure(responseCustomerSite.data.Structure);
        } else {
          console.log('Failed to fetch customer site');
        }

        const responseCategorie = await axios.get(`http://10.0.2.2:8000/api/categories/${categoryId}`);
        if (responseCategorie.status === 200) {
          setCategorieStructure(responseCategorie.data.Nom);
        } else {
          console.log('Failed to fetch categorie');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, [categoryId, siteId]); // Include both categoryId and siteId in the dependency array
  
  const handleQuestionPress = (question) => {
    // Implement functionality for handling question press
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
        {/* <Text style={styles.title}>Customer Site:</Text> */}
          <Text style={styles.title}>{customerSiteStructure}</Text>
          {/* <Text style={styles.title}>Categorie:</Text> */}
          <Text style={styles.title}>{categorieStructure}</Text>
          <Text style={styles.subtitle}>Questions:</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.questionList}>
          {questions.map((quest, index) => (
            <TouchableOpacity
              key={index}
              style={styles.questionItem}
              onPress={() => handleQuestionPress(quest)}>
              <View style={styles.card}>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>ordre:</Text>
                      <Text style={styles.detailValue}>{quest.ordre}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Ref:</Text>
                      <Text style={styles.detailValue}>{quest.Ref}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Question:</Text>
                      <Text style={styles.detailValue}>{quest.Question}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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
    detailLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'blue',
      marginBottom: 5,
    },
    detailValue: {
      fontSize: 14,
      color: 'black',
      marginBottom: 10,
    },
    questionItemText: {
      fontSize: 18, // Set font size to make letters big
      color: 'black', // Set text color to black
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    scrollView: {
        flex: 1,
        width: '100%',
      },
      questionList: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'white',  // Set background color to white
      },
  });  



export default QuestionScreen;
