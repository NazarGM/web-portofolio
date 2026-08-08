import { useCallback, useState } from 'react';
import { api, setAuthToken } from '../lib/api';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.auth.login(username, password);
      setAuthToken(res.token);
      setToken(res.token);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setToken(null);
  }, []);

  return { isAuthenticated: !!token, loading, error, login, logout };
}