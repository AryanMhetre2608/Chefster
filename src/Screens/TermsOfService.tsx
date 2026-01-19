import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const TermsOfService = () => {
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
        title="Terms of Service"
        leftComponent={
          <Pressable onPress={handleBackPress} style={{ marginBottom: 60 }}>
            <Icon type="Ionicons" name="arrow-back" size={24} color="white" />
          </Pressable>
        }
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
      />
      <ScrollView style={styles.content}>
        <View style={styles.subContent}>
          <View style={{marginTop: 0  }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 5,
              }}
            >
              <LinearGradient
                colors={['#FF8A00', '#FF6A00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 22,
                  width: 22,
                  borderRadius: 11,
                }}
              >
                <Text style={{ color: 'white' }}>1</Text>
              </LinearGradient>

              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  1. Acceptance of Terms
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text>
                By downloading, accessing, or using this Food Recipe App, you
                agree to be bound by these Terms of Service. If you do not agree
                with any part of these terms, please do not use the app.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 5,
              }}
            >
              <LinearGradient
                colors={['#FF8A00', '#FF6A00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 22,
                  width: 22,
                  borderRadius: 11,
                }}
              >
                <Text style={{ color: 'white' }}>2</Text>
              </LinearGradient>

              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  2. User Accounts
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text>
                To access certain features, you may be required to create an
                account. You are responsible for maintaining the confidentiality
                of your account credentials and for all activities that occur
                under your account. You agree to provide accurate and complete
                information and to update it as needed.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 5,
              }}
            >
              <LinearGradient
                colors={['#FF8A00', '#FF6A00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 22,
                  width: 22,
                  borderRadius: 11,
                }}
              >
                <Text style={{ color: 'white' }}>3</Text>
              </LinearGradient>

              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  3. Privacy Policy
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text>
                Your privacy is important to us. Any personal information you
                provide is handled in accordance with our Privacy Policy. We do
                not sell or share your personal data with third parties except
                as required by law or to provide app functionality.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 5,
              }}
            >
              <LinearGradient
                colors={['#FF8A00', '#FF6A00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 22,
                  width: 22,
                  borderRadius: 11,
                }}
              >
                <Text style={{ color: 'white' }}>4</Text>
              </LinearGradient>

              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  4. Content Usage
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text>
                All recipes, images, text, and other content available in the
                app are for personal, non-commercial use only. You may not copy,
                modify, distribute, or reproduce any content without prior
                written permission. User-submitted content must not violate any
                laws or third-party rights.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 5,
              }}
            >
              <LinearGradient
                colors={['#FF8A00', '#FF6A00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 22,
                  width: 22,
                  borderRadius: 11,
                }}
              >
                <Text style={{ color: 'white' }}>5</Text>
              </LinearGradient>

              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  5. Liability Disclaimer
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text>
                By downloading, accessing, or using this Food Recipe App, you
                agree to be bound by these Terms of Service. If you do not agree
                with any part of these terms, please do not use the app.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 5,
              }}
            >
              <LinearGradient
                colors={['#FF8A00', '#FF6A00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 22,
                  width: 22,
                  borderRadius: 11,
                }}
              >
                <Text style={{ color: 'white' }}>6</Text>
              </LinearGradient>

              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  6. Changes to Terms
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text>
                We reserve the right to modify these Terms of Service at any
                time. Any changes will be effective immediately upon posting in
                the app. Continued use of the app after changes are made
                constitutes acceptance of the updated terms.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsOfService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
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
  subContent: {
    margin: 30,
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
});
