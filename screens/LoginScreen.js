import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Login screen mounted');
  }, []);

  const handleLogin = async () => {
    try {
      // Validate required fields
      if (!email || !password) {
        console.log('Email or password is missing');
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      console.log('Sending login request...');

      const userData = { email, password };

      console.log('Request payload:', userData);

      const response = await axios.post(`http://10.0.2.2:8000/api/custom-login`, userData);

      console.log('Response from server:', response);

      if (response.status === 200) {
        console.log('Login successful');
        const { message, user_id } = response.data; // Extract user_id from response data
        console.log('Response data:', response.data);

        if (user_id) {
          console.log('Passed user ID to Home:', user_id);
          navigation.navigate('Home', { user_id }); // Passing user_id to the Home screen
        } else {
          console.log('User ID not found in response');
          Alert.alert('Error', 'Failed to get user ID');
        }
        Alert.alert('Success', message);
      } else {
        console.log('Login failed:', response.data);
        Alert.alert('Error', 'Failed to sign in');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Error', 'Failed to sign in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
