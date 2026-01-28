import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store';
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
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.User);

  const profileFeatures = (foodJson as any).profilepageFeatures;
  const navigation = useNavigation<any>();

  // Get profile image URI
  const getProfileImageUri = (): string | undefined => {
    if (currentUser?.profileImage) {
      return `file://${currentUser.profileImage}`;
    }
    return undefined;
  };

  // const handleLogout = () => {
  //   Alert.alert('Logout', 'Are you sure you want to logout?', [
  //     { text: 'Cancel', style: 'cancel' },
  //     {
  //       text: 'Logout',
  //       style: 'destructive',
  //       onPress: async () => {
  //         try {
  //           console.log('Starting logout process...');
  //           console.log('Current user before logout:', user?.email);

  //           await logout();

  //           console.log('Logout completed successfully');
  //         } catch (error) {
  //           console.error('Logout failed:', error);
  //           Alert.alert('Error', 'Failed to logout. Please try again.');
  //         }
  //       },
  //     },
  //   ]);
  // };

  // const handleRefresh = () => {
  //   console.log(
  //     'Current auth state:',
  //     user ? `Logged in as ${user.email}` : 'Not logged in',
  //   );
  //   Alert.alert(
  //     'Auth State',
  //     user ? `Logged in as: ${user.email}` : 'Not logged in',
  //   );
  // };

  return (
    // <View style={styles.mainContainer}>
    //   <Header title={'Profile'} />
    //   {/* <View style={styles.content}>
    //     <Text style={styles.title}>Profile</Text>

    //     {user ? (
    //       <>
    //         <Text style={styles.email}>{user.email}</Text>
    //         <Text style={styles.status}>
    //           {user.emailVerified
    //             ? '✅ Email Verified'
    //             : '⚠️ Email Not Verified'}
    //         </Text>

    //         <TouchableOpacity
    //           style={styles.refreshButton}
    //           onPress={handleRefresh}
    //         >
    //           <Text style={styles.refreshButtonText}>Check Auth State</Text>
    //         </TouchableOpacity>

    //         <TouchableOpacity
    //           style={styles.logoutButton}
    //           onPress={handleLogout}
    //         >
    //           <Text style={styles.logoutButtonText}>Logout</Text>
    //         </TouchableOpacity>
    //       </>
    //     ) : (
    //       <>
    //         <Text style={styles.notLoggedIn}>Not logged in</Text>
    //         <TouchableOpacity
    //           style={styles.refreshButton}
    //           onPress={handleRefresh}
    //         >
    //           <Text style={styles.refreshButtonText}>Check Auth State</Text>
    //         </TouchableOpacity>
    //       </>
    //     )}
    //   </View> */}
    //   <View style={styles.subContainer}>
    //     <View style={styles.profileContainer}></View>
    //     <Text>Name</Text>
    //     <Text>Email</Text>
    //     <View style={{margin:20}}>
    //        <FlatList
    //       data={profileFeatures}
    //       keyExtractor={item => item.id}
    //       renderItem={renderItemsFeatures}
    //       showsVerticalScrollIndicator={false}
    //     />

    //     </View>
    //   </View>
    // </View>

    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Profile"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
        rightComponent={
          <Icon
            type="AntDesign"
            name="edit"
            color={colors.headerRightComponent}
          />
        }
        onRightPress={() => navigation.navigate('EditProfile')}
        rightComponentContainerStyle={{ marginBottom: '100%' }}
      />
      <View
        style={[
          styles.profileContainer,
          { backgroundColor: colors.background },
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
                backgroundColor: colors.profileAvatar,
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
                    color={colors.profileAvatarIcon || '#999'}
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
                color: colors.profileName,
                fontSize: 25,
              }}
            >
              {currentUser?.name || 'User Name'}
            </Text>
            <Text style={{ color: colors.profileEmail, marginTop: 5 }}>
              {currentUser?.email || 'user@example.com'}
            </Text>
            {/* {currentUser?.phoneNumber ? (
            <Text style={{ color: colors.profilePhone || colors.profileEmail, fontSize: 12, marginTop: 2 }}>
              {currentUser.phoneNumber}
            </Text>
          ) : null} */}
            {currentUser?.bio ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop:30  }}>
                <View style={{margin:20 , justifyContent:"center"}}>
                  <Text>Bio</Text>
                  <Text
                    style={{
                      color: colors.profileBio || colors.profileEmail,
                      fontSize: 12,
                      marginTop: 4,
                      textAlign: 'center',
                      paddingHorizontal: 20,
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    margin: 0,
    marginTop: -85,
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
    // backgroundColor will be set inline with theme colors
    flex: 1,
  },
  featureContainer: {
    margin: 20,
  },
});

export default Profile;
