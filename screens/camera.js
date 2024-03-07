import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const CameraApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
        saveImageToFileSystem(imageUri); // Call function to save image
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
        saveImageToFileSystem(imageUri); // Call function to save image
      }
    });
  };

  const saveImageToFileSystem = async (imageUri) => {
    console.log('Saving image to file system...');
    try {
      const fileName = imageUri.split('/').pop();
      const destPath = `${RNFS.PicturesDirectoryPath}/${fileName}`;
      await RNFS.copyFile(imageUri, destPath);
      console.log('Image saved to file system:', destPath);
    } catch (error) {
      console.log('Error saving image to file system:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{ marginTop: 20, marginBottom: 50 }}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
    </View>
  );
};

export default CameraApp;
