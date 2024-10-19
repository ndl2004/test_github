import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const fruits = [
    { id: '1', name: 'Pineapple', price: '30.000 VND', rating: 5.0, image: require('../../../../assets/images/pineapple.png'), description: 'Pineapple is a tropical fruit that is rich in vitamins and antioxidants.' },
    { id: '2', name: 'Apple', price: '20.000 VND', rating: 4.7, image: require('../../../../assets/images/apple.png'), description: 'Apples are a nutritious snack that provides a good source of fiber.' },
    { id: '3', name: 'Banana', price: '10.000 VND', rating: 4.5, image: require('../../../../assets/images/banana.png'), description: 'Bananas are rich in potassium and are a great source of energy.' },
    { id: '4', name: 'Kiwi', price: '40.000 VND', rating: 4.7, image: require('../../../../assets/images/kiwi.png'), description: 'Kiwis are small fruits that pack a lot of flavor and plenty of health benefits.' },
];

const Categoryproducts = ({ navigation }: { navigation: any }) => {
    return (
        <FlatList
            data={fruits}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Details', {
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        rating: item.rating,
                        description: item.description,
                    })}
                >
                    <View style={styles.horizontalFruitCard}>
                        <Image source={item.image} style={styles.horizontalFruitImage} />
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
    horizontalFruitCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
        width: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    horizontalFruitImage: {
        width: 120,
        height: 120,
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
});

export default Categoryproducts;
