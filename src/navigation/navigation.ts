// import { NavigatorScreenParams } from '@react-navigation/native';

// export type TabParamList = {
//   Home: { location?: string } | undefined;
//   'My Trips': undefined;
//   Profile: undefined;
//   Notification: undefined;
// };

// export type RootStackParamList = {
//   Login: { redirectTo?: { screen: keyof RootStackParamList; params: any } };
//   OTPVerification: {
//     mobileNumber: string;
//     countryCode?: string;
//     redirectTo?: { screen: keyof RootStackParamList; params: any };
//   };
//   SignUp: undefined;
//   Main: { screen: keyof TabParamList };
//   CarDetails: { carId: number };
//   SearchResults: { location: string; startDate: string; endDate: string };
//   LocationPicker: undefined;
//   EditProfile: undefined;
//   Payment: {
//     carId: number;
//     carName: string;
//     price: string;
//     startDate: string;
//     endDate: string;
//   };
//   Home: undefined;
//   'My Trips': undefined;
//   Profile: undefined;
//   Notification: undefined;
//   LoyaltyRewards: undefined;
//   Documents: undefined;
//   Settings: undefined;
//   RatingsReview: undefined;
//   MobileVerification: undefined;
// };

// export type BottomTabParamList = NavigatorScreenParams<TabParamList>;



import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: { location?: string } | undefined;
  'My Trips': undefined;
  Profile: undefined;
  Notification: undefined;
};

export type RootStackParamList = {
  Login: { redirectTo?: { screen: keyof RootStackParamList; params: any } };
  OTPVerification: {
    mobileNumber: string;
    countryCode?: string;
    redirectTo?: { screen: keyof RootStackParamList; params: any }; 
  };
  SignUp: undefined;
  Main: { screen: keyof TabParamList };
  CarDetails: { carId: number ,startDate?: string; endDate?: string; isWithDriver?: boolean};
  SearchResults: {
    location: string;
    startDate: string;
    endDate: string;
    isWithDriver?: boolean;
    isSelfDrive?: boolean;
  };
  LocationPicker: undefined;
  EditProfile: undefined;
  Payment: {
    carId: number;
    carName: string;
    price: string;
    startDate: string;
    endDate: string;
    isWithDriver?: boolean;
  };
  Home: undefined;
  'My Trips': undefined;
  Profile: undefined;
  Notification: undefined;
  LoyaltyRewards: undefined;
  Documents: undefined;
  Settings: undefined;
  RatingsReview: undefined;
  TermCondition: undefined;
  PrivacyPolicy: undefined;
  ReturnPolicy: undefined;
  MobileVerification: undefined;
  splash: undefined;
  ExperienceDriver: undefined;
  BottomTabNavigator: undefined;
};

export type BottomTabParamList = NavigatorScreenParams<TabParamList>;
