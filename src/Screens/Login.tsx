import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import authService from '../services/authService';
import Toast from '../components/Toast';
import { useTheme } from '../context/ThemeContext';
import { loginUser } from '../redux/slice/userSlice';
import { AppDispatch } from '../redux/Store';
import Icon from '../components/Icon';
import { googleLogin } from '../functions/GoogleLogin';

const Login = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const onGooglePress = async () => {
    try {
      const user = await googleLogin();
      console.log('Logged in:', user?.email);
    } catch {
      console.log('Login cancelled or failed');
    }
  };

  const validateInputs = () => {
    if (!email.trim()) {
      Toast.error('Please enter your email');
      return false;
    }
    if (!password.trim()) {
      Toast.error('Please enter your password');
      return false;
    }
    if (password.length < 6) {
      Toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  // MODIFIED HANDLE LOGIN
  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      // 1. Authenticate with Firebase
      const result = await authService.loginWithEmail(email.trim(), password);

      if (result.success) {
        // Check if email is verified
        await authService.reloadUser();

        if (authService.isEmailVerified()) {
          // 2. Add/Get user from local dataset using Redux
          const userData = await dispatch(loginUser(result.user)).unwrap();

          Toast.success(`Welcome back, ${userData.name}!`);
          // Navigation handled by AuthContext
        } else {
          Toast.warning('Please verify your email address before logging in.');
        }
      } else {
        Toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      Toast.error('An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Toast.error('Please enter your email first');
      return;
    }

    try {
      const result = await authService.resetPassword(email.trim());
      if (result.success) {
        Toast.success('Password reset email sent! Check your inbox.');
      } else {
        Toast.error(result.error || 'Failed to send reset email');
      }
    } catch (error) {
      Toast.error('An unexpected error occurred');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.loginMainBackground },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.loginCardBackground,
            shadowColor: colors.loginCardShadow,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.loginTitle }]}>
          Login Page
        </Text>
        <Text style={[styles.subtitle, { color: colors.loginSubtitle }]}>
          Login to continue cooking amazing dishes
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.loginInputPlaceholder}
          style={[
            styles.input,
            {
              backgroundColor: colors.loginInputBackground,
              paddingHorizontal: 15,
              borderColor: colors.loginInputBorder,
              color: colors.loginInputText,
            },
          ]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Password */}
        <View
          style={[
            styles.passwordBox,
            {
              backgroundColor: colors.loginPasswordContainer,
              borderColor: colors.loginPasswordBorder,
            },
          ]}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            style={[styles.passwordInput, { color: colors.loginPasswordText }]}
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setSecure(!secure)}>
            <Text
              style={[styles.showText, { color: colors.loginShowHideText }]}
            >
              {secure ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        </View>

        {/* Forgot Password */}
        <Pressable style={styles.forgot} onPress={handleForgotPassword}>
          <Text
            style={[
              styles.forgotText,
              { color: colors.loginForgotPasswordText },
            ]}
          >
            Forgot Password?
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.loginWGoogle,
            {
              backgroundColor: colors.loginPasswordContainer,
              borderColor: colors.loginPasswordBorder,
            },
          ]}
          onPress={()=>onGooglePress()}
        >
          <Icon
            type="AntDesign"
            name="google"
            color={colors.loginPasswordText}
          />
          <Text style={{ color: colors.loginPasswordText, fontSize: 15 }}>
            Continue with Google
          </Text>
        </Pressable>

        {/* Login Button */}
        <Pressable
          style={[
            [styles.button, { backgroundColor: colors.loginButtonBackground }],
            loading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.loginLoadingIndicator} />
          ) : (
            <Text
              style={[styles.buttonText, { color: colors.loginButtonText }]}
            >
              Login
            </Text>
          )}
        </Pressable>

        {/* Signup */}
        <View style={styles.signupBox}>
          <Text style={[styles.signupText, { color: colors.loginSignupText }]}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('Registration')}>
            <Text
              style={[styles.signupLink, { color: colors.loginSignupLink }]}
            >
              {' '}
              Register
            </Text>
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
  loginWGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 25,
    paddingHorizontal: 14,
    height: 50,
    gap: 15,
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
