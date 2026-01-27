# Logout Page Colors Guide

This guide explains all the theme colors available for the Logout page in the ThemeContext.

## Main Layout Colors

### `logoutContainer`
- **Purpose**: Main container background for the entire Logout screen
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#121212` (Very Dark Gray/Black)
- **Usage**: Main screen background

### `logoutOverlayContainer`
- **Purpose**: Overlapping container background (the rounded container that overlaps the header)
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Overlapping container with rounded corners

### `logoutSubContainer`
- **Purpose**: Sub container background for content sections
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Content section backgrounds

## Header Colors

### `logoutHeaderBackground`
- **Purpose**: Header background color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Header background

### `logoutHeaderTitle`
- **Purpose**: Header title text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Logout" title text

### `logoutHeaderText`
- **Purpose**: Header text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: General header text

## Logo Section Colors

### `logoutLogoContainer`
- **Purpose**: Logo container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Logo/avatar container background

### `logoutLogoShadow`
- **Purpose**: Logo shadow color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Logo elevation shadow

### `logoutLogoBorder`
- **Purpose**: Logo border color
- **Light Mode**: `#E0E0E0` (Light Gray)
- **Dark Mode**: `#555555` (Medium Gray)
- **Usage**: Logo container border

## Text Element Colors

### `logoutMainTitle`
- **Purpose**: Main "Logout?" title color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Large "Logout?" title text

### `logoutSubtitle`
- **Purpose**: Subtitle text color
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Secondary text elements

### `logoutDescription`
- **Purpose**: Description text color
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: "Are you sure you want to logout from your account" text

## Logout Button Colors

### `logoutButtonGradient1`
- **Purpose**: Logout button gradient start color
- **Light Mode**: `#FF7A18` (Orange)
- **Dark Mode**: `#FF7A18` (Orange)
- **Usage**: Logout button gradient start

### `logoutButtonGradient2`
- **Purpose**: Logout button gradient end color
- **Light Mode**: `#B31217` (Red)
- **Dark Mode**: `#B31217` (Red)
- **Usage**: Logout button gradient end

### `logoutButtonText`
- **Purpose**: Logout button text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Logout" button text

### `logoutButtonShadow`
- **Purpose**: Logout button shadow color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#000000` (Black)
- **Usage**: Button elevation shadow

### `logoutButtonPressed`
- **Purpose**: Logout button pressed state opacity
- **Light Mode**: `0.85`
- **Dark Mode**: `0.85`
- **Usage**: Button press feedback opacity

## Cancel Button Colors

### `logoutCancelBackground`
- **Purpose**: Cancel button background color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Cancel button background

### `logoutCancelBorder`
- **Purpose**: Cancel button border color
- **Light Mode**: `#B31217` (Red)
- **Dark Mode**: `#B31217` (Red)
- **Usage**: Cancel button border

### `logoutCancelText`
- **Purpose**: Cancel button text color
- **Light Mode**: `#FF7A18` (Orange)
- **Dark Mode**: `#FF7A18` (Orange)
- **Usage**: "Cancel" button text

### `logoutCancelPressed`
- **Purpose**: Cancel button pressed state background
- **Light Mode**: `#F5F5F5` (Very Light Gray)
- **Dark Mode**: `#3D3D3D` (Dark Gray)
- **Usage**: Cancel button pressed state

## Image Element Colors

### `logoutImageTint`
- **Purpose**: Logout image tint color (if needed)
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Image tinting or overlay

### `logoutImageBackground`
- **Purpose**: Image background or placeholder color
- **Light Mode**: `#F5F5F5` (Very Light Gray)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Image placeholder backgrounds

## Usage Example

```typescript
import { useTheme } from '../context/ThemeContext';

const Logout = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.logoutContainer }}>
      {/* Header */}
      <Header 
        title="Logout"
        style={{ backgroundColor: colors.logoutHeaderBackground }}
        titleStyle={{ color: colors.logoutHeaderTitle }}
      />
      
      {/* Content */}
      <View style={{ backgroundColor: colors.logoutOverlayContainer }}>
        <View style={{ backgroundColor: colors.logoutSubContainer }}>
          {/* Logo Section */}
          <View style={{ 
            backgroundColor: colors.logoutLogoContainer,
            shadowColor: colors.logoutLogoShadow,
            borderColor: colors.logoutLogoBorder 
          }}>
            <Image source={logoSource} />
          </View>
          
          {/* Title */}
          <Text style={{ color: colors.logoutMainTitle }}>
            Logout?
          </Text>
          
          {/* Description */}
          <Text style={{ color: colors.logoutDescription }}>
            Are you sure you want to logout from your account
          </Text>
          
          {/* Logout Button */}
          <LinearGradient
            colors={[colors.logoutButtonGradient1, colors.logoutButtonGradient2]}
          >
            <Text style={{ color: colors.logoutButtonText }}>
              Logout
            </Text>
          </LinearGradient>
          
          {/* Cancel Button */}
          <Pressable style={{ 
            backgroundColor: colors.logoutCancelBackground,
            borderColor: colors.logoutCancelBorder 
          }}>
            <Text style={{ color: colors.logoutCancelText }}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
```

## Color Categories Summary

- **Layout Colors**: 3 colors for main containers and backgrounds
- **Header Colors**: 3 colors for header elements
- **Logo Colors**: 3 colors for logo section styling
- **Text Colors**: 3 colors for various text elements
- **Logout Button Colors**: 5 colors for the logout button and its states
- **Cancel Button Colors**: 4 colors for the cancel button and its states
- **Image Colors**: 2 colors for image elements

**Total**: 23 dedicated Logout page colors for comprehensive theming support.

## Implementation Notes

1. **Button Gradients**: Logout button uses orange-to-red gradient for visual impact
2. **Contrast**: All text colors provide proper contrast against their backgrounds
3. **Consistency**: Colors align with the app's orange/red theme
4. **Accessibility**: All color combinations meet accessibility requirements
5. **Interactive States**: Proper pressed states for both buttons
6. **Logo Styling**: Special shadow and border colors for logo emphasis
7. **Theme Adaptation**: All colors properly adapt between light and dark modes

## Design Principles

- **Warning Colors**: Red gradient for logout button indicates destructive action
- **Safe Colors**: Orange for cancel button provides safe alternative
- **Visual Hierarchy**: Different text colors create clear information hierarchy
- **Brand Consistency**: Orange theme colors maintain brand identity
- **User Experience**: Clear visual feedback for all interactive elements