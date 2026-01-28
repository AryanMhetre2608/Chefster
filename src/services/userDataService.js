import RNFS from 'react-native-fs';

class UserDataService {
  constructor() {
    // Use writable directory for UserData.json
    this.datasetPath = `${RNFS.DocumentDirectoryPath}/UserData.json`;
    this.profileImagesDir = `${RNFS.DocumentDirectoryPath}/profile_images`;
    this.initializeDataset();
  }

  // Initialize dataset file and profile images directory
  async initializeDataset() {
    try {
      console.log('UserDataService: Initializing UserData.json at:', this.datasetPath);
      
      // Create profile images directory if it doesn't exist
      const profileImagesDirExists = await RNFS.exists(this.profileImagesDir);
      if (!profileImagesDirExists) {
        await RNFS.mkdir(this.profileImagesDir);
        console.log('UserDataService: Created profile images directory');
      }

      // Check if UserData.json exists in writable directory
      const datasetExists = await RNFS.exists(this.datasetPath);
      if (!datasetExists) {
        // Create initial UserData.json structure
        const initialDataset = {
          users: [],
          nextUserId: 0,
        };
        await RNFS.writeFile(this.datasetPath, JSON.stringify(initialDataset, null, 2));
        console.log('UserDataService: Created initial UserData.json file');
      } else {
        console.log('UserDataService: UserData.json file already exists');
        // Log current contents for debugging
        const currentData = await this.readDataset();
        console.log('UserDataService: Current UserData.json contents:', JSON.stringify(currentData, null, 2));
      }
    } catch (error) {
      console.error('UserDataService: Error initializing UserData.json:', error);
    }
  }

  // Read dataset from file
  async readDataset() {
    try {
      const datasetContent = await RNFS.readFile(this.datasetPath);
      const data = JSON.parse(datasetContent);
      console.log('UserDataService: Read UserData.json successfully, users count:', data.users.length);
      return data;
    } catch (error) {
      console.error('UserDataService: Error reading UserData.json:', error);
      // Return default structure if file is corrupted
      return {
        users: [],
        nextUserId: 0,
      };
    }
  }

  // Write dataset to file and automatically update source file
  async writeDataset(dataset) {
    try {
      // Write to device storage (primary location)
      await RNFS.writeFile(this.datasetPath, JSON.stringify(dataset, null, 2));
      console.log('UserDataService: UserData.json updated successfully in device storage');
      
      // Log the current dataset for reference
      console.log('UserDataService: Current dataset:', JSON.stringify(dataset, null, 2));
      
      // Automatically update your source file using fetch API
      await this.autoUpdateSourceFile(dataset);
      
    } catch (error) {
      console.error('UserDataService: Error writing UserData.json:', error);
      throw new Error('Failed to save user data to UserData.json');
    }
  }

  // Automatically update your src/data/UserData.json using development server
  async autoUpdateSourceFile(dataset) {
    try {
      if (__DEV__) {
        console.log('UserDataService: Attempting to auto-update src/data/UserData.json...');
        
        // Use our custom auto-sync server
        const response = await fetch('http://localhost:8082/update-userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: dataset,
            filePath: 'src/data/UserData.json'
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ UserDataService: Successfully auto-updated src/data/UserData.json');
          return true;
        } else {
          console.log('⚠️ UserDataService: Auto-update endpoint responded with error');
          await this.alternativeUpdateMethod(dataset);
          return false;
        }
      } else {
        console.log('UserDataService: Auto-update only works in development mode');
        return false;
      }
    } catch (error) {
      console.log('UserDataService: Auto-update failed, using alternative method:', error.message);
      await this.alternativeUpdateMethod(dataset);
      return false;
    }
  }

  // Alternative method - create a file that can be easily copied
  async alternativeUpdateMethod(dataset) {
    try {
      const jsonString = JSON.stringify(dataset, null, 2);
      
      // Create multiple accessible copies
      const paths = [
        `${RNFS.ExternalStorageDirectoryPath}/UserData_AutoSync.json`,
        `${RNFS.DocumentDirectoryPath}/UserData_Source.json`,
        `${RNFS.CachesDirectoryPath}/UserData_Latest.json`
      ];

      for (const path of paths) {
        try {
          await RNFS.writeFile(path, jsonString);
          console.log(`UserDataService: Created auto-sync file at: ${path}`);
        } catch (err) {
          console.log(`UserDataService: Failed to create file at ${path}:`, err.message);
        }
      }

      // Also log in a format that can be easily copied
      console.log('');
      console.log('🔄 === AUTO-UPDATE: COPY TO src/data/UserData.json ===');
      console.log(jsonString);
      console.log('=== END AUTO-UPDATE ===');
      console.log('');
      
    } catch (error) {
      console.log('UserDataService: Alternative update method failed:', error.message);
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const dataset = await this.readDataset();
      return dataset.users || [];
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Find user by email
  async findUserByEmail(email) {
    try {
      const dataset = await this.readDataset();
      return dataset.users.find(user => user.email === email) || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  // Get or create user
  async getOrCreateUser(email, additionalData = {}) {
    try {
      console.log('UserDataService: Getting or creating user for email:', email);
      const dataset = await this.readDataset();
      
      // Check if user already exists
      let existingUser = dataset.users.find(user => user.email === email);
      
      if (existingUser) {
        console.log('UserDataService: Found existing user with ID:', existingUser.id);
        // Return existing user
        return existingUser;
      }

      // Create new user
      const newUser = {
        id: dataset.nextUserId,
        email: email,
        name: additionalData.name || email.split('@')[0],
        phoneNumber: additionalData.phoneNumber || '',
        bio: additionalData.bio || '',
        profileImage: null,
        favoriteRecipes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('UserDataService: Creating new user with ID:', newUser.id);

      // Add user to dataset
      dataset.users.push(newUser);
      dataset.nextUserId += 1;

      // Save dataset
      await this.writeDataset(dataset);
      
      console.log('UserDataService: User created and saved successfully');
      console.log('UserDataService: Current dataset:', JSON.stringify(dataset, null, 2));

      return newUser;
    } catch (error) {
      console.error('UserDataService: Error getting or creating user:', error);
      throw new Error('Failed to get or create user');
    }
  }

  // Update user profile
  async updateUserProfile(email, profileData, profileImageUri = undefined) {
    try {
      const dataset = await this.readDataset();
      const userIndex = dataset.users.findIndex(user => user.email === email);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const user = dataset.users[userIndex];
      
      // Handle profile image
      let profileImagePath = user.profileImage;
      
      if (profileImageUri === null) {
        // User wants to delete the image
        if (user.profileImage) {
          await this.deleteProfileImage(user.id);
        }
        profileImagePath = null;
      } else if (profileImageUri) {
        // User wants to update the image
        profileImagePath = await this.saveProfileImage(user.id, profileImageUri);
      }
      // If profileImageUri is undefined, keep existing image

      // Update user data
      const updatedUser = {
        ...user,
        ...profileData,
        profileImage: profileImagePath,
        updatedAt: new Date().toISOString(),
      };

      dataset.users[userIndex] = updatedUser;
      await this.writeDataset(dataset);

      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }

  // Save profile image
  async saveProfileImage(userId, imageUri) {
    try {
      const imageExtension = imageUri.split('.').pop() || 'jpg';
      const imageName = `profile_${userId}.${imageExtension}`;
      const imagePath = `${this.profileImagesDir}/${imageName}`;

      // Copy image to app directory
      await RNFS.copyFile(imageUri, imagePath);
      
      return imagePath;
    } catch (error) {
      console.error('Error saving profile image:', error);
      throw new Error('Failed to save profile image');
    }
  }

  // Add recipe to user favorites
  async addToFavorites(email, recipe) {
    try {
      const dataset = await this.readDataset();
      const userIndex = dataset.users.findIndex(user => user.email === email);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const user = dataset.users[userIndex];
      
      // Check if recipe already exists in favorites
      const existingRecipe = user.favoriteRecipes.find(fav => fav.id === recipe.id);
      if (!existingRecipe) {
        user.favoriteRecipes.push(recipe);
        user.updatedAt = new Date().toISOString();
        
        dataset.users[userIndex] = user;
        await this.writeDataset(dataset);
      }

      return user;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw new Error('Failed to add to favorites');
    }
  }

  // Remove recipe from user favorites
  async removeFromFavorites(email, recipeId) {
    try {
      const dataset = await this.readDataset();
      const userIndex = dataset.users.findIndex(user => user.email === email);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const user = dataset.users[userIndex];
      user.favoriteRecipes = user.favoriteRecipes.filter(recipe => recipe.id !== recipeId);
      user.updatedAt = new Date().toISOString();
      
      dataset.users[userIndex] = user;
      await this.writeDataset(dataset);

      return user;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw new Error('Failed to remove from favorites');
    }
  }

  // Delete user profile image
  async deleteProfileImage(userId) {
    try {
      // Try different extensions since we don't know which one was used
      const extensions = ['jpg', 'jpeg', 'png', 'webp'];
      
      for (const ext of extensions) {
        const imagePath = `${this.profileImagesDir}/profile_${userId}.${ext}`;
        const imageExists = await RNFS.exists(imagePath);
        
        if (imageExists) {
          await RNFS.unlink(imagePath);
          console.log(`UserDataService: Deleted profile image: ${imagePath}`);
          break;
        }
      }
    } catch (error) {
      console.error('Error deleting profile image:', error);
    }
  }

  // Clear all user data (for testing purposes)
  async clearAllData() {
    try {
      const initialDataset = {
        users: [],
        nextUserId: 0,
      };
      await this.writeDataset(initialDataset);
      
      // Clear profile images directory
      const profileImagesDirExists = await RNFS.exists(this.profileImagesDir);
      if (profileImagesDirExists) {
        const files = await RNFS.readDir(this.profileImagesDir);
        for (const file of files) {
          await RNFS.unlink(file.path);
        }
      }
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw new Error('Failed to clear all data');
    }
  }

  // Debug method to check dataset contents
  async debugDataset() {
    try {
      console.log('=== USERDATA.JSON DEBUG ===');
      console.log('UserData.json path:', this.datasetPath);
      
      const exists = await RNFS.exists(this.datasetPath);
      console.log('UserData.json file exists:', exists);
      
      if (exists) {
        const dataset = await this.readDataset();
        console.log('UserData.json contents:', JSON.stringify(dataset, null, 2));
        console.log('Number of users:', dataset.users.length);
        console.log('Next user ID:', dataset.nextUserId);
      }
      
      console.log('Profile images directory:', this.profileImagesDir);
      const profileDirExists = await RNFS.exists(this.profileImagesDir);
      console.log('Profile images directory exists:', profileDirExists);
      
      if (profileDirExists) {
        const files = await RNFS.readDir(this.profileImagesDir);
        console.log('Profile images:', files.map(f => f.name));
      }
      
      console.log('=== END DEBUG ===');
    } catch (error) {
      console.error('Debug error:', error);
    }
  }

  // Test method to manually create a user (for debugging)
  async testCreateUser(email, name) {
    try {
      console.log('=== TESTING USER CREATION ===');
      console.log('Creating user with email:', email);
      
      const userData = await this.getOrCreateUser(email, { name });
      console.log('User created successfully:', userData);
      
      // Verify it was saved
      const dataset = await this.readDataset();
      console.log('Updated dataset:', JSON.stringify(dataset, null, 2));
      
      return userData;
    } catch (error) {
      console.error('Test user creation failed:', error);
      throw error;
    }
  }

  // Method to manually force sync to source file
  async forceSyncToSource() {
    try {
      const dataset = await this.readDataset();
      const success = await this.autoUpdateSourceFile(dataset);
      return success;
    } catch (error) {
      console.error('Force sync failed:', error);
      return false;
    }
  }

  // Method to check if auto-sync is working
  async testAutoSync() {
    try {
      console.log('=== TESTING AUTO-SYNC ===');
      const dataset = await this.readDataset();
      console.log('Current dataset users count:', dataset.users.length);
      
      const success = await this.autoUpdateSourceFile(dataset);
      console.log('Auto-sync test result:', success ? 'SUCCESS' : 'FAILED');
      
      if (!success) {
        console.log('Trying fallback method...');
        await this.alternativeUpdateMethod(dataset);
      }
      
      console.log('=== END AUTO-SYNC TEST ===');
      return success;
    } catch (error) {
      console.error('Auto-sync test failed:', error);
      return false;
    }
  }

  // Method to get the current file path for debugging
  getDatasetPath() {
    return this.datasetPath;
  }
  async copyToReadableLocation() {
    try {
      const readablePath = `${RNFS.ExternalStorageDirectoryPath}/UserData_copy.json`;
      const exists = await RNFS.exists(this.datasetPath);
      
      if (exists) {
        await RNFS.copyFile(this.datasetPath, readablePath);
        console.log('UserData.json copied to:', readablePath);
        return readablePath;
      } else {
        console.log('UserData.json does not exist at:', this.datasetPath);
        return null;
      }
    } catch (error) {
      console.error('Failed to copy UserData.json:', error);
      return null;
    }
  }

  // Method to get the current UserData.json content as string (for manual copying)
  async getUserDataAsString() {
    try {
      const dataset = await this.readDataset();
      return JSON.stringify(dataset, null, 2);
    } catch (error) {
      console.error('Failed to get UserData as string:', error);
      return null;
    }
  }

  // Method to manually update your src/data/UserData.json (for development)
  async copyToSourceFile() {
    try {
      const dataset = await this.readDataset();
      const jsonString = JSON.stringify(dataset, null, 2);
      
      console.log('=== COPY THIS TO src/data/UserData.json ===');
      console.log(jsonString);
      console.log('=== END COPY ===');
      
      return jsonString;
    } catch (error) {
      console.error('Failed to prepare source file content:', error);
      return null;
    }
  }
}

// Export singleton instance
export const userDataService = new UserDataService();