// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

// Function to fetch characters with pagination, search, and filters
export const fetchCharacters = (page = 1) => {
  return api.get(`/character/?page=${page}`).catch(error => {
    console.error('Error fetching characters:', error);
    throw error;
  });
};

// Fetch character details by ID
export const fetchCharacterById = id => {
  return api.get(`/character/${id}`).catch(error => {
    console.error('Error fetching character by ID:', error);
    throw error;
  });
};

// Fetch locations with pagination
export const fetchLocations = (page = 1) => {
  return api.get(`/location?page=${page}`).catch(error => {
    console.error('Error fetching locations:', error);
    throw error;
  });
};

// Fetch episodes with pagination
export const fetchEpisodes = (page = 1) => {
  return api.get(`/episode?page=${page}`).catch(error => {
    console.error('Error fetching episodes:', error);
    throw error;
  });
};
