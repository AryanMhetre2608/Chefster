# Firebase Setup Guide for Chefster

## Prerequisites
Firebase has been integrated into your Chefster React Native app. Follow these steps to complete the setup:

## 1. Firebase Project Configuration

### Update Firebase Config
Edit `src/config/firebase.ts` and replace the placeholder values with your actual Firebase project configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

You can find these values in your Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on your Android app
6. Copy the configuration values

## 2. Android Configuration

### google-services.json
Make sure your `android/app/google-services.json` file contains the correct configuration from your Firebase project.

### Build Configuration
The following files are already configured:

- `android/build.gradle` - Contains Google Services plugin
- `android/app/build.gradle` - Contains Firebase dependencies and plugin application

## 3. iOS Configuration (if needed)

If you plan to support iOS, you'll need to:

1. Download `GoogleService-Info.plist` from Firebase Console
2. Add it to your iOS project in Xcode
3. Configure iOS build settings

## 4. Firebase Authentication Setup

### Enable Authentication Methods
1. Go to Firebase Console
2. Navigate to Authentication > Sign-in method
3. Enable "Email/Password" authentication
4. Optionally enable other methods (Google, Facebook, etc.)

## 5. Features Implemented

### Authentication Service (`src/services/authService.ts`)
- User registration with email/password
- User login with email/password
- Password reset functionality
- Logout functionality
- Error handling with user-friendly messages

### Authentication Context (`src/context/AuthContext.tsx`)
- Global authentication state management
- Automatic user session handling
- Loading states

### Updated Screens
- **Login Screen**: Firebase authentication integration
- **Registration Screen**: User registration with validation
- **Contact Us Screen**: Logout functionality and user info display

### App Navigation
- Automatic navigation based on authentication state
- Protected routes (main app only accessible when logged in)
- Authentication screens only shown when logged out

## 6. Testing

1. Run the app: `npm run android` or `npm run ios`
2. Try registering a new user
3. Try logging in with existing credentials
4. Test password reset functionality
5. Test logout functionality

## 7. Security Notes

- Never commit your actual Firebase configuration to version control
- Use environment variables for sensitive configuration in production
- Enable Firebase Security Rules for your database
- Consider implementing additional security measures like email verification

## 8. Troubleshooting

### Common Issues:
1. **Build errors**: Make sure all Firebase dependencies are properly installed
2. **Authentication not working**: Check Firebase configuration and ensure Authentication is enabled
3. **Network errors**: Ensure device has internet connection and Firebase project is active

### Debug Steps:
1. Check React Native logs: `npx react-native log-android`
2. Check Firebase Console for authentication attempts
3. Verify google-services.json is in the correct location
4. Clean and rebuild: `cd android && ./gradlew clean && cd .. && npm run android`

## Next Steps

Consider implementing:
- Email verification
- Social authentication (Google, Facebook)
- User profile management
- Password strength requirements
- Two-factor authentication