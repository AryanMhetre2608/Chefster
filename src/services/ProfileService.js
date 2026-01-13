import auth from '@react-native-firebase/auth'
import firestore, { serverTimestamp } from '@react-native-firebase/firestore'
import stotage from '@react-native-firebase/storage'


export const uploadProfilePicture = async (iamgeUri) =>{
    const user = auth().currentUser
    if(!user) throw new Error('User not authenticated')

    const storageRef = stotage().ref(`profile_pictures/${user.uid}/profile.jpg`)
    await storageRef.putFile(iamgeUri)
    return await storageRef.getDownloadURL()
}

export const saveProfilePictureUrl = async (downloadURL) =>{
    const user = auth().currentUser
    if(!user) throw new Error('User not authenticated')

    await firestore()
    .collection('users')
    .doc(user.uid)
    .update({
        profilePictureUrl: downloadURL,
        updateAt: firestore.FieldValue.serverTimestamp()
    })
}

export const getUserProfilePicture = async () =>{
    const user = auth().currentUser
    if (!user) return null

    const userDoc = await firestore()
    .collection('users')
    .doc(user.uid)
    .get()

    return userDoc.data()?.profilePictureUrl || null;
}