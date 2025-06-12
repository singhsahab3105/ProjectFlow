import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      // In a real app, you'd verify the token with the backend
      // For now, we'll simulate this with mock data
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      };
      
      setUser(mockUser);
    } catch (err) {
      localStorage.removeItem('token');
      console.error('Failed to get current user:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an actual API call
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      
      // For demo purposes, we'll simulate a successful login
      if (email === 'demo@example.com' && password === 'password') {
        const mockToken = 'mock-jwt-token';
        const mockUser = {
          id: 1,
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'admin',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        };
        
        localStorage.setItem('token', mockToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setUser(mockUser);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an actual API call
      // const response = await api.post('/auth/register', { name, email, password });
      // const { token, user } = response.data;
      
      // For demo purposes, we'll simulate a successful registration
      const mockToken = 'mock-jwt-token';
      const mockUser = {
        id: 1,
        name,
        email,
        role: 'user',
      };
      
      localStorage.setItem('token', mockToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}