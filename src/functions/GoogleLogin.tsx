// import {GoogleSignin} from '@react-native-google-signin/google-signin'
// GoogleSignin.configure({
//     webClientId: '402929012682-resln07nqincrh22s64ujltod9u4ehm5.apps.googleusercontent.com'
// })

// export const googleLogin = async () => {
//   try {
//     await GoogleSignin.hasPlayServices({
//       showPlayServicesUpdateDialog: true,
//     });

//     const { idToken } = await GoogleSignin.signIn();

//     if (!idToken) {
//       throw new Error('No ID token returned');
//     }

//     const googleCredential =
//       auth.GoogleAuthProvider.credential(idToken);

//     const userCredential =
//       await auth().signInWithCredential(googleCredential);

//     return userCredential.user;
//   } catch (error) {
//     console.log('Google Login Error:', error);
//     throw error;
//   }
// };


import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// configure ONCE
GoogleSignin.configure({
  webClientId:
    '402929012682-resln07nqincrh22s64ujltod9u4ehm5.apps.googleusercontent.com',
});

export const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const { idToken } = await GoogleSignin.signIn();

    if (!idToken) {
      throw new Error('No ID token returned');
    }

    const googleCredential =
      auth.GoogleAuthProvider.credential(idToken);

    const userCredential =
      await auth().signInWithCredential(googleCredential);

    return userCredential.user;
  } catch (error) {
    console.log('Google Login Error:', error);
    throw error;
  }
};
