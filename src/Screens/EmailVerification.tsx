import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    // Check verification status when component mounts
    checkEmailVerification();
    
    // Set up periodic checking every 5 seconds
    const interval = setInterval(() => {
      checkEmailVerificationSilently();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Watch for user changes to detect verification
  useEffect(() => {
    if (user?.emailVerified) {
      setIsVerified(true);
      console.log('User email verified detected in EmailVerification component');
    }
  }, [user?.emailVerified]);

  const checkEmailVerificationSilently = async () => {
    try {
      await authService.reloadUser();
      await refreshUser();
      
      // Check if email is verified and log for debugging
      const isVerified = authService.isEmailVerified();
      if (isVerified) {
        console.log('Email verified detected silently - should redirect to main app');
        setIsVerified(true);
        // The AuthContext will automatically redirect when it detects the verified status
      }
    } catch (error) {
      console.error('Silent verification check error:', error);
    }
  };

  const checkEmailVerification = async () => {
    setCheckingVerification(true);
    try {
      await authService.reloadUser();
      await refreshUser();
      
      // Add some debugging
      const isVerified = authService.isEmailVerified();
      console.log('Email verification status:', isVerified);
      
      if (isVerified) {
        setIsVerified(true);
        Alert.alert(
          'Email Verified!', 
          'Your email has been verified successfully! You will now be logged into the app.',
          [
            {
              text: 'Continue',
              onPress: () => {
                // Force another refresh to ensure the UI updates
                refreshUser();
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Email Not Verified Yet', 
          'Please check your email and click the verification link first. If you already clicked it, please wait a moment and try again.',
          [
            {
              text: 'Resend Email',
              onPress: handleResendEmail
            },
            {
              text: 'Try Again',
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error checking verification:', error);
      Alert.alert('Error', 'Failed to check verification status. Please try again.');
    } finally {
      setCheckingVerification(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      const result = await authService.sendEmailVerification();
      if (result.success) {
        Alert.alert('Email Sent', 'Verification email sent! Please check your inbox and spam folder.');
      } else {
        Alert.alert('Error', result.error || 'Failed to send verification email');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification email to:
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
        
        <Text style={styles.instructions}>
          Please check your inbox and click the verification link to complete your registration. 
          After clicking the link, return here and click the button below.
        </Text>

        <Text style={styles.autoCheckNote}>
          ✨ We're automatically checking for verification every few seconds
          {isVerified && ' - ✅ Verification detected! Redirecting...'}
        </Text>

        {/* Check Verification Button */}
        <Pressable 
          style={[styles.button, checkingVerification && styles.buttonDisabled]} 
          onPress={checkEmailVerification}
          disabled={checkingVerification}
        >
          {checkingVerification ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>I've Verified My Email - Log Me In!</Text>
          )}
        </Pressable>

        {/* Resend Email Button */}
        <Pressable 
          style={[styles.secondaryButton, loading && styles.buttonDisabled]} 
          onPress={handleResendEmail}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FF7A00" />
          ) : (
            <Text style={styles.secondaryButtonText}>Resend Verification Email</Text>
          )}
        </Pressable>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Use Different Account</Text>
        </Pressable>

        <Text style={styles.note}>
          Note: Check your spam folder if you don't see the email in your inbox.
        </Text>
      </View>
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
    marginBottom: 5,
  },
  email: {
    textAlign: 'center',
    color: '#FF7A00',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  autoCheckNote: {
    textAlign: 'center',
    color: '#FF7A00',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF7A00',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: '#FF7A00',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  logoutButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: '#999',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  note: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
  },
});