import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import LoginRoutes from './LoginRoutes';
import DashboardRoutes from './DashboardRoutes';

export default function Routes() {
  const isSigned = useSelector((state) => state.auth.signed);
  return (
    <NavigationContainer>
      {isSigned ? <DashboardRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
}
