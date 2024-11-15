import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const AnimatedIconExample = ( { name = 'apps', active = null } ) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(scale.value, { duration: 500 }) }],
    }));

    const handlePress = () => {
        scale.value = scale.value === 1 ? 1.5 : 1; // Toggle animation
    };

    return (
        <View style={styles.container}>
            <AnimatedIcon name={name} size={30} color={active === true ? 'red' : 'gray'} style={animatedStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AnimatedIconExample;
