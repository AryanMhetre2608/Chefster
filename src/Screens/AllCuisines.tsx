import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../redux/slice/favoritesSlice';
import foodJson from '../data/dataset.json';
import Toast from '../components/Toast';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useTheme } from '../context/ThemeContext';

type RouteParams = {
  AllCuisines: {
    cuisineType?: string;
  };
};

type AllCuisinesRouteProp = RouteProp<RouteParams, 'AllCuisines'>;

const AllCuisines = () => {
  const { colors } = useTheme()
  const navigation = useNavigation<any>();
  const route = useRoute<AllCuisinesRouteProp>();
  const dispatch = useDispatch();
  
  // Get favorites from Redux store
  const favoriteRecipes = useSelector(
    (state: RootState) => state.Favourites.favoriteRecipes,
  );

  // Get the cuisine type from navigation params
  const cuisineType = route.params?.cuisineType || 'African';
  
  // Find the cuisine data based on the passed cuisineType
  const getCuisineData = () => {
    const cuisineMap = {
      'African': { dataKey: 'African', recipeKey: 'AfricanRecipes' },
      'American': { dataKey: 'American', recipeKey: 'AmericanRecipes' },
      'Asian': { dataKey: 'Asian', recipeKey: 'AsianRecipes' },
      'European': { dataKey: 'Europian', recipeKey: 'EuropianRecipes' },
      'Fusion': { dataKey: 'Fusion', recipeKey: 'FusionRecipes' },
      'Gluten Free': { dataKey: 'Gluten_Free', recipeKey: 'GlutenFreeRecipes' },
      'Keto': { dataKey: 'Keto', recipeKey: 'KetoRecipes' },
      'Mediterranean': { dataKey: 'Mediterranean', recipeKey: 'MediterraneanRecipes' },
      'Middle Eastern': { dataKey: 'Middle_Eastern', recipeKey: 'MiddleEasternRecipes' },
      'Oceanian': { dataKey: 'Oceanian', recipeKey: 'OceanianRecipes' },
      'Street Food': { dataKey: 'Street_Food', recipeKey: 'StreetFoodRecipes' },
      'Vegan': { dataKey: 'Vegan', recipeKey: 'VeganRecipes' },
    };

    const cuisine = cuisineMap[cuisineType];
    if (!cuisine) return { foodData: [], recipes: [] };
    
    const foodData = (foodJson as any).foodItems[cuisine.dataKey] || [];
    const recipes = (foodJson as any).recipes[0][cuisine.recipeKey] || [];
    
    return { foodData, recipes };
  };

  const { foodData, recipes } = getCuisineData();

  // Function to check if item is in favorites
  const isFavorite = (itemId: string) => {
    return favoriteRecipes.some(fav => fav.id === itemId);
  };

  // Function to toggle favorite
  const toggleFavorite = (item: any) => {
    const recipeId = item.navigation.replace('RecipeId', '');
    
    if (isFavorite(recipeId)) {
      // Remove from favorites
      dispatch(removeFromFavorites(recipeId));
      Toast.success(`${item.name} removed from favorites`);
    } else {
      // Add to favorites
      dispatch(
        addToFavorites({
          id: recipeId,
          name: item.name,
          image: item.image,
          cuisine: item.cuisine,
        }),
      );
      Toast.success(`${item.name} added to favorites`);
    }
  };

  const renderItemSetup = ({ item, index }: any) => {
    const recipe = recipes[index];
    const recipeId = item.navigation.replace('RecipeId', '');
    const isItemFavorite = isFavorite(recipeId);
    
    return (
      <TouchableOpacity
        style={[styles.foodItemContainer , {backgroundColor:colors.allCuisinesFoodItemContainer , borderColor:colors.allCuisinesFoodItemBorder , shadowColor:colors.allCuisinesFoodItemShadow}]}
        onPress={() => {
          navigation.navigate('UniversalRecipe', { recipeId: recipeId });
          Toast(`Going to recipe of ${item.name}`);
        }}
      >
        <View style={styles.foodItemContent}>
          <View style={[styles.imageContainer , {backgroundColor:colors.allCuisinesFoodImage , borderColor:colors.allCuisinesFoodImageBorder}]}>
            <Image
              source={{ uri: item.image }}
              style={styles.foodImage}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.foodInfoContainer}>
            <Text style={[styles.foodName , {color:colors.allCuisinesFoodName}]}>{item.name}</Text>
            <Text style={[styles.foodCategory , {color:colors.allCuisinesFoodCategory}]}>{item.category}</Text>
            <View style={[styles.prepTimeContainer , {backgroundColor:colors.allCuisinesPrepTimeContainer}]}>
              <Text style={styles.prepTimeText}>
                <Icon type='Feather' name='clock' size={12} color={colors.allCuisinesPrepTimeIcon}/> <Text style={{color:colors.allCuisinesPrepTimeText}}>{recipe?.prepTime || 'N/A'}</Text>
              </Text>
            </View>
          </View>
          
          {/* Favorite Icon Button */}
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item)}
          >
            <Icon 
              type="MaterialIcons" 
              name={isItemFavorite ? "favorite" : "favorite-border"} 
              size={24} 
              color={isItemFavorite ? colors.allCuisinesFavoriteIconActive : colors.allCuisinesFavoriteIconInactive}
            />
          </Pressable>
        </View>
       

      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.allCuisinesMainBackground}]}>
      <Header
        title={`${foodData[0]?.cuisine || cuisineType} Cuisine`}
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
        leftComponent={
          <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: 65 }}>
            <Icon type="Ionicons" name="arrow-back" size={24} />
          </Pressable>
        }
      />
      
      <ScrollView style={[styles.overlapingContent, {backgroundColor: colors.allCuisinesContentBackground}]}>
         <Text style={[styles.cuisineTitle , {color:colors.allCuisinesTitleText}]}>
          {foodData[0]?.cuisine || cuisineType} cuisine
        </Text>
        <FlatList
          data={foodData}
          keyExtractor={item => item.id}
          renderItem={renderItemSetup}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          contentContainerStyle={styles.foodList}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cuisineTitle:{
    
    marginLeft: 22,
    marginBottom: -15,
    fontWeight: '800',
    fontSize: 35,
    marginTop:10,
    color:"white"
  

  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlapingContent: {
    marginTop: -85,
    zIndex: 10,
    elevation: 20,
    position: 'relative',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    flex: 1,
  },
  foodList: {
    paddingBottom: 20,
    paddingTop: 30,
  },
  foodItemContainer: {
    borderWidth: 0.5,
    borderRadius: 15,
    width: '90%',
    height: 140,
    elevation: 7,
    padding: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    borderColor: 'white',
    marginLeft: 20,
    justifyContent: 'center',
  },
  foodItemContent: {
    flexDirection: 'row',
    margin: 10,
    width: '100%',
  },
  imageContainer: {
    width: '37%',
    height: '100%',
    marginRight: 20,
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius:14,
    borderWidth:1
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    overflow: 'hidden',
  },
  foodInfoContainer: {
    width: '45%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: -7,
  },
  foodName: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  foodCategory: {
    color: 'grey',
    fontSize: 16,
  },
  prepTimeContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 12.5,
  },
  prepTimeText: {
    fontSize: 12,
    color: '#333',
    
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 1,
    padding: 1,
  },
});

export default AllCuisines;
