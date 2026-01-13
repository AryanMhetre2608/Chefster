import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DrawerNavigator from './src/Navigation/Navigation'
import Login from './src/Screens/Login'
import Registration from './src/Screens/Registration'
import EmailVerification from './src/Screens/EmailVerification'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Store, persistor } from './src/Redux/Store'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import { ActivityIndicator, View } from 'react-native'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  const { user, loading } = useAuth();

  // Add debugging
  console.log('AppNavigator - User:', user?.email, 'Email Verified:', user?.emailVerified);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF7A00" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // User is signed in
          user.emailVerified ? (
            // Email is verified - show main app
            <Stack.Screen name="DrawerNav" component={DrawerNavigator} />
          ) : (
            // Email not verified - show verification screen
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
          )
        ) : (
          // User is not signed in
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  )
}