import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Example icon package
import Layout from './Layout';

const HomeScreen = ({ navigation }) => {
    return (
        <Layout navigation={navigation}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home Screen</Text>
                <Text>Swipe from Left or press the below icon to open Drawer</Text>
                {/* <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={{
                        marginTop: 20,
                        padding: 10,
                        backgroundColor: 'lightgrey',
                        borderRadius: 5,
                    }}
                >
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity> */}
            </View>
        </Layout>
    );
};

export default HomeScreen;
