import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet,Text, TouchableOpacity  } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added role state
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
      if (!name || !email || !password ) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      console.log('Sending registration request...');
      
      const userData = {
        name,
        email,
        password,

      
      };

      console.log('Request payload:', userData);
  
      const response = await axios.post(`http://10.0.2.2:8000/api/auth/register`, userData);
  
      console.log('Response from server:', response);
  
      if (response.status === 200) {
        const message = response.data.message;
        Alert.alert('Success', message);
        navigation.navigate('LoginScreen');
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
      <Text style={styles.label}>Name</Text>
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
      <Text style={styles.label}>Email</Text>
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
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry // Hide password input
      />
      
      {/* <TextInput
        style={styles.input}
        placeholder="Is Email Verified"
        value={isEmailVerified}
        onChangeText={(text) => setIsEmailVerified(text)}
      /> */}
      <View style={styles.buttonContainer}>
      <Button title="sign up" onPress={handleRegister} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.registerLink}>Already have an account?   sign in here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  registerLink: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
  },
});

export default RegistrationScreen;