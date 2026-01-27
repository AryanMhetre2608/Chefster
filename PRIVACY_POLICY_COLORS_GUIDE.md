# Privacy Policy Page Colors Guide

This guide explains all the theme colors available for the Privacy Policy page in the ThemeContext.

## Main Layout Colors

### `privacyPolicyContainer`
- **Purpose**: Main container background for the entire Privacy Policy screen
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#121212` (Very Dark Gray/Black)
- **Usage**: Main screen background

### `privacyPolicyOverlayContainer`
- **Purpose**: Overlapping container background (the rounded container that overlaps the header)
- **Light Mode**: `#F5F5F5` (Very Light Gray)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Overlapping container with rounded corners

### `privacyPolicyContent`
- **Purpose**: Content area background
- **Light Mode**: `#F5F5F5` (Very Light Gray)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Content container background

## Header Colors

### `privacyPolicyHeaderBackground`
- **Purpose**: Header background color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Header background

### `privacyPolicyHeaderTitle`
- **Purpose**: Header title text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Privacy Policy" title text

### `privacyPolicyBackButton`
- **Purpose**: Back button icon color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Back arrow icon

### `privacyPolicyShieldIcon`
- **Purpose**: Shield icon color in header
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Shield check icon

## Policy Section Colors

### `privacyPolicySection`
- **Purpose**: Individual policy section container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Each numbered policy section background

### `privacyPolicySectionBorder`
- **Purpose**: Policy section border color
- **Light Mode**: `#E0E0E0` (Light Gray)
- **Dark Mode**: `#444444` (Medium Gray)
- **Usage**: Section container borders (if added)

### `privacyPolicySectionShadow`
- **Purpose**: Policy section shadow color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#000000` (Black)
- **Usage**: Section elevation shadow

## Section Header Colors

### `privacyPolicyNumberBadge`
- **Purpose**: Number badge gradient start color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Circular number badge gradient start (1, 2, 3, 4)

### `privacyPolicyNumberBadgeEnd`
- **Purpose**: Number badge gradient end color
- **Light Mode**: `#FF6A00` (Darker Orange)
- **Dark Mode**: `#FF6A00` (Darker Orange)
- **Usage**: Circular number badge gradient end

### `privacyPolicyNumberText`
- **Purpose**: Number text color inside the badge
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Number text (1, 2, 3, 4) inside badges

### `privacyPolicySectionTitle`
- **Purpose**: Section title text color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Section titles like "1. Data Collection", "2. How We Use Your Data"

## Content Text Colors

### `privacyPolicyBodyText`
- **Purpose**: Main body text color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Main paragraph text content

### `privacyPolicyBulletPoint`
- **Purpose**: Bullet point color
- **Light Mode**: `#FF5722` (Orange-Red)
- **Dark Mode**: `#FF5722` (Orange-Red)
- **Usage**: Bullet point symbols (•)

### `privacyPolicyBulletText`
- **Purpose**: Bullet point text color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Text content in bullet points

### `privacyPolicyLastUpdated`
- **Purpose**: Last updated text color
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: "Last updated: January 2025" text

## Link and Interactive Colors

### `privacyPolicyEmailLink`
- **Purpose**: Email link text color
- **Light Mode**: `#FF5722` (Orange-Red)
- **Dark Mode**: `#FF5722` (Orange-Red)
- **Usage**: Email address links

### `privacyPolicyEmailLinkUnderline`
- **Purpose**: Email link underline color
- **Light Mode**: `#FF5722` (Orange-Red)
- **Dark Mode**: `#FF5722` (Orange-Red)
- **Usage**: Underline decoration for email links

### `privacyPolicyContactText`
- **Purpose**: Contact text color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Contact information text

## Footer Colors

### `privacyPolicyFooterText`
- **Purpose**: Footer text color
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Footer text like "Questions? Reach out to us"

### `privacyPolicyFooterLink`
- **Purpose**: Footer link color
- **Light Mode**: `#FF5722` (Orange-Red)
- **Dark Mode**: `#FF5722` (Orange-Red)
- **Usage**: Footer email link

## Usage Example

```typescript
import { useTheme } from '../context/ThemeContext';

const PrivacyPolicy = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.privacyPolicyContainer }}>
      {/* Header */}
      <Header 
        title="Privacy Policy"
        style={{ backgroundColor: colors.privacyPolicyHeaderBackground }}
        titleStyle={{ color: colors.privacyPolicyHeaderTitle }}
      />
      
      {/* Content */}
      <ScrollView style={{ backgroundColor: colors.privacyPolicyOverlayContainer }}>
        <Text style={{ color: colors.privacyPolicyLastUpdated }}>
          Last updated: January 2025
        </Text>
        
        {/* Policy Section */}
        <View style={{ 
          backgroundColor: colors.privacyPolicySection,
          shadowColor: colors.privacyPolicySectionShadow 
        }}>
          {/* Number Badge */}
          <LinearGradient
            colors={[colors.privacyPolicyNumberBadge, colors.privacyPolicyNumberBadgeEnd]}
          >
            <Text style={{ color: colors.privacyPolicyNumberText }}>1</Text>
          </LinearGradient>
          
          {/* Section Title */}
          <Text style={{ color: colors.privacyPolicySectionTitle }}>
            1. Data Collection
          </Text>
          
          {/* Body Text */}
          <Text style={{ color: colors.privacyPolicyBodyText }}>
            At Chefster, we collect certain information...
          </Text>
          
          {/* Bullet Points */}
          <Text style={{ color: colors.privacyPolicyBulletPoint }}>•</Text>
          <Text style={{ color: colors.privacyPolicyBulletText }}>
            Personal information for account creation...
          </Text>
          
          {/* Email Link */}
          <Text style={{ 
            color: colors.privacyPolicyEmailLink,
            textDecorationColor: colors.privacyPolicyEmailLinkUnderline
          }}>
            rnmhetre2608@gmail.com
          </Text>
        </View>
        
        {/* Footer */}
        <Text style={{ color: colors.privacyPolicyFooterText }}>
          Questions? Reach out to us
        </Text>
        <Text style={{ color: colors.privacyPolicyFooterLink }}>
          rnmhetre2608@gmail.com
        </Text>
      </ScrollView>
    </View>
  );
};
```

## Color Categories Summary

- **Layout Colors**: 3 colors for main containers and backgrounds
- **Header Colors**: 4 colors for header elements and icons
- **Section Colors**: 3 colors for policy section containers and styling
- **Header Colors**: 4 colors for numbered badges and section titles
- **Content Colors**: 4 colors for body text, bullets, and dates
- **Link Colors**: 3 colors for interactive email links
- **Footer Colors**: 2 colors for footer text and links

**Total**: 23 dedicated Privacy Policy page colors for comprehensive theming support.

## Implementation Notes

1. **Section Structure**: Each policy section has numbered badges with gradient backgrounds
2. **Typography Hierarchy**: Different text colors for titles, body text, and metadata
3. **Interactive Elements**: Special colors for email links with underlines
4. **Accessibility**: All color combinations meet accessibility contrast requirements
5. **Consistency**: Colors align with the app's orange theme while providing proper contrast
6. **Bullet Points**: Special orange-red color for bullet points to match the theme