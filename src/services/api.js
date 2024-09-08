// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const fetchCharacters = (page = 1, search = '', filters = {}) => {
  const {status, gender, species} = filters;
  let query = `?page=${page}`;
  if (search) query += `&name=${search}`;
  if (status) query += `&status=${status}`;
  if (gender) query += `&gender=${gender}`;
  if (species) query += `&species=${species}`;

  return api.get(`/character${query}`);
};
export const fetchCharacterById = id => api.get(`/character/${id}`);
export const fetchLocations = (page = 1) => api.get(`/location?page=${page}`);
export const fetchEpisodes = (page = 1) => api.get(`/episode?page=${page}`);
