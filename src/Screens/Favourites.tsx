import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFavorites } from '../hooks/useFavorites';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import Toast from '../components/Toast';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const Favourites = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { favorites, removeFromFavoritesList } = useFavorites();
  const { currentUser } = useSelector((state: RootState) => state.User);

  // Log favorites when component mounts or favorites change
  useEffect(() => {
    if (currentUser) {
      console.log(`\n=== FAVORITES SCREEN FOR ${currentUser.email} ===`);
      console.log(`👤 Current User: ${currentUser.name} (${currentUser.email})`);
      console.log(`📊 Total Favorites: ${favorites.length}`);
      if (favorites.length > 0) {
        console.log('🍽️ Favorite Recipes:');
        favorites.forEach((recipe, index) => {
          console.log(`  ${index + 1}. ${recipe.name} (${recipe.cuisine}) - ID: ${recipe.id}`);
        });
      } else {
        console.log('📭 No favorite recipes yet');
      }
      console.log('=== END FAVORITES ===\n');
    } else {
      console.log('\n=== FAVORITES SCREEN (NO USER LOGGED IN) ===');
      console.log(`📊 Local Favorites: ${favorites.length}`);
      console.log('=== END FAVORITES ===\n');
    }
  }, [favorites, currentUser]);

  const handleRemoveFromFavorites = async (recipeId: string, recipeName: string) => {
    try {
      await removeFromFavoritesList(recipeId);
      Toast(`${recipeName} Removed from the favourites`);
    } catch (error) {
      Toast.error('Failed to remove from favorites');
      console.error('Remove favorites error:', error);
    }
  };

  const handleViewRecipe = (recipeId: string) => {
    const id = String(recipeId);

    // Navigate to the universal recipe screen
    navigation.navigate('Home', {
      screen: 'UniversalRecipe',
      params: { recipeId: id },
      options: {
        animation: 'slide_from_bottom',
      },
    });
  };

  const renderFavoriteItem = ({ item }: any) => (
    <Pressable
      style={({ pressed }) => [
        styles.favoriteCard,
        {
          backgroundColor: pressed
            ? colors.favouritesCardPressed
            : colors.favouritesCardContainer,
          borderColor: colors.favouritesCardBorder,
          shadowColor: colors.favouritesCardShadow,
        },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[
          styles.recipeImage,
          { backgroundColor: colors.favouritesRecipeImage },
        ]}
      />
      <View style={styles.recipeInfo}>
        <Text
          style={[styles.recipeName, { color: colors.favouritesRecipeTitle }]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.recipeCuisine,
            { color: colors.favouritesRecipeSubtitle },
          ]}
        >
          {item.cuisine}
        </Text>

        {/* Remove Button */}
        <View style={styles.Buttons}>
          {/* <Pressable
            onPress={() => handleViewRecipe(item.id)}
          >
            <LinearGradient
              colors={['#FF8A00', '#FF6A00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>View</Text>
            </LinearGradient>
          </Pressable> */}
          <Pressable
            onPress={() => handleViewRecipe(item.id)}
            style={({ pressed }) => [
              {
                borderRadius: 12,
                overflow: 'hidden',
                transform: [{ scale: pressed ? 0.98 : 1 }],
                shadowColor:colors.favouritesButtonShadow
                
              },
            ]}
          >
            <LinearGradient
              colors={[colors.gradient1, colors.gradient2,]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 36, // button height
                width: 150, // button width
                borderRadius: 10, // make corners rounded
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.favouritesViewButtonText, fontWeight: '600', fontSize: 16 }}>
                View
              </Text>
            </LinearGradient>
          </Pressable>

          {/* <Pressable
            style={[styles.removeButton, { backgroundColor: '#e91e63' }]}
            onPress={() => {
              handleRemoveFromFavorites(item.id);
              Toast(`${item.name} Removed from the favourites`);
            }}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </Pressable> */}
          <Pressable
            onPress={() => {
              handleRemoveFromFavorites(item.id, item.name);
            }}
            style={({ pressed }) => [
              {
                borderRadius: 12,
                overflow: 'hidden',
                transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                shadowColor:colors.favouritesButtonShadow,
                opacity: pressed ? parseFloat(colors.favouritesButtonPressed) : 1

                
              },
            ]}
          >
            <LinearGradient
              colors={[colors.removeButtonGradient1, colors.removeButtonGradient1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 36, // button height
                width: 150, // button width
                borderRadius: 10, // make corners rounded
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.favouritesRemoveButtonText, fontWeight: '600', fontSize: 16 }}>
                Remove
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: colors.favouritesEmptyBackground },
      ]}
    >
      <Header
        title="Favourites"
        titleStyle={{fontWeight: 'bold', fontSize: 24 }}
      />

      <View
        style={[
          styles.container,
          { backgroundColor: colors.favouritesContentBackground },
        ]}
      >
        <View style={{ marginTop: 15 , flex:1 }}>
          {favorites.length === 0 ? (
            <View style={[styles.emptyContainer,{ backgroundColor: colors.favouritesContentBackground }]}>
              <Text style={styles.emptyText  }>No favorite recipes yet!</Text>
            </View>
          ) : (
            <FlatList
              data={favorites}
              renderItem={renderFavoriteItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
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
    margin: 0,
    backgroundColor: 'white',

    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,

    // 🔥 ADD THESE
    zIndex: 10,
    
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
    borderWidth: 1,
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
    // backgroundColor: '#e91e63',
    backgroundColor: '#FF5722',
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
