import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Image, Modal, ScrollView, TextInput, Alert } from 'react-native';
import axios from 'axios';

import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import CustomButton from '../components/CustomButton';

class Question {
  constructor(id, ordre, Ref, Question, categorie_id) {
    this.id = id;
    this.ordre = ordre;
    this.Ref = Ref;
    this.Question = Question;
    this.categorie_id = categorie_id;
  }
}

class Reponse {
  constructor(id, projet, question_id, conformite, commentaire, site) {
    this.id = id;
    this.projet = projet;
    this.question_id = question_id;
    this.conformite = conformite;
    this.commentaire = commentaire;
    this.site = site;
  }
}

const QuestionScreen = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const [customerSiteStructure, setCustomerSiteStructure] = useState('');
  const [categorieStructure, setCategorieStructure] = useState('');
  const [reponses, setReponses] = useState([]);
  const { categoryId, siteId } = route.params;
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('on');
  const [showModal, setShowModal] = useState(false);
  const [selectedReponse, setSelectedReponse] = useState(null);
  const [projet, setProjet] = useState('');
  const [conformite, setConformite] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [site, setSite] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching questions for category ID:', categoryId);
        const responseQuestions = await axios.get(`http://10.0.2.2:8000/api/questions/${categoryId}`);
        if (responseQuestions.status === 200) {
          console.log('Questions response:', responseQuestions.data);
          const quests = responseQuestions.data.questions.map(quest => new Question(quest.id, quest.ordre, quest.Ref, quest.Question, quest.categorie_id));
          console.log('Mapped questions:', quests);
          setQuestions(quests);
          // Fetch responses for each question
          await Promise.all(quests.map(async (quest) => {
            console.log('Fetching responses for question ID:', quest.id);
            await fetchReponses(quest.id);
          }));
        } else {
          console.log('Failed to fetch questions');
        }

        const responseCustomerSite = await axios.get(`http://10.0.2.2:8000/api/customer_site/${siteId}`);
        if (responseCustomerSite.status === 200) {
          console.log('Customer site response:', responseCustomerSite.data);
          setCustomerSiteStructure(responseCustomerSite.data.Structure);
        } else {
          console.log('Failed to fetch customer site');
        }

        const responseCategorie = await axios.get(`http://10.0.2.2:8000/api/categories/${categoryId}`);
        if (responseCategorie.status === 200) {
          console.log('Categorie response:', responseCategorie.data);
          setCategorieStructure(responseCategorie.data.Nom);
        } else {
          console.log('Failed to fetch categorie');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [categoryId, siteId]);

  async function fetchReponses(questionId) {
    try {
      console.log('Fetching responses for question ID:', questionId);
      const responseReponses = await axios.get(`http://10.0.2.2:8000/api/displayreponse/${questionId}`);
      if (responseReponses.status === 200 && responseReponses.data.reponses) {
        console.log('Responses:', responseReponses.data.reponses);
        const reps = responseReponses.data.reponses.map(rep => new Reponse(rep.id, rep.projet, rep.question_id, rep.conformite, rep.commentaire, rep.site));
        console.log('Mapped responses:', reps);
        setReponses(prevReponses => [...prevReponses, ...reps]);
      } else {
        console.log('Failed to fetch reponses. Response:', responseReponses);
      }
    } catch (error) {
      console.error('Error fetching reponses:', error);
    }
  }

  const handleSubmit = async (questionId) => {
    try {
        const response = await axios.post(`http://10.0.2.2:8000/api/reponses/${questionId}`, {
            projet,
            conformite,
            commentaire,
            site
        });

        console.log('Response from server:', response);

        if (response.status === 201) {
            const message = response.data.message;
            const reponse_id = response.data.response.id; // Access the reponse_id from the response data

            console.log('Received response ID:', reponse_id);

            handlePress({ ...response.data.response, id: reponse_id }); // Pass the response ID as id
            Alert.alert('Success', message);
        } else {
            Alert.alert('Error', 'Failed to create response');
        }
    } catch (error) {
        console.error('Error creating response:', error);
        Alert.alert('Error', 'Failed to create response');
    }
};


  
  
  const handlePress = (reponse) => {
    console.log("Handle Press function is called with response:", reponse);
    const reponseId = reponse ? reponse.id : null;
    console.log("Navigating to CameraScreen with response ID:", reponseId);
    // Navigating from the QuestionScreen component
    navigation.navigate('CameraScreen', { reponseId: reponseId });
  };
  
  
  
  
  
  const updateReponse = async (item) => {
    setSelectedReponse(item);
    setConformite(item.conformite);
    setCommentaire(item.commentaire);
    setShowModal(true);
  };
  
  const handleUpdate = async () => {
    try {
      setShowModal(false);
      console.warn('Updating response:', conformite, commentaire);
      const url = `http://10.0.2.2:8000/api/updatereponse/${selectedReponse.id}`;
      const response = await axios.put(url, { conformite, commentaire });
      if (response.status === 200) {
        console.warn('Response updated successfully');
        const updatedReponse = new Reponse(selectedReponse.id, selectedReponse.projet, selectedReponse.question_id, conformite, commentaire, selectedReponse.site);
        const updatedReponses = reponses.map(rep => rep.id === selectedReponse.id ? updatedReponse : rep);
        setReponses(updatedReponses);
      } else {
        throw new Error('Failed to update response');
      }
    } catch (error) {
      console.error('Error updating response:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{customerSiteStructure}</Text>
        <Text style={styles.title}>{categorieStructure}</Text>
        <Text style={styles.subtitle}>Questions:</Text>
      </View>
      <FlatList
        horizontal
        data={questions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.questionItem}
          >
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.detailValue}>{item.Question}</Text>
              </View>
            </View>
            <ScrollView>
              {reponses
                .filter(response => response.question_id === item.id)
                .map((response, index) => (
                  <View key={index} style={styles.responseContainer}>
                    <View style={styles.responseRow}>
                      <Text style={styles.responseText}>Projet: {response.projet}</Text>
                      <Text style={styles.responseText}>Question ID: {response.question_id}</Text>
                      <RadioButton.Group
                        onValueChange={newValue => {
                          setSelectedValue(newValue);
                        }}
                        value={selectedValue}
                      >
                        <View style={styles.radioButtonContainer}>
                          <Text style={styles.radioButtonLabel}>Conforme</Text>
                          <RadioButton value="on" />
                        </View>
                        <View style={styles.radioButtonContainer}>
                          <Text style={styles.radioButtonLabel}>Non conforme</Text>
                          <RadioButton value="off" />
                        </View>
                        <Text style={styles.responseText}>Constat d'audit: {response.commentaire}</Text>

                        <View style={styles.responseContainer}>
                        <TouchableOpacity onPress={() => handlePress(response)}>
      <Image
        source={require('../assets/images/neon-camera-icon.png')}
        style={styles.cameraLogo}
      />
    </TouchableOpacity>


                        </View>
                      </RadioButton.Group>
                    </View>
                  </View>
                ))}
              {reponses.every(response => response.question_id !== item.id) && (
                <View style={styles.responseContainer}>
                  <View style={styles.responseRow}>
                    <TouchableOpacity onPress={() => handlePress(null)}>
                      <Image
                        source={require('../assets/images/neon-camera-icon.png')}
                        style={styles.cameraLogo}
                      />
                    </TouchableOpacity>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Projet"
                        value={projet}
                        onChangeText={text => setProjet(text)}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Conformite"
                        value={conformite}
                        onChangeText={text => setConformite(text)}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Commentaire"
                        value={commentaire}
                        onChangeText={text => setCommentaire(text)}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Site"
                        value={site}
                        onChangeText={text => setSite(text)}
                      />
                      <Button title="Submit" onPress={() => handleSubmit(item.id)} />
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.scrollIndicatorContainer}>
        <Image
          source={require('../assets/images/right-arrow.png')}
          style={styles.scrollIndicator}
        />
      </View>
      <Modal visible={showModal} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Commentaire"
              value={commentaire.toString()}
              onChangeText={text => setCommentaire(text)}
            />
            <Button title="Update" onPress={handleUpdate} />
            <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
      <Button onPress={() => navigation.goBack()} title="Close" />
      <View style={styles.footer}>
        <CustomHeader />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cameraLogo: {
    width: 100, // Adjust the width of the camera logo image
    height: 100, // Adjust the height of the camera logo image
    resizeMode: 'contain',
    marginTop: 10, // Add margin top to create space between the response row and the camera logo
  },
  
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Add margin for spacing
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 10,
    shadowColor:"#fff",
    shadowOpacity:0.60,
    elevation: 5,
  },
  radioButtonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, // Adjust as needed for spacing between options
  },
  radioButtonLabel: {
    marginRight: 14, 
    color: 'black',// Add margin between label and button
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
  card: {
    marginBottom: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%', // Set card width to cover entire screen
  },
  scrollIndicatorContainer: {
    position: 'absolute',
    right: 10,
    top: '20%',
    transform: [{ translateY: -10 }],
  },
  scrollIndicator: {
    width: 20, // Adjust the width
    height: 20, // Adjust the height
    resizeMode: 'contain',
  },
  detailValue: {
    fontSize: 16,
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
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  responseContainer: {
    marginVertical: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  responseText: {
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default QuestionScreen;