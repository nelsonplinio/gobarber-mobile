import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import ConfirmAppointment from '~/pages/New/ConfirmAppointment';

const Stack = createStackNavigator();

export default function NewRoutes() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 16,
        },
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          title: 'Selecione um prestador',

          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard')}
              >
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          title: 'Selecione o horário',
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('SelectProvider')}
              >
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="ConfirmAppointment"
        component={ConfirmAppointment}
        options={{
          title: 'Confirmar agendamento',
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('SelectDateTime')}
              >
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
