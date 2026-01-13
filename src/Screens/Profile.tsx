import { Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import Icon from '../Components/Icon'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const navigation = useNavigation<any>();
  const { logout, user } = useAuth();

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
        <Text style={styles.welcomeText}>Welcome, {user?.email}!</Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <Text style={styles.contactText}>📧 Email: support@chefster.com</Text>
          <Text style={styles.contactText}>📞 Phone: +1 (555) 123-4567</Text>
          <Text style={styles.contactText}>🌐 Website: www.chefster.com</Text>
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