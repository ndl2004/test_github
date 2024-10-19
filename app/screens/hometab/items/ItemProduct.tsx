import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window'); // Get the screen width

const ItemProduct = ({ navigation }: { navigation: any }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://10.17.15.154:8080/api/products'); // Replace with your actual API URL
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>; // You can add a loading spinner or animation here if needed
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Display 2 products per row
            columnWrapperStyle={styles.row} // Style for each row
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Details', {
                            name: item.name,
                            price: item.price,
                            image: { uri: item.image }, // Assuming API returns image URLs
                            rating: item.rating,
                            description: item.description,
                        })
                    }
                >
                    <View style={styles.verticalFruitCard}>
                        <Image source={{ uri: item.image }} style={styles.verticalFruitImage} />
                        <View style={styles.fruitInfo}>
                            <Text style={styles.fruitType}>FRUIT</Text>
                            <View style={styles.fruitRating}>
                                <FontAwesome5 name="star" size={14} color="gold" />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                            </View>
                            <Text style={styles.fruitName}>{item.name}</Text>
                            <Text style={styles.fruitPrice}>{item.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    verticalFruitCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10, // Adjust margin to ensure spacing between products
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        width: (width / 2) - 30, // Divide screen width by 2 and subtract some space for margins
    },
    verticalFruitImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    fruitInfo: {
        marginTop: 5,
    },
    fruitType: {
        fontSize: 12,
        color: 'gray',
    },
    fruitRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 12,
        color: 'gray',
    },
    fruitName: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    fruitPrice: {
        color: '#ffb300',
        marginTop: 5,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10, // Add some space between rows
    },
});

export default ItemProduct;
