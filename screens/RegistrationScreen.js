import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet,Text  } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState(''); // Added role state
  const [isEmailVerified, setIsEmailVerified] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    console.log('Registration screen mounted');
    // You can add any initialization logic here
  }, []);


  const handleRegister = async () => {
    try {
      // Validate required fields
      if (!name || !email || !password || !birth || !address || !role ) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      console.log('Sending registration request...');
      
      const userData = {
        name,
        email,
        password,
        birth,
        address,
        role, // Include role in the payload
      
      };

      console.log('Request payload:', userData);
  
      const response = await axios.post(`http://10.0.2.2:8000/api/custom-registration`, userData);
  
      console.log('Response from server:', response);
  
      if (response.status === 201) {
        const message = response.data.message;
        Alert.alert('Success', message);
        navigation.navigate('Home');
      } else {
        console.log('Failed to create user:', response.data);
        Alert.alert('Error', 'Failed to create response');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Failed to create response');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@SmartSkills\.tn$/;
    return emailRegex.test(email) && email.length <= 24;
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      /> */}
       <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(validateEmail(text) ? '' : 'Invalid email format');
        }}
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry // Hide password input
      />
      <TextInput
        style={styles.input}
        placeholder="Birth"
        value={birth}
        onChangeText={(text) => setBirth(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={(text) => setRole(text)}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Is Email Verified"
        value={isEmailVerified}
        onChangeText={(text) => setIsEmailVerified(text)}
      /> */}
      <Button title="Submit" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
  },
});

export default RegistrationScreen;