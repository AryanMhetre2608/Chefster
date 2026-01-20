import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

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
      {/* <Header
        title="About Chefster"
        titleStyle={{ fontWeight: 'bold', fontSize: 22 }}
        leftComponent={
          <Pressable onPress={handleBackPress}>
            <Icon type="Ionicons" name="arrow-back" size={24} color="#FF5722" />
          </Pressable>
        }
      /> */}
      <Header
        title="About Chefster"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
        leftComponent={
          <Pressable onPress={handleBackPress} style={{marginBottom:65}}>
            <Icon type="Ionicons" name="arrow-back" size={24} color="white" />
          </Pressable>
        }
      />

      {/* ✅ FIXED SCROLLVIEW */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{
          backgroundColor: '#f5f5f5',
          marginTop: -85, // overlap amount
          zIndex: 10,
          elevation: 20, // Android
          position: 'relative',
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
        }}
      >
        <View style={styles.innerWrapper}>
          {/* LOGO */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/CuisineList/AboutUs.png')}
              style={{ height: 150, width: 150 }}
            />
          </View>

          {/* TITLE */}
          <Text style={styles.appName}>Chefster</Text>

          {/* VERSION */}
          <View style={styles.versionBox}>
            <Text style={styles.versionText}>Version 2.0.1</Text>
          </View>

          {/* TAGLINE */}
          <View style={styles.tagLine}>
            <Text style={styles.tagText}>Discover delicious recipes</Text>
            <Text style={styles.tagText}>from around the world</Text>
          </View>

          {/* MISSION CARD */}
          <View style={styles.missionContainer}>
            <LinearGradient
              colors={['#FFB8B8', '#FFE4E4', '#FFF5F5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBorder}
            >
              <View style={styles.innerCard}>
                <Image
                  source={require('../../assets/images/CuisineList/missionLogo.png')}
                  style={{ height: 50, width: 50 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.missionTitle}>Our Mission</Text>
                  <Text style={styles.missionText}>
                    At Chefster, our mission is to bring the joy of global
                    cuisines directly to your home kitchen, making every meal an
                    adventure and inspiring home cooks everywhere.
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* FEATURES TITLE */}
          <Text style={styles.featuresTitle}>Features</Text>

          {/* FEATURES ROW 1 */}
          <View style={styles.featureRow}>
            {renderFeature('Entypo', 'globe', '7+ World Cuisines')}
            {renderFeature('FontAwesome', 'heart', 'Save Favourites')}
          </View>

          {/* FEATURES ROW 2 */}
          <View style={styles.featureRow}>
            {renderFeature('FontAwesome5', 'clock', 'Quick Recipes')}
            {renderFeature('Entypo', 'star', 'Easy Instructions')}
          </View>

          {/* FOOTER */}
          <View style={styles.footerContainer}>
            <Text>Proudly made by Chefster Team</Text>

            <View style={styles.footerLinks}>
              <Pressable onPress={() => navigation.navigate('TermsOfService')}>
                <Text
                  style={{ textDecorationLine: 'underline', color: '#FF5722' }}
                >
                  Terms of Service
                </Text>
              </Pressable>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'grey', fontSize: 10 }}>•</Text>
              </View>

              <Pressable onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text
                  style={{ textDecorationLine: 'underline', color: '#FF5722' }}
                >
                  Privacy Policy
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

/* 🔁 FEATURE CARD COMPONENT */
const renderFeature = (type: any, name: string, text: string) => (
  <View style={styles.featureBox}>
    <LinearGradient
      colors={['#FFB8B8', '#FFE4E4', '#FFF5F5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.featureInner}>
        <Icon type={type} name={name} size={28} color="#FF5722" />
        <Text style={styles.featureText}>{text}</Text>
      </View>
    </LinearGradient>
  </View>
);

export default AboutUs;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    paddingBottom: 40, // ✅ IMPORTANT FOR SCROLL
  },

  innerWrapper: {
    alignItems: 'center',
  },

  imageContainer: {
    marginTop: 20,
  },

  appName: {
    color: '#FF5722',
    fontWeight: 'bold',
    fontSize: 45,
    marginTop: 10,
  },

  versionBox: {
    backgroundColor: 'grey',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
  },

  versionText: {
    color: 'white',
  },

  tagLine: {
    marginTop: 20,
    alignItems: 'center',
  },

  tagText: {
    color: 'grey',
    fontSize: 19,
  },

  missionContainer: {
    width: '90%',
    height: 130,
    marginTop: 25,
    elevation: 10,
  },

  gradientBorder: {
    borderRadius: 15,
    padding: 3,
    height: '100%',
  },

  innerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    alignItems: 'center',
    height: '100%',
  },

  missionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  missionText: {
    marginTop: 5,
  },

  featuresTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    marginTop: 30,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '87%',
    marginTop: 10,
  },

  featureBox: {
    width: '48.5%',
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'grey',
  },

  featureInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  featureText: {
    fontWeight: 'bold',
  },

  footerContainer: {
    marginTop: 30,
    alignItems: 'center',
    gap: 10,
  },

  footerLinks: {
    flexDirection: 'row',
    gap: 7,
  },
});
