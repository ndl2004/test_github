import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ItemProduct from './items/ItemProduct';
import CategoryProducts from './items/CategoryProduct';
import { GET_ALL, GET_IMG } from "../../../app/screens/api/apiService";

const Feed = ({ navigation }: { navigation: any }) => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GET_ALL("products")
      .then((response) => {
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.content)) {
          setCoffeeData(responseData.content);
        } else {
          console.error("Data received from the API is not in a supported format.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconWrapper}>
            <MaterialIcons name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <MaterialIcons name="account-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.offerCard}>
        <Image
          source={require('../../../assets/images/fruit-basket.png')}
          style={styles.offerImage}
          resizeMode="contain"
        />
        <View style={styles.offerText}>
          <Text style={styles.offerTitle}>Discount up to 40% Off</Text>
          <Text style={styles.offerSubTitle}>In honor of World Health Day</Text>
          <TouchableOpacity style={styles.offerButton}>
            <Text style={styles.offerButtonText}>View Offers</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended Fruits</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <CategoryProducts navigation={navigation} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>More Fruits</Text>
      </View>

      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <View style={styles.productsRow}>
          {coffeeData.map((coffee) => (
            <TouchableOpacity
              key={coffee.id} // Use a unique identifier like coffee.id
              style={styles.itemContainer}
              onPress={() => navigation.navigate('Details', { productId: coffee.id })} // Navigate to DetailsScreen
            >
              <Image
                source={{ uri: GET_IMG("products", coffee.photo) }}
                style={styles.itemImage}
                resizeMode="contain"
              />
              <Text style={styles.itemText}>{coffee.title}</Text>
              <Text style={styles.itemPrice}>${coffee.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ItemProduct navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f9e8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#388e3c',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 15,
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    height: 220,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  offerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    resizeMode: 'cover',
  },
  offerText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  offerTitle: {
    color: '#e2f01e',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  offerSubTitle: {
    color: '#caf729',
    fontSize: 16,
    marginBottom: 10,
  },
  offerButton: {
    backgroundColor: '#ffb300',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    color: '#388e3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#ffb300',
  },
  productsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemContainer: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  itemImage: {
    width: '100%',
    height: 150,
  },
  itemText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  itemPrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#ff5722',
    fontWeight: 'bold',
  },
});

export default Feed;
