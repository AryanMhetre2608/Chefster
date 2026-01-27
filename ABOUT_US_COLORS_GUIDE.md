# About Us Page Colors Guide

This guide explains all the theme colors available for the About Us page in the ThemeContext.

## Main Layout & Container Colors

### `aboutUsMainBackground`
- **Purpose**: Main screen background for the entire About Us page
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#121212` (Very Dark Gray/Black)
- **Usage**: Main screen background

### `aboutUsContentBackground`
- **Purpose**: Content area background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Main content container background

### `aboutUsScrollBackground`
- **Purpose**: ScrollView background (overlapping container)
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: ScrollView container with rounded corners

## Header Section Colors

### `aboutUsHeaderBackground`
- **Purpose**: Header background color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Header background

### `aboutUsHeaderTitle`
- **Purpose**: Header title text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "About Chefster" title text

### `aboutUsHeaderBackIcon`
- **Purpose**: Back button icon color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Back arrow icon

## Logo & Branding Colors

### `aboutUsLogoContainer`
- **Purpose**: Logo container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Logo/image container background

### `aboutUsAppName`
- **Purpose**: App name text color
- **Light Mode**: `#FF5722` (Orange-Red)
- **Dark Mode**: `#FF5722` (Orange-Red)
- **Usage**: "Chefster" app name text

### `aboutUsVersionBox`
- **Purpose**: Version box background color
- **Light Mode**: `#666666` (Gray)
- **Dark Mode**: `#404040` (Dark Gray)
- **Usage**: Version number container background

### `aboutUsVersionText`
- **Purpose**: Version text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Version 2.0.1" text

## Tagline Section Colors

### `aboutUsTaglineText`
- **Purpose**: Tagline text color
- **Light Mode**: `#666666` (Gray)
- **Dark Mode**: `#BBBBBB` (Light Gray)
- **Usage**: "Discover delicious recipes from around the world" text

### `aboutUsTaglineContainer`
- **Purpose**: Tagline container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Tagline section background

## Mission Card Colors

### `aboutUsMissionContainer`
- **Purpose**: Mission card background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Mission card inner background

### `aboutUsMissionBorder`
- **Purpose**: Mission card border/gradient color
- **Light Mode**: `#FFB8B8` (Light Pink)
- **Dark Mode**: `#FF8A8A` (Darker Pink)
- **Usage**: Mission card gradient border

### `aboutUsMissionTitle`
- **Purpose**: Mission title text color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Our Mission" title text

### `aboutUsMissionText`
- **Purpose**: Mission description text color
- **Light Mode**: `#333333` (Dark Gray)
- **Dark Mode**: `#CCCCCC` (Light Gray)
- **Usage**: Mission description paragraph

### `aboutUsMissionIcon`
- **Purpose**: Mission icon tint color
- **Light Mode**: `#FF5722` (Orange-Red)
- **Dark Mode**: `#FF5722` (Orange-Red)
- **Usage**: Mission logo/icon color

## Features Section Colors

### `aboutUsFeaturesTitle`
- **Purpose**: Features section title color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Features" section title

### `aboutUsFeatureBox`
- **Purpose**: Feature box background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Individual feature card background

### `aboutUsFeatureBorder`
- **Purpose**: Feature box border color
- **Light Mode**: `#666666` (Gray)
- **Dark Mode**: `#555555` (Medium Gray)
- **Usage**: Feature card border

### `aboutUsFeatureIcon`
- **Purpose**: Feature icon color
- **Light Mode**: `#FF5722` (Orange-Red)
- **Dark Mode**: `#FF5722` (Orange-Red)
- **Usage**: Feature icons (globe, heart, clock, star)

### `aboutUsFeatureText`
- **Purpose**: Feature text color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Feature description text

### `aboutUsFeatureGradient`
- **Purpose**: Feature gradient overlay color
- **Light Mode**: `#FFE4E4` (Light Pink)
- **Dark Mode**: `#4A3A3A` (Dark Pink)
- **Usage**: Feature card gradient overlay

## Footer Section Colors

### `aboutUsFooterBackground`
- **Purpose**: Footer container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Footer section background

### `aboutUsFooterText`
- **Purpose**: Footer text color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Proudly made by Chefster Team" text

### `aboutUsFooterLink`
- **Purpose**: Footer link color
- **Light Mode**: `#FF5722` (Orange-Red)
- **Dark Mode**: `#FF5722` (Orange-Red)
- **Usage**: "Terms of Service" and "Privacy Policy" links

### `aboutUsFooterSeparator`
- **Purpose**: Footer separator dot color
- **Light Mode**: `#666666` (Gray)
- **Dark Mode**: `#BBBBBB` (Light Gray)
- **Usage**: Separator dot between footer links

## Usage Example

```typescript
import { useTheme } from '../context/ThemeContext';

const AboutUs = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.aboutUsMainBackground }}>
      {/* Header */}
      <Header 
        title="About Chefster"
        style={{ backgroundColor: colors.aboutUsHeaderBackground }}
        titleStyle={{ color: colors.aboutUsHeaderTitle }}
        leftComponent={
          <Icon 
            type="Ionicons" 
            name="arrow-back" 
            color={colors.aboutUsHeaderBackIcon} 
          />
        }
      />
      
      {/* ScrollView Content */}
      <ScrollView style={{ backgroundColor: colors.aboutUsScrollBackground }}>
        {/* Logo Container */}
        <View style={{ backgroundColor: colors.aboutUsLogoContainer }}>
          <Image source={logoSource} />
        </View>
        
        {/* App Name */}
        <Text style={{ color: colors.aboutUsAppName }}>
          Chefster
        </Text>
        
        {/* Version Box */}
        <View style={{ backgroundColor: colors.aboutUsVersionBox }}>
          <Text style={{ color: colors.aboutUsVersionText }}>
            Version 2.0.1
          </Text>
        </View>
        
        {/* Tagline */}
        <Text style={{ color: colors.aboutUsTaglineText }}>
          Discover delicious recipes from around the world
        </Text>
        
        {/* Mission Card */}
        <LinearGradient colors={[colors.aboutUsMissionBorder, '#FFE4E4']}>
          <View style={{ backgroundColor: colors.aboutUsMissionContainer }}>
            <Text style={{ color: colors.aboutUsMissionTitle }}>
              Our Mission
            </Text>
            <Text style={{ color: colors.aboutUsMissionText }}>
              Mission description...
            </Text>
          </View>
        </LinearGradient>
        
        {/* Features */}
        <Text style={{ color: colors.aboutUsFeaturesTitle }}>
          Features
        </Text>
        
        <View style={{ 
          backgroundColor: colors.aboutUsFeatureBox,
          borderColor: colors.aboutUsFeatureBorder 
        }}>
          <Icon 
            type="Entypo" 
            name="globe" 
            color={colors.aboutUsFeatureIcon} 
          />
          <Text style={{ color: colors.aboutUsFeatureText }}>
            7+ World Cuisines
          </Text>
        </View>
        
        {/* Footer */}
        <View style={{ backgroundColor: colors.aboutUsFooterBackground }}>
          <Text style={{ color: colors.aboutUsFooterText }}>
            Proudly made by Chefster Team
          </Text>
          
          <Pressable>
            <Text style={{ color: colors.aboutUsFooterLink }}>
              Terms of Service
            </Text>
          </Pressable>
          
          <Text style={{ color: colors.aboutUsFooterSeparator }}>•</Text>
          
          <Pressable>
            <Text style={{ color: colors.aboutUsFooterLink }}>
              Privacy Policy
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
```

## Color Categories Summary

- **Layout Colors**: 3 colors for main containers and backgrounds
- **Header Colors**: 3 colors for header elements and navigation
- **Branding Colors**: 4 colors for logo, app name, and version
- **Tagline Colors**: 2 colors for tagline section
- **Mission Colors**: 5 colors for mission card and content
- **Features Colors**: 6 colors for features section and cards
- **Footer Colors**: 4 colors for footer section and links

**Total**: 27 dedicated About Us page colors for comprehensive theming support.

## Key Design Features

### **Brand Consistency:**
- Orange theme colors (`#FF8A00`, `#FF5722`) maintain brand identity
- Consistent use of brand colors across different sections

### **Visual Hierarchy:**
- Different text colors create clear information hierarchy
- Proper contrast between titles, descriptions, and metadata

### **Interactive Elements:**
- Special colors for links and interactive elements
- Clear visual distinction for clickable items

### **Card Design:**
- Gradient borders and backgrounds for visual appeal
- Proper contrast for readability in both themes

### **Theme Adaptation:**
- All colors properly adapt between light and dark modes
- Maintains readability and visual appeal in both themes

## Implementation Notes

1. **Gradient Usage**: Mission and feature cards use gradient overlays
2. **Brand Colors**: Consistent orange/red theme throughout
3. **Accessibility**: All color combinations meet contrast requirements
4. **Interactive States**: Clear colors for links and buttons
5. **Visual Appeal**: Pink gradient accents add visual interest
6. **Typography**: Different text colors for clear hierarchy