import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Validate required fields
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      const userData = { email, password };

      const response = await axios.post(`http://10.0.2.2:8000/api/auth/login`, userData);
      console.log('Response:', response.data);
      if (response.status === 200) {
        const { message, token, user_id } = response.data;
        console.log('Token:', token);
        console.log('User ID:', user_id);
        if (user_id) {
          // Store token securely
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user_id', user_id.toString());

          console.log('User ID stored:', user_id);
          Alert.alert('Success', message);
        
          // Redirect to Home screen
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'User ID not found in response');
        }
      } else {
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
