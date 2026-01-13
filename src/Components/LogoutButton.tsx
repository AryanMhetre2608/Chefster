import React from 'react';
import { Pressable, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

interface LogoutButtonProps {
  style?: any;
  textStyle?: any;
  showIcon?: boolean;
  iconSize?: number;
  onLogoutSuccess?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  style,
  textStyle,
  showIcon = true,
  iconSize = 20,
  onLogoutSuccess
}) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              onLogoutSuccess?.();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  return (
    <Pressable style={[styles.logoutButton, style]} onPress={handleLogout}>
      {showIcon && <Icon type='MaterialIcons' name='logout' size={iconSize} />}
      <Text style={[styles.logoutText, textStyle]}>Logout</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4444',
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default LogoutButton;