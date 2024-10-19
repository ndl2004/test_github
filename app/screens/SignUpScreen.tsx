import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { registerUser } from '../../app/screens/api/apiService'; // Ensure this function is correctly implemented for registration
import bcrypt from 'bcryptjs';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            // Mã hóa mật khẩu trước khi gửi lên server
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Gửi mật khẩu đã mã hóa đến API backend
            const response = await registerUser(email, hashedPassword);

            if (response) {
                Alert.alert('Success', 'User registered successfully!');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            Alert.alert('Error', 'Registration failed. Please try again.');
        }
       
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo trái cây */}
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/fruit.png')} style={styles.logo} />
            </View>

            {/* Tiêu đề */}
            <Text style={styles.title}>Create Your Fruit Shop Account</Text>

            {/* Form đăng ký */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#C4C4C4"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#C4C4C4"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#C4C4C4"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
            />

            {/* Nút đăng ký */}
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
            </TouchableOpacity>

            {/* Điều hướng sang trang đăng nhập */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInText}>Already have an account? SIGN IN</Text>

            </TouchableOpacity>
        </ScrollView>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f3f9e8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#388e3c',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#d1e0d1',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#388e3c',
    },
    signUpButton: {
        backgroundColor: '#388e3c',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signInText: {
        textAlign: 'center',
        color: '#388e3c',
        fontWeight: 'bold',
    },
});
