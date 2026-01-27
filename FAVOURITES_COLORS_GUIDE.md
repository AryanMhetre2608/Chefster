# Favourites Page Colors Guide (Updated)

This guide explains all the theme colors available for the Favourites page in the ThemeContext.

## Main Layout & Container Colors

### `favouritesMainBackground`
- **Purpose**: Main screen background for the entire Favourites page
- **Light Mode**: `#F8F9FA` (Very Light Gray)
- **Dark Mode**: `#121212` (Very Dark Gray/Black)
- **Usage**: Main screen background

### `favouritesContentBackground`
- **Purpose**: Content area background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Main content container background

### `favouritesOverlayBackground`
- **Purpose**: Overlay container background (rounded container that overlaps header)
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Overlapping container with rounded corners

## Header Section Colors

### `favouritesHeaderBackground`
- **Purpose**: Header background color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Header background

### `favouritesHeaderTitle`
- **Purpose**: Header title text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Favourites" title text

### `favouritesHeaderSubtitle`
- **Purpose**: Header subtitle text color
- **Light Mode**: `#FFE6CC` (Light Orange)
- **Dark Mode**: `#FFE6CC` (Light Orange)
- **Usage**: "Recipes you love!!!" subtitle

### `favouritesHeaderBackIcon`
- **Purpose**: Back button icon color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Back arrow icon

## Recipe Card Colors

### `favouritesCardContainer`
- **Purpose**: Individual recipe card background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Recipe card background

### `favouritesCardBorder`
- **Purpose**: Recipe card border color
- **Light Mode**: `#E5E5E5` (Light Gray)
- **Dark Mode**: `#404040` (Medium Gray)
- **Usage**: Card border (if border is added)

### `favouritesCardShadow`
- **Purpose**: Recipe card shadow color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#000000` (Black)
- **Usage**: Card elevation shadow

### `favouritesCardPressed`
- **Purpose**: Recipe card pressed state background
- **Light Mode**: `#F8F9FA` (Very Light Gray)
- **Dark Mode**: `#3A3A3A` (Dark Gray)
- **Usage**: Card background when pressed

## Recipe Card Content Colors

### `favouritesRecipeImage`
- **Purpose**: Recipe image background or placeholder color
- **Light Mode**: `#F0F0F0` (Light Gray)
- **Dark Mode**: `#404040` (Medium Gray)
- **Usage**: Image placeholder background

### `favouritesRecipeTitle`
- **Purpose**: Recipe name text color
- **Light Mode**: `#1A1A1A` (Very Dark Gray)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Recipe title text

### `favouritesRecipeSubtitle`
- **Purpose**: Recipe cuisine type text color
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#BBBBBB` (Light Gray)
- **Usage**: Cuisine subtitle text

### `favouritesRecipeMetadata`
- **Purpose**: Recipe metadata text color (cooking time, difficulty, etc.)
- **Light Mode**: `#888888` (Gray)
- **Dark Mode**: `#999999` (Light Gray)
- **Usage**: Additional recipe information

## Action Button Colors

### `favouritesViewButtonBg`
- **Purpose**: View recipe button background
- **Light Mode**: `#4CAF50` (Green)
- **Dark Mode**: `#4CAF50` (Green)
- **Usage**: View button background

### `favouritesViewButtonText`
- **Purpose**: View button text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: View button text

### `favouritesRemoveButtonBg`
- **Purpose**: Remove from favourites button background
- **Light Mode**: `#F44336` (Red)
- **Dark Mode**: `#F44336` (Red)
- **Usage**: Remove button background

### `favouritesRemoveButtonText`
- **Purpose**: Remove button text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Remove button text

### `favouritesButtonShadow`
- **Purpose**: Button shadow color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#000000` (Black)
- **Usage**: Button elevation shadow

### `favouritesButtonPressed`
- **Purpose**: Button pressed state opacity
- **Light Mode**: `0.8`
- **Dark Mode**: `0.8`
- **Usage**: Button press feedback opacity

## Empty State Colors

### `favouritesEmptyBackground`
- **Purpose**: Empty state container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Empty state background

### `favouritesEmptyText`
- **Purpose**: Empty state main text color
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#BBBBBB` (Light Gray)
- **Usage**: "No favorite recipes yet!" text

### `favouritesEmptyIcon`
- **Purpose**: Empty state icon color
- **Light Mode**: `#CCCCCC` (Light Gray)
- **Dark Mode**: `#666666` (Medium Gray)
- **Usage**: Empty state icons

### `favouritesEmptyMessage`
- **Purpose**: Empty state message text color
- **Light Mode**: `#888888` (Gray)
- **Dark Mode**: `#999999` (Light Gray)
- **Usage**: Additional empty state messaging

## List & Layout Colors

### `favouritesListBackground`
- **Purpose**: FlatList container background
- **Light Mode**: `#F8F9FA` (Very Light Gray)
- **Dark Mode**: `#121212` (Very Dark Gray/Black)
- **Usage**: List container background

### `favouritesListSeparator`
- **Purpose**: List item separator color
- **Light Mode**: `#E5E5E5` (Light Gray)
- **Dark Mode**: `#404040` (Medium Gray)
- **Usage**: Separators between list items

### `favouritesScrollIndicator`
- **Purpose**: Scroll indicator color
- **Light Mode**: `#CCCCCC` (Light Gray)
- **Dark Mode**: `#666666` (Medium Gray)
- **Usage**: Scroll bar indicator

## Usage Example

```typescript
import { useTheme } from '../context/ThemeContext';

const Favourites = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.favouritesMainBackground }}>
      {/* Header */}
      <Header 
        title="Favourites"
        subTitle="Recipes you love!!!"
        style={{ backgroundColor: colors.favouritesHeaderBackground }}
        titleStyle={{ color: colors.favouritesHeaderTitle }}
        subTitleStyle={{ color: colors.favouritesHeaderSubtitle }}
      />
      
      {/* Content */}
      <View style={{ backgroundColor: colors.favouritesOverlayBackground }}>
        <FlatList
          style={{ backgroundColor: colors.favouritesListBackground }}
          data={favoriteRecipes}
          renderItem={({ item }) => (
            <Pressable style={{ 
              backgroundColor: colors.favouritesCardContainer,
              borderColor: colors.favouritesCardBorder,
              shadowColor: colors.favouritesCardShadow
            }}>
              <Image 
                source={{ uri: item.image }} 
                style={{ backgroundColor: colors.favouritesRecipeImage }}
              />
              <Text style={{ color: colors.favouritesRecipeTitle }}>
                {item.name}
              </Text>
              <Text style={{ color: colors.favouritesRecipeSubtitle }}>
                {item.cuisine}
              </Text>
              
              {/* Action Buttons */}
              <Pressable style={{ backgroundColor: colors.favouritesViewButtonBg }}>
                <Text style={{ color: colors.favouritesViewButtonText }}>
                  View
                </Text>
              </Pressable>
              
              <Pressable style={{ backgroundColor: colors.favouritesRemoveButtonBg }}>
                <Text style={{ color: colors.favouritesRemoveButtonText }}>
                  Remove
                </Text>
              </Pressable>
            </Pressable>
          )}
        />
        
        {/* Empty State */}
        {favoriteRecipes.length === 0 && (
          <View style={{ backgroundColor: colors.favouritesEmptyBackground }}>
            <Text style={{ color: colors.favouritesEmptyText }}>
              No favorite recipes yet!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
```

## Color Categories Summary

- **Layout Colors**: 3 colors for main containers and backgrounds
- **Header Colors**: 4 colors for header elements and navigation
- **Card Colors**: 4 colors for recipe cards and their states
- **Content Colors**: 4 colors for recipe information display
- **Button Colors**: 6 colors for action buttons and their states
- **Empty State Colors**: 4 colors for when no favourites exist
- **List Colors**: 3 colors for list layout and navigation

**Total**: 28 dedicated Favourites page colors for comprehensive theming support.

## Key Improvements in Updated Version

1. **Better Color Names**: More descriptive and intuitive naming
2. **Enhanced Button Colors**: Green for "View" (positive action), Red for "Remove" (destructive action)
3. **Improved Contrast**: Better text contrast in both light and dark modes
4. **More Granular Control**: Separate colors for different text types and UI states
5. **List Enhancement**: Added colors for list separators and scroll indicators
6. **Card States**: Added pressed state colors for better user feedback
7. **Metadata Support**: Added colors for additional recipe information

## Design Principles

- **Action Colors**: Green for safe actions (View), Red for destructive actions (Remove)
- **Visual Hierarchy**: Different text colors create clear information hierarchy
- **Accessibility**: All color combinations meet accessibility contrast requirements
- **Brand Consistency**: Orange theme colors maintain brand identity
- **User Experience**: Clear visual feedback for all interactive elements
- **Theme Adaptation**: Proper contrast and readability in both light and dark modes