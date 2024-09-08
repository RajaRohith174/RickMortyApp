import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {fetchCharacterById} from '../services/api';

const Profile = ({route}) => {
  const {characterId} = route.params;
  const [character, setCharacter] = useState(null);

  console.log(character, 'character');

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const {data} = await fetchCharacterById(characterId);
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };
    loadCharacter();
  }, [characterId]);

  if (!character) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: character?.image}} style={styles.image} />
      <Text style={styles.title}>Name: {character?.name}</Text>
      <Text style={styles.detail}>Species: {character?.species}</Text>
      <Text style={styles.detail}>Gender: {character?.gender}</Text>
      <Text style={styles.detail}>Origin: {character?.origin?.name}</Text>
      <Text style={styles.detail}>Location: {character?.location?.name}</Text>
      <Text style={styles.detail}>
        Dimension: {character?.origin?.dimension}
      </Text>
      <Text style={styles.detail}>
        Residents: {character?.origin?.residents?.length}
      </Text>
      <Text style={styles.title}>Episodes:</Text>
      {character?.episode?.length ? (
        character?.episode?.map((episodeUrl, index) => {
          const episodeId = episodeUrl?.split('/')?.pop();
          return (
            <Text key={index} style={styles.episode}>
              Episode {episodeId}{' '}
              {/* You can fetch episode names if available */}
            </Text>
          );
        })
      ) : (
        <Text>No episodes found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#4f3b63',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    color: '#4f3b63',
    fontSize: 18,
    marginBottom: 5,
  },
  episode: {
    color: '#4f3b63',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Profile;
