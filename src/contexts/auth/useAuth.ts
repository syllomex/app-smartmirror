import { useCallback, useContext } from 'react';
import { AuthContext } from '.';
import { api } from '../../services/api';

export default function useAuth() {
  const auth = useContext(AuthContext);

  const clearCode = useCallback(() => {
    api.delete('mirrors', { params: { hash: auth.mirror?.hash } });

    auth.setCode(undefined);
    auth.setMirror(undefined);
  }, [auth]);

  return { ...auth, isLoggedIn: !!auth.user, clearCode };
}
