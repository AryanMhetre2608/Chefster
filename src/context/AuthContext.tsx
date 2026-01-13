import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      console.log('Auth state changed:', authUser ? `User: ${authUser.email}` : 'No user');
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      console.log('AuthContext: Starting logout...');
      await auth().signOut();
      console.log('AuthContext: Logout completed');
    } catch (error) {
      console.error('AuthContext: Logout error:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.reload();
        // Trigger onAuthStateChanged by signing out and back in
        // This is a workaround to ensure the emailVerified status is properly updated
        const email = currentUser.email;
        const isVerified = currentUser.emailVerified;
        
        console.log('RefreshUser - Email:', email, 'Verified:', isVerified);
        
        // Force update the user state
        setUser({ ...currentUser, emailVerified: isVerified } as FirebaseAuthTypes.User);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  const value = {
    user,
    loading,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};