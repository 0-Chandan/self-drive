


import { api } from './index';

export const requestOtp = (mobile: string) => {
  console.log('Sending OTP request:', { mobile });
  return api.post('/auth/request-otp', { mobile }).then(res => {
    console.log('OTP Response:', res.data);
    return res.data;
  });
};

export interface LoginResponse {
  token: string;
  user: { id: number; mobile: string; role: 'user' };
  success: boolean; 
}

export const verifyOtp = (mobile: string, otp: string) =>
  api
    .post<LoginResponse>('/auth/user/login', { mobile, otp })
    .then((res)=>{
      console.log('Login Response:', res.data);
      return res.data.success;
    });








