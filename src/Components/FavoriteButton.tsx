import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from './Icon';
import Toast from './Toast';
import { useFavorites } from '../hooks/useFavorites';

interface Recipe {
  id: string;
  name: string;
  image: string;
  cuisine: string;
}

interface FavoriteButtonProps {
  recipe: Recipe;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipe,
  size = 24,
  activeColor = '#e91e63',
  inactiveColor = '#ccc',
}) => {
  const { isRecipeFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = async () => {
    try {
      const isNowFavorite = await toggleFavorite(recipe);
      
      if (isNowFavorite) {
        Toast.success(`${recipe.name} added to favorites`);
      } else {
        Toast.success(`${recipe.name} removed from favorites`);
      }
    } catch (error) {
      Toast.error('Failed to update favorites');
    }
  };

  const isFavorite = isRecipeFavorite(recipe.id);

  return (
    <Pressable
      style={styles.favoriteButton}
      onPress={handleToggleFavorite}
    >
      <Icon
        type="MaterialIcons"
        name={isFavorite ? "favorite" : "favorite-border"}
        size={size}
        color={isFavorite ? activeColor : inactiveColor}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default FavoriteButton;