import React, { useState, useEffect } from 'react';
import { Button, Image, View, FlatList, Text, StyleSheet } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'axios';

const CameraApp = ({ route }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const { reponseId } = route.params;

  useEffect(() => {
    console.log('CameraApp - Received reponseId:', reponseId);
    fetchImages(); // Fetch images when reponseId changes
  }, [reponseId]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/images/${reponseId}`);
      console.log(response.data);
      
      if (response.data.status === 200) {
        // Set images state with response data
        setImages(response.data.images);
      } else {
        console.log(response.data.message); // Log error message if status is not 200
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openImagePicker = () => {
    console.log('Opening image picker...');
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      console.log('Image picker response:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else {
        let imageUri = response.uri || (response.assets?.[0]?.uri);
        console.log('Selected image URI:', imageUri);
        setSelectedImage(imageUri);
        sendImageToBackend(imageUri); // Call function to send image to backend
      }
    });
  };
  
  const handleCameraLaunch = () => {
    console.log('Launching camera...');
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      console.log('Camera response:', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error:', response.error);
      } else {
        let imageUri = response.uri || (response.assets?.[0]?.uri);
        console.log('Captured image URI:', imageUri);
        setSelectedImage(imageUri);
        sendImageToBackend(imageUri); // Call function to send image to backend
      }
    });
  };

//  const sendImageToBackend = async (imageUri) => {
//     console.log('Sending image to backend...');
//     try {
//       const formData = new FormData();
//       formData.append('image', {
//         uri: imageUri,
//         type: 'image/jpeg',
//         name: 'image.jpg',
//       });

//       console.log('Form Data:', formData);

//       const response = await fetch('http://10.0.2.2:8000/api/addIma', {
//         method: 'POST',
//         body: formData,
//       });

//       console.log('Response:', response);

//       if (!response.ok) {
//         console.error('Failed to upload image');
//         throw new Error('Failed to upload image');
//       }

//       console.log('Image uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

// const sendImageToBackend = async (imageUri) => {
//   console.log('Sending image to backend...');
//   try {
//       const formData = new FormData();
//       formData.append('image', {
//           uri: imageUri,
//           type: 'image/jpeg',
//           name: 'image.jpg',
//       });
//       // Add the reponse_id to the form data
//       // formData.append('reponse_id', reponseId); // Replace reponseId with the actual value

//       console.log('Form Data:', formData);

//       const response = await fetch('http://10.0.2.2:8000/api/addIma', {
//           method: 'POST',
//           body: formData,
//       });

//       console.log('Response:', response);

//       if (!response.ok) {
//           console.error('Failed to upload image');
//           throw new Error('Failed to upload image');
//       }

//       console.log('Image uploaded successfully');
//   } catch (error) {
//       console.error('Error uploading image:', error);
//   }
// };

const sendImageToBackend = async (imageUri) => {
  console.log('Sending image to backend...');
  console.log('reponseId:', reponseId); // Ensure reponseId is accessible here
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    console.log("reponse id***", reponseId)
    // Append the reponse_id to the form data
    formData.append('reponse_id', reponseId);

    console.log('Form Data:', formData);

    const response = await fetch('http://10.0.2.2:8000/api/addIma', {
      method: 'POST',
      body: formData,
    });

    console.log('Response:', response);

    if (!response.ok) {
      console.error('Failed to upload image');
      throw new Error('Failed to upload image');
    }

    const responseData = await response.json(); // Parse response JSON
    console.log('Response Data:', responseData);

    console.log('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
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
      <View style={{ marginTop: 20 }}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{ marginTop: 20, marginBottom: 50 }}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
    <Text>Images for reponse ID: {reponseId}</Text>

    <View style={{ flex: 1, justifyContent: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      )}
    
    </View>

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
  </View>
);
    };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

export default CameraApp;
