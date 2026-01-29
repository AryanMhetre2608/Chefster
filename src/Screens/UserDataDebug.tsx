import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store';
import { loginUser, logoutUser } from '../redux/slice/userSlice';
import { useFavorites } from '../hooks/useFavorites';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const UserDataDebug = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, users } = useSelector((state: RootState) => state.User);
  const { favorites, addToFavoritesList, removeFromFavoritesList } = useFavorites();

  const testUsers = [
    { email: '1@gmail.com', displayName: 'User One' },
    { email: '2@gmail.com', displayName: 'User Two' },
    { email: '3@gmail.com', displayName: 'User Three' },
  ];

  const sampleRecipes = [
    { id: '1', name: 'Jollof Rice', image: 'https://example.com/jollof.jpg', cuisine: 'African' },
    { id: '2', name: 'Burger', image: 'https://example.com/burger.jpg', cuisine: 'American' },
    { id: '3', name: 'Sushi', image: 'https://example.com/sushi.jpg', cuisine: 'Asian' },
    { id: '4', name: 'Pizza', image: 'https://example.com/pizza.jpg', cuisine: 'European' },
  ];

  const handleLoginUser = async (email: string, displayName: string) => {
    try {
      console.log(`\n🔐 LOGGING IN USER: ${email}`);
      const mockFirebaseUser = {
        email,
        displayName,
        phoneNumber: '',
      };
      await dispatch(loginUser(mockFirebaseUser)).unwrap();
      console.log(`✅ LOGIN SUCCESS: ${email} is now logged in`);
    } catch (error) {
      console.error('❌ LOGIN ERROR:', error);
      Alert.alert('Login Error', `Failed to login ${email}`);
    }
  };

  const handleLogout = () => {
    console.log(`\n🚪 LOGGING OUT: ${currentUser?.email}`);
    dispatch(logoutUser());
    console.log('✅ LOGOUT SUCCESS: User logged out');
  };

  const handleAddFavorite = async (recipe: any) => {
    try {
      await addToFavoritesList(recipe);
    } catch (error) {
      Alert.alert('Error', `Failed to add ${recipe.name} to favorites`);
    }
  };

  const handleRemoveFavorite = async (recipeId: string) => {
    try {
      await removeFromFavoritesList(recipeId);
    } catch (error) {
      Alert.alert('Error', `Failed to remove recipe from favorites`);
    }
  };

  useEffect(() => {
    console.log('\n📱 USER DATA DEBUG SCREEN LOADED');
    console.log(`👤 Current User: ${currentUser ? `${currentUser.name} (${currentUser.email})` : 'None'}`);
    console.log(`📊 Total Users in System: ${users.length}`);
    console.log(`🍽️ Current User Favorites: ${favorites.length}`);
  }, [currentUser, users, favorites]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="User Data Debug"
        titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current User Section */}
        <View style={[styles.section, { backgroundColor: colors.favouritesCardContainer }]}>
          <Text style={[styles.sectionTitle, { color: colors.favouritesRecipeTitle }]}>
            Current User
          </Text>
          {currentUser ? (
            <View>
              <Text style={[styles.userInfo, { color: colors.favouritesRecipeSubtitle }]}>
                Name: {currentUser.name}
              </Text>
              <Text style={[styles.userInfo, { color: colors.favouritesRecipeSubtitle }]}>
                Email: {currentUser.email}
              </Text>
              <Text style={[styles.userInfo, { color: colors.favouritesRecipeSubtitle }]}>
                Favorites: {favorites.length}
              </Text>
              <Pressable
                style={[styles.button, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={[styles.noUser, { color: colors.favouritesRecipeSubtitle }]}>
              No user logged in
            </Text>
          )}
        </View>

        {/* Test Users Section */}
        <View style={[styles.section, { backgroundColor: colors.favouritesCardContainer }]}>
          <Text style={[styles.sectionTitle, { color: colors.favouritesRecipeTitle }]}>
            Test Users (Click to Login)
          </Text>
          {testUsers.map((user) => (
            <Pressable
              key={user.email}
              style={[
                styles.button,
                styles.loginButton,
                currentUser?.email === user.email && styles.activeUser
              ]}
              onPress={() => handleLoginUser(user.email, user.displayName)}
            >
              <Text style={styles.buttonText}>
                {user.displayName} ({user.email})
                {currentUser?.email === user.email && ' ✓'}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Current User Favorites */}
        <View style={[styles.section, { backgroundColor: colors.favouritesCardContainer }]}>
          <Text style={[styles.sectionTitle, { color: colors.favouritesRecipeTitle }]}>
            Current User's Favorites ({favorites.length})
          </Text>
          {favorites.length > 0 ? (
            favorites.map((recipe) => (
              <View key={recipe.id} style={styles.favoriteItem}>
                <Text style={[styles.recipeText, { color: colors.favouritesRecipeSubtitle }]}>
                  {recipe.name} ({recipe.cuisine})
                </Text>
                <Pressable
                  style={[styles.button, styles.removeButton]}
                  onPress={() => handleRemoveFavorite(recipe.id)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </Pressable>
              </View>
            ))
          ) : (
            <Text style={[styles.noFavorites, { color: colors.favouritesRecipeSubtitle }]}>
              No favorites yet
            </Text>
          )}
        </View>

        {/* Add Sample Recipes */}
        {currentUser && (
          <View style={[styles.section, { backgroundColor: colors.favouritesCardContainer }]}>
            <Text style={[styles.sectionTitle, { color: colors.favouritesRecipeTitle }]}>
              Add Sample Recipes to Favorites
            </Text>
            {sampleRecipes.map((recipe) => (
              <Pressable
                key={recipe.id}
                style={[styles.button, styles.addButton]}
                onPress={() => handleAddFavorite(recipe)}
              >
                <Text style={styles.buttonText}>
                  Add {recipe.name} ({recipe.cuisine})
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* All Users in System */}
        <View style={[styles.section, { backgroundColor: colors.favouritesCardContainer }]}>
          <Text style={[styles.sectionTitle, { color: colors.favouritesRecipeTitle }]}>
            All Users in System ({users.length})
          </Text>
          {users.map((user) => (
            <View key={user.id} style={styles.userItem}>
              <Text style={[styles.userInfo, { color: colors.favouritesRecipeSubtitle }]}>
                {user.name} ({user.email})
              </Text>
              <Text style={[styles.userInfo, { color: colors.favouritesRecipeSubtitle }]}>
                Favorites: {user.favoriteRecipes?.length || 0}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  userInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  noUser: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#2196F3',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activeUser: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  recipeText: {
    flex: 1,
    fontSize: 14,
  },
  noFavorites: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  userItem: {
    marginVertical: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default UserDataDebug;