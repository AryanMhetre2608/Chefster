import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
    const navigation = useNavigation<any>()
  return (
    <View style={styles.container}>
      <Header
        title="Settings"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
      />
      <View style={styles.overlappingContainer}>
        <View
          style={{
            marginTop: 50,
            width: '90%',
            height: 20,
            marginVertical: 20,
            gap:15
          }}
        >
          <Pressable
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 65,
              borderRadius: 20,
              elevation: 10,
              flexDirection:"row"
            }}
            onPress={()=>navigation.navigate('ChangePassword')}
          >
            <View style={{alignItems:"center" , justifyContent:"center" , width:"18%" , height:"100%"}}>
              <Icon
                type="FontAwesome"
                name="lock"
                color="grey"
                size={31}
              />
            </View>
            <View style={{alignItems:"flex-start" , justifyContent:"center" , width:"82%" , height:"100%"}}>
                <Text style={{fontWeight:'bold' , color:"grey" , fontSize:18}}>Change Password</Text>

            </View>
          </Pressable>
           <Pressable
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 65,
              borderRadius: 20,
              elevation: 10,
              flexDirection:"row"
            }}
          >
            <View style={{alignItems:"center" , justifyContent:"center" , width:"18%" , height:"100%"}}>
              <Icon
                type="Ionicons"
                name="moon-sharp"
                color="grey"
                size={31}
              />
            </View>
            <View style={{alignItems:"flex-start" , justifyContent:"center" , width:"82%" , height:"100%"}}>
                <Text style={{fontWeight:'bold' , color:"grey" , fontSize:18}}>Dark Mode</Text>

            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlappingContainer: {
    alignItems: 'center',

    flex: 1,
    marginTop: -85,
    backgroundColor: 'white',

    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,

    // 🔥 ADD THESE
    zIndex: 10,
    elevation: 7,
  },
});
