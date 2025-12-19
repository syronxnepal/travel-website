import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate that the user object has the correct structure
        if (parsedUser && typeof parsedUser === 'object' && typeof parsedUser.name === 'string' && typeof parsedUser.email === 'string' && typeof parsedUser.role === 'string') {
          setUser(parsedUser);
        } else {
          // Invalid user data, clear it
          localStorage.removeItem('user');
        }
      } catch (error) {
        // Invalid JSON, clear it
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would validate with backend
      const mockUser: User = {
        id: '1',
        email: email,
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=12',
        createdAt: new Date().toISOString()
      };

      if (email === 'admin@example.com' && password === 'password') {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/auth';
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { 
        id: user.id,
        email: userData.email || user.email,
        name: userData.name || user.name,
        role: userData.role || user.role,
        avatar: userData.avatar || user.avatar,
        createdAt: user.createdAt
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser, 
      isAuthenticated: !!user,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

