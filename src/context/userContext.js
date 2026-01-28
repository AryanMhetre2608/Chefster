import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userDataService from '../services/userDataService';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        // Refresh user data from dataset
        const freshUserData = await userDataService.getUserByEmail(user.email);
        if (freshUserData) {
          setCurrentUser(freshUserData);
          await AsyncStorage.setItem('currentUser', JSON.stringify(freshUserData));
        }
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (firebaseUser) => {
    try {
      // Add or get user from dataset
      const userData = await userDataService.addOrGetUser(firebaseUser);
      
      // Update last login
      await userDataService.updateLastLogin(userData.email);
      
      // Set current user
      setCurrentUser(userData);
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData, imageUri = null) => {
    try {
      if (!currentUser) return;

      let updatedData = { ...profileData };

      // Handle profile image
      if (imageUri) {
        const savedImagePath = await userDataService.saveProfileImage(currentUser.email, imageUri);
        updatedData.profileImage = savedImagePath;
      }

      // Update in dataset
      const updatedUser = await userDataService.updateUserProfile(currentUser.email, updatedData);
      
      // Update current user state
      setCurrentUser(updatedUser);
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const addToFavorites = async (recipe) => {
    try {
      if (!currentUser) return;

      const updatedFavorites = [...currentUser.favoriteRecipes, recipe];
      const updatedUser = await userDataService.updateUserFavorites(currentUser.email, updatedFavorites);
      
      setCurrentUser(updatedUser);
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (recipeId) => {
    try {
      if (!currentUser) return;

      const updatedFavorites = currentUser.favoriteRecipes.filter(recipe => recipe.id !== recipeId);
      const updatedUser = await userDataService.updateUserFavorites(currentUser.email, updatedFavorites);
      
      setCurrentUser(updatedUser);
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const logoutUser = async () => {
    try {
      setCurrentUser(null);
      await AsyncStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loading,
        loginUser,
        updateProfile,
        addToFavorites,
        removeFromFavorites,
        logoutUser,
        refreshUser: loadCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
