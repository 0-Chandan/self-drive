import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import type { RouteProp } from '@react-navigation/native';

type TabParamList = {
  Home: undefined;
  'My Trips': undefined;
  Profile: undefined;
  Notification: undefined;
};

const getTabBarIcon = (route: RouteProp<TabParamList, keyof TabParamList>, color: string, size: number) => {
  let iconName: string = '';
  if (route.name === 'Home') {
    iconName = 'home-outline';
  } else if (route.name === 'My Trips') {
    iconName = 'paper-plane-outline';
  } else if (route.name === 'Profile') {
    iconName = 'person-outline';
  } else if (route.name === 'Notification') {
    iconName = 'notifications-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
        tabBarActiveTintColor: '#811717',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Trips" component={MyTripsScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
