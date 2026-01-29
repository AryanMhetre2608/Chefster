import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import Header from '../components/Header';
import Icon from '../components/Icon';
import foodJson from '../data/dataset.json';
import { useTheme } from '../context/ThemeContext';

// Helper function to get the correct icon color for each profile feature
const getProfileFeatureIconColor = (featureName: string, colors: any) => {
  switch (featureName) {
    case 'Edit Profile':
      return colors.profileEditIcon;
    case 'My Favourites':
      return colors.profileFavoriteIcon;
    case 'About App':
      return colors.profileAboutIcon;
    case 'Privacy Policy':
      return colors.profilePrivacyIcon;
    case 'Settings':
      return colors.profileSettingsIcon;
    case 'Logout':
      return colors.profileLogoutIcon;
    default:
      return colors.icon;
  }
};

const Profile = () => {
  const { colors } = useTheme();
  const { currentUser } = useSelector((state: RootState) => state.User);

  const profileFeatures = (foodJson as any).profilepageFeatures;
  const navigation = useNavigation<any>();

  // Get profile image URI - FIXED WITH LOGGING
  const getProfileImageUri = (): string | undefined => {
    if (currentUser?.profileImage) {
      let imageUri;
      // Check if the path already has a protocol
      if (currentUser.profileImage.startsWith('file://') || currentUser.profileImage.startsWith('content://')) {
        imageUri = currentUser.profileImage;
      } else {
        // Add file:// prefix for local paths
        imageUri = `file://${currentUser.profileImage}`;
      }
      console.log('Profile: Using profile image:', imageUri);
      return imageUri;
    }
    console.log('Profile: No profile image available');
    return undefined;
  };

  // Render profile feature items
  const renderProfileFeature = ({ item }: { item: any }) => (
    <Pressable
      style={[
        styles.profileFeatures,
        {
          backgroundColor: colors.profileFeatureItem,
          borderColor: colors.profileFeatureItemBorder,
        },
      ]}
      onPress={() => {
        if (item.screenName) {
          navigation.navigate(item.screenName);
        }
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: colors.profileFeatureIconContainer,
              padding: 8,
              borderRadius: 8,
              marginRight: 15,
            }}
          >
            <Icon
              type={item.iconType}
              name={item.iconName}
              size={20}
              color={getProfileFeatureIconColor(item.name, colors)}
            />
          </View>
          <Text
            style={{
              color: colors.profileFeatureText,
              fontSize: 16,
              fontWeight: '500',
            }}
          >
            {item.name}
          </Text>
        </View>
        <Icon
          type="AntDesign"
          name="right"
          size={16}
          color={colors.profileFeatureChevron}
        />
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.profileMainBackground }]}>
      <Header
        title="Profile"
        titleStyle={{fontWeight: 'bold', fontSize: 24 }}
        rightComponent={
          <Icon
            type="AntDesign"
            name="edit"
            color={colors.headerRightComponent}
          />
        }
        onRightPress={() => navigation.navigate('EditProfile')}
      />
      <View
        style={[
          styles.profileContainer,
          { backgroundColor: colors.profileContentBackground },
        ]}
      >
        <View style={{ marginTop: 30 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                height: 120,
                width: 120,
                borderRadius: 60,
                borderWidth: 0.5,
                backgroundColor: colors.profileAvatarPlaceholder,
                borderColor: colors.profileAvatarBorder,
                overflow: 'hidden',
              }}
            >
              {getProfileImageUri() ? (
                <Image
                  source={{ uri: getProfileImageUri() }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 60,
                  }}
                  resizeMode="cover"
                  onError={(error) => {
                    console.log('Profile: Image load error:', error.nativeEvent.error);
                    console.log('Profile: Failed to load image URI:', getProfileImageUri());
                  }}
                  onLoad={() => {
                    console.log('Profile: Image loaded successfully:', getProfileImageUri());
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    type="Ionicons"
                    name="person"
                    size={50}
                    color={colors.profileAvatarIcon}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                alignContent: 'center',
                color: colors.profileUserName,
                fontSize: 25,
              }}
            >
              {currentUser?.name || 'User Name'}
            </Text>
            <Text style={{ color: colors.profileUserEmail, marginTop: 5 }}>
              {currentUser?.email || 'user@example.com'}
            </Text>
            {currentUser?.bio ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  width: '100%',
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    margin: 20,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: colors.profileFeatureItemBorder,
                    width: '80%',
                    borderRadius: 20,
                    elevation: 10,
                    backgroundColor: colors.profileUserInfoContainer,
                    marginBottom: 100,
                  }}
                >
                  <Text
                    style={{
                      paddingTop: 15,
                      paddingHorizontal: 20,
                      fontSize: 18,
                      fontWeight: '600',
                      color: colors.profileUserName,
                    }}
                  >
                    Bio
                  </Text>

                  <Text
                    style={{
                      color: colors.profileUserBio,
                      fontSize: 13,
                      lineHeight: 20, // ✅ space between lines
                      paddingHorizontal: 20,
                      paddingTop: 8,
                      paddingBottom: 16, // ✅ space below last line
                    }}
                  >
                    {currentUser.bio}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>

         
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor will be set inline with theme colors
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  profileContainer: {
    flex: 1,
    margin: 0,
    // backgroundColor will be set inline with theme colors
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    zIndex: 10,
    elevation: 7,
  },
  profileFeatures: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
    elevation: 7,
    borderWidth: 1,
    borderRadius: 15,
    // backgroundColor and borderColor will be set inline with theme colors
    flex: 1,
  },
  featureContainer: {
    margin: 20,
    marginTop: 10,
  },
});

export default Profile;
