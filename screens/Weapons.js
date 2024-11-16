import React from 'react';
import WeaponsList from './WeaponsList';
import WeaponDetails from './WeaponDetails';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import Layout from './Layout';
enableScreens();

const Stack = createStackNavigator();

// Weapons Stack Navigator using createStackNavigator
const WeaponsStack = ({navigation}) => (
    
    <Layout navigation={navigation}>
    <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#1A1A1A' },
            headerTintColor: '#fff',
        }}
    >
        <Stack.Screen
            name="WeaponsList"
            component={WeaponsList}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="WeaponDetails"
            component={WeaponDetails}
            options={{ title: 'Weapon Details' }}
        />
    </Stack.Navigator>
    </Layout>
);

export default WeaponsStack;
