import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from '~/pages/Dashboard';
import NewRoutes from './NewRoutes';
import Profile from '~/pages/Profile';

const BottomTab = createBottomTabNavigator();

export default function DashboardRoutes() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        allowFontScaling: true,
        style: {
          backgroundColor: '#8d51a8',
        },
      }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Agandamentos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Appointment"
        options={{
          title: 'Agendar',
          tabBarVisible: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" size={size} color={color} />
          ),
        }}
        component={NewRoutes}
      />

      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
