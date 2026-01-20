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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import { removeFromFavorites } from '../redux/slice/favoritesSlice';
import Toast from '../components/Toast';
import LinearGradient from 'react-native-linear-gradient';

const Favourites = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute<any>();

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
      options: {
        animation: 'slide_from_bottom',
      },
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
                transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
              },
            ]}
          >
            <LinearGradient
              colors={['#FF8A00', '#FF6A00']}
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
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
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
              handleRemoveFromFavorites(item.id);
              Toast(`${item.name} Removed from the favourites`);
            }}
            style={({ pressed }) => [
              {
                borderRadius: 12,
                overflow: 'hidden',
                transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
              },
            ]}
          >
            <LinearGradient
              colors={['#ff6090', '#e91e63']}
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
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                Remove
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.mainContainer}>
      <Header
        title="Favourites"
        height={180}
        titleStyle={{ marginBottom: 65, fontWeight: 'bold', fontSize: 24 }}
      />

      <View style={styles.container}>
        <View style={{ marginTop: 15 }}>
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
    marginTop: -85,
    backgroundColor: 'white',

    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,

    // 🔥 ADD THESE
    zIndex: 10,
    elevation: 7,
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
