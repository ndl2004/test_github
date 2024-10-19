import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feed from './hometab/Feed';
import Notifications from './hometab/Notifications';
import Profile from './hometab/Profile';
import { Button } from 'react-native';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }: { navigation: any }) => {
    useLayoutEffect(() => {
        // Thêm nút quay lại ở màn hình Feed
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    onPress={() => navigation.navigate('SignIn')}
                    title="Back to Sign In"
                    color="#000"
                />
            ),
        });
    }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    headerShown: false, // Hiển thị header cho tab này để có nút quay lại
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarLabel: 'Updates',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                    headerShown: false, // Ẩn header cho các tab khác
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                    headerShown: false, // Ẩn header cho các tab khác
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeScreen;
