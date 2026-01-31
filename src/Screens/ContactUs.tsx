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
import { useTheme } from '../context/ThemeContext';

const TermsOfService = () => {
  const { colors } = useTheme();
  const [name, setName] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const [isFocused, setIsFocused] = useState(false);
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
    <View style={[styles.container, { backgroundColor: colors.contactUsMainBackground }]}>
      <Header
        title="Contact Us"
        titleStyle={{fontWeight: 'bold', fontSize: 24 }}
      />
      <ScrollView
        style={[
          styles.mainContainer,
          { backgroundColor: colors.contactUsScrollBackground },
        ]}
      >
        <View
          style={[
            styles.form,
            { backgroundColor: colors.contactUsFormBackground },
          ]}
        >
          <View>
            <Text style={{ color: colors.contactUsFormLabel }}>Name</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 10,
                height: 50,
                backgroundColor: colors.contactUsInputContainer,
                borderColor: isFocused
                  ? colors.contactUsInputBorderFocused
                  : colors.contactUsInputBorder,
              }}
            >
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  type="Ionicons"
                  name="person"
                  color={colors.contactUsPersonIcon}
                />
              </View>
              <View>
                <TextInput
                  value={name}
                  placeholder="Enter your name"
                  onChangeText={setName}
                  placeholderTextColor={colors.contactUsInputPlaceholder}
                  style={{
                    color: colors.contactUsInputText,
                    shadowColor: colors.contactUsInputShadow,
                  }}
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: colors.contactUsFormLabel }}>Email</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 10,
                height: 50,
                backgroundColor: colors.contactUsInputContainer,
                borderColor: isFocused
                  ? colors.contactUsInputBorderFocused
                  : colors.contactUsInputBorder,
              }}
            >
              <View style={{ marginHorizontal: 10 }}>
                <Icon type="Feather" name="mail" color={colors.contactUsEmailIcon} />
              </View>
              <View>
                <TextInput
                  value={email}
                  placeholder="Enter your email"
                  onChangeText={setEmail}
                  placeholderTextColor={colors.contactUsInputPlaceholder}
                  style={{color:colors.contactUsInputText , shadowColor:colors.contactUsInputShadow}}
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: colors.contactUsFormLabel }}>Message</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 10,
                height: 130,
                backgroundColor: colors.contactUsInputContainer,
                borderColor: isFocused
                  ? colors.contactUsInputBorderFocused
                  : colors.contactUsInputBorder,
              }}
            >
              <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <Icon
                  type="Feather"
                  name="message-square"
                  color={colors.contactUsMessageIcon}
                />
              </View>
              <View style={{ marginTop: 15, flex: 1 }}>
                <TextInput
                  value={message}
                  placeholder="What would you like to tell us?"
                  placeholderTextColor={colors.contactUsInputPlaceholder}
                  onChangeText={setMessage}
                  multiline
                  textAlignVertical="top"
                  style={{
                    flex: 1,
                    height: "70%",
                    fontSize: 14,
                    color: colors.contactUsInputText,
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
                colors={[colors.contactUsSendButtonGradient1, colors.contactUsSendButtonGradient2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Text style={[styles.buttonText, { color: colors.contactUsSendButtonText }]}>Send Message</Text>
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
              borderColor: colors.contactUsSocialBorder,
              backgroundColor: colors.contactUsSocialBackground,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="Entypo" name="instagram" color={colors.contactUsInstagramIcon} />
          </Pressable>
          <Pressable
            onPress={openFacebook}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: colors.contactUsSocialBorder,
              backgroundColor: colors.contactUsSocialBackground,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="Entypo" name="facebook" color={colors.contactUsFacebookIcon} />
          </Pressable>
          <Pressable
            onPress={() => sendMailFromIcon('', '')}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: colors.contactUsSocialBorder,
              backgroundColor: colors.contactUsSocialBackground,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="Feather" name="mail" color={colors.contactUsMailIcon} />
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
  },
  content: {
    flex: 1,
    margin: 0,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  mainContainer: {
    zIndex: 10,
    elevation: 20,
    position: 'relative',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  heading: {
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    margin: 20,
    
  },
});
