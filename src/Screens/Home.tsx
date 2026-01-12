import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  
} from 'react-native';
import React , {useRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import foodJson from '../Data/dataset.json'
import Button from '../Components/Button';
import Toast from '../Components/Toast';




const Home = () => {
  const navigation = useNavigation<any>();
  const cuisineList = foodJson.cuisineList

 

  const renderItems = ({ item }) => (
     

    <Pressable
      style={styles.subContainers}
      
      onPress={()=>{
        navigation.navigate(item.navigation)
        Toast(`Going to ${item.name} cuisine list`)

      }}
    >
    
      <Image source={{uri:item.image}} style={styles.cuisines} />

      <View style={styles.overlay} />

      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cuisineList}
        renderItem={renderItems}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainers: {
    width: '100%',
    height: 190,
    overflow: 'hidden',
  },
  cuisines: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    position: 'absolute',
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },
});
