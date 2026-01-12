import { StyleSheet, Text, View } from 'react-native'
import React , {useEffect, useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from './src/Screens/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DrawerNavigator from './src/Navigation/DrawerNavigator'
const Stack = createNativeStackNavigator()




export default function App() {

  const [showSplash , setShowSplash] = useState(true)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setShowSplash(false)

    } , 1000)
    return ()=>clearTimeout(timer)
  }, [])
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {showSplash ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : (
            <>
              <Stack.Screen name="DrawerNav" component={DrawerNavigator} />
            </>
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})