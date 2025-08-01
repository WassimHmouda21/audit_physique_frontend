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
  constructor(id, projet_id, question_id, conformite, commentaire, site) {
    this.id = id;
    this.projet_id = projet_id;
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
  const { categoryId, siteId ,user_id ,ProjetId } = route.params;
  const [site, setSite] = useState(siteId);
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('on');
  const [showModal, setShowModal] = useState(false);
  const [selectedReponse, setSelectedReponse] = useState(null);
  const [projet_id, setProjet_id] = useState(ProjetId);
  const [conformite, setConformite] = useState('2');
  const [commentaire, setCommentaire] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState(false); // Assuming value is a boolean state

  const toggleSwitch = () => {
    // Update the state value to its opposite value
    setValue(!value);
    // Update conformite based on the switch status
    const newConformite = value ? '2' : '1'; // If true, set to '1', otherwise set to '2'
    setConformite(newConformite);
  };

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
      console.log('Fetching responses for site ID:', siteId);
      console.log('Fetching responses for question ID:', questionId);
      const responseReponses = await axios.get(`http://10.0.2.2:8000/api/displayreponse/${questionId}`);
      if (responseReponses.status === 200 && responseReponses.data.reponses) {
        console.log('Responses:', responseReponses.data.reponses);
        const reps = responseReponses.data.reponses.map(rep => new Reponse(rep.id, rep.projet_id, rep.question_id, rep.conformite, rep.commentaire, rep.site));
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
          projet_id,
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


  const deleteReponseById = async (id) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:8000/api/deletreponse/${id}`);
      if (response.data.status === 200) {
        console.log('Reponse deleted successfully');
        // Remove the deleted response from the state
        setReponses(reponses.filter(reponse => reponse.id !== id));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const updateReponse = async (itemId) => {
    const updatedReponse = reponses.find(rep => rep.id === itemId);
    if (updatedReponse) {
      console.log('Selected response:', updatedReponse);
      setSelectedReponse(updatedReponse);
      setCommentaire(updatedReponse.commentaire);
      setShowModal(true);
    } else {
      console.error('Response not found');
    }
  };
  
  const handleInputChange = (text) => {
    setCommentaire(text);
    if (text.trim() === '') {
      setError('This field cannot be empty');
    } else {
      setError('');
    }
  };
  const handleUpdate = async () => {
    try {
      setShowModal(false);
      console.warn('Updating response:', conformite, commentaire);
      const url = `http://10.0.2.2:8000/api/updatereponse/${selectedReponse.id}`;
      const response = await axios.put(url, { conformite, commentaire });
      console.log('Response from server:', response.data);
      if (response.status === 200) {
        console.warn('Response updated successfully');
        // Retain the current value of conformite
        const updatedReponse = new Reponse(selectedReponse.id, selectedReponse.projet_id, selectedReponse.question_id, selectedReponse.conformite, commentaire, selectedReponse.site);
        console.log('Updated response:', updatedReponse);
        const updatedReponses = reponses.map(rep => rep.id === selectedReponse.id ? updatedReponse : rep);
        console.log('Updated responses:', updatedReponses);
        setReponses(updatedReponses);
        // setCommentaire(''); // Reset commentaire state
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
                      <Text style={styles.responseText}>Projet: {response.projet_id}</Text>
                      {/* <Text style={styles.responseText}>Question ID: {response.question_id}</Text> */}
                      {/* <Text style={styles.responseText}>Conformite: {response.conformite}</Text> */}
{/* <Text style={styles.responseText}>
  {response.conformite}
</Text>
<Text style={styles.responseText}>
  {typeof response.conformite}
</Text> */}
<Text style={styles.responseText}>
  {response.conformite === 1 ? 'Conformite: checked' : 'Conformite:  unchecked'}
</Text>


                        <Text style={styles.responseText}>Constat d'audit: {response.commentaire}</Text>

                        <View style={styles.responseContainer}>
                        <TouchableOpacity onPress={() => handlePress(response)}>
      <Image
        source={require('../assets/images/photo_icon.png')}
        style={styles.cameraLogo}
      />
    </TouchableOpacity>
    <Modal visible={showModal} transparent={true}>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
    <TextInput
  style={styles.input}
  placeholder="Enter Commentaire"
  value={commentaire}
  onChangeText={text => setCommentaire(text)}
/>

      <Button title="Update" onPress={handleUpdate} />
      <Button title="Close" onPress={() => setShowModal(false)} />
    </View>
  </View>
</Modal>

      <View style={styles.containerr}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => updateReponse(response.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>update constat</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: 10 }}>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => deleteReponseById(response.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete response</Text>
        </TouchableOpacity>
      </View>
    </View>


                        </View>

                    </View>
                  </View>
                ))}
              {reponses.every(response => response.question_id !== item.id) && (
                <View style={styles.responseContainer}>
                  <View style={styles.responseRow}>
                  <Text style={styles.label}>Vérification</Text>
                    <TouchableOpacity onPress={() => handlePress(null)}>
                      <Image
                        source={require('../assets/images/photo_icon.png')}
                        style={styles.cameraLogo}
                      />
                    </TouchableOpacity>
                    <View style={styles.textInputContainer}>
                      {/* <TextInput
                        style={styles.input}
                        placeholder="Projet"
                        value={projet_id}
                        onChangeText={text => setProjet_id(text)}
                      /> */}
                      {/* <TextInput
                        style={styles.input}
                        placeholder="Conformite"
                        value={conformite}
                        onChangeText={text => setConformite(text)}
                      /> */}
                       <Text style={styles.label}>Conformité</Text>
      <TouchableOpacity onPress={toggleSwitch}>
        <View style={styles.switchContainer}>
          <View style={[styles.switchButton, { backgroundColor: value ? '#2ecc71' : '#e74c3c' }]}>
            <View style={styles.switchIndicator} />
          </View>
        </View>
      </TouchableOpacity>
      {/* <Text style={styles.conformiteValue}>{conformite}</Text> */}

      <TextInput
        style={styles.input}
        placeholder="Enter Commentaire"
        value={commentaire}
        onChangeText={handleInputChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {/* <TextInput
  style={styles.input}
  placeholder="Enter Commentaire"
  value={commentaire ? commentaire.toString() : ''}
  onChangeText={(text) => setCommentaire(text)}
/> */}

                      {/* <TextInput
      style={styles.input}
      placeholder="Site"
      value={site}
      onChangeText={text => setSite(text)}
      editable={false} // To prevent user input
    /> */}
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
      <CustomHeader user_id={user_id} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
   containerr: {
    flexDirection: 'column', // Arrange children horizontally
    justifyContent: 'space-between', // Distribute children along the main axis with equal space between them
    alignItems: 'center', // Align children vertically
    paddingHorizontal: 20,
     // Add horizontal padding to the container
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
  label: {
    marginRight: 10,
    fontSize: 18,
     color: 'black',
  },
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 5,
  },
  switchButton: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 5,
  },
  switchIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10, // Adjust as needed for spacing
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  errorText: {
    color: 'red',
  },
  responseText: {
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default QuestionScreen;