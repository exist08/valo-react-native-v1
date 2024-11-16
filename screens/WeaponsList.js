import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Image, Modal, TouchableOpacity, Pressable } from 'react-native';
import useAxios from 'axios-hooks';
import { FlatList } from 'react-native-gesture-handler';
import AnimatedIconExample from './temps/AnimatedIconExample';
import { useNavigation } from '@react-navigation/native';

const numCols = 1;
const cardWidth = Dimensions.get('window').width / numCols - 30;

const WeaponsList = () => {
  const [{ data, loading, error }] = useAxios('https://valorant-api.com/v1/weapons');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [listType, setListType] = useState('grid')
  const cardsData = data?.data || [];

  const navigation = useNavigation();

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error fetching data</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.navTexts}>WeaponsList</Text>
      </View>
      <View>
        <FlatList
        style={{height: '87%'}}
          data={cardsData}
          keyExtractor={(card) => card?.uuid}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('WeaponDetails', { weaponId: item.uuid })}>
              <View style={styles.card}>
                <Image source={{ uri: item?.displayIcon }} style={styles.cardImage} />
                <Text style={styles.text}>{item?.displayName}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.contentContainer}
          numColumns={numCols}
        />
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={closeModal}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.modalImage} />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default WeaponsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    fontSize: 30,
    marginBottom: 10,
    marginTop: 20,
    color: '#333333',
    padding: 20,
    alignItems: 'center',
  },
  navTexts: {
    fontSize: 20,
  },
  toggleBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    width: cardWidth,
    aspectRatio: 5/3,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '80%',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
