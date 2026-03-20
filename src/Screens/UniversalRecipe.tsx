import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../hooks/useFavorites';
import Toast from '../components/Toast';
import Header from '../components/Header';
import Icon from '../components/Icon';
import recipeData from '../data/dataset.json';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

type RouteParams = {
  UniversalRecipe: {
    recipeId: string;
  };
};

type UniversalRecipeRouteProp = RouteProp<RouteParams, 'UniversalRecipe'>;

const UniversalRecipe = () => {
  const { colors } = useTheme()
  const { t } = useTranslation();

  const route = useRoute<UniversalRecipeRouteProp>();
  const navigation = useNavigation<any>();
  const { isRecipeFavorite, toggleFavorite } = useFavorites();

  const { recipeId } = route.params || { recipeId: '1' };
  const errorImg = (recipeData as any).recipeErrorImage;

  // Function to find recipe across all cuisine categories
  const findRecipe = (id: string) => {
    const recipes = (recipeData as any).recipes[0];

    // Search through all recipe categories
    const categories = [
      'AfricanRecipes',
      'AmericanRecipes',
      'AsianRecipes',
      'EuropianRecipes',
      'MediterraneanRecipes',
      'MiddleEasternRecipes',
      'OceanianRecipes',
      'FusionRecipes',
      'VeganRecipes',
      'KetoRecipes',
      'GlutenFreeRecipes',
      'StreetFoodRecipes',
    ];

    for (const category of categories) {
      if (recipes[category]) {
        const recipe = recipes[category].find(
          (recipe: any) => recipe.id === id,
        );
        if (recipe) {
          return recipe;
        }
      }
    }
    return null;
  };

  const recipe = findRecipe(recipeId);

  // Function to handle favorite toggle
  const handleToggleFavorite = async () => {
    if (!recipe) return;
    
    try {
      const recipeData = {
        id: recipeId,
        name: recipe.name,
        image: recipe.image,
        cuisine: recipe.cuisine || 'Unknown',
      };
      
      const wasAdded = await toggleFavorite(recipeData);
      
      if (wasAdded) {
        Toast.success(`${recipe.name} ${t('added to favorites')}`);
      } else {
        Toast.success(`${recipe.name} ${t('removed from favorites')}`);
      }
    } catch (error) {
      Toast.error(`${t('Failed to update favorites')}`);
      console.error('Favorites error:', error);
    }
  };

  const isCurrentRecipeFavorite = isRecipeFavorite(recipeId);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {t('Recipe not found for ID')}: {recipeId}
        </Text>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{ uri: errorImg.image }}
            style={{ width: 200, height: 150, borderRadius: 10 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.mainContainer , {backgroundColor:colors.universalRecipeMainBackground}]}>
      <View style={[styles.imageContainer , {backgroundColor:colors.universalRecipeImageContainer}]}>
        <Image
            source={{ uri: recipe.image }}
            style={{ height: '100%', width: '100%', borderRadius: 10 }}
            resizeMode='cover'
          />
        
        {/* Back Button */}
        
        {/* Favorite Button */}
        
      </View>
      <ScrollView style={[styles.recipeContainer , {backgroundColor:colors.universalRecipeScrollBackground ,  paddingBottom:500}]}>
         
      
        {/* <View style={styles.itemImage}>
          <Image
            source={{ uri: recipe.image }}
            style={{ height: '95%', width: '97%', borderRadius: 10 }}
          />
        </View> */}

        <View style={[styles.section , {backgroundColor:colors.universalRecipeSectionBackground , shadowColor:colors.universalRecipeSectionShadow }]}>
          <Text style={[styles.title , {color:colors.universalRecipeSectionTitle}]}>{recipe.name}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{t('Servings')}: {recipe.servings}</Text>
            <Text style={styles.infoText}>{t('Prep')}: {recipe.prepTime}</Text>
            <Text style={styles.infoText}>{t('Cook')}: {recipe.cookTime}</Text>
          </View>
        </View>

          

          <View style={[styles.section , {backgroundColor:colors.universalRecipeSectionBackground}]}>
            <Text style={[styles.sectionTitle , {color:colors.universalRecipeIngredientText}]}>{t('Ingredients')}</Text>
            {recipe.ingredients.map((ingredient: any, index: number) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={[styles.ingredientText , {color:colors.universalRecipeIngredientBullet}]}>
                  • {ingredient.quantity} {ingredient.item}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.section , {backgroundColor:colors.universalRecipeSectionBackground}]}>
            <Text style={[styles.sectionTitle , {color:colors.universalRecipeInstructionText}]}>{t('Instructions')}</Text>
            {recipe.instructions.map((instruction: string, index: number) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={[styles.stepNumber , {color:colors.universalRecipeStepNumber}]}>{index + 1}.</Text>
                <Text style={[styles.instructionText , {color:colors.universalRecipeInstructionText}]}>{instruction}</Text>
              </View>
            ))}
          </View>

          {recipe.servingSuggestions && (
            <View style={[styles.section , {backgroundColor:colors.universalRecipeSectionBackground}]}>
              <Text style={[styles.sectionTitle  , {color:colors.universalRecipeSuggestionText}]}>{t('Serving Suggestions')}</Text>
              
                {recipe.servingSuggestions.map(
                (suggestion: string, index: number) => (
                  <Text key={index} style={[styles.suggestionText , {color:colors.universalRecipeSuggestionText}]}>
                    <Text style={{color:colors.universalRecipeSuggestionText}}>•</Text> {suggestion}
                  </Text>
                ),
              )}
             
              
            </View>
          )}
        </ScrollView>


      </View>

      

    
  );
};

export default UniversalRecipe;

const styles = StyleSheet.create({
  
  mainContainer:{
    flex:1,
    margin:0,
    backgroundColor:"white",
    height:"100%",
    width:"100%"
  },
  imageContainer:{
    width:"100%",
    height:"40%",
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height:40,
    width:40,
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  recipeContainer:{
    backgroundColor:"white",
    position:"relative",
    marginTop:-30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    width:"100%",
    height:"60%",
    
  },
 

  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  itemImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    marginBottom: '5%',
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  infoRow: {
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  infoText: {
    width: '40%',
    marginVertical: 2,
    fontSize: 14,
    color: '#888',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading:{
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: -23,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,

    paddingBottom: 8,
  },
  ingredientItem: {
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
    marginRight: 12,
    minWidth: 24,
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    flex: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: '#e91e63',
    textAlign: 'center',
    marginTop: 50,
  },


});



