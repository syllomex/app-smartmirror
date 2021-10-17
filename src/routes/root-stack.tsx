import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuth from '../contexts/auth/useAuth';

import SignIn from '../screens/SignIn';
import MirrorCode from '../screens/MirrorCode';

import Tabs from './tabs';

const { Navigator, Screen } = createNativeStackNavigator();

const RootStack: React.FC = () => {
  const { isLoggedIn, code } = useAuth();

  const AnonymousRoutes = (
    <>
      <Screen name="SignIn" component={SignIn} />
    </>
  );

  const AuthRoutes = (
    <>
      {!code ? (
        <Screen name="MirrorCode" component={MirrorCode} />
      ) : (
        <Screen name="MirrorConnected" component={Tabs} />
      )}
    </>
  );

  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      {isLoggedIn ? AuthRoutes : AnonymousRoutes}
    </Navigator>
  );
};

export default RootStack;
