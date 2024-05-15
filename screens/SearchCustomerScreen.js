import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet,StatusBar, FlatList, ActivityIndicator, Image ,TouchableOpacity} from 'react-native';
import axios from 'axios';
import filter from "lodash.filter";
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
const API_ENDPOINT = `http://10.0.2.2:8000/api/customerpage/${user_id}`;

const SearchCustomerScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomers] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [error, setError] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to access route params
  const { user_id } = route.params; 
  useEffect(() => {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);


  const navigateToSurvey = (customerId) => {
    console.log("Customer ID:", customerId);
    navigation.navigate('Survey', { customerId: customerId });
  };
  const fetchData = async (url) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/customerpage/${user_id}`);
      console.log(response.data);
      setCustomers(response.data.customers); 
      setFullData(response.data.customers); // Update fullData state
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = fullData.filter((customer) => {
      const containsQuery = contains(customer, formattedQuery);
      console.log(`Customer: ${JSON.stringify(customer)}, Contains Query: ${containsQuery}`);
      return containsQuery;
    });
    console.log('Filtered Data:', filteredData);
    setCustomers(filteredData); // Update customers state with filtered data
  };
  
  const contains = ({ SN, LN, Adresse_mail }, query) => {
    return (
      SN.toLowerCase().includes(query) ||
      LN.toLowerCase().includes(query) ||
      Adresse_mail.toLowerCase().includes(query)
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error in fetching data ... Please check your internet connection</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
    <StatusBar style="auto" />
    <View style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => {
          handleSearch(query);
              // Toggle visibility of CustomHeader based on search input
              setShowHeader(query.length === 0);
            }}
            onFocus={() => setShowHeader(false)} // Hide CustomHeader when search box is focused
            onBlur={() => setShowHeader(true)} // Show CustomHeader when search box loses focus
          />

      {customer && customer.length > 0 ? (
        <FlatList
          data={customer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToSurvey(item.id)}>
            <View style={styles.itemContainer}>
              {item.Logo ? (
                <Image
                  source={{ uri: `http://10.0.2.2:8000/assets/${item.Logo}` }}
                  style={[styles.image, { width: 70, height: 70 }]}
                  onLoadStart={() => console.log('Image loading started')}
                  onLoadEnd={() => console.log('Image loading ended')}
                  onError={(error) => console.log('Image loading error:', error)}
                />
              ) : (
                <Text>No logo available</Text>
              )}
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.textName}> 
                  {item.SN}, {item.LN}
                </Text>
                <Text style={styles.textEmail}>
                  {item.Adresse_mail}
                </Text>
              </View>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No data available</Text>
      )}
      {/* Additional logs */}
      {console.log('Customer:', customer)}
      {console.log('Error:', error)}
    </SafeAreaView>
    </View>
    {showHeader && (
        <View style={styles.footer}>
          {/* Your footer content here */}
          <CustomHeader user_id={user_id} />
        </View>
      )}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  textEmail: {
    fontSize: 17,
    marginLeft: 10 ,
    color: "grey",
  },
  textName: {
    fontSize: 20 ,
    marginLeft: 10 ,
    fontWeight: "600",
    color: "black",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SearchCustomerScreen;
