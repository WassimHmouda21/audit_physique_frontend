import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      {Array.isArray(reponses) && reponses.length > 0 ? (
        reponses.map((item) => (
          <View key={item.id} style={styles.dataWrapper}>
             <View><Text style={styles.text}>{item.projet}</Text></View>
             <View><Text style={styles.text}>{item.question_id}</Text></View>
             <View><Text style={styles.text}>{item.conformite}</Text></View>
             <View><Text style={styles.text}>{item.commentaire}</Text></View>
          </View>
        ))
      ) : (
        <Text>No data available</Text>
      )}
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
    paddingTop: 20,
  },
  dataWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007bff',
    marginVertical: 10,
    padding: 7,
    borderRadius: 5,
    width: '90%',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ReponseScreen;


  // const updateReponse = async (item) => {
  //   // Implement your logic to update response here
  // };

  // const updateReponse = async (item) => {
  //   setSelectedReponse(item);
  //   setShowModal(true);
  // };

  // const handleUpdate = async () => {
  //   try {
  //     setShowModal(false);
  //     console.warn('Updating response:', conformite, commentaire);
  //     const url = `http://10.0.2.2:8000/api/updatereponse/${questionId}`;
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ conformite, commentaire })
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to update response');
  //     }
  //     const result = await response.json();
  //     console.warn('Update result:', result);
  //     // Refresh data or perform other actions after successful update
  //   } catch (error) {
  //     console.error('Error updating response:', error.message);
  //   }
  // };

//   console.log(result); // Check the structure and content of data array
//   return (
//       <View>
//         {
//           data.length ? 
//           data.map((item) => {
//             console.log(item.projet); // Check the value of projet for each item
//             return (
//               <View key={item.id}>
//                 <Text>{item.projet}</Text>
//               </View>
//             );
//           }) : null
//         }
//       </View>
//   )
// }  

      
      {/* <Modal visible={showModal} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Modal Content</Text>
            <Button title='Close' onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal> */}
    {/* </View>
  )
  
      }; */}

      {/* <Modal visible={showModal} transparent={true}>
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
      </Modal> */}
    {/* //   <Button onPress={() => navigation.goBack()} title="Close" />
    //   <View style={styles.footer}>
    //     <CustomHeader />
    //   </View>
    // </View>
//   );
// }; */}

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
