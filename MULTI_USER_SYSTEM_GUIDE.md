# Multi-User Local UserData.json System

## Overview
This system allows multiple Firebase-authenticated users to use the same device while maintaining separate user data in a local UserData.json file. Each user gets automatically assigned a unique ID starting from 0, and all their data (profile information, favorites, etc.) is stored locally and tied to their email address.

## How It Works

### 1. User Authentication & Registration
- Users authenticate through Firebase (existing system)
- Upon successful Firebase authentication, the Redux `loginUser` thunk is called
- The system checks if the user exists in the local UserData.json
- If user doesn't exist, they are automatically added with an auto-incrementing ID
- If user exists, their existing data is loaded

### 2. Local Data Storage
- **Location**: `DocumentDirectoryPath/UserData.json` (writable copy of src/data/UserData.json)
- **Source**: `src/data/UserData.json` (your custom file)
- **Profile Images**: `DocumentDirectoryPath/profile_images/`
- **Structure**:
```json
{
  "users": [
    {
      "id": 0,
      "email": "user1@gmail.com",
      "name": "User One",
      "phoneNumber": "1234567890",
      "bio": "My bio",
      "profileImage": "/path/to/profile_0.jpg",
      "favoriteRecipes": [...],
      "createdAt": "2024-01-28T...",
      "updatedAt": "2024-01-28T..."
    }
  ],
  "nextUserId": 1
}
```

### 3. Multi-User Scenario
When different users log in on the same device:

**User A (a@gmail.com)** logs in:
- Gets ID: 0
- Profile data saved to UserData.json
- Favorites saved under their user record

**User B (b@gmail.com)** logs in later:
- Gets ID: 1
- Has separate profile data
- Has separate favorites list

**User A logs in again**:
- System recognizes existing email
- Loads their existing data (ID: 0)
- Shows their specific profile and favorites

### 4. Data Persistence
- All data persists between app sessions
- Profile images are saved to device storage
- Each user's data remains separate and secure
- No data mixing between users

## Implementation Details

### Redux Store Structure
```typescript
interface UserState {
  currentUser: User | null;    // Currently logged-in user
  users: User[];              // All users on this device
  isLoading: boolean;
  error: string | null;
}
```

### Key Components

#### 1. UserDataService (`src/services/userDataService.js`)
- Handles all file system operations
- Manages UserData.json read/write (your custom file)
- Handles profile image storage
- Provides methods for user CRUD operations

#### 2. User Redux Slice (`src/redux/slice/userSlice.tsx`)
- Manages user state in Redux
- Provides async thunks for user operations
- Handles favorites management per user
- Integrates with UserDataService

#### 3. Updated Screens
- **Login.tsx**: Integrates with user slice for authentication
- **EditProfile.tsx**: Uses user slice for profile updates
- **AllCuisines.tsx**: Uses user-specific favorites
- **Favourites.tsx**: Shows current user's favorites via useFavorites hook

#### 4. useFavorites Hook (`src/hooks/useFavorites.tsx`)
- Provides unified interface for favorites
- Works with both logged-in users (user slice) and anonymous users (favorites slice)
- Handles the transition between user states

## Usage Examples

### Login Process
```typescript
// In Login.tsx
const result = await authService.loginWithEmail(email, password);
if (result.success) {
  const userData = await dispatch(loginUser(result.user)).unwrap();
  // User is now logged in with their specific data loaded
}
```

### Profile Update
```typescript
// In EditProfile.tsx
await dispatch(updateUserProfile({ 
  profileData: { name, phoneNumber, bio }, 
  profileImageUri: selectedImage?.uri 
})).unwrap();
// Profile updated in both Redux and local dataset
```

### Favorites Management
```typescript
// In AllCuisines.tsx or any component
await dispatch(addRecipeToFavorites(recipe)).unwrap();
// Recipe added to current user's favorites in local dataset
```

## Benefits

1. **Multi-User Support**: Multiple users can use the same device
2. **Data Persistence**: All data survives app restarts
3. **User Isolation**: Each user's data is completely separate
4. **Offline Capability**: Works without internet after initial Firebase auth
5. **Automatic Management**: No manual user management required
6. **Seamless Experience**: Users see their data immediately upon login

## File Structure
```
src/
├── services/
│   └── userDataService.js          # File system operations
├── redux/
│   └── slice/
│       ├── userSlice.tsx           # User state management
│       └── favoritesSlice.tsx      # Anonymous favorites (fallback)
├── hooks/
│   └── useFavorites.tsx            # Unified favorites interface
├── screens/
│   ├── Login.tsx                   # Updated for user slice
│   ├── EditProfile.tsx             # Updated for user slice
│   ├── AllCuisines.tsx             # Updated for user favorites
│   ├── Favourites.tsx              # Uses useFavorites hook
│   └── UserDataDebug.tsx           # Debug screen for testing
└── data/
    ├── dataset.json                # Recipe data (unchanged)
    └── UserData.json               # User data template (YOUR FILE)

Device Storage:
/data/data/com.chefster/files/
├── UserData.json                   # Working copy of user data
└── profile_images/                 # Profile images
    ├── profile_0.jpg
    ├── profile_1.jpg
    └── profile_2.jpg
```

## Your UserData.json File

The system now uses your custom `src/data/UserData.json` file as the template and creates a working copy in device storage. Your file structure:

```json
{
  "users": [
    {
      "id": 0,
      "email": "user1@gmail.com", 
      "name": "John Doe Smith",
      "phoneNumber": "1234567890",
      "bio": "Food lover and chef",
      "profileImage": "/data/data/com.chefster/files/profile_images/profile_0.jpg",
      "favoriteRecipes": [
        {
          "id": "AFR-1",
          "name": "Akara", 
          "image": "...",
          "cuisine": "African"
        }
      ],
      "createdAt": "2024-01-28T10:30:00.000Z",
      "updatedAt": "2024-01-28T15:45:00.000Z"
    },
    {
      "id": 1,
      "email": "user2@gmail.com",
      "name": "Jane Mary Johnson", 
      "phoneNumber": "9876543210",
      "bio": "Cooking enthusiast",
      "profileImage": "/data/data/com.chefster/files/profile_images/profile_1.jpg",
      "favoriteRecipes": [
        {
          "id": "AME-5",
          "name": "Burger",
          "image": "...",
          "cuisine": "American"
        }
      ],
      "createdAt": "2024-01-28T11:00:00.000Z", 
      "updatedAt": "2024-01-28T16:20:00.000Z"
    }
  ],
  "nextUserId": 2
}
```

## Testing & Debugging

### Debug Screen
A debug screen has been created at `src/screens/UserDataDebug.tsx` to test the system:

1. **Add to your navigation** to access the debug screen
2. **Test user creation** with different emails
3. **Test profile updates** and favorites
4. **View dataset contents** in real-time
5. **Clear all data** for fresh testing

### Console Logs
The system now includes detailed console logs:
- User creation/login events
- Dataset file operations
- Profile updates
- Favorites management

### Verification Steps
1. Create first user → Should get ID: 0
2. Create second user → Should get ID: 1  
3. Login with first user again → Should load existing data
4. Check console logs for detailed operation info
5. Use debug screen to view UserData.json contents
6. Check your `src/data/UserData.json` file - it will remain as template
7. The working data is stored in device storage `UserData.json`

## Dependencies
- `react-native-fs`: For file system operations (already installed)
- `@reduxjs/toolkit`: For Redux state management (already installed)
- `redux-persist`: For Redux persistence (already installed)

The system is now fully implemented and ready to use!