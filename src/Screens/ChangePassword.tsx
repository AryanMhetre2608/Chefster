import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import { useTheme } from '../context/ThemeContext';
import Toast from '../components/Toast';
  


const ChangePassword = () => {
  const { colors } = useTheme()
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassWord, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassWord || !confirmNewPassword) {
      Toast.error('Please fill all fields');
      return;
    }

    if (newPassWord !== confirmNewPassword) {
      Toast.error('New passwords do not match');
      return;
    }

    if (newPassWord.length < 6) {
      Toast.warning('New password must be at least 6 characters');
      return;
    }

    if (currentPassword === newPassWord) {
      Toast.warning('New password must be different from current password');
      return;
    }

    setLoading(true);

    try {
      const user = auth().currentUser;

      if (!user || !user.email) {
        Toast.error('No user logged in');
        setLoading(false);
        return;
      }

      // Re-authenticate user with current password
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await user.reauthenticateWithCredential(credential);

      // Update password
      await user.updatePassword(newPassWord);

      Toast.success('Password changed successfully');

      // Clear form and navigate back after success message
      setTimeout(() => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        navigation.goBack();
      }, 2000);

    } catch (error: any) {
      let errorMessage = 'Failed to change password';

      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'New password is too weak';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please log out and log in again before changing password';
      }

      Toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={[styles.container , {backgroundColor:colors.background}]}>
      <Header
        title="Change Password"
        titleStyle={{fontWeight: 'bold', fontSize: 24 }}
      />
      <View style={[styles.overlappingContainer  , {backgroundColor:colors.changePasswordOverlayBackground}]}>
        <View
          style={{
            width: '90%',
            height: 20,
            marginVertical: 20,
            gap: 15,
          }}
        >
          <View
            style={{
              backgroundColor: colors.changePasswordInputContainer,
              width: '100%',
              height: 65,
              borderRadius: 20,
              elevation: 10,
              flexDirection: 'row',
              borderWidth:1,
              borderColor:colors.changePasswordInputBorder
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '15%',
                height: '100%',
              }}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="lock-outline"
                color={colors.changePasswordLockIcon}
                size={31}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '70%',
                height: '100%',
              }}
            >
              <TextInput
                placeholder="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholderTextColor={colors.changePasswordInputPlaceholder}
                secureTextEntry={!showCurrentPassword}
                style={{
                  fontSize: 18,
                  fontWeight: 'bold', // 👈 affects placeholder on Android
                  color:colors.changePasswordInputText,
                  shadowColor:colors.changePasswordInputShadow
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '15%',
                height: '100%',
              }}
            >
              <Pressable onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Icon 
                  type="MaterialCommunityIcons" 
                  name={showCurrentPassword ? "eye-off" : "eye"} 
                  color={colors.changePasswordEyeIcon} 
                  size={24} 
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.changePasswordInputContainer,
              width: '100%',
              height: 65,
              borderRadius: 20,
              elevation: 10,
              flexDirection: 'row',
              borderWidth:1,
              borderColor:colors.changePasswordInputBorder

            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '15%',
                height: '100%',
              }}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="key-plus"
                color={colors.changePasswordKeyIcon}
                size={31}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '70%',
                height: '100%',
              }}
            >
              <TextInput
                placeholder="New Password"
                value={newPassWord}
                onChangeText={setNewPassword}
                placeholderTextColor={colors.changePasswordInputPlaceholder}
                secureTextEntry={!showNewPassword}
                
                style={{
                  fontSize: 18,
                  fontWeight: 'bold', // 👈 affects placeholder on Android]
                  color:colors.changePasswordInputText,
                  shadowColor:colors.changePasswordInputShadow
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '15%',
                height: '100%',
              }}
            >
              <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
                <Icon 
                  type="MaterialCommunityIcons" 
                  name={showNewPassword ? "eye-off" : "eye"} 
                  color={colors.changePasswordEyeIcon} 
                  size={24} 
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.changePasswordInputContainer,
              width: '100%',
              height: 65,
              borderRadius: 20,
              elevation: 10,
              flexDirection: 'row',
              borderWidth:1,
              borderColor:colors.changePasswordInputBorder
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '15%',
                height: '100%',
              }}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="lock-check"
                color={colors.changePasswordCheckIcon}
                size={31}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '70%',
                height: '100%',
              }}
            >
              <TextInput
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                placeholderTextColor={colors.changePasswordInputPlaceholder}
                secureTextEntry={!showConfirmPassword}
                style={{
                  fontSize: 18,
                  fontWeight: 'bold', // 👈 affects placeholder on Android
                  color:colors.changePasswordInputText,
                  shadowColor:colors.changePasswordInputShadow
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '15%',
                height: '100%',
              }}
            >
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon 
                  type="MaterialCommunityIcons" 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  color={colors.changePasswordEyeIcon} 
                  size={24} 
                />
              </Pressable>
            </View>
          </View>
          <Pressable
            style={{
              width: '100%',
              height: 65,
              borderRadius: 32.5,
              elevation: 10,
              flexDirection: 'row',
              marginTop: 25,
            }}
            onPress={handleChangePassword}
            disabled={loading}
          >
            <LinearGradient
              colors={[colors.changePasswordButtonGradient1, colors.changePasswordButtonGradient2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 65,
                width: '100%',
                borderRadius: 32.5,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor:colors.changePasswordButtonShadow
              }}
            >
              <Text
                style={{ color:colors.changePasswordButtonText, fontWeight: 'bold', fontSize: 20 }}
              >
                {loading ? 'Changing...' : 'Change Password'}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Loading Overlay */}
        {loading && (
          <View style={[styles.loadingOverlay, { backgroundColor: colors.changePasswordLoadingBackground }]}>
            <View style={styles.loadingContent}>
              <Text style={[styles.loadingText, { color: colors.changePasswordLoadingText }]}>
                Changing Password...
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor will be set inline with theme colors
  },
  overlappingContainer: {
    alignItems: 'center',
    flex: 1,
    // backgroundColor will be set inline with theme colors
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    zIndex: 10,
    elevation: 7,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
});
