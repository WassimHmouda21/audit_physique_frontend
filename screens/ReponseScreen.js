// AlbumScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader'; // Update the path
const ReponseScreen = () => {
    return (
        <View style={styles.container}>
          <Text>Reponse Screen</Text>
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
      footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
    });
    
    export default ReponseScreen;