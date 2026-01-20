import {
  Alert,
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

const ChangePassword = () => {
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
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (newPassWord !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassWord.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return;
    }

    if (currentPassword === newPassWord) {
      Alert.alert(
        'Error',
        'New password must be different from current password',
      );
      return;
    }

    setLoading(true);

    try {
      const user = auth().currentUser;

      if (!user || !user.email) {
        Alert.alert('Error', 'No user logged in');
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

      Alert.alert('Success', 'Password changed successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      let errorMessage = 'Failed to change password';

      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'New password is too weak';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage =
          'Please log out and log in again before changing password';
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title="Change Password"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
      />
      <View style={styles.overlappingContainer}>
        <View
          style={{
            marginTop: 50,
            width: '90%',
            height: 20,
            marginVertical: 20,
            gap: 15,
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 65,
              borderRadius: 20,
              elevation: 10,
              flexDirection: 'row',
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
                color="grey"
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
                placeholderTextColor={'grey'}
                secureTextEntry={!showCurrentPassword}
                style={{
                  fontSize: 18,
                  fontWeight: 'bold', // 👈 affects placeholder on Android
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
                  color="grey" 
                  size={24} 
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 65,
              borderRadius: 20,
              elevation: 10,
              flexDirection: 'row',
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
                color="grey"
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
                placeholderTextColor={'grey'}
                secureTextEntry={!showNewPassword}
                style={{
                  fontSize: 18,
                  fontWeight: 'bold', // 👈 affects placeholder on Android
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
                  color="grey" 
                  size={24} 
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 65,
              borderRadius: 20,
              elevation: 10,
              flexDirection: 'row',
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
                color="grey"
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
                placeholderTextColor={'grey'}
                secureTextEntry={!showConfirmPassword}
                style={{
                  fontSize: 18,
                  fontWeight: 'bold', // 👈 affects placeholder on Android
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
                  color="grey" 
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
              colors={['#FF8A00', '#FF6A00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 65,
                width: '100%',
                borderRadius: 32.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
              >
                {loading ? 'Changing...' : 'Change Password'}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlappingContainer: {
    alignItems: 'center',

    flex: 1,
    marginTop: -85,
    backgroundColor: 'white',

    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,

    // 🔥 ADD THESE
    zIndex: 10,
    elevation: 7,
  },
});
