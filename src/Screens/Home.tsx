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
import foodJson from '../data/dataset.json'
import Button from '../components/Button';
import Toast from '../components/Toast';
import LinearGradient from 'react-native-linear-gradient';




const Home = () => {
  const navigation = useNavigation<any>();
  const cuisineList = (foodJson as any).cuisineList

 

  const renderItems = ({ item }) => (
     

    <Pressable
      style={styles.subContainers}
      
      onPress={()=>{
        // navigation.navigate(item.navigation)
          navigation.navigate('AllCuisines', { cuisineType: item.name })

        Toast(`Going to ${item.name} cuisine list`)

      }}
    >
    
      <Image source={{uri:item.image}} style={styles.cuisines} />

      {/* <View style={styles.overlay} /> */}
      <LinearGradient colors={item.overlayColors} style={styles.gradient}/>

      <Text style={styles.text}>{item.name}</Text>
    </Pressable>  
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={cuisineList}
        renderItem={renderItems}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}  
        contentContainerStyle={{backgroundColor:"white"}}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  row:{
    justifyContent: 'space-between',

  },
  
  container: {
    backgroundColor:"white",
    flex: 1,
    margin:20,
    marginBottom:0
    
  },
  gradient:{
    position: 'absolute',
    bottom: 0,
    height: '55%',
    width: '100%',
  },
  subContainers: {
    width: '48.5%',
    height: 110,
    overflow: 'hidden',
    borderRadius:15,
    elevation:7,
    marginVertical:5,
    alignItems:"center",
    justifyContent:"center"
  },
  cuisines: {
    width: '100%',
    height: '100%',
  },
 
  text: {
    position: 'absolute',
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
});
