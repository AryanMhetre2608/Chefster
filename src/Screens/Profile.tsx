import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
// import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/Store';
// import {
//   addToFavorites,
//   removeFromFavorites,
// } from '../redux/slice/favoritesSlice';
// import foodJson from '../data/dataset.json';
// import Toast from '../components/Toast';
import Header from '../components/Header';
import Icon from '../components/Icon';
import foodJson from '../data/dataset.json';
import { useNavigation } from '@react-navigation/native';
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
  // const { user, logout } = useAuth();
  const { colors } = useTheme()

  const profileFeatures = (foodJson as any).profilepageFeatures;
  const navigation = useNavigation<any>();

  const renderItemsFeatures = ({ item }: { item: any }) => {
    const handlePress = () => {
      if (item.navigations === 'Favourites') {
        navigation.navigate('Home', { 
          screen: 'Favourites',
          params: { from: 'Profile' }
        });
      } else if (item.navigations === 'EditProfile' || item.navigations === 'AboutUs' || item.navigations === 'PrivacyPolicy'||item.navigations === 'Logout'||item.navigations === 'Settings') {
        navigation.navigate('Home', { 
          screen: item.navigations,
          params: { from: 'Profile' }
        });
      } else if (item.navigations) {
        navigation.navigate(item.navigations, { from: 'Profile' });
      }
    };

    return (
      <Pressable
        style={[styles.profileFeatures, {
          backgroundColor: colors.profileFeatureBackground,
          borderColor: colors.profileFeatureBorder,
          shadowColor: colors.profileFeatureShadow,
        }]}
        onPress={handlePress}
      >
        <View
          style={{
            margin: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            backgroundColor: colors.profileFeatureBackground,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              marginLeft: 15,
            }}
          >
            {item.leftIconName ? (
              <Icon
                name={item.leftIconName}
                size={Number(item.leftIconSize) || 24}
                type={item.leftIconType}
                color={getProfileFeatureIconColor(item.name, colors)}
              />
            ) : null}
            <Text style={{ fontSize: 16 , color:colors.profileFeatureText }}>{item.name}</Text>
          </View>

          <View style={{ marginRight: 15 }}>
            {item.rightIconName ? (
              <Icon
                name={item.rightIconName}
                size={Number(item.rightIconSize) || 24}
                type={item.rightIconType}
                color={colors.profileChevronIcon}
              />
            ) : null}
          </View>
        </View>
      </Pressable>
    );
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

    <View style={[styles.container , {backgroundColor:colors.background}]}>
      <Header
        title="Profile"
        
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
      />
      <View style={[styles.profileContainer , {backgroundColor:colors.background}]} >
        <View style={{marginTop:30}}>
          <View style={{alignItems:"center" , justifyContent:"center"}}>
            <View
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
            borderWidth: 0.5,
            backgroundColor: colors.profileAvatar,
            borderColor: colors.profileAvatarBorder,
          }}
        ></View>
          </View>
          
        <View style={styles.infoContainer}>
        <Text style={{ fontWeight: 'bold', alignContent: 'center', color: colors.profileName }}>Name</Text>
        <Text style={{ color: colors.profileEmail }}>Email</Text>
      </View>
      <View style={styles.featureContainer}>
        <FlatList
          data={profileFeatures}
          keyExtractor={item => item.id}
          renderItem={renderItemsFeatures}
          showsVerticalScrollIndicator={false}
        />
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
  infoContainer:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:20
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
    flex:1
  },
  featureContainer:{
    margin:20
  }
});

export default Profile;
