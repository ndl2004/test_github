import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const FirstRoute = () => {
    const navigation = useNavigation();

    const user = {
        name: 'Nguyễn Đình Lợi',
        email: 'dinhloi211@gmail.com',
        phone: '0123456789',
        address: 'TP HCM, Việt Nam',
        bio: 'Yêu thích du lịch và khám phá ẩm thực.',
        avatar: require('../../../assets/images/avata.png'),
    };

    const handleEditProfile = () => {
        // Chuyển tới trang SecondRoute (chỉnh sửa hồ sơ)
        navigation.navigate('SecondRoute', { user }); // Đảm bảo 'SecondRoute' là tên route bạn đã định nghĩa
    };

    return (
        <View style={styles.scene}>
            <View style={styles.userInfo}>
                <Image source={user.avatar} style={styles.avatar} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userPhone}>{user.phone}</Text>
                <Text style={styles.userAddress}>{user.address}</Text>
                <Text style={styles.userBio}>{user.bio}</Text>

                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FirstRoute;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f9e8',
    },
    userInfo: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#f0c14b',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
    },
    userPhone: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    userAddress: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    userBio: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    editButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
