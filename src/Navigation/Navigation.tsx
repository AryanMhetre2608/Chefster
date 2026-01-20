import {Text } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import ContactUs from '../screens/ContactUs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

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
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#666',
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
            <Icon type='Entypo' name='home' size={22}/>:
            <Icon type='AntDesign' name='home' size={22}/>

            
          ),
        }}
      />
      <Tab.Screen 
        name='Contact' 
        component={ContactUs}
        options={{
          tabBarLabel: 'Contact Us',
          title: 'Contact Us',
          tabBarIcon: ({ color, size , focused }) => (
            focused?
              <Icon type='FontAwesome' name='phone' size={22}/>:
              <Icon type='Feather' name='phone' size={22}/>
              
          ),
        }}
      />
      <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          title: 'Profile',
          tabBarIcon: ({ color, size , focused }) => (
            focused?
            <Icon type='Ionicons' name='person' size={22}/>:
            <Icon type='Ionicons' name='person-outline' size={22}/>
            
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
