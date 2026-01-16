import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { Linking, Alert } from 'react-native';

const ContactUs = () => {
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
    subject
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
    <View style={styles.mainContainer}>
      <View style={styles.heading}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Contact Us</Text>
          <Icon type="Ionicons" name="mail" color="#FF5722" size={32} />
        </View>
        <Text style={{ color: 'grey', fontSize: 16 }}>
          We'd love to hear from you !
        </Text>
      </View>

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
                placeholderTextColor={"black"}
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
                placeholderTextColor={"black"}
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
                placeholderTextColor={"black"}
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
              colors={['#FF8A50', '#FF5722']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              {/* 🔥 Bottom inner depth */}
              <LinearGradient
                colors={['rgba(0,0,0,0.25)', 'transparent']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.buttonInnerBottom}
              />

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
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
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
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  container: {
    flex: 1,
  },
  heading: {
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    margin: 20,
    marginTop: 0,
  },
});
