import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Image, Modal, TouchableOpacity, Pressable } from 'react-native';
import useAxios from 'axios-hooks';
import { FlatList } from 'react-native-gesture-handler';
import AnimatedIconExample from './temps/AnimatedIconExample';
import Layout from './Layout';

const numCols = 2;
const cardWidth = Dimensions.get('window').width / numCols - 30;

const Cards = ({navigation}) => {
  const [{ data, loading, error }] = useAxios('https://valorant-api.com/v1/playercards');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [listType, setListType] = useState('grid')
  const cardsData = data?.data || [];

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
    
    <Layout navigation={navigation}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.navTexts}>Cards</Text>
        <View style={styles.toggleBtn}>
          <Pressable onPress={() => setListType('list')}>
            <Text style={styles.navTexts}>
              <AnimatedIconExample name={'list'} active={listType ==='list'} />
            </Text>
          </Pressable>
          <Pressable onPress={() => setListType('grid')}>
            <Text style={styles.navTexts}>
              <AnimatedIconExample name={'apps'} active={listType ==='grid'} />
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        {listType === 'list' && (
          <FlatList
          data={cardsData}
          keyExtractor={(card) => card?.uuid}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item.largeArt)}>
              <View style={styles.listCard}>
                <Image source={{ uri: item?.wideArt }} style={styles.listCardImage} />
                <Text style={{...styles.text,paddingLeft:10}}>{item?.displayName}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.contentContainer}
          numColumns={'1'}
        />
        )}
        {
          listType === 'grid' && (
            <FlatList
              data={cardsData}
              keyExtractor={(card) => card?.uuid}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openModal(item.largeArt)}>
                  <View style={styles.card}>
                    <Image source={{ uri: item?.displayIcon }} style={styles.cardImage} />
                    <Text style={styles.text}>{item?.displayName}</Text>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.contentContainer}
              numColumns={numCols}
            />
          )
        }
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
    </Layout>
  );
};

export default Cards;

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
    aspectRatio: 2 / 3,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    position: 'relative',
  },cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  listCard:{
    margin: 10,
    borderWidth: 1,
    width: Dimensions.get('window').width - 20,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'relative',
    paddingBottom: 10,
  },
  listCardImage:{
    width: '100%',
    aspectRatio: 452/128,
    overflow: 'hidden',
    marginBottom: 5,
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
