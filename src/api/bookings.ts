import {api} from './index';

export const createBooking = async (data: {
  vehicleId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
}) => {
  const response = await api.post('/bookings', data);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};
