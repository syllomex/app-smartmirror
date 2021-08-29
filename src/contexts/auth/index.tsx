import { GoogleUser } from 'expo-google-app-auth';
import React, { createContext, useState } from 'react';
import { SetState, UndefinedOrNull } from '../../utils/types';

type AuthContextProps = {
  user: UndefinedOrNull<GoogleUser>;
  setUser: SetState<UndefinedOrNull<GoogleUser>>;

  googleToken: UndefinedOrNull<string>;
  setGoogleToken: SetState<UndefinedOrNull<string>>;

  token: UndefinedOrNull<string>;
  setToken: SetState<UndefinedOrNull<string>>;
};

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UndefinedOrNull<GoogleUser>>();
  const [googleToken, setGoogleToken] = useState<UndefinedOrNull<string>>();
  const [token, setToken] = useState<UndefinedOrNull<string>>();

  return (
    <AuthContext.Provider
      value={{ user, setUser, googleToken, setGoogleToken, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
