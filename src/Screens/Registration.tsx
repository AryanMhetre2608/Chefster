


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

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
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
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const result = await authService.registerWithEmail(email.trim(), password);
      
      if (result.success) {
        Alert.alert(
          'Registration Successful!', 
          'Welcome to Chefster! A verification email has been sent to your email address. Please check your inbox and verify your email to complete the registration.'
        );
      } else {
        Alert.alert('Registration Failed', result.error || 'An error occurred during registration');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Registration Page</Text>
        <Text style={styles.subtitle}>
          Register to start cooking amazing dishes
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
            placeholder="Password (min 6 characters)"
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

        {/* Confirm Password */}
        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            style={styles.passwordInput}
            secureTextEntry={secureConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setSecureConfirm(!secureConfirm)}>
            <Text style={styles.showText}>
              {secureConfirm ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        </View>

        {/* Register Button */}
        <Pressable 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </Pressable>

        {/* Login link */}
        <View style={styles.signupBox}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupLink}> Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Registration;


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
    marginBottom: 16,
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

