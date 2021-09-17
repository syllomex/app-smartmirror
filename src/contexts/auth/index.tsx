import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleUser } from 'expo-google-app-auth';
import React, { createContext, useState, useEffect } from 'react';

import { api } from '../../services/api';

import { SetState, UndefinedOrNull } from '../../utils/types';

type Token = {
  accessToken: string;
  refreshToken: string | null;
};

type StoredAuth = {
  accessToken: string;
  refreshToken: string | null;
  googleId: string;
  name: string | undefined;
};

type AuthContextProps = {
  user: UndefinedOrNull<GoogleUser>;
  setUser: SetState<UndefinedOrNull<GoogleUser>>;

  googleToken: UndefinedOrNull<Token>;
  setGoogleToken: SetState<UndefinedOrNull<Token>>;

  token: UndefinedOrNull<string>;
  setToken: SetState<UndefinedOrNull<string>>;

  code: string | undefined;
  setCode: SetState<string | undefined>;

  mirror: any | undefined;
  setMirror: SetState<any>;
};

const key = {
  user: '@smartmirror:user',
  auth: '@smartmirror:auth',
  code: '@smartmirror:code',
  mirror: '@smartmirror:mirror',
};

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UndefinedOrNull<GoogleUser>>();
  const [googleToken, setGoogleToken] = useState<UndefinedOrNull<Token>>();
  const [token, setToken] = useState<UndefinedOrNull<string>>();
  const [code, setCode] = useState<string>();
  const [mirror, setMirror] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!(user === undefined || googleToken === undefined)) return;

      const authStr = await AsyncStorage.getItem(key.auth);
      const userStr = await AsyncStorage.getItem(key.user);
      const codeStr = await AsyncStorage.getItem(key.code);
      const mirrorStr = await AsyncStorage.getItem(key.mirror);

      if (!authStr || !userStr) {
        setUser(null);
        setGoogleToken(null);
        setMirror(null);
        return;
      }

      const storedAuth: StoredAuth = JSON.parse(authStr);
      const storedUser: GoogleUser = JSON.parse(userStr);

      if (mirrorStr) {
        const storedMirror: any = JSON.parse(mirrorStr);
        setMirror(storedMirror);
      }

      setUser(storedUser);
      setGoogleToken({
        accessToken: storedAuth.accessToken,
        refreshToken: storedAuth.refreshToken,
      });

      if (!codeStr) return;
      setCode(codeStr);
    })();
  }, []);

  useEffect(() => {
    if (!code) return;
    AsyncStorage.setItem(key.code, code);
  }, [code]);

  useEffect(() => {
    if (!mirror) return;

    AsyncStorage.setItem(key.mirror, JSON.stringify(mirror));
  }, [mirror]);

  useEffect(() => {
    if (!googleToken || !user || !user.id) return;

    const params: StoredAuth = {
      accessToken: googleToken.accessToken,
      refreshToken: googleToken.refreshToken,
      googleId: user.id,
      name: user.name,
    };

    api.post('store-token', params);

    AsyncStorage.setItem(key.auth, JSON.stringify(params));
    AsyncStorage.setItem(key.user, JSON.stringify(user));
  }, [googleToken, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        googleToken,
        setGoogleToken,
        token,
        setToken,
        code,
        setCode,
        mirror,
        setMirror,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
