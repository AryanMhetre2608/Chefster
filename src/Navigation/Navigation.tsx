// import {Text } from 'react-native'
// import React, { useEffect } from 'react'
// import Home from '../screens/Home'
// import ContactUs from '../screens/ContactUs'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { useDispatch } from 'react-redux'
// import { AppDispatch } from '../redux/Store'
// import { loginUser } from '../redux/slice/userSlice'
// import auth from '@react-native-firebase/auth'

// import Favourites from '../screens/Favourites'
// import Icon from '../components/Icon'
// import UniversalRecipe from '../screens/UniversalRecipe'
// import Login from '../screens/Login'
// import Registration from '../screens/Registration'
// import Profile from '../screens/Profile'
// import AllCuisines from '../screens/AllCuisines'
// import EditProfile from '../screens/EditProfile'
// import PrivacyPolicy from '../screens/PrivacyPolicy'
// import TermsOfService from '../screens/TermsOfService'
// import Logout from '../screens/Logout'
// import Setting from '../screens/Setting'
// import ChangePassword from '../screens/ChangePassword'
// import { useTheme } from '../context/ThemeContext'
// import ChangeLanguage from '../screens/ChangeLanguage'

// import { useTranslation } from 'react-i18next';


// const Tab = createBottomTabNavigator()
// const Stack = createNativeStackNavigator()

// // Stack Navigator for Home and Recipe screens
// const HomeStackNavigator = () => {
 
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="HomeScreen" component={Home} />
//       <Stack.Screen name='AllCuisines' component={AllCuisines}/>
//       <Stack.Screen name="UniversalRecipe" component={UniversalRecipe}  options={{animation: 'slide_from_bottom', }}/>
//       <Stack.Screen name="Login" component={Login}/>
//       <Stack.Screen name="Registration" component={Registration}/>
//       <Stack.Screen name='Favourites' component={Favourites}/>
//       <Stack.Screen name='EditProfile' component={EditProfile}/>
//       <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}/>
//       <Stack.Screen name='TermsOfService' component={TermsOfService}/>
//       <Stack.Screen name='Logout' component={Logout}/>
//       <Stack.Screen name='Profile' component={Profile}/>
//       <Stack.Screen name='Contact_Us' component={ContactUs}/>
//     </Stack.Navigator>
//   )
// }

// // Stack Navigator for Settings screens
// const SettingsStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="SettingsScreen" component={Setting} />
//       <Stack.Screen name='ChangePassword' component={ChangePassword}/>
//       <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}/>
//       <Stack.Screen name='TermsOfService' component={TermsOfService}/>
//       <Stack.Screen name='Contact_Us' component={ContactUs}/>
//       <Stack.Screen name='Logout' component={Logout}/>
//       <Stack.Screen name='Language' component={ChangeLanguage}/>
//     </Stack.Navigator>
//   )
// }

// const TabNavigator = () => {
//   const { colors } = useTheme();
//   const dispatch = useDispatch<AppDispatch>();

//   // Load user data on app start
//   useEffect(() => {
//     const checkAuthState = async () => {
//       const user = auth().currentUser;
//       if (user) {
//         try {
//           // Load user data from local storage
//           await dispatch(loginUser(user)).unwrap();
//           console.log('User data loaded on app start:', user.email);
//         } catch (error) {
//           console.error('Failed to load user data on app start:', error);
//         }
//       }
//     };
    
//     checkAuthState();
//   }, [dispatch]);
//   const { t } = useTranslation();
  
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: colors.bottomTabBarBackground,
//           borderTopWidth: 1,
//           shadowColor:colors.bottomTabBarShadow,
//           borderTopColor:colors.bottomTabBarBorder,

//           height: 60,
//           paddingBottom: 5,
//           paddingTop: 5,
//         },
//         tabBarActiveTintColor: colors.bottomTabActiveTint,
//         tabBarInactiveTintColor: colors.bottomTabInactiveTint,
//         headerStyle: {
//           backgroundColor: '#fff',
//         },
//         headerTintColor: '#000',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       <Tab.Screen 
//         name='Home' 
//         component={HomeStackNavigator}
//         options={{
//           tabBarLabel: `${t('Home')}`,
          
//           title: 'Chefster',
//           tabBarIcon: ({ color, size  , focused }) => (
//             focused?
//             <Icon type='Entypo' name='home' size={22} color={colors.bottomTabActiveIconColor}/>:
//             <Icon type='AntDesign' name='home' size={22} color={colors.bottomTabInactiveIconColor}/>

            
//           ),
//         }}
//       />
//       <Tab.Screen 
//         name='Favourites' 
//         component={Favourites}
//         options={{
          
//           tabBarLabel: `${t('Favourites')}`,
          
//           title: 'Favourites',
//           tabBarIcon: ({ color, size  , focused }) => (
//             focused?
//             <Icon type='FontAwesome' name='heart' size={22} color={colors.bottomTabActiveIconColor}/>:
//             <Icon type='FontAwesome' name='heart-o' size={22} color={colors.bottomTabInactiveIconColor}/>

            
//           ),
//         }}
//       />
//       <Tab.Screen 
//         name='Settings' 
//         component={SettingsStackNavigator}
//         options={{
//           tabBarLabel: `${t('Settings')}`,
          
//           title: 'Settings',
//           tabBarIcon: ({ color, size  , focused }) => (
//             focused?
//             <Icon type='Ionicons' name='settings-sharp' size={22} color={colors.bottomTabActiveIconColor}/>:
//             <Icon type='Feather' name='settings' size={22} color={colors.bottomTabInactiveIconColor}/>

            
//           ),
//         }}
//       />
      
      
//     </Tab.Navigator>
//   )
// }

// export default TabNavigator

import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Platform,
  Text
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { loginUser } from "../redux/slice/userSlice";
import auth from "@react-native-firebase/auth";

import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

import Icon from "../components/Icon";

/* Screens */

import Home from "../screens/Home";
import UniversalRecipe from "../screens/UniversalRecipe";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import Profile from "../screens/Profile";
import AllCuisines from "../screens/AllCuisines";
import EditProfile from "../screens/EditProfile";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TermsOfService from "../screens/TermsOfService";
import Logout from "../screens/Logout";
import Setting from "../screens/Setting";
import ChangePassword from "../screens/ChangePassword";
import ChangeLanguage from "../screens/ChangeLanguage";
import ContactUs from "../screens/ContactUs";
import Favourites from "../screens/Favourites";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ---------------- Home Stack ---------------- */

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Stack.Screen name="AllCuisines" component={AllCuisines} />
    <Stack.Screen
      name="UniversalRecipe"
      component={UniversalRecipe}
      options={{ animation: "slide_from_bottom" }}
    />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Registration" component={Registration} />
    <Stack.Screen name="Favourites" component={Favourites} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="TermsOfService" component={TermsOfService} />
    <Stack.Screen name="Logout" component={Logout} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Contact_Us" component={ContactUs} />
  </Stack.Navigator>
);

/* ---------------- Settings Stack ---------------- */

const SettingsStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsScreen" component={Setting} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="TermsOfService" component={TermsOfService} />
    <Stack.Screen name="Contact_Us" component={ContactUs} />
    <Stack.Screen name="Logout" component={Logout} />
    <Stack.Screen name="Language" component={ChangeLanguage} />
  </Stack.Navigator>
);

/* ---------------- Custom Animated Tab Bar ---------------- */

const CustomTabBar = ({ state, navigation }) => {
  const current = state.index;

  const tabWidth = width / 3;
  const centerOffset = (tabWidth - 70) / 2;

  const tabPositions = [
    centerOffset,
    tabWidth + centerOffset,
    tabWidth * 2 + centerOffset
  ];

  const slideX = useRef(new Animated.Value(tabPositions[0])).current;

  useEffect(() => {
    Animated.spring(slideX, {
      toValue: tabPositions[current],
      friction: 8,
      tension: 120,
      useNativeDriver: true
    }).start();
  }, [current]);

  return (
    <View style={[styles.tabContainer, Platform.OS === "ios" && { paddingBottom: 28 }]}>

      {/* <View style={styles.backgroundCurve} /> */}
      <LinearGradient
        colors={['#FF7A00', '#FF5722', '#E64A19']} 
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.backgroundCurve}
      />

      {/* Floating Button */}
      <Animated.View
        style={[
          styles.floatingButton,
          {
            transform: [{ translateX: slideX }],
            bottom: Platform.OS === "ios" ? 35 : 20
          }
        ]}
      >
        <LinearGradient
    colors={['#FF7A00', '#FF5722', '#E64A19']}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={{
      width: "100%",
      height: "100%",
      borderRadius: 35,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
        {current === 0 && <Icon type="Entypo" name="home" size={22} color="#fff" />}
        {current === 1 && <Icon type="FontAwesome" name="heart" size={22} color="#fff" />}
        {current === 2 && <Icon type="Ionicons" name="settings-sharp" size={22} color="#fff" />}
        </LinearGradient>
      </Animated.View>

      {/* Tabs */}
      <View style={styles.rowFull}>

        {/* HOME */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.tabItem}
        >
          {current !== 0 && (
            <View style={{ alignItems: "center" }}>
              <Icon type="AntDesign" name="home" size={22} color="#fff" />
              <Text style={styles.tabLabel}>Home</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* FAVOURITES */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Favourites")}
          style={styles.tabItem}
        >
          {current !== 1 && (
            <View style={{ alignItems: "center" }}>
              <Icon type="FontAwesome" name="heart-o" size={22} color="#fff" />
              <Text style={styles.tabLabel}>Favourites</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* SETTINGS */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={styles.tabItem}
        >
          {current !== 2 && (
            <View style={{ alignItems: "center" }}>
              <Icon type="Feather" name="settings" size={22} color="#fff" />
              <Text style={styles.tabLabel}>Settings</Text>
            </View>
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
};

/* ---------------- Tab Navigator ---------------- */

const TabNavigator = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  useEffect(() => {
    const checkAuthState = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          await dispatch(loginUser(user)).unwrap();
        } catch (error) {
          console.log(error);
        }
      }
    };

    checkAuthState();
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ tabBarLabel: t('Home') }}
 />
      <Tab.Screen name="Favourites" component={Favourites} options={{ tabBarLabel: t('Favourites') }}
/>
      <Tab.Screen name="Settings" component={SettingsStackNavigator} options={{ tabBarLabel: t('Settings') }}
/>
    </Tab.Navigator>
  );
};

export default TabNavigator;

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    width,
    backgroundColor: "transparent"
  },

  backgroundCurve: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#C34BCB",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },

  rowFull: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginTop: 15
  },

  tabItem: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },

  floatingButton: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#C34BCB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#fff",
    zIndex: 999
  },

  tabLabel: {
    fontSize: 11,
    color: "#fff",
    marginTop: 4
  }
});