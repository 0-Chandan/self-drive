import { api } from './index';

export interface Vehicle {
  id: number;
  name: string;
  pricePer10Km: string;
  transmission: string;
  fuelType: string;
  seats: number;
  imageUrl: string;
  driverAvailability: boolean;
}

interface GetVehiclesResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  limit: number;
}

export const getAvailableVehicles = (
  location: string,
  startDate: string,
  endDate: string,
  isWithDriver?: boolean,
  page: number = 1,
  limit: number = 10
) =>
  api
    .get<GetVehiclesResponse>('/vehicles/available', {
      params: { location, startDate, endDate, isWithDriver, page, limit },
    })
    .then(res => res.data);




export interface VehicleDetails extends Vehicle {
  features: { [key: string]: boolean };
  benefits: { [key: string]: boolean };
  cancellationPolicy?: string;
  number: string;
  pricePerDay: number;
  driverCharge: number;
  deposit: number;
  location: string;
  details: string;
}

export const getVehicleById = (id: number) =>
  api.get<VehicleDetails>(`/vehicles/${id}`).then(res => res.data);





export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const getVehicleReviews = (vehicleId: number) =>
  api.get<Review[]>(`/vehicles/${vehicleId}/reviews`).then(res => res.data);




export const getSimilarVehicles = (
  vehicleId: number,
  typeId?: number,
  fuelType?: string,
  page: number = 1,
  limit: number = 2
) =>
  api
    .get<GetVehiclesResponse>('/vehicles/available', {
      params: { page, limit, typeId, fuelType, excludeId: vehicleId },
    })
    .then(res => res.data);
