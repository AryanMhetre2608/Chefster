import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import foodJson from '../../Data/dataset.json'
import Toast from '../../components/Toast';
import Header from '../../components/Header';
import Icon from '../../components/Icon';



const Vegan = () => {
    const navigation = useNavigation<any>();
    const foodData = (foodJson as any).foodItems.Vegan


  
  const renderItemSetup = ({ item }: any) => (
    <TouchableOpacity
      style={{
        borderWidth: 0.5,
        borderRadius: 15,
        width: '45%',
        height: 250,
        elevation: 5,
        padding: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop:10,
      }}
      onPress={() => {
        const recipeId = item.navigation.replace('RecipeId', '')
        navigation.navigate('UniversalRecipe', { recipeId: recipeId })
        Toast(`Going to recipe of ${item.name}`)
      }}
    >
        <View style={{ width: '100%', height: '70%'  }}>
      <Image
        source={{uri: item.image}}
        style={{ width: '100%', height: '100%', borderRadius: 15, overflow: 'hidden' }}
        resizeMode="stretch"
      />
      </View>
      <View style={{ marginTop:10 , height:"30%"}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'gray',
            textAlign: 'center',
            marginTop: 5,
          }}
        >
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Header
      title={foodData[0]?.cuisine}
      leftComponent={
        <Pressable onPress={() => navigation.goBack()}>
            <Icon type='Entypo' name='chevron-left' size={24}/>
          </Pressable>
      }
      
      />
      <FlatList
        data={foodData}
        keyExtractor={item => item.id}
        renderItem={renderItemSetup}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      />
    </View>
  );
};

export default Vegan;
