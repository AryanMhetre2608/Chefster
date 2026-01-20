import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const TermsOfService = () => {
  const [name, setName] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const openInstagram = () => {
    const instagramAppUrl = 'instagram://user?username=chefsterapp';

    Linking.openURL(instagramAppUrl).catch(() => {
      Alert.alert('Error', 'App not found');
    });
  };
  const openFacebook = () => {
    const facebookAppUrl = 'instagram://user?username=chefsterapp';

    Linking.openURL(facebookAppUrl).catch(() => {
      Alert.alert('Error', 'App not found');
    });
  };
  const sendMailFromIcon = (email: string, message: string) => {
    const to = 'rnmhetre2608@gmail.com';
    const subject = 'Contact Us - Chefster App';
    const body = `From: ${email}\n\nMessage:\n${message}`;

    const mailUrl = `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailUrl).catch(() => {
      Alert.alert('Error', 'No email app found');
    });
  };

  const sendMail = () => {
    if (!name) {
      Alert.alert('Error', 'Please enter the name');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Please enter the mail');
      return;
    }

    if (!message) {
      Alert.alert('Error', 'Please enter the message');
      return;
    }

    const to = 'rnmhetre2608@gmail.com';
    const subject = 'Contact Us - Chefster App';
    const body = `From ${email} : ${message}`;
    const mailUrl = `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailUrl).catch(() => {
      Alert.alert('Error', 'No email app found');
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Contact Us"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
      />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.form}>
          <View>
            <Text>Name</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#4F4F4F',
                height: 50,
              }}
            >
              {/* INNER SHADOW TOP (darker) */}
              <LinearGradient
                colors={['rgba(0,0,0,0.15)', 'transparent']}
                style={styles.innerTop}
              />

              {/* INNER SHADOW BOTTOM (slightly darker) */}
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,1)']}
                style={styles.innerBottom}
              />

              <View style={{ marginHorizontal: 10 }}>
                <Icon type="Ionicons" name="person" color="#4F4F4F" />
              </View>
              <View>
                <TextInput
                  value={name}
                  placeholder="Enter your name"
                  onChangeText={setName}
                  placeholderTextColor={'black'}
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>Email</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#4F4F4F',
                height: 50,
              }}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.15)', 'transparent']}
                style={styles.innerTop}
              />

              {/* INNER SHADOW BOTTOM (slightly darker) */}
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,1)']}
                style={styles.innerBottom}
              />
              <View style={{ marginHorizontal: 10 }}>
                <Icon type="Feather" name="mail" color="#4F4F4F" />
              </View>
              <View>
                <TextInput
                  value={email}
                  placeholder="Enter your email"
                  onChangeText={setEmail}
                  placeholderTextColor={'black'}
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>Message</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#4F4F4F',
                height: 130,
              }}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.15)', 'transparent']}
                style={styles.innerTop}
              />

              {/* INNER SHADOW BOTTOM (slightly darker) */}
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,1)']}
                style={styles.innerBottom}
              />

              <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <Icon type="Feather" name="message-square" color="#4F4F4F" />
              </View>
              <View style={{ marginTop: 15 }}>
                <TextInput
                  value={message}
                  placeholder="What would you like to tell us?"
                  placeholderTextColor={'black'}
                  onChangeText={setMessage}
                  multiline
                  textAlignVertical="top"
                  style={{
                    flex: 1,
                    height: 150,
                    fontSize: 14,
                    color: '#212121',
                    padding: 0,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Pressable
              onPress={sendMail}
              style={({ pressed }) => [
                styles.buttonWrapper,
                pressed && { transform: [{ scale: 0.98 }] }, // smoother press
              ]}
            >
              <LinearGradient
                colors={['#FF8A00', '#FF6A00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{height:50 ,alignItems:"center" , justifyContent:"center" , width:"100%" }}
              >
                {/* 🔥 Bottom inner depth */}

                <Text style={styles.buttonText}>Send Message</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 25,
          }}
        >
          <Pressable
            onPress={openInstagram}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#4F4F4F',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="Entypo" name="instagram" color="#4F4F4F" />
          </Pressable>
          <Pressable
            onPress={openFacebook}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#4F4F4F',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="Entypo" name="facebook" color="#4F4F4F" />
          </Pressable>
          <Pressable
            onPress={sendMailFromIcon}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#4F4F4F',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="Feather" name="mail" color="#4F4F4F" />
          </Pressable>
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
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    alignItems:"center",
    justifyContent:"center",
  },

  button: {
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonInnerBottom: {
    position: 'absolute',
    bottom: 0,
    height: 10, // controls depth
    width: '100%',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  mainContainer: {
    backgroundColor: '#f5f5f5',
    marginTop: -85, // overlap amount
    zIndex: 10,
    elevation: 20, // Android
    position: 'relative',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  innerTop: {
    position: 'absolute',
    top: 0,
    height: 12, // slightly stronger
    width: '100%',
    borderRadius: 10,
  },

  innerBottom: {
    position: 'absolute',
    bottom: 0,
    height: 12,
    width: '100%',
  },

  heading: {
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    margin: 20,
    marginTop: 40,
  },
});
