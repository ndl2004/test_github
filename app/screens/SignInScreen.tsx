import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { loginUser } from '../../app/screens/api/apiService'; // Đảm bảo hàm này nhận username và password để đăng nhập

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState(''); // Sử dụng username thay vì email
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await loginUser(username, password);  // Truyền username và password
            Alert.alert('Login successful', `Welcome back ${data.username}!`); // Sử dụng backticks cho template literals
        } catch (error) {
            Alert.alert('Login failed', 'Invalid credentials.'); // Thông báo lỗi nếu đăng nhập thất bại
        }
         navigation.navigate('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo trái cây */}
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/fruit.png')} style={styles.logo} />
            </View>

            {/* Tiêu đề */}
            <Text style={styles.title}>Sign in to Your Fruit Shop Account</Text>

            {/* Form đăng nhập */}
            <TextInput
                style={styles.input}
                placeholder="Username" // Đổi placeholder thành Username
                placeholderTextColor="#C4C4C4"
                value={username} // Sử dụng username
                onChangeText={setUsername} // Cập nhật giá trị username
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#C4C4C4"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Nút đăng nhập */}
            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                <Text style={styles.signInButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            {/* Đăng nhập với tài khoản mạng xã hội */}
            <Text style={styles.orText}>or sign in with</Text>

            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
                        style={styles.socialIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/color/48/000000/facebook.png' }}
                        style={styles.socialIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/color/48/000000/twitter.png' }}
                        style={styles.socialIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Điều hướng sang trang đăng ký */}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Don’t have an account? SIGN UP</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default SignInScreen;

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
    signInButton: {
        backgroundColor: '#388e3c',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orText: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#C4C4C4',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    socialButton: {
        padding: 10,
    },
    socialIcon: {
        width: 40,
        height: 40,
    },
    signUpText: {
        textAlign: 'center',
        color: '#388e3c',
        fontWeight: 'bold',
    },
});
