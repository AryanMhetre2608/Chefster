import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import Icon from '../Components/Icon'
import { useNavigation } from '@react-navigation/native'

const ContactUs = () => {
  const navigation= useNavigation<any>()
  return (
    <View style={styles.mainContainer}>
      <Header title='Contact Us' 
      subTitle='Have questions? Reach out to us.' 
      leftComponent={
        <Pressable onPress={() => navigation.goBack()}>
          <Icon type='Entypo' name='chevron-left' size={22}/>
        </Pressable>
      }/>
      <Text>ContactUs</Text>
    </View>
  )
}

export default ContactUs

const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  }
})