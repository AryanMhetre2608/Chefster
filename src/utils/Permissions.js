import { PermissionsAndroid , Platform , Alert , Linking } from "react-native";

//camera permission

export const requestCameraPermission = async () =>{
    try{
        const status = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
        )
        if(status === PermissionsAndroid.RESULTS.GRANTED){
            return true
        }
        if(status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN){
            Alert.alert(
                'Camera permission blocked',
                'Please enable camera permission from app settings.',
                [
                    {text: 'Cancel' , style:'cancel' },
                    {text: 'Open Settings' , onPress:Linking.openSettings}
                ]
            )
        }
        return false
    }catch(error){
        return false
    }
}



// gallery and storage permission 
export const requestGalleryPermission = async () => {
  try {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const status = await PermissionsAndroid.request(permission);

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Gallery Permission Blocked',
        'Please enable gallery permission from app settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: Linking.openSettings },
        ]
      );
    }

    return false;
  } catch (error) {
    return false;
  }
};