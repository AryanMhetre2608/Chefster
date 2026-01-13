import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import authService from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const result = await authService.loginWithEmail(email.trim(), password);
      
      if (result.success) {
        // Check if email is verified
        await authService.reloadUser(); // Reload to get latest verification status
        
        if (authService.isEmailVerified()) {
          Alert.alert('Success', 'Login successful!');
          // AuthContext will automatically redirect to main app
        } else {
          Alert.alert(
            'Email Not Verified', 
            'Please verify your email address before logging in. You will be redirected to the verification screen.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Don't logout - let AuthContext redirect to EmailVerification screen
                  // The user is authenticated but needs to verify email
                }
              }
            ]
          );
        }
      } else {
        Alert.alert('Login Failed', result.error || 'An error occurred during login');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email first');
      return;
    }

    try {
      const result = await authService.resetPassword(email.trim());
      if (result.success) {
        Alert.alert('Success', 'Password reset email sent! Check your inbox.');
      } else {
        Alert.alert('Error', result.error || 'Failed to send reset email');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login Page</Text>
        <Text style={styles.subtitle}>
          Login to continue cooking amazing dishes
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Password */}
        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            style={styles.passwordInput}
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setSecure(!secure)}>
            <Text style={styles.showText}>
              {secure ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        </View>

        {/* Forgot Password */}
        <Pressable style={styles.forgot} onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>
        

        {/* Login Button */}
        <Pressable 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>

        {/* Signup */}
        <View style={styles.signupBox}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.signupLink}> Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;


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
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 8,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: '#000',
  },
  showText: {
    color: '#FF7A00',
    fontWeight: '600',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
  },
  optionText: {
    color: '#FF7A00',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
  forgotText: {
    color: '#FF7A00',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  signupBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#FF7A00',
    fontWeight: '700',
  },
});

