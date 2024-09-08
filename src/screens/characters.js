import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {fetchCharacters} from '../services/api';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Characters = ({navigation}) => {
  const [characters, setCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
  });

  useEffect(() => {
    loadCharacters();
  }, [page]);

  useEffect(() => {
    applyFilters();
  }, [search, filters, allCharacters]);

  const loadCharacters = async () => {
    try {
      const {data} = await fetchCharacters(page);
      const newCharacters = data.results;

      if (page === 1) {
        setAllCharacters(newCharacters); // Store all characters
      } else {
        // Filter out duplicates based on id before appending
        setAllCharacters(prev => [
          ...prev.filter(
            prevChar =>
              !newCharacters.some(newChar => newChar.id === prevChar.id),
          ),
          ...newCharacters,
        ]);
      }

      // Set the initial state for characters to display
      setCharacters(prev => [...prev, ...newCharacters]);
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  };

  const statusOptions = [{title: 'All'}, {title: 'Alive'}, {title: 'Dead'}];

  const genderOptions = [
    {title: 'All'},
    {title: 'Male'},
    {title: 'Female'},
    {title: 'unknown'},
  ];

  const speciesOptions = [{title: 'All'}, {title: 'Human'}, {title: 'Alien'}];

  const typeOptions = [{title: 'All'}, {title: 'Type1'}, {title: 'Type2'}];

  const applyFilters = () => {
    let filtered = [...allCharacters];

    if (search) {
      filtered = filtered?.filter(character =>
        character?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      );
    }

    const {status, gender, species} = filters;
    if (status && status !== 'All') {
      filtered = filtered?.filter(character => character?.status === status);
    }
    if (gender && gender !== 'All') {
      filtered = filtered?.filter(character => character?.gender === gender);
    }
    if (species && species !== 'All') {
      filtered = filtered?.filter(character => character?.species === species);
    }

    setCharacters(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({...prev, [filterType]: value}));
  };

  const renderCharacter = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('CharacterDetail', {characterId: item.id})
      }>
      <Image source={{uri: item.image}} style={styles.characterImage} />
      <Text style={styles.characterName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by character name..."
        placeholderTextColor={'white'}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles?.text}>Filter:</Text>
      {/* Filter Dropdowns */}
      <View style={styles.filtersContainer}>
        {/* Status Dropdown */}
        <SelectDropdown
          data={statusOptions}
          onSelect={selectedItem =>
            handleFilterChange('status', selectedItem.title)
          }
          renderButton={(selectedItem, isOpened) => (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem?.title) || 'Select Status'}
              </Text>
            </View>
          )}
          renderItem={(item, index, isSelected) => (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}
              key={index}>
              <Text style={styles.dropdownItemTxtStyle}>{item?.title}</Text>
            </View>
          )}
          dropdownStyle={styles.dropdownMenuStyle}
          showsVerticalScrollIndicator={false}
        />

        {/* Gender Dropdown */}
        <SelectDropdown
          data={genderOptions}
          onSelect={selectedItem =>
            handleFilterChange('gender', selectedItem.title)
          }
          renderButton={(selectedItem, isOpened) => (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem?.title) || 'Select Gender'}
              </Text>
            </View>
          )}
          renderItem={(item, index, isSelected) => (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}
              key={index}>
              <Text style={styles.dropdownItemTxtStyle}>{item?.title}</Text>
            </View>
          )}
          dropdownStyle={styles.dropdownMenuStyle}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.filtersContainer}>
        {/* Species Dropdown */}
        <SelectDropdown
          data={speciesOptions}
          onSelect={selectedItem =>
            handleFilterChange('species', selectedItem.title)
          }
          renderButton={(selectedItem, isOpened) => (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem?.title) || 'Select Species'}
              </Text>
            </View>
          )}
          renderItem={(item, index, isSelected) => (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}
              key={index}>
              <Text style={styles.dropdownItemTxtStyle}>{item?.title}</Text>
            </View>
          )}
          dropdownStyle={styles.dropdownMenuStyle}
          showsVerticalScrollIndicator={false}
        />

        {/* Type Dropdown */}
        <SelectDropdown
          data={typeOptions}
          onSelect={selectedItem =>
            handleFilterChange('type', selectedItem.title)
          }
          renderButton={(selectedItem, isOpened) => (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem?.title) || 'Select Type'}
              </Text>
            </View>
          )}
          renderItem={(item, index, isSelected) => (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}
              key={index}>
              <Text style={styles.dropdownItemTxtStyle}>{item?.title}</Text>
            </View>
          )}
          dropdownStyle={styles.dropdownMenuStyle}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Character List */}
      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // Grid layout with 2 columns
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5} // Load more when scrolled halfway
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#4f3b63',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    color: '#4f3b63',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dropdownButtonStyle: {
    width: 180,
    height: 40,
    backgroundColor: '#E9ECEF',
    borderWidth: 1,
    borderColor: '#4f3b63',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#4f3b63',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
  },
  dropdownButtonIconStyle: {
    fontSize: 20,
    marginRight: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 20,
    marginRight: 8,
  },

  card: {
    flex: 1,
    backgroundColor: '#4f3b63',
    margin: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    padding: 10,
  },
  characterImage: {
    width: windowWidth * 0.256,
    height: windowHeight * 0.13,
    borderRadius: 50,
  },
  characterName: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Characters;
