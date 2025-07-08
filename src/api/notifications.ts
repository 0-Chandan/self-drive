import {api} from './index';

export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};
