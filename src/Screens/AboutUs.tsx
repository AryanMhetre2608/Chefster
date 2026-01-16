import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';
const AboutUs = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const handleBackPress = () => {
    if (route.params?.from === 'Profile') {
      navigation.navigate('Profile');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="About Chefster"
        titleStyle={{
          fontWeight: 'bold',
          fontSize: 22,
        }}
        leftComponent={
          <Pressable onPress={handleBackPress}>
            <Icon type="Ionicons" name="arrow-back" size={24} color="#FF5722" />
          </Pressable>
        }
      />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/CuisineList/AboutUs.png')}
            style={{ height: 150, width: 150 }}
          />
        </View>
        <Text style={{ color: '#FF5722', fontWeight: 'bold', fontSize: 45 }}>
          Chefster
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
            height: 20,
            width: '26%',
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white' }}>Version 2.0.1</Text>
        </View>
        <View style={styles.tagLine}>
          <Text style={{ color: 'grey', fontSize: 19 }}>
            Discover delicious recipes
          </Text>
          <Text style={{ color: 'grey', fontSize: 19 }}>
            from around the world
          </Text>
        </View>

        {/* <View style={styles.missionContainer}>
            <View >
                <Image source={require('../../assets/images/CuisineList/missionLogo.png')} style={{height:50 , width:50 , marginLeft:73}}/></View>
            <View>
                <Text style={{fontWeight:"bold" , fontSize:18}}>Our Mission</Text>
                <Text style={{marginRight:60}}>At Chefster, our mission is to bring the joy of global cuisines directly to your home kitchen, making every meal an adventure and inspiring home cooks everywhere.</Text>
            </View>
            
        </View> */}
        <View style={styles.missionContainer}>
          <LinearGradient
            colors={['#FFB8B8', '#FFE4E4', '#FFF5F5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <View style={styles.innerCard}>
              <View>
                <Image
                  source={require('../../assets/images/CuisineList/missionLogo.png')}
                  style={{ height: 50, width: 50, marginLeft: 73 }}
                />
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  Our Mission
                </Text>
                <Text style={{ marginRight: 60 }}>
                  At Chefster, our mission is to bring the joy of global
                  cuisines directly to your home kitchen, making every meal an
                  adventure and inspiring home cooks everywhere.
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tagLine: {
    alignSelf: 'center',
    width: '70%',
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  missionContainer: {
    height: 130,
    width: '90%',
    marginHorizontal: 15,
    marginTop: 25,
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientBorder: {
    borderRadius: 15,
    padding: 3,
    height: '100%',
    width: '100%',
  },
  innerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: '100%',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
