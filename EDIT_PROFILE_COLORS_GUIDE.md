# Edit Profile Page Colors Guide

This guide explains all the theme colors available for the Edit Profile page in the ThemeContext.

## Avatar Section Colors

### `editProfileAvatarContainer`
- **Purpose**: Background color for the avatar container/circle
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Main avatar circle background

### `editProfileAvatarBorder`
- **Purpose**: Border color around the avatar circle
- **Light Mode**: `#E0E0E0` (Light Gray)
- **Dark Mode**: `#555555` (Medium Gray)
- **Usage**: Avatar circle border

### `editProfileAvatarPlaceholder`
- **Purpose**: Placeholder background when no avatar image is set
- **Light Mode**: `#F5F5F5` (Very Light Gray)
- **Dark Mode**: `#3D3D3D` (Dark Gray)
- **Usage**: Empty avatar state background

### `editProfileCameraButton`
- **Purpose**: Camera button gradient start color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Camera button gradient start

### `editProfileCameraButtonEnd`
- **Purpose**: Camera button gradient end color
- **Light Mode**: `#FF6A00` (Darker Orange)
- **Dark Mode**: `#FF6A00` (Darker Orange)
- **Usage**: Camera button gradient end

### `editProfileCameraIcon`
- **Purpose**: Camera icon color inside the button
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Camera icon color

## Form Section Colors

### `editProfileFormBackground`
- **Purpose**: Background color for the form container
- **Light Mode**: `#F5F5F5` (Very Light Gray)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Form section background

### `editProfileFormLabel`
- **Purpose**: Color for form field labels (Full Name, Email, Phone Number, Bio)
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Text labels above input fields

### `editProfileInputBackground`
- **Purpose**: Background color for text input fields
- **Light Mode**: `#D3D3D3` (Light Gray)
- **Dark Mode**: `#3D3D3D` (Dark Gray)
- **Usage**: TextInput background

### `editProfileInputBorder`
- **Purpose**: Border color for text inputs in normal state
- **Light Mode**: `#CCCCCC` (Light Gray)
- **Dark Mode**: `#555555` (Medium Gray)
- **Usage**: TextInput border (normal state)

### `editProfileInputBorderError`
- **Purpose**: Border color for text inputs when there's an error
- **Light Mode**: `#F44336` (Red)
- **Dark Mode**: `#EF5350` (Light Red)
- **Usage**: TextInput border (error state)

### `editProfileInputText`
- **Purpose**: Color for text inside input fields
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: TextInput text color

### `editProfileInputPlaceholder`
- **Purpose**: Color for placeholder text in input fields
- **Light Mode**: `#999999` (Gray)
- **Dark Mode**: `#777777` (Dark Gray)
- **Usage**: TextInput placeholder color

### `editProfileErrorText`
- **Purpose**: Color for error messages below input fields
- **Light Mode**: `#F44336` (Red)
- **Dark Mode**: `#EF5350` (Light Red)
- **Usage**: Error message text

## Save Button Colors

### `editProfileSaveButton`
- **Purpose**: Save button gradient start color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Save button gradient start

### `editProfileSaveButtonEnd`
- **Purpose**: Save button gradient end color
- **Light Mode**: `#FF6A00` (Darker Orange)
- **Dark Mode**: `#FF6A00` (Darker Orange)
- **Usage**: Save button gradient end

### `editProfileSaveButtonText`
- **Purpose**: Text color for the save button
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Save button text

### `editProfileSaveButtonPressed`
- **Purpose**: Opacity value when save button is pressed
- **Light Mode**: `0.85`
- **Dark Mode**: `0.85`
- **Usage**: Button pressed state opacity

## Container/Layout Colors

### `editProfileContainer`
- **Purpose**: Main container background color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#121212` (Very Dark Gray)
- **Usage**: Main screen background

### `editProfileOverlayContainer`
- **Purpose**: Overlapping container background (the rounded container that overlaps the header)
- **Light Mode**: `#F5F5F5` (Very Light Gray)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Overlapping container background

## Usage Example

```typescript
import { useTheme } from '../context/ThemeContext';

const EditProfile = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.editProfileContainer }}>
      {/* Avatar Section */}
      <View style={{ 
        backgroundColor: colors.editProfileAvatarContainer,
        borderColor: colors.editProfileAvatarBorder 
      }}>
        {/* Avatar content */}
      </View>
      
      {/* Form Section */}
      <View style={{ backgroundColor: colors.editProfileFormBackground }}>
        <Text style={{ color: colors.editProfileFormLabel }}>Full Name</Text>
        <TextInput 
          style={{ 
            backgroundColor: colors.editProfileInputBackground,
            borderColor: colors.editProfileInputBorder,
            color: colors.editProfileInputText
          }}
          placeholderTextColor={colors.editProfileInputPlaceholder}
        />
      </View>
    </View>
  );
};
```

## Color Categories Summary

- **Avatar Colors**: 6 colors for avatar display and camera button
- **Form Colors**: 7 colors for form labels, inputs, and error states  
- **Button Colors**: 4 colors for the save button and its states
- **Layout Colors**: 2 colors for main containers and backgrounds

**Total**: 19 dedicated Edit Profile colors for comprehensive theming support.