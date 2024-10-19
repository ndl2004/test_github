import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Welcome to your profile!</Text>
            {/* Bạn có thể thêm thông tin khác ở đây */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F3E3',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    subtitle: {
        fontSize: 18,
        color: '#4A4A4A',
    },
});

export default Profile;
