import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useCart } from '../screens/profiletab/CartContext';
import { GET_IMG } from './api/apiService';

interface Product {
    title: string;
    price: number;
    photo: string;
    rating: number;
    description: string;
}

const DetailsScreen = ({ route, navigation }: { route: any; navigation: any }) => {
    const { productId } = route.params;
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://10.17.15.154:8080/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details.');
                Alert.alert('Error', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const totalPrice = product && product.price !== undefined ?
        (typeof product.price === 'string' ?
            parseInt(product.price.replace('.', '').replace(' VND', '')) :
            product.price) * quantity :
        0;

    const handleAddToCart = () => {
        if (product) {
            const item = {
                name: product.title,
                price: totalPrice.toLocaleString('vi-VN') + ' VND',
                image: product.photo,
                rating: product.rating,
                description: product.description,
                quantity,
            };
            addToCart(item);
            navigation.navigate('Cart');
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFD700" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="cart-outline" size={24} color="#FFD700" />
                </TouchableOpacity>
            </View>

            <View style={styles.productInfo}>
                <Text style={styles.category}>FRUIT</Text>
                <Text style={styles.title}>{product.title}</Text>
                <Image
                    source={{ uri: GET_IMG("products",product.photo) }}
                    style={styles.productImage}
                
                />
                <Text style={styles.productPrice}>{totalPrice.toLocaleString('vi-VN')} VND</Text>
                <View style={styles.rating}>
                    {[...Array(5)].map((_, index) => (
                        <FontAwesome key={index} name="star" size={16} color="#FFD700" />
                    ))}
                    <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
                <Text style={styles.description}>{product.description}</Text>
            </View>

            <TouchableOpacity style={styles.heartIcon}>
                <FontAwesome name="heart" size={24} color="#FFD700" />
            </TouchableOpacity>

            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.features}>
                <View style={styles.featureItem}>
                    <FontAwesome name="check-circle" size={24} color="#FFD700" />
                    <Text style={styles.featureText}>Quality Assurance</Text>
                </View>
                <View style={styles.featureItem}>
                    <FontAwesome name="truck" size={24} color="#FFD700" />
                    <Text style={styles.featureText}>Fast Delivery</Text>
                </View>
                <View style={styles.featureItem}>
                    <FontAwesome name="cutlery" size={24} color="#FFD700" />
                    <Text style={styles.featureText}>Best-in Taste</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                <Text style={styles.cartButtonText}>Go to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E3',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    productInfo: {
        alignItems: 'center',
    },
    category: {
        color: '#F7941D',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        color: '#4A4A4A',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    productImage: {
        width: 300,
        height: 250,
        resizeMode: 'contain',
    },
    productPrice: {
        fontSize: 22,
        color: '#F7941D',
        marginVertical: 10,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        color: '#4A4A4A',
        fontSize: 16,
    },
    heartIcon: {
        position: 'absolute',
        right: 20,
        top: 150,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    quantityButton: {
        backgroundColor: '#E7E7E7',
        padding: 10,
        borderRadius: 5,
    },
    quantityText: {
        color: '#4A4A4A',
        fontSize: 20,
        marginHorizontal: 10,
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    featureItem: {
        alignItems: 'center',
    },
    featureText: {
        color: '#4A4A4A',
        marginTop: 5,
    },
    cartButton: {
        backgroundColor: '#F7941D',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    cartButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F3E3',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F3E3',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default DetailsScreen;
