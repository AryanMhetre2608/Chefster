# User Management System with Redux

This guide explains how to use the new Redux-based user management system that integrates Firebase authentication with local dataset storage.

## Overview

The system allows multiple users to log in on the same device, with each user's data (profile, favorites, etc.) stored separately in a local dataset.json file. When a user logs in, their specific data is loaded and displayed.

## Key Components

### 1. User Redux Slice (`src/redux/slice/userSlice.tsx`)

Manages user state including:
- Current logged-in user
- All users in the system
- Loading states and errors
- User profile updates
- Favorites management per user

### 2. User Data Service (`src/services/userDataService.js`)

Handles file system operations:
- Reading/writing to local dataset.json
- Managing profile images
- User creation with auto-incrementing IDs
- Favorites management per user

### 3. Favorites Hook (`src/hooks/useFavorites.tsx`)

Provides a unified interface for favorites that works with both:
- Logged-in users (stores in user-specific data)
- Anonymous users (stores in global favorites slice)

### 4. Favorite Button Component (`src/components/FavoriteButton.tsx`)

Ready-to-use component for adding/removing favorites with proper user context.

## Usage Examples

### 1. Login/Registration

```typescript
// In Login.tsx or Registration.tsx
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slice/userSlice';

const dispatch = useDispatch();

// After successful Firebase authentication
const userData = await dispatch(loginUser(firebaseUser));
```

### 2. Profile Management

```typescript
// In EditProfile.tsx
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/slice/userSlice';

const dispatch = useDispatch();
const { currentUser } = useSelector((state: RootState) => state.User);

// Update profile
await dispatch(updateUserProfile(profileData, imageUri));
```

### 3. Favorites Management

```typescript
// Using the hook
import { useFavorites } from '../hooks/useFavorites';

const { favorites, isRecipeFavorite, toggleFavorite } = useFavorites();

// Check if recipe is favorite
const isFav = isRecipeFavorite(recipeId);

// Toggle favorite status
await toggleFavorite(recipe);
```

### 4. Using Favorite Button Component

```typescript
// In any recipe display component
import FavoriteButton from '../components/FavoriteButton';

<FavoriteButton
  recipe={recipe}
  size={24}
  activeColor="#e91e63"
  inactiveColor="#ccc"
/>
```

## Data Structure

### User Object
```typescript
interface User {
  id: number;              // Auto-incrementing ID starting from 0
  email: string;           // Firebase email (unique identifier)
  name: string;            // User's display name
  phoneNumber?: string;    // Optional phone number
  bio?: string;            // Optional bio
  profileImage?: string;   // Path to local profile image
  favoriteRecipes: Recipe[]; // User's favorite recipes
  createdAt: string;       // ISO date string
  updatedAt: string;       // ISO date string
}
```

### Dataset.json Structure
```json
{
  "users": [
    {
      "id": 0,
      "email": "user1@gmail.com",
      "name": "User One",
      "phoneNumber": "1234567890",
      "bio": "Food lover",
      "profileImage": "/path/to/profile_0.jpg",
      "favoriteRecipes": [...],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "nextUserId": 1
}
```

## Key Features

### 1. Multi-User Support
- Multiple users can use the same device
- Each user's data is stored separately
- Auto-incrementing user IDs starting from 0

### 2. Profile Image Management
- Images stored in app's document directory
- Automatic file naming: `profile_{userId}.{extension}`
- Proper cleanup when images are updated

### 3. Favorites Integration
- Seamless switching between user-specific and anonymous favorites
- Automatic data migration when user logs in
- Consistent API regardless of login state

### 4. Redux Persistence
- User data persisted using redux-persist
- Automatic rehydration on app restart
- Whitelist configuration for selective persistence

## Migration from Context API

If you were previously using UserContext, update your components:

```typescript
// Old way (UserContext)
import { useUser } from '../context/UserContext';
const { currentUser, updateProfile } = useUser();

// New way (Redux)
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/slice/userSlice';

const { currentUser } = useSelector((state: RootState) => state.User);
const dispatch = useDispatch();
await dispatch(updateUserProfile(data, imageUri));
```

## Error Handling

The system includes comprehensive error handling:
- File system errors (permissions, storage full, etc.)
- Network errors during Firebase auth
- Data corruption recovery
- Graceful fallbacks for missing data

## Security Considerations

- Profile images stored in app's private directory
- No sensitive data stored in plain text
- Firebase handles authentication security
- Local data encrypted by device's file system

## Testing

To test the multi-user functionality:

1. Register/login with first user
2. Add some favorites and update profile
3. Logout
4. Register/login with second user
5. Verify separate data storage
6. Switch between users to confirm data isolation

## Troubleshooting

### Common Issues

1. **Profile images not loading**: Check file permissions and paths
2. **Favorites not syncing**: Verify Redux store configuration
3. **User data not persisting**: Check redux-persist whitelist
4. **Multiple users showing same data**: Verify email-based user lookup

### Debug Tools

```typescript
// Check current user state
console.log('Current user:', useSelector(state => state.User.currentUser));

// Check all users
console.log('All users:', useSelector(state => state.User.users));

// Check favorites
console.log('Favorites:', useFavorites().favorites);
```

This system provides a robust foundation for multi-user recipe management with proper data isolation and seamless user experience.