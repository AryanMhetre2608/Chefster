# Contact Us Page Colors Guide

This guide explains all the theme colors available for the Contact Us page in the ThemeContext.

## Main Layout & Container Colors

### `contactUsMainBackground`
- **Purpose**: Main screen background for the entire Contact Us page
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#121212` (Very Dark Gray/Black)
- **Usage**: Main screen background

### `contactUsContentBackground`
- **Purpose**: Content area background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Main content container background

### `contactUsOverlayBackground`
- **Purpose**: Overlapping container background (rounded container that overlaps header)
- **Light Mode**: `#F5F5F5` (Light Gray)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Overlapping container with rounded corners

### `contactUsScrollBackground`
- **Purpose**: ScrollView background
- **Light Mode**: `#F5F5F5` (Light Gray)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: ScrollView container background

## Header Section Colors

### `contactUsHeaderBackground`
- **Purpose**: Header background color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Header background

### `contactUsHeaderTitle`
- **Purpose**: Header title text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Contact Us" title text

### `contactUsHeaderText`
- **Purpose**: Header text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: General header text

## Form Section Colors

### `contactUsFormBackground`
- **Purpose**: Form container background
- **Light Mode**: `#F5F5F5` (Light Gray)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Form container background

### `contactUsFormLabel`
- **Purpose**: Form field labels
- **Light Mode**: `#333333` (Dark Gray)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Name", "Email", "Message" labels

### `contactUsFormLabelText`
- **Purpose**: Form label text color
- **Light Mode**: `#333333` (Dark Gray)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Form label text

## Input Field Colors

### `contactUsInputContainer`
- **Purpose**: Input field container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: TextInput container background

### `contactUsInputBorder`
- **Purpose**: Input field border color
- **Light Mode**: `#E0E0E0` (Light Gray)
- **Dark Mode**: `#555555` (Medium Gray)
- **Usage**: Input field borders (normal state)

### `contactUsInputBorderFocused`
- **Purpose**: Input field border color when focused
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Input field borders when focused

### `contactUsInputText`
- **Purpose**: Input field text color
- **Light Mode**: `#212121` (Very Dark Gray)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Text color inside input fields

### `contactUsInputPlaceholder`
- **Purpose**: Input field placeholder text color
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Placeholder text ("Enter your name", "Enter your email", etc.)

### `contactUsInputShadow`
- **Purpose**: Input field shadow color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#000000` (Black)
- **Usage**: Input field elevation shadow

## Input Icon Colors

### `contactUsPersonIcon`
- **Purpose**: Person icon color for name field
- **Light Mode**: `#4F4F4F` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Person icon in name input field

### `contactUsEmailIcon`
- **Purpose**: Email icon color for email field
- **Light Mode**: `#4F4F4F` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Mail icon in email input field

### `contactUsMessageIcon`
- **Purpose**: Message icon color for message field
- **Light Mode**: `#4F4F4F` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Message square icon in message input field

## Send Button Colors

### `contactUsSendButtonGradient1`
- **Purpose**: Send button gradient start color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Send message button gradient start

### `contactUsSendButtonGradient2`
- **Purpose**: Send button gradient end color
- **Light Mode**: `#FF6A00` (Darker Orange)
- **Dark Mode**: `#FF6A00` (Darker Orange)
- **Usage**: Send message button gradient end

### `contactUsSendButtonText`
- **Purpose**: Send button text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Send Message" button text

### `contactUsSendButtonShadow`
- **Purpose**: Send button shadow color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#000000` (Black)
- **Usage**: Button elevation shadow

### `contactUsSendButtonPressed`
- **Purpose**: Send button pressed state opacity
- **Light Mode**: `0.95` (95% opacity)
- **Dark Mode**: `0.95` (95% opacity)
- **Usage**: Button pressed state visual feedback

## Social Media Icon Colors

### `contactUsSocialContainer`
- **Purpose**: Social media container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Social media icons container background

### `contactUsSocialBorder`
- **Purpose**: Social media icon border color
- **Light Mode**: `#4F4F4F` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Social media icon borders

### `contactUsSocialBackground`
- **Purpose**: Social media icon background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: Individual social icon background

### `contactUsInstagramIcon`
- **Purpose**: Instagram icon color
- **Light Mode**: `#4F4F4F` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Instagram icon

### `contactUsFacebookIcon`
- **Purpose**: Facebook icon color
- **Light Mode**: `#4F4F4F` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Facebook icon

### `contactUsMailIcon`
- **Purpose**: Mail icon color
- **Light Mode**: `#4F4F4F` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Mail icon

### `contactUsSocialPressed`
- **Purpose**: Social icon pressed state
- **Light Mode**: `#F0F0F0` (Very Light Gray)
- **Dark Mode**: `#3D3D3D` (Medium Dark Gray)
- **Usage**: Social icon pressed state background

## Usage Example

```typescript
import { useTheme } from '../context/ThemeContext';

const ContactUs = () => {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.contactUsMainBackground }}>
      {/* Header */}
      <Header 
        title="Contact Us"
        style={{ backgroundColor: colors.contactUsHeaderBackground }}
        titleStyle={{ color: colors.contactUsHeaderTitle }}
      />
      
      {/* Content */}
      <ScrollView style={{ backgroundColor: colors.contactUsScrollBackground }}>
        <View style={{ backgroundColor: colors.contactUsOverlayBackground }}>
          {/* Form */}
          <View style={{ backgroundColor: colors.contactUsFormBackground }}>
            {/* Name Input */}
            <Text style={{ color: colors.contactUsFormLabel }}>Name</Text>
            <View style={{ 
              backgroundColor: colors.contactUsInputContainer,
              borderColor: colors.contactUsInputBorder,
              shadowColor: colors.contactUsInputShadow 
            }}>
              <Icon 
                name="person" 
                color={colors.contactUsPersonIcon} 
              />
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={colors.contactUsInputPlaceholder}
                style={{ color: colors.contactUsInputText }}
              />
            </View>
            
            {/* Email Input */}
            <Text style={{ color: colors.contactUsFormLabel }}>Email</Text>
            <View style={{ 
              backgroundColor: colors.contactUsInputContainer,
              borderColor: colors.contactUsInputBorder,
              shadowColor: colors.contactUsInputShadow 
            }}>
              <Icon 
                name="mail" 
                color={colors.contactUsEmailIcon} 
              />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colors.contactUsInputPlaceholder}
                style={{ color: colors.contactUsInputText }}
              />
            </View>
            
            {/* Message Input */}
            <Text style={{ color: colors.contactUsFormLabel }}>Message</Text>
            <View style={{ 
              backgroundColor: colors.contactUsInputContainer,
              borderColor: colors.contactUsInputBorder,
              shadowColor: colors.contactUsInputShadow 
            }}>
              <Icon 
                name="message-square" 
                color={colors.contactUsMessageIcon} 
              />
              <TextInput
                placeholder="What would you like to tell us?"
                placeholderTextColor={colors.contactUsInputPlaceholder}
                style={{ color: colors.contactUsInputText }}
                multiline
              />
            </View>
            
            {/* Send Button */}
            <LinearGradient
              colors={[
                colors.contactUsSendButtonGradient1, 
                colors.contactUsSendButtonGradient2
              ]}
            >
              <Text style={{ color: colors.contactUsSendButtonText }}>
                Send Message
              </Text>
            </LinearGradient>
          </View>
          
          {/* Social Media Icons */}
          <View style={{ backgroundColor: colors.contactUsSocialContainer }}>
            <Pressable style={{ 
              borderColor: colors.contactUsSocialBorder,
              backgroundColor: colors.contactUsSocialBackground 
            }}>
              <Icon 
                name="instagram" 
                color={colors.contactUsInstagramIcon} 
              />
            </Pressable>
            
            <Pressable style={{ 
              borderColor: colors.contactUsSocialBorder,
              backgroundColor: colors.contactUsSocialBackground 
            }}>
              <Icon 
                name="facebook" 
                color={colors.contactUsFacebookIcon} 
              />
            </Pressable>
            
            <Pressable style={{ 
              borderColor: colors.contactUsSocialBorder,
              backgroundColor: colors.contactUsSocialBackground 
            }}>
              <Icon 
                name="mail" 
                color={colors.contactUsMailIcon} 
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
```

## Color Categories Summary

- **Layout Colors**: 4 colors for main containers and backgrounds
- **Header Colors**: 3 colors for header elements
- **Form Colors**: 3 colors for form section styling
- **Input Colors**: 6 colors for input fields and styling
- **Icon Colors**: 3 colors for different input field icons
- **Button Colors**: 5 colors for send button and states
- **Social Media Colors**: 7 colors for social media icons and containers

**Total**: 31 dedicated Contact Us page colors for comprehensive theming support.

## Key Design Features

### **Form Design:**
- Clean input fields with proper borders and shadows
- Different icons for each input type (person, mail, message)
- Focused state styling for better UX
- Inner shadow gradients for depth

### **Button Styling:**
- Orange gradient for brand consistency
- Pressed state feedback
- Proper shadow for elevation

### **Social Media Integration:**
- Circular icon buttons with borders
- Consistent icon colors
- Pressed state visual feedback
- Clean container layout

### **Theme Adaptation:**
- All colors properly adapt between light and dark modes
- Maintains readability and accessibility
- Consistent with app's orange brand theme

## Implementation Notes

1. **Form Validation**: Use Toast system for validation messages
2. **Input Focus**: Implement focused border color changes
3. **Icon Consistency**: Different icons for different input types
4. **Accessibility**: All color combinations meet contrast requirements
5. **Brand Consistency**: Orange theme colors maintain brand identity
6. **User Experience**: Clear visual feedback for all form interactions

## Security & UX Considerations

- **Visual Hierarchy**: Clear distinction between different input types
- **Form Validation**: Proper error handling with Toast messages
- **Social Integration**: Easy access to social media channels
- **Email Integration**: Direct email composition functionality
- **Accessibility**: High contrast ratios for all text and interactive elements
- **User Flow**: Seamless experience with clear call-to-action buttons