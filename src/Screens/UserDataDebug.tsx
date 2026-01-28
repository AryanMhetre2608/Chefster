import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store';
import { loginUser, updateUserProfile, addRecipeToFavorites } from '../redux/slice/userSlice';
import { userDataService } from '../services/userDataService';
import Toast from '../components/Toast';

const UserDataDebug = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, users, isLoading, error } = useSelector((state: RootState) => state.User);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const testCreateUser = async () => {
    try {
      console.log('=== TESTING REDUX USER CREATION ===');
      const testUser = {
        email: 'test@gmail.com',
        displayName: 'Test User',
        phoneNumber: '1234567890',
      };

      console.log('Dispatching loginUser with:', testUser);
      const userData = await dispatch(loginUser(testUser)).unwrap();
      console.log('Redux loginUser completed with:', userData);
      
      Toast.success(`User created: ${userData.name} (ID: ${userData.id})`);
      
      // Refresh debug info
      const dataset = await userDataService.readDataset();
      setDebugInfo(JSON.stringify(dataset, null, 2));
    } catch (error) {
      Toast.error('Failed to create user');
      console.error('Test user creation error:', error);
    }
  };

  const testCreateSecondUser = async () => {
    try {
      const testUser2 = {
        email: 'test2@gmail.com',
        displayName: 'Test User Two',
        phoneNumber: '9876543210',
      };

      const userData = await dispatch(loginUser(testUser2)).unwrap();
      Toast.success(`User created: ${userData.name} (ID: ${userData.id})`);
    } catch (error) {
      Toast.error('Failed to create second user');
      console.error('Test user 2 creation error:', error);
    }
  };

  const testUpdateProfile = async () => {
    if (!currentUser) {
      Toast.error('No current user to update');
      return;
    }

    try {
      await dispatch(updateUserProfile({
        profileData: {
          name: 'Updated Name',
          bio: 'Updated bio text',
          phoneNumber: '5555555555',
        }
      })).unwrap();
      Toast.success('Profile updated successfully');
    } catch (error) {
      Toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    }
  };

  const testAddFavorite = async () => {
    if (!currentUser) {
      Toast.error('No current user to add favorite');
      return;
    }

    try {
      const testRecipe = {
        id: 'AFR-1',
        name: 'Akara',
        image: 'test-image-url',
        cuisine: 'African',
      };

      await dispatch(addRecipeToFavorites(testRecipe)).unwrap();
      Toast.success('Recipe added to favorites');
    } catch (error) {
      Toast.error('Failed to add favorite');
      console.error('Add favorite error:', error);
    }
  };

  const debugDataset = async () => {
    try {
      await userDataService.debugDataset();
      const dataset = await userDataService.readDataset();
      setDebugInfo(JSON.stringify(dataset, null, 2));
      Toast.success('Debug info updated - check console logs and UserData.json');
    } catch (error) {
      Toast.error('Debug failed');
      console.error('Debug error:', error);
    }
  };

  const testDirectUserCreation = async () => {
    try {
      const testUser = await userDataService.testCreateUser('direct@test.com', 'Direct Test User');
      Toast.success(`Direct user created: ${testUser.name} (ID: ${testUser.id})`);
      
      // Refresh debug info
      const dataset = await userDataService.readDataset();
      setDebugInfo(JSON.stringify(dataset, null, 2));
    } catch (error) {
      Toast.error('Direct user creation failed');
      console.error('Direct user creation error:', error);
    }
  };

  const showFilePath = async () => {
    try {
      const path = userDataService.getDatasetPath();
      const copyPath = await userDataService.copyToReadableLocation();
      
      Alert.alert(
        'UserData.json Location',
        `File Path: ${path}\n\nCopied to: ${copyPath || 'Failed to copy'}`,
        [{ text: 'OK' }]
      );
      
      Toast.success('File path shown - check alert');
    } catch (error) {
      Toast.error('Failed to get file path');
      console.error('File path error:', error);
    }
  };

  const copyToSourceFile = async () => {
    try {
      const jsonString = await userDataService.copyToSourceFile();
      
      if (jsonString) {
        Alert.alert(
          'Copy to src/data/UserData.json',
          'The UserData.json content has been logged to console. Copy it from the console logs and paste it into your src/data/UserData.json file.',
          [
            { text: 'OK' }
          ]
        );
        Toast.success('UserData.json content logged to console');
      } else {
        Toast.error('Failed to get UserData.json content');
      }
    } catch (error) {
      Toast.error('Failed to copy to source file');
      console.error('Copy to source file error:', error);
    }
  };

  const testAutoSync = async () => {
    try {
      const success = await userDataService.testAutoSync();
      if (success) {
        Toast.success('Auto-sync test successful!');
      } else {
        Toast.warning('Auto-sync test failed - check console for details');
      }
    } catch (error) {
      Toast.error('Auto-sync test error');
      console.error('Auto-sync test error:', error);
    }
  };

  const forceSyncToSource = async () => {
    try {
      const success = await userDataService.forceSyncToSource();
      if (success) {
        Toast.success('Force sync completed successfully!');
      } else {
        Toast.warning('Force sync completed with fallback method');
      }
    } catch (error) {
      Toast.error('Force sync failed');
      console.error('Force sync error:', error);
    }
  };
  const clearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all user data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await userDataService.clearAllData();
              Toast.success('All data cleared');
              setDebugInfo('');
            } catch (error) {
              Toast.error('Failed to clear data');
              console.error('Clear data error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>UserData.json System Debug</Text>

      {/* Current User Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current User</Text>
        {currentUser ? (
          <View style={styles.userInfo}>
            <Text>ID: {currentUser.id}</Text>
            <Text>Email: {currentUser.email}</Text>
            <Text>Name: {currentUser.name}</Text>
            <Text>Phone: {currentUser.phoneNumber}</Text>
            <Text>Bio: {currentUser.bio}</Text>
            <Text>Favorites: {currentUser.favoriteRecipes.length}</Text>
            <Text>Created: {new Date(currentUser.createdAt).toLocaleString()}</Text>
            <Text>Updated: {new Date(currentUser.updatedAt).toLocaleString()}</Text>
          </View>
        ) : (
          <Text>No current user</Text>
        )}
      </View>

      {/* All Users */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Users ({users.length})</Text>
        {users.map((user, index) => (
          <View key={user.id} style={styles.userItem}>
            <Text>User {index + 1}: {user.name} (ID: {user.id})</Text>
            <Text>Email: {user.email}</Text>
            <Text>Favorites: {user.favoriteRecipes.length}</Text>
          </View>
        ))}
      </View>

      {/* Test Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Actions</Text>
        
        <Pressable style={styles.button} onPress={testCreateUser}>
          <Text style={styles.buttonText}>Create Test User 1</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={testCreateSecondUser}>
          <Text style={styles.buttonText}>Create Test User 2</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={testUpdateProfile}>
          <Text style={styles.buttonText}>Update Current User Profile</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={testAddFavorite}>
          <Text style={styles.buttonText}>Add Favorite Recipe</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: '#FF9500' }]} onPress={testDirectUserCreation}>
          <Text style={styles.buttonText}>Direct User Creation Test</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: '#34C759' }]} onPress={showFilePath}>
          <Text style={styles.buttonText}>Show File Path & Copy</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: '#007AFF' }]} onPress={copyToSourceFile}>
          <Text style={styles.buttonText}>Copy to src/data/UserData.json</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: '#FF9500' }]} onPress={testAutoSync}>
          <Text style={styles.buttonText}>Test Auto-Sync</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: '#34C759' }]} onPress={forceSyncToSource}>
          <Text style={styles.buttonText}>Force Sync to Source</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={debugDataset}>
          <Text style={styles.buttonText}>Debug UserData.json</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.dangerButton]} onPress={clearAllData}>
          <Text style={styles.buttonText}>Clear All Data</Text>
        </Pressable>
      </View>

      {/* Debug Info */}
      {debugInfo ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UserData.json Contents</Text>
          <ScrollView style={styles.debugInfo}>
            <Text style={styles.debugText}>{debugInfo}</Text>
          </ScrollView>
        </View>
      ) : null}

      {/* Loading/Error States */}
      {isLoading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userInfo: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  userItem: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    marginBottom: 5,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  debugInfo: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    maxHeight: 200,
  },
  debugText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF3B30',
    marginTop: 20,
  },
});

export default UserDataDebug;