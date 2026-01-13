import {Text } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import ContactUs from '../screens/ContactUs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import IndianCuisine from '../Screens/IndianCuisine'
import American from '../screens/MainCuisines/American'
import African from '../screens/MainCuisines/African'
import Asian from '../screens/MainCuisines/Asian'
import Europian from '../screens/MainCuisines/Europian'
import Fusion from '../screens/MainCuisines/Fusion'
import Gluten_Free from '../screens/MainCuisines/Gluten_Free'
import Keto from '../screens/MainCuisines/Keto'
import Mediterranean from '../screens/MainCuisines/Mediterranean'
import Middle_Eastern from '../screens/MainCuisines/Middle_Eastern'
import Oceanian from '../screens/MainCuisines/Oceanian'
import Street_Food from '../screens/MainCuisines/Street_Food'
import Vegan from '../screens/MainCuisines/Vegan'

import Favourites from '../screens/Favourites'
import Icon from '../components/Icon'
import UniversalRecipe from '../screens/UniversalRecipe'
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Stack Navigator for Home and Recipe screens
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={Home} />
        {/* <Stack.Screen name="IndianCuisine" component={IndianCuisine} /> */}


      




      <Stack.Screen name="American" component={American}  />
      <Stack.Screen name="African" component={African}  />
      <Stack.Screen name="Asian" component={Asian}  />
      <Stack.Screen name="Europian" component={Europian} />
      <Stack.Screen name="Fusion" component={Fusion} />
      <Stack.Screen name="GlutenFree" component={Gluten_Free} />
      <Stack.Screen name="Keto" component={Keto} />
      <Stack.Screen name="Mediterranean" component={Mediterranean}/>
      <Stack.Screen name="MiddleEastern" component={Middle_Eastern} />
      <Stack.Screen name="Oceanian" component={Oceanian} />
      <Stack.Screen name="StreetFood" component={Street_Food}/>
      <Stack.Screen name="Vegan" component={Vegan}/>
      <Stack.Screen name="UniversalRecipe" component={UniversalRecipe}  options={{animation: 'slide_from_bottom', }}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Registration" component={Registration}/>






      


      
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
        tabBarActiveTintColor: '#0000FF',
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
          tabBarLabel: 'Contact',
          title: 'Contact Us',
          tabBarIcon: ({ color, size , focused }) => (
            focused?
              <Icon type='FontAwesome' name='phone' size={22}/>:
              <Icon type='Feather' name='phone' size={22}/>
              
          ),
        }}
      />
      <Tab.Screen 
        name='Favourites' 
        component={Favourites}
        options={{
          tabBarLabel: 'Favourites',
          title: 'Favourites',
          tabBarIcon: ({ color, size , focused }) => (
            focused?
            <Icon type='MaterialIcons' name='favorite' size={22}/>:
            <Icon type='MaterialIcons' name='favorite-border' size={22}/>
            
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