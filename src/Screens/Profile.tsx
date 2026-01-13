import { Pressable, StyleSheet, Text, View, Alert  , Image} from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import Icon from '../components/Icon'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'
import ImagePicker from '../components/ImagePicker'

const Profile = () => {
  const { logout, user } = useAuth();
  const getNamePart = email => email?.split('@')[0] ?? '';
  const userName = getNamePart(user?.email)

  const [pickerVisible  , setPickerVisible] = useState(false)
  const [image , setImage] = useState(null)
  const navigation = useNavigation<any>();
  

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header 
        title='Profile' 
        leftComponent={
          <Pressable onPress={() => navigation.goBack()}>
            <Icon type='Entypo' name='chevron-left' size={22}/>
          </Pressable>
        }
      />
      
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {userName}!!!</Text>
        
       <View style={{alignItems:'center'}}>
        <Pressable onPress={()=>setPickerVisible(true)}>
          {image ? (<Image source={{uri: image.uri}} style={{height:120 , width:120 , borderRadius:60}}/>):(<View style={{height:120 , width:120 , borderRadius:60 ,borderWidth:0.5 , alignItems:"center" , justifyContent:"center"}}><Icon type='Feather' name='plus-circle' size={25}/></View>)}
        </Pressable>
        <Text style={{margin:10}}>Profile</Text>



        <ImagePicker
        visible={pickerVisible}
        showDelete={!!image}
        onClose={()=>setPickerVisible(false)}
        onPick={setImage}/>
       

          
       </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Icon type='MaterialIcons' name='logout' size={20} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7A00',
    marginBottom: 15,
  },
  contactInfo: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    lineHeight: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4444',
    padding: 15,
    borderRadius: 10,
    marginTop: 'auto',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})