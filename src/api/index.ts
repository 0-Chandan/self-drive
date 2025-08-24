

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../constant/Base_Url';

export const api = axios.create({
  //baseURL: 'https://cabcar-server.vercel.app/api',
  baseURL,
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

