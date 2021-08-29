import { useCallback } from 'react';

import * as Google from 'expo-google-app-auth';

import useAuth from '../contexts/auth/useAuth';

const googleConfig: Google.GoogleLogInConfig = {
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.readonly',
  ],
  clientId:
    '1081190011653-7t2emkahe1kod648pm5u5hr89to12uus.apps.googleusercontent.com',
  language: 'pt-BR',
};

export default function useSignIn() {
  const auth = useAuth();

  const signInWithGoogle = useCallback(async () => {
    const result = await Google.logInAsync(googleConfig);

    if (result.type === 'success') {
      auth.setUser(result.user);

      if (result.accessToken) auth.setGoogleToken(result.accessToken);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      if (!auth.googleToken) return;

      await Google.logOutAsync({
        ...googleConfig,
        accessToken: auth.googleToken,
      });

      auth.setUser(null);
      auth.setGoogleToken(null);
      auth.setToken(null);

      return true;
    } catch (err) {
      return false;
    }
  }, []);

  return { signInWithGoogle, signOut };
}
