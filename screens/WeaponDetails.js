import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import useAxios from 'axios-hooks';

const WeaponDetails = ({ route }) => {
  const { weaponId } = route.params;
  const [{ data, loading, error }] = useAxios(`https://valorant-api.com/v1/weapons/${weaponId}`);
  const weapon = data?.data;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching weapon details</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: weapon?.displayIcon }} style={styles.weaponImage} />
        <Text style={styles.weaponName}>{weapon?.displayName}</Text>
      </View>
      <Text style={styles.sectionTitle}>Skins</Text>
      {weapon?.skins.map((skin) => (
        <View key={skin.uuid} style={styles.skinCard}>
          <Image source={{ uri: skin.displayIcon }} style={styles.skinImage} />
          <Text>{skin.displayName}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default WeaponDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  weaponImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: 10,
  },
  weaponName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  skinCard: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  skinImage: {
    marginBottom: 10,
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
