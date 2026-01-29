import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../redux/slice/userSlice';
import { addToFavorites, removeFromFavorites } from '../redux/slice/favoritesSlice';

interface Recipe {
  id: string;
  name: string;
  image: string;
  cuisine: string;
}

export const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.User);
  const { favoriteRecipes } = useSelector((state: RootState) => state.Favourites);

  // Get favorites based on whether user is logged in
  const getFavorites = () => {
    if (currentUser) {
      const userFavorites = currentUser.favoriteRecipes || [];
      console.log(`📋 Getting favorites for ${currentUser.email}: ${userFavorites.length} recipes`);
      return userFavorites;
    }
    console.log(`📋 Getting local favorites (no user logged in): ${favoriteRecipes.length} recipes`);
    return favoriteRecipes;
  };

  // Check if recipe is favorite
  const isRecipeFavorite = (recipeId: string) => {
    const favorites = getFavorites();
    return favorites.some(recipe => recipe.id === recipeId);
  };

  // Add recipe to favorites
  const addToFavoritesList = async (recipe: Recipe) => {
    try {
      if (currentUser) {
        console.log(`🍽️ Adding "${recipe.name}" to favorites for user: ${currentUser.email}`);
        // User is logged in - use user slice
        await dispatch(addRecipeToFavorites(recipe)).unwrap();
        console.log(`✅ Successfully added "${recipe.name}" to favorites for ${currentUser.email}`);
        console.log(`📊 ${currentUser.email} now has ${(currentUser.favoriteRecipes || []).length + 1} favorite recipes`);
      } else {
        console.log(`🍽️ Adding "${recipe.name}" to local favorites (no user logged in)`);
        // User not logged in - use favorites slice
        dispatch(addToFavorites(recipe));
        console.log(`✅ Successfully added "${recipe.name}" to local favorites`);
      }
    } catch (error) {
      console.error('❌ Error adding to favorites:', error);
      throw error;
    }
  };

  // Remove recipe from favorites
  const removeFromFavoritesList = async (recipeId: string) => {
    try {
      if (currentUser) {
        const recipeToRemove = currentUser.favoriteRecipes?.find(r => r.id === recipeId);
        const recipeName = recipeToRemove?.name || `Recipe ID: ${recipeId}`;
        console.log(`🗑️ Removing "${recipeName}" from favorites for user: ${currentUser.email}`);
        // User is logged in - use user slice
        await dispatch(removeRecipeFromFavorites(recipeId)).unwrap();
        console.log(`✅ Successfully removed "${recipeName}" from favorites for ${currentUser.email}`);
        console.log(`📊 ${currentUser.email} now has ${(currentUser.favoriteRecipes || []).length - 1} favorite recipes`);
      } else {
        console.log(`🗑️ Removing recipe ID "${recipeId}" from local favorites (no user logged in)`);
        // User not logged in - use favorites slice
        dispatch(removeFromFavorites(recipeId));
        console.log(`✅ Successfully removed recipe from local favorites`);
      }
    } catch (error) {
      console.error('❌ Error removing from favorites:', error);
      throw error;
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (recipe: Recipe) => {
    try {
      if (isRecipeFavorite(recipe.id)) {
        await removeFromFavoritesList(recipe.id);
        return false; // Removed from favorites
      } else {
        await addToFavoritesList(recipe);
        return true; // Added to favorites
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  return {
    favorites: getFavorites(),
    isRecipeFavorite,
    addToFavoritesList,
    removeFromFavoritesList,
    toggleFavorite,
  };
};