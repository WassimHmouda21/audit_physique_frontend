import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

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

const ReponseScreen = ({ route }) => {
  const [reponses, setReponses] = useState([]);
  const { questionId } = route.params;
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [conformite, setConformite] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [selectedReponse, setSelectedReponse] = useState(null);

  useEffect(() => {
    async function fetchReponses() {
      try {
        const responseReponses = await axios.get(`http://10.0.2.2:8000/api/displayreponse/${questionId}`);
        if (responseReponses.status === 200 && responseReponses.data.reponses) {
          const reps = responseReponses.data.reponses.map(rep => new Reponse(rep.id, rep.projet, rep.question_id, rep.conformite, rep.commentaire, rep.site));
          setReponses(reps);
        } else {
          console.log('Failed to fetch reponses. Response:', responseReponses);
        }
      } catch (error) {
        console.error('Error fetching reponses:', error);
      }
    }
    
    fetchReponses();
  }, [questionId]);

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
        // Refresh data or perform other actions after successful update
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
    <View style={styles.container}>
       <Text style={styles.subtitle}>Add your response here:</Text>
      <View style={styles.labelsWrapper}>
        <Text style={[styles.label, { flex: 1 }]}>Projet</Text>
        <Text style={[styles.label, { flex: 1 }]}>Question ID</Text>
        <Text style={[styles.label, { flex: 1 }]}>Conformite</Text>
        <Text style={[styles.label, { flex: 1 }]}>Commentaire</Text>
        <Text style={[styles.label, { flex: 1 }]}>Site</Text>
        <Text style={[styles.label, { flex: 1 }]}>action</Text>
      </View>
      {reponses.length ? reponses.map((item, index) => (
        <View key={index} style={styles.dataWrapper}>
          <Text style={[styles.dataText, { flex: 1 }]}>{item.projet}</Text>
          <Text style={[styles.dataText, { flex: 1 }]}>{item.question_id}</Text>
          <Text style={[styles.dataText, { flex: 1 }]}>{item.conformite}</Text>
          <Text style={[styles.dataText, { flex: 1 }]}>{item.commentaire}</Text>
          <Text style={[styles.dataText, { flex: 1 }]}>{item.site}</Text>
          <Button title='Answer' onPress={() => updateReponse(item)} />
        </View>
      )) : null}

      <Modal visible={showModal} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
  style={styles.input}
  placeholder="Enter Conformite"
  value={conformite.toString()} // Convert to string
  onChangeText={(text) => setConformite(text)}
/>
<TextInput
  style={styles.input}
  placeholder="Enter Commentaire"
  value={commentaire.toString()} // Convert to string
  onChangeText={(text) => setCommentaire(text)}
/>
            <Button title='Update' onPress={handleUpdate} />
            <Button title='Close' onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
      <Button onPress={() => navigation.goBack()} title="Close" />
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
  labelsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'green', // Change background color to green
    marginVertical: 10,
    padding: 7
  },
  label: {
    color: 'white', // Change label text color to white
    textAlign: 'center',
    fontSize: 10, // Set font size to 12 (or any other desired value)
  },
  
  dataWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white', // Change background color to white
    marginVertical: 10,
    padding: 7
  },
  dataText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'black'
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'green',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ReponseScreen;
