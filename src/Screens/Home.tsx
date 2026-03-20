import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React , {useRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import foodJson from '../data/dataset.json'
import Button from '../components/Button';
import Toast from '../components/Toast';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';





const Home = () => {
  const { colors } = useTheme()
  const navigation = useNavigation<any>();
  const cuisineList = (foodJson as any).cuisineList


  const getGreeting = () =>{
    const currentHr = new Date().getHours()

    if (currentHr>=5 && currentHr < 12){
      return "Good Morning!"
    }
    else if (currentHr >= 12 && currentHr <17){
      return "Good Afternoon!"

    }
    else if (currentHr >= 17 && currentHr < 21){
      return 'Good Evening!'

    } 
    else{
      return 'Good Night!'
    }
  }

 

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

      <Text style={[styles.text , {color:colors.cuisineTagText}]}>{item.name}</Text>
    </Pressable>  
  );

  return (
    <View style={[styles.container , {backgroundColor:colors.background}]}>
      <Header
        title="Chefster"
        showUserAvatar={true}
        titleStyle={{fontWeight: 'bold', fontSize: 24 }}
        onAvatarPress={()=>navigation.navigate('Profile')}
        
      />
      <ScrollView style={[styles.overlappingContainer, {backgroundColor:colors.background}]} showsVerticalScrollIndicator={false}>
        <View style={{margin:15, marginTop: 15 , paddingBottom:80}}>
          <View style={{height:'auto' , width:'100%' , marginVertical:15 , justifyContent:'center' , alignItems:'flex-start' }}>
            <View><Text style={{ fontSize: 24, fontWeight: "bold"  , color:colors.greetingText}}>{getGreeting()}</Text></View>
          </View>
          <FlatList
          data={cuisineList}
          renderItem={renderItems}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}  
          contentContainerStyle={{backgroundColor:colors.background}}
          scrollEnabled={false}
        />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  row:{
    justifyContent: 'space-between',

  },
  
  container: {
    flex: 1,
    margin:0,
    marginBottom:0
    
  },
  overlappingContainer: {
    zIndex: 10,
    elevation: 20,
    position: 'relative',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    flex: 1,
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
