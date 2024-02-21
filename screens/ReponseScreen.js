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
      <View style={styles.dataWrapper}>
        <View style={{ flex: 1 }}><Text>Projet</Text></View>
        <View style={{ flex: 1 }}><Text>Question ID</Text></View>
        <View style={{ flex: 1 }}><Text>Conformite</Text></View>
        <View style={{ flex: 1 }}><Text>Commentaire</Text></View>
        <View style={{ flex: 1 }}><Text>Site</Text></View>
      </View>
      {reponses.length ? reponses.map((item, index) => (
        <View key={index} style={styles.dataWrapper}>
          <Text>{item.projet}</Text>
          <Text>{item.question_id}</Text>
          <Text>{item.conformite}</Text>
          <Text>{item.commentaire}</Text>
          <Text>{item.site}</Text>
          <Button title='Update' onPress={() => updateReponse(item)} />
        </View>
      )) : null}

      <Modal visible={showModal} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Conformite"
              value={conformite}
              onChangeText={(text) => setConformite(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Commentaire"
              value={commentaire}
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
  dataWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    margin: 5,
    alignItems: 'center',
    marginVertical: 10,
    padding: 7
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
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


 

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',a
//     alignItems: 'center',
//   },
//   dataWrapper: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#007bff',
//     margin: 5,
//     alignItems: 'center',
//     marginVertical: 10,
//     padding: 7
//   },
//   input: {
//     height: 40,
//     width: '80%',
//     marginVertical: 10,
//     borderWidth: 1,
//     padding: 10,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalView: {
//     backgroundColor: '#007bff',
//     padding: 20,
//     borderRadius: 10,
//     shadowColor:"#fff",
//     shadowOpacity:0.60,
//     elevation: 5,
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
// });

// export default ReponseScreen;
