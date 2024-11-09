import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { FlatList } from 'react-native-gesture-handler'

const numsCols = 3
const cardWidth = Dimensions.get('window').width / numsCols - 30
const Agents = () => {
    const [{ data, loading, error }] = useAxios('https://valorant-api.com/v1/agents'); // replace with your endpoint

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error fetching data</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={data.data}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item }) => <Card item={item} />}
                contentContainerStyle={styles.grid}
                numColumns={numsCols}
            />
        </View>
    )
}


const Card = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Pressable
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            style={[
                styles.card,
                isHovered && styles.hoveredCard,
            ]}
        >
            <Image source={{ uri: item.displayIcon }} style={styles.image} />
            <Text style={styles.label}>{item.displayName}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    grid: {
        justifyContent: 'center',
        padding: 10,
    },
    card: {
        backgroundColor: '#F04E5E',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 10,
        width: cardWidth,
        aspectRatio: 1,
        shadowColor: '#000000',
        // shadowOpacity: 0.9,
        // shadowOffset: { width: 2, height: 2 },
        // shadowRadius: 1,
        // transform: [{ translateX: 0 }, { translateY: 0 }],
        elevation: 10,
    },
    hoveredCard: {
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.7,
        shadowRadius: 0,
        transform: [{ translateX: -5 }, { translateY: -5 }],
        elevation: 5,
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        marginTop: 10,
    },
    label: {
        color: '#fff',
        fontSize: 28,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    agentContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})

export default Agents