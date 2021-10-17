import { useCallback } from 'react';

import * as Google from 'expo-google-app-auth';

import useAuth from '../contexts/auth/useAuth';
import { clearStorageKeys } from '../contexts/auth';
import { useSocket } from './useSocket';

const googleConfig: Google.GoogleLogInConfig = {
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.events.readonly',
  ],
  clientId:
    '1081190011653-7t2emkahe1kod648pm5u5hr89to12uus.apps.googleusercontent.com',
  language: 'pt-BR',
};

export default function useSignIn() {
  const auth = useAuth();
  const { io } = useSocket();

  const signInWithGoogle = useCallback(async () => {
    const result = await Google.logInAsync(googleConfig);

    if (result.type === 'success') {
      auth.setUser(result.user);

      if (result.accessToken)
        auth.setGoogleToken({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
    }
  }, [auth]);

  const disconnectMirror = useCallback(() => {
    if (!auth?.mirror?.hash) {
      console.warn('Could not get mirror hash on disconnect.');
      return false;
    }

    io.emit('from-app.disconnect', { hash: auth.mirror.hash });
    return true;
  }, [io, auth]);

  const signOut = useCallback(async () => {
    try {
      if (!auth.googleToken) return;

      await Google.logOutAsync({
        ...googleConfig,
        accessToken: auth.googleToken.accessToken,
      });

      auth.clearCode();

      auth.setUser(null);
      auth.setGoogleToken(null);
      auth.setToken(null);
      auth.setCode(undefined);
      auth.setMirror(undefined);

      await clearStorageKeys();
      disconnectMirror();

      return true;
    } catch (err) {
      return false;
    }
  }, [auth, disconnectMirror]);

  return {
    signInWithGoogle,
    signOut,
    ...auth,
  };
}
