import axios from 'axios';
import { GoogleUser } from 'expo-google-app-auth';
import React, { createContext, useState, useEffect } from 'react';
import { SetState, UndefinedOrNull } from '../../utils/types';

type Token = {
  accessToken: string;
  refreshToken: string | null;
};

type AuthContextProps = {
  user: UndefinedOrNull<GoogleUser>;
  setUser: SetState<UndefinedOrNull<GoogleUser>>;

  googleToken: UndefinedOrNull<Token>;
  setGoogleToken: SetState<UndefinedOrNull<Token>>;

  token: UndefinedOrNull<string>;
  setToken: SetState<UndefinedOrNull<string>>;
};

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UndefinedOrNull<GoogleUser>>();
  const [googleToken, setGoogleToken] = useState<UndefinedOrNull<Token>>();
  const [token, setToken] = useState<UndefinedOrNull<string>>();

  useEffect(() => {
    console.log(googleToken, user);
    if (!googleToken || !user || !user.id) return;

    axios
      .post('http://192.168.0.104:8000/store-token', {
        accessToken: googleToken.accessToken,
        refreshToken: googleToken.refreshToken,
        googleId: user.id,
        name: user.name,
      })
      .then((res) => console.log('merda mano', res.data))
      .catch((err) => console.log('k823293', err.message));
  }, [googleToken, user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, googleToken, setGoogleToken, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
