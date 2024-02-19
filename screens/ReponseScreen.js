import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

const ReponseScreen = ({ route }) => {
  const [conformite, setConformite] = useState(undefined);
  const [commentaire, setCommentaire] = useState(undefined);
  const { questionId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch data or handle initial setup if needed
  }, []);

  const updateReponse = async () => {
    console.warn(conformite, commentaire);
    const url = `http://10.0.2.2:8000/api/updatereponse/${questionId}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ conformite, commentaire })
      });
      if (!response.ok) {
        throw new Error('Failed to update response');
      }
      const result = await response.json();
      console.warn(result);
    } catch (error) {
      console.error('Error updating response:', error.message);
    }
  }

  return (
    <View style={styles.container}>
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
      <View style={{ marginBottom: 15 }}>
        <Button onPress={updateReponse} title="Update Response" />
      </View>
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
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ReponseScreen;
