import { useContext } from 'react';
import { AuthContext } from '.';

export default function useAuth() {
  const auth = useContext(AuthContext);
  return { ...auth, isLoggedIn: !!auth.user };
}
