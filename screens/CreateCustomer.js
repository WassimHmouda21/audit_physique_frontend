import React, { useState } from 'react';
import { View, Button, Text, Image, TextInput } from 'react-native'; // Import Image and TextInput components
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
const CreateCustomer = () => {
  const [SN, setSN] = useState('');
  const [LN, setLN] = useState('');
  const [Logo, setLogo] = useState(null);
  const [Description, setDescription] = useState('');
  const [SecteurActivite, setSecteurActivite] = useState('');
  const [Categorie, setCategorie] = useState('');
  const [Site_Web, setSite_Web] = useState('');
  const [Adresse_mail, setAdresse_mail] = useState('');
  const [Organigramme, setOrganigramme] = useState('');
  const [Network_Design, setNetwork_Design] = useState('');
  const [Type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to store error message
  const route = useRoute();
  const { user_id } = route.params;
  const navigation = useNavigation();
  const createCustomer = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('SN', SN);
      formData.append('LN', LN);
      if (Logo) {
        formData.append('Logo', {
          uri: Logo.uri,
          type: 'image/jpeg',
          name: 'customer_image.jpg',
        });
      }
      formData.append('Description', Description);
      formData.append('SecteurActivite', SecteurActivite);
      formData.append('Categorie', Categorie);
      formData.append('Site_Web', Site_Web);
      formData.append('Adresse_mail', Adresse_mail);
      formData.append('Organigramme', Organigramme);
      formData.append('Network_Design', Network_Design);
      formData.append('Type', Type);

      const response = await axios.post(`http://10.0.2.2:8000/api/addImage/${user_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error creating customer:', error);
      setLoading(false);
      setError('Error creating customer: ' + error.message); // Set error message
    }
  };

  const pickCustomerImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      console.log('Image Picker Response:', response); // Log the response from the image picker
      if (!response.didCancel) {
        const source = { uri: response.assets[0].uri }; // Access the URI from the assets array
        console.log('Selected Image Source:', source); // Log the selected image source
        setLogo(source); // Update the Logo state with the selected image URI
      }
    });
  };
  
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
      {/* Render error message if present */}
      {error && <Text>Error: {error}</Text>}
      {/* Input fields for labels */}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="SN"
        onChangeText={text => setSN(text)}
        value={SN}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="LN"
        onChangeText={text => setLN(text)}
        value={LN}
      />
      {/* Add similar input fields for other labels */}
      {/* Your input fields */}
      <Button title="Pick Image" onPress={pickCustomerImageFromGallery} />
      {/* Render selected image */}
      {Logo && <Image source={{ uri: Logo.uri }} style={{ width: 200, height: 200 }} />}
      <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
    placeholder="Description"
    onChangeText={text => setDescription(text)}
    value={Description}
/>
<TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
    placeholder="SecteurActivite"
    onChangeText={text => setSecteurActivite(text)}
    value={SecteurActivite}
/>
<TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
    placeholder="Categorie"
    onChangeText={text => setCategorie(text)}
    value={Categorie}
/>
<TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
    placeholder="Site_Web"
    onChangeText={text => setSite_Web(text)}
    value={Site_Web}
/>
<TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
    placeholder="Adresse_mail"
    onChangeText={text => setAdresse_mail(text)}
    value={Adresse_mail}
/>
<TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
    placeholder="Organigramme"
    onChangeText={text => setOrganigramme(text)}
    value={Organigramme}
/>
<TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
    placeholder="Network_Design"
    onChangeText={text => setNetwork_Design(text)}
    value={Network_Design}
/>
<TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
    placeholder="Type"
    onChangeText={text => setType(text)}
    value={Type}
/>

      <Button title="Create Customer" onPress={createCustomer} />
    </View>
  );
};

export default CreateCustomer;