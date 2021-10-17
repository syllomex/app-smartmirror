import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AppLoading from 'expo-app-loading';

import { useFonts } from 'expo-font';
import * as Quicksand from '@expo-google-fonts/quicksand';

import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/contexts/auth';
import { SocketProvider } from './src/hooks/useSocket';

import RootStack from './src/routes/root-stack';

const AppComponent: React.FC = () => {
  return (
    <>
      <StatusBar style="light" />
      <RootStack />
    </>
  );
};

export default function App() {
  const [loaded] = useFonts({
    'Quicksand-Light': Quicksand.Quicksand_300Light,
    'Quicksand-Regular': Quicksand.Quicksand_400Regular,
    'Quicksand-Medium': Quicksand.Quicksand_500Medium,
    'Quicksand-SemiBold': Quicksand.Quicksand_600SemiBold,
    'Quicksand-Bold': Quicksand.Quicksand_700Bold,
  });

  if (!loaded) return <AppLoading />;

  return (
    <SocketProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppComponent />
        </NavigationContainer>
      </AuthProvider>
    </SocketProvider>
  );
}
