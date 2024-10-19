import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import Cart from '../app/screens/profiletab/Cart';
import { CartProvider } from '../app/screens/profiletab/CartContext'; // Import CartProvider
import Checkout from '../app/screens/profiletab/Checkout';
import Success from '../app/screens/profiletab/Success';
import FirstRoute from '../app//screens/profiletab/FirstRoute';
import SecondRoute from '../app//screens/profiletab/SecondRoute';


const Stack = createNativeStackNavigator();

const MyApp = () => {
    return (
        <CartProvider>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="SignUp">
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={SignInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                    <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
                    <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
                    <Stack.Screen name="FirstRoute" component={FirstRoute} options={{ headerShown: false }} />
                    <Stack.Screen name="SecondRoute" component={SecondRoute} options={{ headerShown: false }} />


                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
};

export default MyApp;

const styles = StyleSheet.create({});
