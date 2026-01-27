import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from '../components/ImagePicker';
import Toast from '../components/Toast';
import { useTheme } from '../context/ThemeContext';

const EditProfile = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { colors } = useTheme();

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

  const handleSave = () => {
    if (!fname || !mail || !phoneNumber || !bio) {
      Toast.error('Please fill all fields');
      return;
    }

    if (nameError || mailError || phoneNumberError || bioError) {
      Toast.error('Please fix errors before saving');
      return;
    }

    Toast.success('Information saved successfully');
    navigation.goBack();
  };

  const handlePhoneNumber = text => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
    if (numericText.length < 10) {
      setPhoneNumberError('Please enter the 10 digit number');
    } else {
      setPhoneNumberError('');
    }
  };
  const handleBio = text => {
    setBio(text);
    if (text.trim().length === 0) {
      setBioError('Bio cannot be empty');
    } else {
      setBioError('');
    }
  };

  const handleMail = text => {
    setMail(text);
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(text)) {
      setMailError('Your mail is not valid');
    } else {
      setMailError('');
    }
  };
  // const handleName = text => {
  //   setFname(text);
  //   const name = text.trim();
  //   if (name.length == 0) {
  //     setNameError('Full name cannot be enpty');
  //   } else if (name.length < 2) {
  //     setNameError('Full name must be at least of 2 characters');
  //   } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {
  //     setNameError('Only letters and single space is allowed');
  //   } else {
  //     setNameError('');
  //   }
  // };

  const handleFullName = text => {
    setFname(text);

    const name = text.trim();

    // Split by single/multiple spaces
    const parts = name.split(' ').filter(Boolean);

    if (name.length === 0) {
      setNameError('Full name cannot be empty');
    } else if (parts.length !== 3) {
      setNameError('Enter name in format: Name FatherName Surname');
    } else if (!/^[A-Za-z]+ [A-Za-z]+ [A-Za-z]+$/.test(name)) {
      setNameError('Only letters allowed with single spaces');
    } else {
      setNameError('');
    }
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.editProfileContainer },
      ]}
    >
      {/* <Header
        title="Edit Profile"
        leftComponent={
          <Pressable onPress={handleBackPress}>
            <Icon type="Ionicons" name="arrow-back" size={24} />
          </Pressable>
        }
      /> */}
      <Header
        title="Edit Profile"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
        leftComponent={
          <Pressable onPress={handleBackPress} style={{ marginBottom: 65 }}>
            <Icon type="Ionicons" name="arrow-back" size={24}  />
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
            }}
          ></View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={ImagePicker}>
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
                Full Name
              </Text>
            </View>
            <TextInput
              value={fname}
              onChangeText={handleFullName}
              placeholder="Name FatherName Surname"
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
                Email
              </Text>
            </View>
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
                },
                mailError
                  ? { borderColor: colors.editProfileInputBorderError }
                  : {},
              ]}
            />
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
                Phone Number
              </Text>
            </View>
            <TextInput
              value={phoneNumber}
              keyboardType="numeric"
              // onChangeText={setPhoneNumber}
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
                Bio
              </Text>
            </View>
            <TextInput
              value={bio}
              onChangeText={handleBio}
              placeholder="Your Bio"
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

                // Android
                elevation: 20,

                // iOS
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
                opacity:colors.editProfileSaveButtonPressed
              }}
            >
              <Text style={{ color: colors.editProfileSaveButtonText, fontSize: 18, fontWeight: 'bold' }}>
                Save Changes
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
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
    marginTop: -85, // overlap amount
    zIndex: 10,
    elevation: 20, // Android
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
