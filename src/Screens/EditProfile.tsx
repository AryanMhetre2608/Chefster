import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Icon from '../components/Icon';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from '../components/ImagePicker';
import Toast from '../components/Toast';
import { useTheme } from '../context/ThemeContext';
import { updateUserProfile } from '../redux/slice/userSlice';
import { RootState, AppDispatch } from '../redux/Store';
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isLoading } = useSelector((state: RootState) => state.User);

  const handleBackPress = () => {
    if (route.params?.from === 'Profile') {
      navigation.navigate('Profile');
    } else {
      navigation.goBack();
    }
  };

  const [fname, setFname] = useState('');
  const [mail, setMail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [nameError, setNameError] = useState('');
  const [mailError, setMailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [bioError, setBioError] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{uri: string} | null>(null);

  const { t } = useTranslation();
  


  // Initialize form with current user data - IMPROVED
  useEffect(() => {
    if (currentUser) {
      setFname(currentUser.name || '');
      setMail(currentUser.email || '');
      setPhoneNumber(currentUser.phoneNumber || '');
      setBio(currentUser.bio || '');
      // Reset selectedImage when user changes to show current profile image
      setSelectedImage(undefined);
    }
  }, [currentUser]);

  // IMPROVED HANDLE SAVE
  const handleSave = async () => {
    if (!fname || !mail || !phoneNumber || !bio) {
      Toast.error(`${t('Please fill all fields')}`);
      return;
    }

    if (nameError || mailError || phoneNumberError || bioError) {
      Toast.error(`${t('Please fix errors before saving')}`);
      return;
    }

    try {
      const profileData = {
        name: fname,
        phoneNumber: phoneNumber,
        bio: bio
      };

      // Handle image deletion or update
      let imageUri = undefined;
      if (selectedImage === null) {
        // User deleted the image
        imageUri = null;
        console.log('Saving profile with image deletion');
      } else if (selectedImage) {
        // User selected a new image
        imageUri = selectedImage.uri;
        console.log('Saving profile with new image:', imageUri);
      } else {
        // Keep existing image (selectedImage is undefined)
        console.log('Saving profile keeping existing image');
      }

      const updatedUser = await dispatch(updateUserProfile({ 
        profileData, 
        profileImageUri: imageUri 
      })).unwrap();
      
      console.log(`${t('Profile updated successfully')}`, updatedUser);
      Toast.success(`${t('Profile updated successfully')}`);
      navigation.goBack();
    } catch (error) {
      Toast.error(`${t('Failed to update profile')}`);
      console.error('Profile update error:', error);
    }
  };

  const handlePhoneNumber = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
    if (numericText.length < 10) {
      setPhoneNumberError(`${t('Please enter the 10 digit number')}`);
    } else {
      setPhoneNumberError('');
    }
  };

  const handleBio = (text: string) => {
    setBio(text);
    if (text.trim().length === 0) {
      setBioError(`${t('Bio cannot be empty')}`);
    } else {
      setBioError('');
    }
  };

  const handleMail = (text: string) => {
    setMail(text);
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(text)) {
      setMailError(`${t('Your mail is not valid')}`);
    } else {
      setMailError('');
    }
  };

  const handleFullName = (text: string) => {
    setFname(text);

    const name = text.trim();
    const parts = name.split(' ').filter(Boolean);

    if (name.length === 0) {
      setNameError(`${t('Full name cannot be empty')}`);
    } else if (parts.length !== 3) {
      setNameError(`${t('Enter name in format: Name FatherName Surname')}`);
    } else if (!/^[A-Za-z]+ [A-Za-z]+ [A-Za-z]+$/.test(name)) {
      setNameError(`${t('Only letters allowed with single spaces')}`);
    } else {
      setNameError('');
    }
  };

  const handleImagePick = (image: {uri: string} | null) => {
    if (image) {
      setSelectedImage(image);
      console.log('Profile image selected:', image.uri);
      Toast.success(`${'Profile image selected successfully'}`);
    } else {
      setSelectedImage(null);
      console.log(`${'Profile image removed'}`);
      Toast.success(`${'Profile image removed'}`);
    }
  };

  const openImagePicker = () => {
    setShowImagePicker(true);
  };

  // Show current profile image - FIXED WITH FILE EXISTENCE CHECK
  const getProfileImageUri = (): string | undefined => {
    if (selectedImage) {
      console.log('EditProfile: Using selected image:', selectedImage.uri);
      return selectedImage.uri;
    }
    if (currentUser?.profileImage) {
      let imageUri;
      // Check if the path already has a protocol
      if (currentUser.profileImage.startsWith('file://') || currentUser.profileImage.startsWith('content://')) {
        imageUri = currentUser.profileImage;
      } else {
        // Add file:// prefix for local paths
        imageUri = `file://${currentUser.profileImage}`;
      }
      console.log('EditProfile: Using current user image:', imageUri);
      return imageUri;
    }
    console.log('EditProfile: No profile image available');
    return undefined;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.editProfileContainer },
      ]}
    >
      <Header
        title={t('Edit Profile')}

        titleStyle={{fontWeight: 'bold', fontSize: 24 }}
        leftComponent={
          <Pressable onPress={handleBackPress}>
            <Icon type="Ionicons" name="arrow-back" size={24} color={colors.headerLeftComponent} />
          </Pressable>
        }
      />
      <ScrollView
        style={[
          styles.overlappingContainer,
          { backgroundColor: colors.editProfileOverlayContainer },
        ]}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.editProfileAvatarBorder,
              height: 150,
              width: 150,
              borderRadius: 75,
              backgroundColor: colors.editProfileAvatarPlaceholder,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getProfileImageUri() ? (
              <Image
                source={{ uri: getProfileImageUri() }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 75,
                }}
                resizeMode="cover"
                onError={(error) => {
                  console.log('EditProfile: Image load error:', error.nativeEvent.error);
                  console.log('EditProfile: Failed to load image URI:', getProfileImageUri());
                }}
                onLoad={() => {
                  console.log('EditProfile: Image loaded successfully:', getProfileImageUri());
                }}
              />
            ) : (
              <Icon
                type="Ionicons"
                name="person"
                size={60}
                color={colors.editProfileAvatarIcon || '#999'}
              />
            )}
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={openImagePicker}>
              <LinearGradient
                colors={[
                  colors.editProfileCameraButton,
                  colors.editProfileCameraButtonEnd,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 45,
                  height: 45,
                  marginLeft: 85,
                  marginTop: -44,
                  position: 'relative',
                  elevation: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 22.5,
                }}
              >
                <Icon
                  type="FontAwesome"
                  name="camera"
                  color={colors.editProfileCameraIcon}
                  size={22}
                />
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <View
          style={[
            styles.form,
            { backgroundColor: colors.editProfileFormBackground },
          ]}
        >
          <View style={{ width: '100%' }}>
            <View
              style={{ alignItems: 'flex-start', justifyContent: 'center' }}
            >
              <Text
                style={{ color: colors.editProfileFormLabel, fontSize: 17 }}
              >
                {t('Full Name')}
              </Text>
            </View>
            <TextInput
              value={fname}
              onChangeText={handleFullName}
              placeholder={t('Name FatherName Surname')}
              placeholderTextColor={colors.editProfileInputPlaceholder}
              style={[
                styles.textInputStyle,
                {
                  backgroundColor: colors.editProfileInputBackground,
                  borderColor: colors.editProfileInputBorder,
                  color: colors.editProfileInputText,
                },
                nameError
                  ? { borderColor: colors.editProfileInputBorderError }
                  : {},
              ]}
            />
            {nameError ? (
              <Text
                style={{ color: colors.editProfileErrorText, marginTop: 5 }}
              >
                {nameError}
              </Text>
            ) : null}
          </View>

          <View style={{ width: '100%', marginTop: 20 }}>
            <View
              style={{ alignItems: 'flex-start', justifyContent: 'center' }}
            >
              <Text
                style={{ color: colors.editProfileFormLabel, fontSize: 17 }}
              >
                {t('Email')}
              </Text>
            </View>
            {/* MADE EMAIL READ-ONLY */}
            <TextInput
              value={mail}
              onChangeText={handleMail}
              placeholder="john.smith@gmail.com"
              placeholderTextColor={colors.editProfileInputPlaceholder}
              style={[
                styles.textInputStyle,
                {
                  backgroundColor: colors.editProfileInputBackground,
                  borderColor: colors.editProfileInputBorder,
                  color: colors.editProfileInputText,
                  opacity: 0.7, // Make it look disabled
                },
                mailError
                  ? { borderColor: colors.editProfileInputBorderError }
                  : {},
              ]}
              editable={false} // Make email non-editable
            />
            <Text style={{ color: colors.editProfileFormLabel, fontSize: 12, marginTop: 2 }}>
              {t('Email cannot be changed')}
            </Text>
            {mailError ? (
              <Text
                style={{ color: colors.editProfileErrorText, marginTop: 5 }}
              >
                {mailError}
              </Text>
            ) : null}
          </View>

          <View style={{ width: '100%', marginTop: 20 }}>
            <View
              style={{ alignItems: 'flex-start', justifyContent: 'center' }}
            >
              <Text
                style={{ color: colors.editProfileFormLabel, fontSize: 17 }}
              >
               {t('Phone Number')}
              </Text>
            </View>
            <TextInput
              value={phoneNumber}
              keyboardType="numeric"
              onChangeText={handlePhoneNumber}
              maxLength={10}
              placeholder="+91 9876543210"
              placeholderTextColor={colors.editProfileInputPlaceholder}
              style={[
                styles.textInputStyle,
                {
                  backgroundColor: colors.editProfileInputBackground,
                  borderColor: colors.editProfileInputBorder,
                  color: colors.editProfileInputText,
                },
                phoneNumberError
                  ? { borderColor: colors.editProfileInputBorderError }
                  : {},
              ]}
            />
            {phoneNumberError ? (
              <Text
                style={{ color: colors.editProfileErrorText, marginTop: 5 }}
              >
                {phoneNumberError}
              </Text>
            ) : null}
          </View>

          <View style={{ width: '100%', marginTop: 20 }}>
            <View
              style={{ alignItems: 'flex-start', justifyContent: 'center' }}
            >
              <Text
                style={{ color: colors.editProfileFormLabel, fontSize: 17 }}
              >
                {t('Bio')}
              </Text>
            </View>
            <TextInput
              value={bio}
              onChangeText={handleBio}
              placeholder={t('Your Bio')}
              placeholderTextColor={colors.editProfileInputPlaceholder}
              style={[
                styles.textInputStyle,
                {
                  backgroundColor: colors.editProfileInputBackground,
                  borderColor: colors.editProfileInputBorder,
                  color: colors.editProfileInputText,
                },
                bioError
                  ? { borderColor: colors.editProfileInputBorderError }
                  : {},
              ]}
            />
            {bioError ? (
              <Text
                style={{ color: colors.editProfileErrorText, marginTop: 5 }}
              >
                {bioError}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={{
            width: '95%',
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
          }}
        >
          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              {
                width: '90%',
                opacity: pressed ? 0.85 : 1,
                elevation: 20,
              },
            ]}
          >
            <LinearGradient
              colors={[colors.editProfileSaveButton, colors.editProfileSaveButtonEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 50,
                width: '100%',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.editProfileSaveButtonText, fontSize: 18, fontWeight: 'bold' }}>
                {t('Save Changes')}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>

      {/* Image Picker Modal */}
      <ImagePicker
        visible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onPick={handleImagePick}
        showDelete={getProfileImageUri() !== undefined} // MODIFIED
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  overlappingContainer: {
    zIndex: 10,
    elevation: 20,
    position: 'relative',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    flex: 1,
  },
  form: {
    marginTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 30,
  },
  textInputStyle: {
    backgroundColor: '#D3D3D3',
    elevation: 7,
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 15,
  },
});
