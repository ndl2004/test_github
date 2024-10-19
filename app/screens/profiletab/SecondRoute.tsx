import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
}

const SecondRoute = ({ route, navigation }: { route: { params: { user?: User } }; navigation: any }) => {
    const user = route.params?.user || { name: '', email: '', phone: '', address: '', bio: '' };

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [bio, setBio] = useState(user.bio);

    useEffect(() => {
        // Cập nhật thông tin nếu user thay đổi
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
        setBio(user.bio);
    }, [user]);

    const handleSaveProfile = () => {
        // Thực hiện lưu thay đổi ở đây (có thể gọi API hoặc lưu vào state)
        Alert.alert('Thông báo', 'Thông tin đã được cập nhật!', [
            {
                text: 'OK',
                onPress: () => navigation.navigate('Feed') // Chuyển về trang Feed
            }
        ]);
    };

    return (
        <View style={[styles.scene, { backgroundColor: '#f3f9e8' }]}>
            <Text style={styles.header}>Chỉnh sửa hồ sơ</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none" // Tắt tự động viết hoa cho email
            />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Giới thiệu bản thân"
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SecondRoute;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
