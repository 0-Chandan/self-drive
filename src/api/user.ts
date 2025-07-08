import { api } from './index';

export const updateUserProfile = (data: { name?: string; phone?: string; email?: string }) =>
  api.put('/users/profile', data).then(res => res.data);

export const uploadDocument = (formData: FormData) =>
  api.post('/users/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);
