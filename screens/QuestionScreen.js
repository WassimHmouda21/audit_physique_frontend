import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'; // Import FlatList and Image
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
  const { categoryId, siteId } = route.params; // Corrected variable name
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
    console.log("Question ID:", question);
    navigation.navigate('ReponseScreen', { questionId: question.id });
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

      {/* Replace ScrollView with FlatList */}
      <FlatList
        horizontal={true} // Set to true for horizontal scrolling
        data={questions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.questionItem}
            onPress={() => handleQuestionPress(item)}
          >
            <View style={styles.card}>
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>ordre:</Text>
                    <Text style={styles.detailValue}>{item.ordre}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Ref:</Text>
                    <Text style={styles.detailValue}>{item.Ref}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Question:</Text>
                    <Text style={styles.detailValue}>{item.Question}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false} // Disable default horizontal scroll indicator
        contentContainerStyle={styles.contentContainer} // Apply styling
      />

      <View style={styles.scrollIndicatorContainer}>
        <Image
          source={require('../assets/images/right-arrow.png')} // Replace with your arrow icon
          style={styles.scrollIndicator}
        />
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
    marginBottom: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%', // Set card width to cover entire screen
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: 'black', // Set text color to black
  },
  questionItem: {
    width: 400, // Adjust the width to fit the screen
    marginRight: 10, // Add margin to create space between items
  },
  cardContent: {
    width: '100%', // Set content width to cover entire screen
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollIndicatorContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  scrollIndicator: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default QuestionScreen;
