import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { userDataService } from "../../services/userDataService";

// User interface
export interface User {
  id: number;
  email: string;
  name: string;
  phoneNumber?: string;
  bio?: string;
  profileImage?: string;
  favoriteRecipes: Recipe[];
  createdAt: string;
  updatedAt: string;
}

// Recipe interface (matching favorites slice)
interface Recipe {
  id: string;
  name: string;
  image: string;
  cuisine: string;
}

// User state interface
interface UserState {
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  currentUser: null,
  users: [],
  isLoading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.error = null;
    },

    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Set current user
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.error = null;
    },

    // Set all users
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    // Add or update user
    addOrUpdateUser: (state, action: PayloadAction<User>) => {
      const existingUserIndex = state.users.findIndex(user => user.email === action.payload.email);
      if (existingUserIndex >= 0) {
        state.users[existingUserIndex] = action.payload;
      } else {
        state.users.push(action.payload);
      }
    },

    // Update current user profile
    updateCurrentUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Add recipe to favorites
    addToUserFavorites: (state, action: PayloadAction<Recipe>) => {
      if (state.currentUser) {
        const exists = state.currentUser.favoriteRecipes.find(recipe => recipe.id === action.payload.id);
        if (!exists) {
          state.currentUser.favoriteRecipes.push(action.payload);
          state.currentUser.updatedAt = new Date().toISOString();
        }
      }
    },

    // Remove recipe from favorites
    removeFromUserFavorites: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.favoriteRecipes = state.currentUser.favoriteRecipes.filter(
          recipe => recipe.id !== action.payload
        );
        state.currentUser.updatedAt = new Date().toISOString();
      }
    },

    // Clear current user (logout)
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        console.log('Redux: loginUser pending');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Redux: loginUser fulfilled with user:', action.payload);
        state.isLoading = false;
        state.currentUser = action.payload;
        const existingUserIndex = state.users.findIndex(user => user.email === action.payload.email);
        if (existingUserIndex >= 0) {
          state.users[existingUserIndex] = action.payload;
        } else {
          state.users.push(action.payload);
          console.log('✅ Redux: New user added - Auto-sync will update src/data/UserData.json');
        }
        console.log('Redux: Updated state, users count:', state.users.length);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Redux: loginUser rejected with error:', action.error.message);
        state.isLoading = false;
        state.error = action.error.message || 'Failed to login user';
      })
      
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        const existingUserIndex = state.users.findIndex(user => user.email === action.payload.email);
        if (existingUserIndex >= 0) {
          state.users[existingUserIndex] = action.payload;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update profile';
      })
      
      // Add Recipe to Favorites
      .addCase(addRecipeToFavorites.fulfilled, (state, action) => {
        if (state.currentUser) {
          const exists = state.currentUser.favoriteRecipes.find(recipe => recipe.id === action.payload.id);
          if (!exists) {
            state.currentUser.favoriteRecipes.push(action.payload);
            state.currentUser.updatedAt = new Date().toISOString();
          }
        }
      })
      .addCase(addRecipeToFavorites.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add to favorites';
      })
      
      // Remove Recipe from Favorites
      .addCase(removeRecipeFromFavorites.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.favoriteRecipes = state.currentUser.favoriteRecipes.filter(
            recipe => recipe.id !== action.payload
          );
          state.currentUser.updatedAt = new Date().toISOString();
        }
      })
      .addCase(removeRecipeFromFavorites.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to remove from favorites';
      })
      
      // Load All Users
      .addCase(loadAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(loadAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load users';
      });
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setCurrentUser,
  setUsers,
  addOrUpdateUser,
  updateCurrentUserProfile,
  addToUserFavorites,
  removeFromUserFavorites,
  clearCurrentUser,
} = userSlice.actions;

// Async thunks for user operations
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (firebaseUser: any) => {
    console.log('Redux loginUser: Starting with user:', firebaseUser.email);
    
    // Get or create user in local dataset
    const userData = await userDataService.getOrCreateUser(firebaseUser.email, {
      name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
      phoneNumber: firebaseUser.phoneNumber || '',
      bio: '',
    });

    console.log('Redux loginUser: User data received:', userData);
    return userData;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ profileData, profileImageUri }: { profileData: Partial<User>, profileImageUri?: string }, { getState }) => {
    const state = getState() as any;
    if (!state.User.currentUser) {
      throw new Error('No current user');
    }

    // Update user profile in local dataset
    const updatedUser = await userDataService.updateUserProfile(
      state.User.currentUser.email,
      profileData,
      profileImageUri
    );

    return updatedUser;
  }
);

export const addRecipeToFavorites = createAsyncThunk(
  'user/addRecipeToFavorites',
  async (recipe: Recipe, { getState }) => {
    const state = getState() as any;
    if (!state.User.currentUser) {
      throw new Error('No current user');
    }

    // Update in local dataset
    await userDataService.addToFavorites(state.User.currentUser.email, recipe);
    
    return recipe;
  }
);

export const removeRecipeFromFavorites = createAsyncThunk(
  'user/removeRecipeFromFavorites',
  async (recipeId: string, { getState }) => {
    const state = getState() as any;
    if (!state.User.currentUser) {
      throw new Error('No current user');
    }

    // Update in local dataset
    await userDataService.removeFromFavorites(state.User.currentUser.email, recipeId);
    
    return recipeId;
  }
);

export const loadAllUsers = createAsyncThunk(
  'user/loadAllUsers',
  async () => {
    const users = await userDataService.getAllUsers();
    return users;
  }
);

export const logoutUser = () => (dispatch: any) => {
  dispatch(clearCurrentUser());
};

// Export reducer
export default userSlice.reducer;