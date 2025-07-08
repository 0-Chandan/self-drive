



import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'http://192.168.196.72:5000/api',
  timeout: 15_000,
});

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};

// Set token on app load
export const setAuthHeader = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
