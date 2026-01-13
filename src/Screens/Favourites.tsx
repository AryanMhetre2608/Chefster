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
import Icon from '../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import { removeFromFavorites } from '../redux/Slice/favoritesSlice';
import Toast from '../components/Toast';

const Favourites = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(
    (state: RootState) => state.Favourites.favoriteRecipes,
  );

  const handleRemoveFromFavorites = (recipeId: string) => {
    dispatch(removeFromFavorites(recipeId));
  };

  const handleViewRecipe = (recipeId: string) => {
    const id = String(recipeId);
    
    // Navigate to the universal recipe screen
    navigation.navigate('Home', {
      screen: 'UniversalRecipe',
      params: { recipeId: id },
      options:{
        animation:'slide_from_bottom'
      }
      
    });
  };

  const renderFavoriteItem = ({ item }: any) => (
    <Pressable style={styles.favoriteCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <Text style={styles.recipeCuisine}>{item.cuisine}</Text>

        {/* Remove Button */}
        <View style={styles.Buttons}>
          

          <Pressable
            style={styles.removeButton}
            onPress={() => handleViewRecipe(item.id)}
          >
            <Text style={styles.removeButtonText}>View</Text>
          </Pressable>
          <Pressable
            style={[styles.removeButton, { backgroundColor: '#1E90FF' }]}
            onPress={() => {
              handleRemoveFromFavorites(item.id);
              Toast(`${item.name} Removed from the favourites`);
            }}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.mainContainer}>
      <Header
        title="Favourites"
        subTitle="Recipes you love!!!"
        leftComponent={
          <Pressable onPress={() => navigation.goBack()}>
            <Icon type="Entypo" name="chevron-left" size={22} />
          </Pressable>
        }
      />

      <View style={styles.container}>
        {favoriteRecipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorite recipes yet!</Text>
          </View>
        ) : (
          <FlatList
            data={favoriteRecipes}
            renderItem={renderFavoriteItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  favoriteCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeInfo: {
    padding: 16,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  recipeCuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  removeButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  Buttons: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
