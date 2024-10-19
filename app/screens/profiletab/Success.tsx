// Success.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Success = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxZ6Zy/giphy.gif' }} // Thay đổi link GIF thành công tại đây
                style={styles.gif}
            />
            <Text style={styles.title}>Payment Successful!</Text>
            <Text style={styles.message}>Thank you for your payment.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Feed')} // Điều hướng về trang Home (Feed)
            >
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E3',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    gif: {
        width: 200,  // Kích thước của GIF
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 20,
        textAlign: 'center',
    },
    message: {
        fontSize: 18,
        color: '#4A4A4A',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#F7941D',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Success;
