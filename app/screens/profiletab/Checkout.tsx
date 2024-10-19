import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { createPaymentUrl } from '../Payment/VnpayService'; // Import createPaymentUrl từ VnpayService

const Checkout = ({ navigation }: { navigation: any }) => {
    const handlePaymentSelect = (paymentMethod) => {
        if (paymentMethod === 'vnpay') {
            const paymentUrl = createPaymentUrl(100000); // Ví dụ: Thanh toán 100,000 VND
            Linking.openURL(paymentUrl)
                .then(() => {
                    console.log('Opened VNPay payment URL');
                })
                .catch((err) => {
                    console.error('Failed to open payment URL', err);
                });
        } else {
            // Điều hướng tới Success hoặc thực hiện logic cho phương thức thanh toán khác
            navigation.navigate('Success');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <Text style={styles.subtitle}>Select Payment Method</Text>

            {/* MoMo Payment */}
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentSelect('momo')}>
                <Image
                    source={require('../../../assets/images/momo.png')} // Đường dẫn tới ảnh MoMo
                    style={styles.icon}
                />
                <Text style={styles.paymentText}>MoMo</Text>
            </TouchableOpacity>

            {/* ZaloPay Payment */}
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentSelect('zalopay')}>
                <Image
                    source={require('../../../assets/images/zalo.png')} // Đường dẫn tới ảnh ZaloPay
                    style={styles.icon}
                />
                <Text style={styles.paymentText}>ZaloPay</Text>
            </TouchableOpacity>

            {/* PayPal Payment */}
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentSelect('paypal')}>
                <Image
                    source={require('../../../assets/images/paypal.png')} // Đường dẫn tới ảnh PayPal
                    style={styles.icon}
                />
                <Text style={styles.paymentText}>PayPal</Text>
            </TouchableOpacity>

            {/* VNPay Payment */}
            <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentSelect('vnpay')}>
                <Image
                    source={require('../../../assets/images/vnpay.png')} // Đường dẫn tới ảnh VNPay
                    style={styles.icon}
                />
                <Text style={styles.paymentText}>VNPay</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E3',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 10,
    },
    paymentOption: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 3,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    paymentText: {
        fontSize: 18,
        color: '#4A4A4A',
    },
});

export default Checkout;
