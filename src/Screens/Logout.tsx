import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import Navigation from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const navigation = useNavigation<any>();
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      console.log('Starting logout...');
      await logout();
      console.log('Logout completed');

      // Optional: Show success message
      Alert.alert('Success', 'Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Logout"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
      />
      <View style={styles.overlappingContainer}>
        <View style={styles.subContainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
              width: 100,
              borderRadius: 50,
              elevation: 20,
              shadowColor: '#FF8A00',
              shadowOpacity: 1,
              shadowRadius: 40,
              marginLeft: 70,
            }}
          >
            <Image
              source={require('../../assets/images/CuisineList/missionLogo.png')}
              style={{ height: 100, width: 100, borderRadius: 50 }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 'auto',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 35,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 60,
              }}
            >
              Logout?
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'grey', fontSize: 17 }}>
              Are you sure you want to logout
            </Text>
            <Text style={{ color: 'grey', fontSize: 17 }}>
              from your account
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: -10,
            height: 'auto',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/CuisineList/Logout.png')}
            style={{ height: 200, width: 200 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            marginTop: 30,
            width: '100%',
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center  ',
          }}
        >
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              {
                width: '90%',
                opacity: pressed ? 0.85 : 1,

                // Android
                elevation: 20,

                // iOS
              },
            ]}
          >
            <LinearGradient
              colors={['#FF7A18', '#B31217']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 50,
                width: '100%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                Logout
              </Text>
            </LinearGradient>
          </Pressable>
          <Pressable
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 20,
              borderWidth: 2,
              borderRadius: 25,
              borderColor: '#B31217',
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: '#FF7A18', fontSize: 16, fontWeight: '600' }}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlappingContainer: {
    alignItems: 'center',

    flex: 1,
    margin: 0,
    marginTop: -85,
    backgroundColor: 'white',

    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,

    // 🔥 ADD THESE
    zIndex: 10,
    elevation: 7,
  },
  subContainer: {
    margin: 20,
  },
});
