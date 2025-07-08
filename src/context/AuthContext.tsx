
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type UserData = {
//   name: string;
//   phone: string;
//   loyaltyPoints: number;
// };

// type AuthContextType = {
//   isLoggedIn: boolean;
//   userData: UserData;
//   loginWithOTP: (phone: string, otp: string) => Promise<boolean>;
//   logout: () => void;
//   updatePoints: (points: number) => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState<UserData>({ name: '', phone: '', loyaltyPoints: 500 });

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const storedData = await AsyncStorage.getItem('userData');
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           setUserData(parsedData);
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.error('Failed to load user data:', error);
//       }
//     };
//     loadUserData();
//   }, []);

//   const loginWithOTP = async (phone: string, otp: string) => {
//     if (phone && otp === '123456') {
//       const newUserData = { name: 'User', phone, loyaltyPoints: 500 };
//       setIsLoggedIn(true);
//       setUserData(newUserData);
//       try {
//         await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
//         return true;
//       } catch (error) {
//         console.error('Failed to save user data:', error);
//         return false;
//       }
//     }
//     return false;
//   };

//   const logout = async () => {
//     setIsLoggedIn(false);
//     setUserData({ name: '', phone: '', loyaltyPoints: 500 });
//     try {
//       await AsyncStorage.removeItem('userData');
//     } catch (error) {
//       console.error('Failed to clear user data:', error);
//     }
//   };

//   const updatePoints = async (points: number) => {
//     const newUserData = { ...userData, loyaltyPoints: points };
//     setUserData(newUserData);
//     if (isLoggedIn) {
//       try {
//         await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
//       } catch (error) {
//         console.error('Failed to update points:', error);
//       }
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, userData, loginWithOTP, logout, updatePoints }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };






// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
// import { requestOtp, verifyOtp } from '../api/auth';
// import { api, clearAuthHeader } from '../api';

// type UserData = {
//   name: string;
//   phone: string;
//   loyaltyPoints: number;
// };

// type AuthContextType = {
//   isLoggedIn: boolean;
//   userData: UserData;
//   sendOtp: (mobile: string) => Promise<void>;
//   loginWithOTP: (mobile: string, otp: string) => Promise<boolean>;
//   logout: () => void;
//   updatePoints: (points: number) => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const queryClient = new QueryClient();

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState<UserData>({
//     name: '',
//     phone: '',
//     loyaltyPoints: 0,
//   });

//   /* ─────────── MUTATIONS ─────────── */

//   const sendOtpMutation = useMutation({
//     mutationFn: (mobile: string) => requestOtp(mobile),
//   });

//   const loginMutation = useMutation({
//     mutationFn: ({ mobile, otp }: { mobile: string; otp: string }) =>
//       verifyOtp(mobile, otp),
//     onSuccess: async ({ token, user }) => {
//       api.defaults.headers.common.Authorization = `Bearer ${token}`;
//       await AsyncStorage.multiSet([
//         ['authToken', token],
//         ['userData', JSON.stringify(user)],
//       ]);

//       setUserData({
//         name: user.mobile, // No name on first login; adjust if backend sends name
//         phone: user.mobile,
//         loyaltyPoints: 0,
//       });
//       setIsLoggedIn(true);
//     },
//   });

//   /* ─────────── PERSISTENCE ─────────── */

//   useEffect(() => {
//     (async () => {
//       const [token, stored] = await AsyncStorage.multiGet(['authToken', 'userData']);
//       if (token[1] && stored[1]) {
//         api.defaults.headers.common.Authorization = `Bearer ${token[1]}`;
//         const parsed = JSON.parse(stored[1]);
//         setUserData({
//           name: parsed.mobile,
//           phone: parsed.mobile,
//           loyaltyPoints: 0,
//         });
//         setIsLoggedIn(true);
//       }
//     })();
//   }, []);

//   /* ─────────── PUBLIC METHODS ─────────── */

//   const sendOtp = async (mobile: string) => {
//     await sendOtpMutation.mutateAsync(mobile);
//   };

//   const loginWithOTP = async (mobile: string, otp: string) => {
//     try {
//       await loginMutation.mutateAsync({ mobile, otp });
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const logout = async () => {
//     await AsyncStorage.multiRemove(['authToken', 'userData']);
//     clearAuthHeader();
//     setIsLoggedIn(false);
//     setUserData({ name: '', phone: '', loyaltyPoints: 0 });
//   };

//   const updatePoints = async (points: number) => {
//     const updated = { ...userData, loyaltyPoints: points };
//     setUserData(updated);
//     if (isLoggedIn) {
//       await AsyncStorage.setItem('userData', JSON.stringify(updated));
//     }
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthContext.Provider
//         value={{ isLoggedIn, userData, sendOtp, loginWithOTP, logout, updatePoints }}
//       >
//         {children}
//       </AuthContext.Provider>
//     </QueryClientProvider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx){
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return ctx;
//};





// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type UserData = {
//   name: string;
//   phone: string;
//   loyaltyPoints: number;
// };

// type AuthContextType = {
//   isLoggedIn: boolean;
//   userData: UserData;
//   loginWithOTP: (phone: string, otp: string) => Promise<boolean>;
//   logout: () => void;
//   updatePoints: (points: number) => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState<UserData>({ name: '', phone: '', loyaltyPoints: 500 });

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const storedData = await AsyncStorage.getItem('userData');
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           setUserData(parsedData);
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.error('Failed to load user data:', error);
//       }
//     };
//     loadUserData();
//   }, []);

//   const loginWithOTP = async (phone: string, otp: string) => {
//     try {
//       const response = await loginWithOtp(phone, otp);
//       if (response.success) {
//         const newUserData = response.userData;
//         setIsLoggedIn(true);
//         setUserData(newUserData);
//         await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
//         return true;
//       }
//       return false;
//     } catch (error: any) {
//       console.error('Login failed:', error.message);
//       return false;
//     }
//   };

//   const logout = async () => {
//     setIsLoggedIn(false);
//     setUserData({ name: '', phone: '', loyaltyPoints: 500 });
//     try {
//       await AsyncStorage.removeItem('userData');
//     } catch (error) {
//       console.error('Failed to clear user data:', error);
//     }
//   };

//   const updatePoints = async (points: number) => {
//     const newUserData = { ...userData, loyaltyPoints: points };
//     setUserData(newUserData);
//     if (isLoggedIn) {
//       try {
//         await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
//       } catch (error) {
//         console.error('Failed to update points:', error);
//       }
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, userData, loginWithOTP, logout, updatePoints }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };






// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
// import { requestOtp, verifyOtp } from '../api/auth';
// import { api, clearAuthHeader } from '../api';

// type UserData = {
//   name: string;
//   phone: string;
//   loyaltyPoints: number;
// };

// type AuthContextType = {
//   isLoggedIn: boolean;
//   userData: UserData;
//   sendOtp: (mobile: string) => Promise<void>;
//   loginWithOTP: (mobile: string, otp: string) => Promise<boolean>;
//   logout: () => void;
//   updatePoints: (points: number) => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const queryClient = new QueryClient();

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState<UserData>({
//     name: '',
//     phone: '',
//     loyaltyPoints: 0,
//   });

//   const sendOtpMutation = useMutation({
//     mutationFn: (mobile: string) => requestOtp(mobile),
//     retry: 3, // Increased retries for network issues
//     retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000), // Exponential backoff
//     onError: (error: any) => {
//       console.error('sendOtpMutation Error:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//     },
//   });

//   const loginMutation = useMutation({
//     mutationFn: ({ mobile, otp }: { mobile: string; otp: string }) =>
//       verifyOtp(mobile, otp),
//     onSuccess: async ({ token, user }) => {
//       api.defaults.headers.common.Authorization = `Bearer ${token}`;
//       await AsyncStorage.multiSet([
//         ['authToken', token],
//         ['userData', JSON.stringify(user)],
//       ]);

//       setUserData({
//         name: user.mobile,
//         phone: user.mobile,
//         loyaltyPoints: 0,
//       });
//       setIsLoggedIn(true);
//     },
//   });

//   useEffect(() => {
//     (async () => {
//       const [token, stored] = await AsyncStorage.multiGet(['authToken', 'userData']);
//       if (token[1] && stored[1]) {
//         api.defaults.headers.common.Authorization = `Bearer ${token[1]}`;
//         const parsed = JSON.parse(stored[1]);
//         setUserData({
//           name: parsed.mobile,
//           phone: parsed.mobile,
//           loyaltyPoints: 0,
//         });
//         setIsLoggedIn(true);
//       }
//     })();
//   }, []);

//   const sendOtp = async (mobile: string) => {
//     await sendOtpMutation.mutateAsync(mobile);
//   };

//   const loginWithOTP = async (mobile: string, otp: string) => {
//     try {
//       await loginMutation.mutateAsync({ mobile, otp });
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const logout = async () => {
//     await AsyncStorage.multiRemove(['authToken', 'userData']);
//     clearAuthHeader();
//     setIsLoggedIn(false);
//     setUserData({ name: '', phone: '', loyaltyPoints: 0 });
//   };

//   const updatePoints = async (points: number) => {
//     const updated = { ...userData, loyaltyPoints: points };
//     setUserData(updated);
//     if (isLoggedIn) {
//       await AsyncStorage.setItem('userData', JSON.stringify(updated));
//     }
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthContext.Provider
//         value={{ isLoggedIn, userData, sendOtp, loginWithOTP, logout, updatePoints }}
//       >
//         {children}
//       </AuthContext.Provider>
//     </QueryClientProvider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return ctx;
// };




// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
// import { requestOtp, verifyOtp } from '../api/auth';
// import { api, clearAuthHeader } from '../api';

// type UserData = {
//   name: string;
//   phone: string;
//   email?: string;
//   city?: string;
//   loyaltyPoints: number;
// };

// type AuthContextType = {
//   isLoggedIn: boolean;
//   userData: UserData;
//   sendOtp: (mobile: string) => Promise<void>;
//   loginWithOTP: (mobile: string, otp: string) => Promise<boolean>;
//   logout: () => void;
//   updatePoints: (points: number) => Promise<void>;
//   updateProfile: (data: Partial<UserData>) => Promise<void>; // Added updateProfile
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const queryClient = new QueryClient();

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState<UserData>({
//     name: '',
//     phone: '',
//     email: '',
//     loyaltyPoints: 0,
//   });

//   const sendOtpMutation = useMutation({
//     mutationFn: (mobile: string) => requestOtp(mobile),
//     retry: 3,
//     retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
//     onError: (error: any) => {
//       console.error('sendOtpMutation Error:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//     },
//   });

//   const loginMutation = useMutation({
//     mutationFn: ({ mobile, otp }: { mobile: string; otp: string }) =>
//       verifyOtp(mobile, otp),
//     onSuccess: async ({ token, user }) => {
//       api.defaults.headers.common.Authorization = `Bearer ${token}`;
//       await AsyncStorage.multiSet([
//         ['authToken', token],
//         ['userData', JSON.stringify({ ...user, email: user.email || '' })],
//       ]);

//       setUserData({
//         name: user.mobile,
//         phone: user.mobile,
//         email: user.email || '',
//         loyaltyPoints: 0,
//       });
//       setIsLoggedIn(true);
//     },
//   });

//   useEffect(() => {
//     (async () => {
//       const [token, stored] = await AsyncStorage.multiGet(['authToken', 'userData']);
//       if (token[1] && stored[1]) {
//         api.defaults.headers.common.Authorization = `Bearer ${token[1]}`;
//         const parsed = JSON.parse(stored[1]);
//         setUserData({
//           name: parsed.mobile || parsed.name || '',
//           phone: parsed.mobile || parsed.phone || '',
//           email: parsed.email || '',
//           loyaltyPoints: parsed.loyaltyPoints || 0,
//         });
//         setIsLoggedIn(true);
//       }
//     })();
//   }, []);

//   const sendOtp = async (mobile: string) => {
//     await sendOtpMutation.mutateAsync(mobile);
//   };

//   const loginWithOTP = async (mobile: string, otp: string) => {
//     try {
//       await loginMutation.mutateAsync({ mobile, otp });
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const logout = async () => {
//     await AsyncStorage.multiRemove(['authToken', 'userData']);
//     clearAuthHeader();
//     setIsLoggedIn(false);
//     setUserData({ name: '', phone: '', email: '', loyaltyPoints: 0 });
//   };

//   const updatePoints = async (points: number) => {
//     const updated = { ...userData, loyaltyPoints: points };
//     setUserData(updated);
//     if (isLoggedIn) {
//       await AsyncStorage.setItem('userData', JSON.stringify(updated));
//     }
//   };

//   const updateProfile = async (data: Partial<UserData>) => {
//     const updated = { ...userData, ...data };
//     setUserData(updated);
//     if (isLoggedIn) {
//       await AsyncStorage.setItem('userData', JSON.stringify(updated));
//     }
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthContext.Provider
//         value={{ isLoggedIn, userData, sendOtp, loginWithOTP, logout, updatePoints, updateProfile }}
//       >
//         {children}
//       </AuthContext.Provider>
//     </QueryClientProvider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return ctx;
// };





import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { requestOtp, verifyOtp } from '../api/auth';
import { api, clearAuthHeader } from '../api';
import { setAuthHeader } from '../api';

type UserData = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  photoUrl?: string; // Added photoUrl
  loyaltyPoints: number;
};

type AuthContextType = {
  isLoggedIn: boolean;
  userData: UserData;
  sendOtp: (mobile: string) => Promise<void>;
  loginWithOTP: (mobile: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updatePoints: (points: number) => Promise<void>;
  updateProfile: (data: Partial<UserData>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const queryClient = new QueryClient();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    photoUrl: '',
    loyaltyPoints: 0,
  });

  const sendOtpMutation = useMutation({
    mutationFn: (mobile: string) => requestOtp(mobile),
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
    onError: (error: any) => {
      console.error('sendOtpMutation Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    },
  });

  const loginMutation = useMutation({
    mutationFn: ({ mobile, otp }: { mobile: string; otp: string }) =>
      verifyOtp(mobile, otp),
    onSuccess: async ({ token, user }:any) => {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      await AsyncStorage.multiSet([
        ['authToken', token],
        ['userData', JSON.stringify({ ...user, email: user.email || '', city: user.city || '', photoUrl: user.photoUrl || '' })],
      ]);

      setUserData({
        name: user.mobile || user.name || '',
        phone: user.mobile,
        email: user.email || '',
        city: user.city || '',
        photoUrl: user.photoUrl || '',
        loyaltyPoints: 0,
      });
      setIsLoggedIn(true);
    },
  });

  useEffect(() => {
    (async () => {
      await setAuthHeader();
      const [token, stored] = await AsyncStorage.multiGet(['authToken', 'userData']);
      if (token[1] && stored[1]) {
        api.defaults.headers.common.Authorization = `Bearer ${token[1]}`;
        const parsed = JSON.parse(stored[1]);
        setUserData({
          name: parsed.mobile || parsed.name || '',
          phone: parsed.mobile || parsed.phone || '',
          email: parsed.email || '',
          city: parsed.city || '',
          photoUrl: parsed.photoUrl || '',
          loyaltyPoints: parsed.loyaltyPoints || 0,
        });
        setIsLoggedIn(true);
      }
    })();
  }, []);

  const sendOtp = async (mobile: string) => {
    await sendOtpMutation.mutateAsync(mobile);
  };

  const loginWithOTP = async (mobile: string, otp: string) => {
    try {
      await loginMutation.mutateAsync({ mobile, otp });
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['authToken', 'userData']);
    clearAuthHeader();
    setIsLoggedIn(false);
    setUserData({ name: '', phone: '', email: '', city: '', photoUrl: '', loyaltyPoints: 0 });
  };

  const updatePoints = async (points: number) => {
    const updated = { ...userData, loyaltyPoints: points };
    setUserData(updated);
    if (isLoggedIn) {
      await AsyncStorage.setItem('userData', JSON.stringify(updated));
    }
  };

  const updateProfile = async (data: Partial<UserData>) => {
    const updated = { ...userData, ...data };
    setUserData(updated);
    if (isLoggedIn) {
      await AsyncStorage.setItem('userData', JSON.stringify(updated));
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{ isLoggedIn, userData, sendOtp, loginWithOTP, logout, updatePoints, updateProfile }}
      >
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};