// TheApp.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SurveyScreen from './screens/SurveyScreen';
import AlbumScreen from './screens/AlbumScreen';
import ProgressionScreen from './screens/ProgressionScreen';
import SitesScreen from './screens/SitesScreen';
import CategoryScreen from './screens/CategoryScreen';
import QuestionScreen from './screens/QuestionScreen';
import ReponseScreen from './screens/ReponseScreen';
import SearchCustomerScreen from './screens/SearchCustomerScreen';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
        <Stack.Screen name="Progression" component={ProgressionScreen} />
        <Stack.Screen name="SitesScreen" component={SitesScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />     
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
        <Stack.Screen name="ReponseScreen" component={ReponseScreen} />
        <Stack.Screen name="SearchCustomerScreen" component={SearchCustomerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
