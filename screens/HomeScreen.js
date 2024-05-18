import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route }) => {
 
  const [date, setDate] = useState(new Date());
  const [undoneProjects, setUndoneProjects] = useState(13);
  const [doneProjects, setDoneProjects] = useState(4);
  const [totalProjects, setTotalSurveys] = useState([]);
  const navigation = useNavigation();
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const getUser_id = async () => {
      try {
        const user_id = await AsyncStorage.getItem('user_id');
        setUser_id(user_id);
        console.log('Retrieved User ID:', user_id);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };
    
    getUser_id();
  }, []);

  useEffect(() => {
    console.log("User ID********:", user_id);
  }, [user_id]);
  
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          console.log('Fetching projects...');
          const responseDone = await axios.get(`http://10.0.2.2:8000/api/getprojsubmit`);
          console.log('Response data for done projects:', responseDone.data);

          if (responseDone.data && responseDone.data.projects) {
            console.log('Done Projects found:', responseDone.data.projects);
            setDoneProjects(responseDone.data.projects.length);
          } else {
            console.log('No done projects found in response.');
          }

          const responseUndone = await axios.get(`http://10.0.2.2:8000/api/getprojunsubmit`);
          console.log('Response data for undone projects:', responseUndone.data);

          if (responseUndone.data && responseUndone.data.projects) {
            console.log('Undone Projects found:', responseUndone.data.projects);
            setUndoneProjects(responseUndone.data.projects.length);
          } else {
            console.log('No undone projects found in response.');
          }

          const totalProjectsCount = responseDone.data.projects.length + responseUndone.data.projects.length;
          setTotalSurveys(totalProjectsCount);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      }

      fetchData();

      return () => {};
    }, [])
  );

  console.log('Total Projects:', totalProjects);

  const handleMissingInspectionsPress = () => {
    console.log("User ID:", user_id);
    navigation.navigate('CreateCustomer', { user_id });
  };

  const handleMissingInspectionsPresser = () => {
    console.log("User ID:", user_id);
    navigation.navigate('SearchCustomerScreen', { user_id });
  };

  return (
    <View style={styles.container}>
      <CustomHeader  />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../assets/images/image_date_picker.png')} style={styles.logo} />
            <View style={styles.imageContent}>
              <Text style={styles.dateText}>{date.toDateString()}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.infoText, styles.valueStyle]}>Total Projects:{totalProjects} projects</Text>
            <Text style={[styles.infoText, styles.valueStyle]}>Done Projects: {doneProjects} projects</Text>
            <Text style={[styles.infoText, styles.valueStyle]}>Undone Projects: {undoneProjects} projects</Text>
          </View>
        </View>
      </View>

      <View style={[styles.bottomContent, { marginTop: 0, justifyContent: 'center' }]}>
        <CustomButton title="audit physique en cours" onPress={handleMissingInspectionsPresser} />
      </View>
      <View style={styles.blankSpace} />
      <View style={[styles.bottomContent, { marginTop: 0, justifyContent: 'center' }]}>
        <CustomButton title="create a new customer" onPress={handleMissingInspectionsPress} />
        <View style={{ marginVertical: 10 }}></View>
        <Image source={require('../assets/images/smart_skills.jpg')} style={{ width: 350, height: 200 }} />
      </View>
      <View style={styles.blankSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 3,
    flexDirection: 'row-reverse',
    alignItems: 'baseline',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 5,
    marginLeft: 0,
  },
  textContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 5,
  },
  infoText: {
    fontSize: 17,
    marginBottom: 5,
  },
  labelStyle: {
    fontWeight: 'bold',
    color: 'blue',
  },
  valueStyle: {
    color: 'black',
    fontSize: 20,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  bottomText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  blankSpace: {
    flex: 0.5,
  },
});

export default HomeScreen;
export class Project {
  constructor(id, Nom, URL, Description, customer_id, year, QualityChecked, QualityCheckedDateTime, QualityCheckedMessage, Preuve, is_submitted) {
    this.id = id;
    this.Nom = Nom;
    this.URL = URL;
    this.Description = Description;
    this.customer_id = customer_id;
    this.year = year;
    this.QualityChecked = QualityChecked;
    this.QualityCheckedDateTime = QualityCheckedDateTime;
    this.QualityCheckedMessage = QualityCheckedMessage;
    this.Preuve = Preuve;
    this.is_submitted = is_submitted;
  }
}