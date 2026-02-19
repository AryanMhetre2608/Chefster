


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import authService from '../services/authService';
import Toast from '../components/Toast';
import { useTheme } from '../context/ThemeContext';
import { loginUser } from '../redux/slice/userSlice';

const Registration = () => {
  const { colors } = useTheme(); 
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!email.trim()) {
      Toast.error(`${t('Please enter your email')}`);
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Toast.error(`${t('Please enter a valid email address')}`);
      return false;
    }
    
    if (!password.trim()) {
      Toast.error(`${t('Please enter your password')}`);
      return false;
    }
    
    if (password.length < 6) {
      Toast.error(`${t('Password must be at least 6 characters')}`);
      return false;
    }
    
    if (password !== confirmPassword) {
      Toast.error(`${t('Passwords do not match')}`);
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const result = await authService.registerWithEmailAndDataset(email.trim(), password);
      
      if (result.success) {
        // Add user to local dataset using Redux
        await dispatch(loginUser(result.user));
        
        Toast.success(`${t('Registration successful! A verification email has been sent to your email address. Please check your inbox and verify your email to complete the registration.')}`);
      } else {
        Toast.error(result.error || `${t('An error occurred during registration')}`);
      }
    } catch (error) {
      Toast.error(`${t('An unexpected error occurred')}`);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor:colors.registrationMainBackground}]}>
      <View style={[styles.card , {backgroundColor:colors.registrationCardBackground , shadowColor:colors.registrationCardShadow}]}>
        <Text style={[styles.title , {color:colors.registrationTitle}]}>{t('Registration Page')}</Text>
        <Text style={[styles.subtitle , {color:colors.registrationSubtitle}]}>
          {t('Register to start cooking amazing dishes')}
        </Text>


       
          <TextInput
          placeholder={t('Email')}
          placeholderTextColor={colors.registrationInputPlaceholder}
          style={[styles.input , {backgroundColor:colors.registrationInputBackground , borderColor:colors.registrationInputBorder , color:colors.registrationInputText}]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />


        {/* Email */}
        

        {/* Password */}
        <View style={[styles.passwordBox ,{backgroundColor:colors.registrationPasswordContainer , borderColor:colors.registrationPasswordBorder}]}>
          <TextInput
            placeholder={t('Password (min 6 characters)')}
            placeholderTextColor={colors.registrationInputPlaceholder}
            style={[styles.passwordInput , {color:colors.registrationPasswordText}]}
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setSecure(!secure)}>
            <Text style={[styles.showText , {color:colors.registrationShowHideText}]}>
              {secure ? `${t('Show')}` : `${t('Hide')}`}
            </Text>
          </Pressable>
        </View>

        {/* Confirm Password */}
        <View style={[styles.passwordBox , {backgroundColor:colors.registrationPasswordContainer , borderColor:colors.registrationPasswordBorder}]}>
          <TextInput
            placeholder={t('Confirm Password')}
            placeholderTextColor={colors.registrationInputPlaceholder}
            style={[styles.passwordInput , {color:colors.registrationPasswordText}]}
            // style={styles.passwordInput}
            secureTextEntry={secureConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setSecureConfirm(!secureConfirm)}>
            <Text style={[styles.showText ,  {color:colors.registrationShowHideText}]}>
              {secureConfirm ? `${t('Show')}` : `${t('Hide')}`}
            </Text>
          </Pressable>
        </View>

        {/* Register Button */}
        <Pressable 
          style={[[styles.button , {backgroundColor:colors.registrationButtonBackground}], loading && styles.buttonDisabled ]} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.registrationLoadingIndicator} />
          ) : (
            <Text style={[styles.buttonText , {color:colors.registrationButtonText}]}>{t('Register')}</Text>
          )}
        </Pressable>

        {/* Login link */}
        <View style={styles.signupBox}>
          <Text style={[styles.signupText  , {color:colors.registrationLoginText}]}>{t('Already have an account?')}</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.signupLink , {color:colors.registrationLoginLink}]}> {t('Log In')}</Text>
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

