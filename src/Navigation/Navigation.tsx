import {Text } from 'react-native'
import React, { useEffect } from 'react'
import Home from '../screens/Home'
import ContactUs from '../screens/ContactUs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/Store'
import { loginUser } from '../redux/slice/userSlice'
import auth from '@react-native-firebase/auth'

import Favourites from '../screens/Favourites'
import Icon from '../components/Icon'
import UniversalRecipe from '../screens/UniversalRecipe'
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import Profile from '../screens/Profile'
import AllCuisines from '../screens/AllCuisines'
import EditProfile from '../screens/EditProfile'
import AboutUs from '../screens/AboutUs'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import TermsOfService from '../screens/TermsOfService'
import Logout from '../screens/Logout'
import Setting from '../screens/Setting'
import ChangePassword from '../screens/ChangePassword'
import { useTheme } from '../context/ThemeContext'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Stack Navigator for Home and Recipe screens
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name='AllCuisines' component={AllCuisines}/>
      <Stack.Screen name="UniversalRecipe" component={UniversalRecipe}  options={{animation: 'slide_from_bottom', }}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Registration" component={Registration}/>
      <Stack.Screen name='Favourites' component={Favourites}/>
      <Stack.Screen name='EditProfile' component={EditProfile}/>
      <Stack.Screen name='AboutUs' component={AboutUs}/>
      <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}/>
      <Stack.Screen name='TermsOfService' component={TermsOfService}/>
      <Stack.Screen name='Logout' component={Logout}/>
      <Stack.Screen name='Profile' component={Profile}/>
      <Stack.Screen name='Contact_Us' component={ContactUs}/>
    </Stack.Navigator>
  )
}

// Stack Navigator for Settings screens
const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsScreen" component={Setting} />
      <Stack.Screen name='ChangePassword' component={ChangePassword}/>
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  // Load user data on app start
  useEffect(() => {
    const checkAuthState = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          // Load user data from local storage
          await dispatch(loginUser(user)).unwrap();
          console.log('User data loaded on app start:', user.email);
        } catch (error) {
          console.error('Failed to load user data on app start:', error);
        }
      }
    };
    
    checkAuthState();
  }, [dispatch]);
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bottomTabBarBackground,
          borderTopWidth: 1,
          shadowColor:colors.bottomTabBarShadow,
          borderTopColor:colors.bottomTabBarBorder,

          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: colors.bottomTabActiveTint,
        tabBarInactiveTintColor: colors.bottomTabInactiveTint,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name='Home' 
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          
          title: 'Chefster',
          tabBarIcon: ({ color, size  , focused }) => (
            focused?
            <Icon type='Entypo' name='home' size={22} color={colors.bottomTabActiveIconColor}/>:
            <Icon type='AntDesign' name='home' size={22} color={colors.bottomTabInactiveIconColor}/>

            
          ),
        }}
      />
      <Tab.Screen 
        name='Favourites' 
        component={Favourites}
        options={{
          tabBarLabel: 'Favourites',
          
          title: 'Favourites',
          tabBarIcon: ({ color, size  , focused }) => (
            focused?
            <Icon type='FontAwesome' name='heart' size={22} color={colors.bottomTabActiveIconColor}/>:
            <Icon type='FontAwesome' name='heart-o' size={22} color={colors.bottomTabInactiveIconColor}/>

            
          ),
        }}
      />
      <Tab.Screen 
        name='Settings' 
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: 'Settings',
          
          title: 'Settings',
          tabBarIcon: ({ color, size  , focused }) => (
            focused?
            <Icon type='Ionicons' name='settings-sharp' size={22} color={colors.bottomTabActiveIconColor}/>:
            <Icon type='Feather' name='settings' size={22} color={colors.bottomTabInactiveIconColor}/>

            
          ),
        }}
      />
      
      
    </Tab.Navigator>
  )
}

export default TabNavigator
