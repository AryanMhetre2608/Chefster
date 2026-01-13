import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export interface AuthResult {
  success: boolean;
  user?: any;
  error?: string;
}

class AuthService {
  // Register new user with email and password and send verification email
  async registerWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // Send email verification
      await userCredential.user.sendEmailVerification();
      
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = error.message || 'Registration failed';
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // Send email verification to current user
  async sendEmailVerification(): Promise<AuthResult> {
    try {
      const user = auth().currentUser;
      if (user) {
        await user.sendEmailVerification();
        return {
          success: true
        };
      } else {
        return {
          success: false,
          error: 'No user is currently signed in'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to send verification email'
      };
    }
  }

  // Check if current user's email is verified
  isEmailVerified(): boolean {
    const user = auth().currentUser;
    return user ? user.emailVerified : false;
  }

  // Reload user to get updated email verification status
  async reloadUser(): Promise<void> {
    try {
      const user = auth().currentUser;
      if (user) {
        await user.reload();
      }
    } catch (error) {
      console.error('Failed to reload user:', error);
    }
  }

  // Login user with email and password
  async loginWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error: any) {
      let errorMessage = 'Login failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        default:
          errorMessage = error.message || 'Login failed';
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Get current user
  getCurrentUser() {
    return auth().currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback);
  }

  // Send password reset email
  async resetPassword(email: string): Promise<AuthResult> {
    try {
      await auth().sendPasswordResetEmail(email);
      return {
        success: true
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to send reset email'
      };
    }
  }
}

export default new AuthService();