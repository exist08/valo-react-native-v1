import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Common Layout Component
const Layout = ({ children, navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            {/* Custom navigation button */}
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={styles.menuButton}
            >
                <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            {children}
        </View>
    );
};

export default Layout;
// Styles
const styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        zIndex: 10,
        padding: 10,
        backgroundColor: '#FF4655',
        borderRadius: 5,
    },
});