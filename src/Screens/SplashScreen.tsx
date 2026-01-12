
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <Animated.Image
        source={require('../../assets/logo/App_Logo.png')} 
        style={[styles.image, { opacity }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,                 // 🔑 covers full screen
    backgroundColor: '#FFF', // 🔑 full white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
});













        // source={require('../../assets/images/SplashScreenLogo.png')} 
