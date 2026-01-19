
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';

const TermsOfService = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const handleBackPress = () => {
    if (route.params?.from === 'Profile') {
      navigation.navigate('Profile');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Terms of Service"
        leftComponent={
          <Pressable onPress={handleBackPress}>
            <Icon type="Ionicons" name="arrow-back" size={24} />
          </Pressable>
        }
      />
      <View style={styles.content}>
        <Text>Last updated: January 2025</Text>
        <View></View>
        <View></View>
        <View></View>
        <View></View>

        
      </View>
    </View>
  );
};

export default TermsOfService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin:15
    
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
});
