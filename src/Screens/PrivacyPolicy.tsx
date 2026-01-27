import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '../context/ThemeContext';

const TermsOfService = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const sendMail = (email: string, message: string) => {
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

  const handleBackPress = () => {
    if (route.params?.from === 'Profile') {
      navigation.navigate('Profile');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.privacyPolicyContainer}]}>
      {/* <Header
        title="Privacy Policy"
        titleStyle={{
          fontWeight:"bold",
          fontSize:23
        }}
        leftComponent={
          <Pressable onPress={handleBackPress}>
            <Icon type="Ionicons" name="arrow-back" size={24} color='#FF5722' />
          </Pressable>
        }
        rightComponent={
          <Pressable onPress={handleBackPress}>
            <Icon type="Octicons" name="shield-check" size={24} color='#FF5722' />
          </Pressable>
        }
      /> */}
      <Header
        title="Privacy Policy"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
        leftComponent={
          <Pressable onPress={handleBackPress} style={{ marginBottom: 65 }}>
            <Icon type="Ionicons" name="arrow-back" size={24} color={colors.headerLeftComponent}/>
          </Pressable>
        }
        rightComponent={
          <Pressable style={{ marginBottom: 58 }}>
            <Icon type="Octicons" name="shield-check" size={24} color={colors.headerRightComponent}/>
          </Pressable>
        }
      />
      <ScrollView style={[styles.overlapingContainer , {backgroundColor:colors.privacyPolicyOverlayContainer}]}>
        <View style={[styles.content , {backgroundColor:colors.privacyPolicyContent}]}>
          <Text style={{ color: colors.privacyPolicyLastUpdated }}>Last updated: January 2025</Text>
          <View>
            <View style={[styles.policyContainer, {backgroundColor: colors.privacyPolicySection , borderColor:colors.privacyPolicySectionBorder , shadowColor: colors.privacyPolicySectionShadow}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <LinearGradient
                  colors={[colors.privacyPolicyNumberBadge, colors.privacyPolicyNumberBadgeEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 27,
                    width: 27,
                    borderRadius: 13.5,
                    margin: 13,
                  }}
                >
                  <Text style={{ color: colors.privacyPolicyNumberText }}>1</Text>
                </LinearGradient>
                <View style={{ marginLeft: -5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17, color: colors.privacyPolicySectionTitle }}>
                    1. Data Collection
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: -7 }}>
                <View style={{ marginHorizontal: 15 }}>
                  <Text style={{ fontSize: 13  , color:colors.privacyPolicyBodyText}}>
                    At Chefster , we collect certain information to provide and
                    improve our service, including:
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 15,
                    marginRight: 20,
                    marginBottom: 13,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,

                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13  , color:colors.privacyPolicyBodyText}}>
                        Personal information (e.g., name, email address) for
                        account creation and communication.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13, color:colors.privacyPolicyBodyText }}>
                        Recipe Preferences, dietary restrictions, and saved
                        items to personalize your experience.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13, color:colors.privacyPolicyBodyText }}>
                        Usage data and device information for app optimization
                        and analytics.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.policyContainer, {backgroundColor: colors.privacyPolicySection , borderColor:colors.privacyPolicySectionBorder , shadowColor: colors.privacyPolicySectionShadow}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <LinearGradient
                  colors={[colors.privacyPolicyNumberBadge, colors.privacyPolicyNumberBadgeEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 27,
                    width: 27,
                    borderRadius: 13.5,
                    margin: 13,
                  }}
                >
                  <Text style={{ color: colors.privacyPolicyNumberText }}>1</Text>
                </LinearGradient>
                <View style={{ marginLeft: -5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17, color: colors.privacyPolicySectionTitle }}>
                    2. How we use your data
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: -7 }}>
                <View style={{ marginHorizontal: 15 }}>
                  <Text style={{ fontSize: 13  , color:colors.privacyPolicyBodyText}}>
                    We use the collected data to enhance your Chefster experience. This includes:
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 15,
                    marginRight: 20,
                    marginBottom: 13,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,

                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13  , color:colors.privacyPolicyBodyText}}>
                        Personalizing recipe recommendations based on your preferences.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13, color:colors.privacyPolicyBodyText }}>
                        Improving app functionality and developing new features.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13, color:colors.privacyPolicyBodyText }}>
                        Communicating important updates, newsletters, and promotional offers (which you can pop-out of).
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13, color:colors.privacyPolicyBodyText }}>
                        Analyzing user trends to better understand our community needs.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
           <View style={[styles.policyContainer, {backgroundColor: colors.privacyPolicySection , borderColor:colors.privacyPolicySectionBorder , shadowColor: colors.privacyPolicySectionShadow}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <LinearGradient
                  colors={[colors.privacyPolicyNumberBadge, colors.privacyPolicyNumberBadgeEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 27,
                    width: 27,
                    borderRadius: 13.5,
                    margin: 13,
                  }}
                >
                  <Text style={{ color: colors.privacyPolicyNumberText }}>3</Text>
                </LinearGradient>
                <View style={{ marginLeft: -5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17, color: colors.privacyPolicySectionTitle }}>
                    3. Your Rights
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: -7 }}>
                <View style={{ marginHorizontal: 15 }}>
                  <Text style={{ fontSize: 13  , color:colors.privacyPolicyBodyText}}>
                    You have full control over your data. Chefster respects your rights to:
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 15,
                    marginRight: 20,
                    marginBottom: 13,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,

                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13  , color:colors.privacyPolicyBodyText}}>
                        Access, update, or delete your personal information at any time via app settings.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13, color:colors.privacyPolicyBodyText }}>
                        Withdraw consent for data processing and opt-out of marketing communications.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 13,
                      gap: 10,
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={{ color: colors.privacyPolicyBulletPoint , fontSize: 20 }}>•</Text>
                    </View>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ fontSize: 13, color:colors.privacyPolicyBodyText }}>
                        Request a copy of your data in a portable format.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
                       <View style={[styles.policyContainer, {backgroundColor: colors.privacyPolicySection , borderColor:colors.privacyPolicySectionBorder , shadowColor: colors.privacyPolicySectionShadow}]}>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <LinearGradient
                  colors={[colors.privacyPolicyNumberBadge, colors.privacyPolicyNumberBadgeEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 27,
                    width: 27,
                    borderRadius: 13.5,
                    backgroundColor: '#FF5722',
                    margin: 13,
                  }}
                >
                  <Text style={{ color: 'white' }}>4</Text>
                </LinearGradient>
                <View style={{ marginLeft: -5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17, color: colors.privacyPolicySectionTitle }}>
                    4. Contact Us
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: -7, marginBottom: 10 }}>
                <View>
                  <View style={{ marginHorizontal: 15 }}>
                    <Text style={{color:colors.privacyPolicyContactText}}>
                      Object to the processing your data under certain circumstances.
                    </Text>
                  </View>

                  <View
                    style={{
                      marginHorizontal: 15,
                      flexDirection: 'row',
                      gap: 3,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Text style={{ fontSize: 13 , color:colors.privacyPolicyContactText }}>Email us at </Text>
                    <Pressable onPress={sendMail}>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          textDecorationColor:colors.privacyPolicyEmailLinkUnderline,
                          color: colors.privacyPolicyEmailLink,
                        }}
                      >
                        rnmhetre2608@gmail.com
                      </Text>
                    </Pressable>
                  </View>
                  <View style={{ marginHorizontal: 15 }}>
                    <Text style={{ fontSize: 13 , color:colors.privacyPolicyContactText }}>
                      We are commited to addressing your inquiries promptly.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: -10,
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 3,
          }}
        >
          <Text style={{ color:colors.privacyPolicyFooterText, fontSize: 13 }}>
            Questions? Reach out to us
          </Text>
          <Pressable onPress={sendMail}>
            <Text style={{ textDecorationLine: 'underline' , textDecorationColor:colors.privacyPolicyEmailLinkUnderline, color: colors.privacyPolicyFooterLink }}>
              rnmhetre2608@gmail.com
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsOfService;

const styles = StyleSheet.create({
  overlapingContainer: {
    backgroundColor: '#f5f5f5',
    marginTop: -85, // overlap amount
    zIndex: 20,
    elevation: 20,
    position: 'relative',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    flex: 1,
  },
  policyContainer: {
    marginVertical: 15,
    elevation: 7,
    height: 'auto',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 13,
    borderWidth:1
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',

    flex: 1,
    margin: 15,
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
