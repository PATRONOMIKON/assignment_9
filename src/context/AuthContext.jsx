import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const SESSION_KEY = 'newsreader_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  });

  // DEMO ONLY: this starter assignment has no authentication backend.
  // A real app must verify credentials and roles on a trusted server.
  const login = (username, password, role = 'regular') => {
    const normalizedUsername = username.trim();
    if (!normalizedUsername || !password) {
      throw new Error('Username and password are required.');
    }

    const nextUser = {
      username: normalizedUsername,
      role: role === 'admin' ? 'admin' : 'regular',
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const isAuthenticated = Boolean(user);
  const isAdmin = () => isAuthenticated && user.role === 'admin';

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated, isAdmin }),
    [user, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
