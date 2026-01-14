import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';


const ContactUs = () => {
  
  

  
  return (
    <View style={styles.mainContainer}>
      <Header
        title="Contact Us"
        subTitle="Stay Connected"
       
      />

      <View style={styles.container}>
        <Text>Contact us</Text>
        
      </View>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
   container: {
    flex: 1,
  },
  
});
