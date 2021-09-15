import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuth from '../contexts/auth/useAuth';

import SignIn from '../screens/SignIn';
import MirrorCode from '../screens/MirrorCode';
import MirrorConnected from '../screens/MirrorConnected';

const { Navigator, Screen } = createNativeStackNavigator();

const AnonymousRoutes = (
  <>
    <Screen name="SignIn" component={SignIn} />
  </>
);

const AuthRoutes = (
  <>
    <Screen name="MirrorCode" component={MirrorCode} />
    <Screen name="MirrorConnected" component={MirrorConnected} />
  </>
);

const RootStack: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? AuthRoutes : AnonymousRoutes}
    </Navigator>
  );
};

export default RootStack;
