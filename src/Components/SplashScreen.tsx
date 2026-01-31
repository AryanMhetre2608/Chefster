import React from 'react';
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  return (
    <>
      {/* Status bar to match splash */}
      <StatusBar barStyle="light-content" backgroundColor="#FF7A00" />

      <LinearGradient
        colors={['#FF7A00', '#FF5722', '#E64A19']} // Orange gradient for Chefster
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <Image
          source={require('../../assets/images/SplashScreenPic.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={{ marginTop: 30 }}
        />
      </LinearGradient>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:20
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});