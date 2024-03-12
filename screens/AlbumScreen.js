import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList ,StatusBar } from 'react-native';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
const AlbumScreen = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/imageshow');
        if (response.status === 200) {
          console.log('Image data fetched successfully:', response.data.images);
          setImages(response.data.images || []);
        } else {
          console.log('Failed to fetch image data');
        }
      } catch (error) {
        console.log('Error fetching image data:', error);
      }
    }
  
    fetchImages();
  }, []);

  console.log('Images state:', images);

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: `http://10.0.2.2:8000/${item.Path}` }}
      style={styles.image}
      onError={(error) => console.log('Image loading error:', error)}
    />
  );

  return (
    <View style={styles.container}>
      <Text>Album Screen</Text>
      {images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.imageContainer}
        />
      ) : (
        <Text>No images available</Text>
      )}
      <StatusBar style="auto" />
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AlbumScreen;
