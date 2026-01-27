# Change Password Page Colors Guide

This guide explains all the theme colors available for the Change Password page in the ThemeContext.

## Main Layout & Container Colors

### `changePasswordMainBackground`
- **Purpose**: Main screen background for the entire Change Password page
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#121212` (Very Dark Gray/Black)
- **Usage**: Main screen background

### `changePasswordContentBackground`
- **Purpose**: Content area background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Main content container background

### `changePasswordOverlayBackground`
- **Purpose**: Overlapping container background (rounded container that overlaps header)
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#1E1E1E` (Very Dark Gray)
- **Usage**: Overlapping container with rounded corners

## Header Section Colors

### `changePasswordHeaderBackground`
- **Purpose**: Header background color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Header background

### `changePasswordHeaderTitle`
- **Purpose**: Header title text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Change Password" title text

### `changePasswordHeaderText`
- **Purpose**: Header text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: General header text

## Input Field Colors

### `changePasswordInputContainer`
- **Purpose**: Input field container background
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#2D2D2D` (Dark Gray)
- **Usage**: TextInput container background

### `changePasswordInputBorder`
- **Purpose**: Input field border color
- **Light Mode**: `#E0E0E0` (Light Gray)
- **Dark Mode**: `#555555` (Medium Gray)
- **Usage**: Input field borders (if borders are added)

### `changePasswordInputText`
- **Purpose**: Input field text color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: Text color inside input fields

### `changePasswordInputPlaceholder`
- **Purpose**: Input field placeholder text color
- **Light Mode**: `#999999` (Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Placeholder text ("Current Password", "New Password", etc.)

### `changePasswordInputShadow`
- **Purpose**: Input field shadow color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#000000` (Black)
- **Usage**: Input field elevation shadow

## Input Icon Colors

### `changePasswordLockIcon`
- **Purpose**: Lock icon color for current password field
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Lock outline icon

### `changePasswordKeyIcon`
- **Purpose**: Key icon color for new password field
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Key plus icon

### `changePasswordCheckIcon`
- **Purpose**: Check icon color for confirm password field
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Lock check icon

### `changePasswordEyeIcon`
- **Purpose**: Eye icon color for show/hide password toggle
- **Light Mode**: `#666666` (Medium Gray)
- **Dark Mode**: `#AAAAAA` (Light Gray)
- **Usage**: Eye and eye-off icons

## Submit Button Colors

### `changePasswordButtonGradient1`
- **Purpose**: Submit button gradient start color
- **Light Mode**: `#FF8A00` (Orange)
- **Dark Mode**: `#FF8A00` (Orange)
- **Usage**: Change password button gradient start

### `changePasswordButtonGradient2`
- **Purpose**: Submit button gradient end color
- **Light Mode**: `#FF6A00` (Darker Orange)
- **Dark Mode**: `#FF6A00` (Darker Orange)
- **Usage**: Change password button gradient end

### `changePasswordButtonText`
- **Purpose**: Submit button text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Change Password" / "Changing..." button text

### `changePasswordButtonShadow`
- **Purpose**: Submit button shadow color
- **Light Mode**: `#000000` (Black)
- **Dark Mode**: `#000000` (Black)
- **Usage**: Button elevation shadow

### `changePasswordButtonDisabled`
- **Purpose**: Submit button disabled state color
- **Light Mode**: `#CCCCCC` (Light Gray)
- **Dark Mode**: `#555555` (Medium Gray)
- **Usage**: Button disabled state background

## Loading State Colors

### `changePasswordLoadingText`
- **Purpose**: Loading text color
- **Light Mode**: `#FFFFFF` (White)
- **Dark Mode**: `#FFFFFF` (White)
- **Usage**: "Changing..." text color

### `changePasswordLoadingBackground`
- **Purpose**: Loading overlay background
- **Light Mode**: `rgba(0, 0, 0, 0.3)` (Semi-transparent Black)
- **Dark Mode**: `rgba(0, 0, 0, 0.5)` (Semi-transparent Black)
- **Usage**: Loading overlay background

## Validation & Feedback Colors

### `changePasswordSuccessText`
- **Purpose**: Success message text color
- **Light Mode**: `#4CAF50` (Green)
- **Dark Mode**: `#66BB6A` (Light Green)
- **Usage**: Success feedback messages (e.g., "Password changed successfully")
- **Implementation**: Used in animated feedback component with check-circle icon

### `changePasswordErrorText`
- **Purpose**: Error message text color
- **Light Mode**: `#F44336` (Red)
- **Dark Mode**: `#EF5350` (Light Red)
- **Usage**: Error feedback messages (e.g., validation errors, authentication failures)
- **Implementation**: Used in animated feedback component with close-circle icon

### `changePasswordWarningText`
- **Purpose**: Warning message text color
- **Light Mode**: `#FF9800` (Orange)
- **Dark Mode**: `#FFA726` (Light Orange)
- **Usage**: Warning feedback messages (e.g., password length warnings)
- **Implementation**: Used in animated feedback component with alert-circle icon

## Usage Example

```typescript
import { useTheme } from '../context/ThemeContext';
import { Animated } from 'react-native';

const ChangePassword = () => {
  const { colors } = useTheme();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'warning' | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Show feedback message with animation
  const showFeedback = (message: string, type: 'success' | 'error' | 'warning') => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setFeedbackMessage('');
      setFeedbackType(null);
    });
  };

  // Get feedback message color based on type
  const getFeedbackColor = () => {
    switch (feedbackType) {
      case 'success':
        return colors.changePasswordSuccessText;
      case 'error':
        return colors.changePasswordErrorText;
      case 'warning':
        return colors.changePasswordWarningText;
      default:
        return colors.changePasswordErrorText;
    }
  };
  
  return (
    <View style={{ backgroundColor: colors.changePasswordMainBackground }}>
      {/* Header */}
      <Header 
        title="Change Password"
        style={{ backgroundColor: colors.changePasswordHeaderBackground }}
        titleStyle={{ color: colors.changePasswordHeaderTitle }}
      />
      
      {/* Content */}
      <View style={{ backgroundColor: colors.changePasswordOverlayBackground }}>
        {/* Feedback Message */}
        {feedbackMessage && (
          <Animated.View 
            style={{
              opacity: fadeAnim,
              backgroundColor: colors.changePasswordOverlayBackground,
              borderColor: getFeedbackColor(),
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              type="MaterialCommunityIcons"
              name={
                feedbackType === 'success' 
                  ? 'check-circle' 
                  : feedbackType === 'warning' 
                  ? 'alert-circle' 
                  : 'close-circle'
              }
              color={getFeedbackColor()}
              size={20}
            />
            <Text style={{ color: getFeedbackColor(), marginLeft: 8 }}>
              {feedbackMessage}
            </Text>
          </Animated.View>
        )}

        {/* Password Input Fields */}
        <View style={{ 
          backgroundColor: colors.changePasswordInputContainer,
          shadowColor: colors.changePasswordInputShadow 
        }}>
          <Icon 
            name="lock-outline" 
            color={colors.changePasswordLockIcon} 
          />
          <TextInput
            placeholder="Current Password"
            placeholderTextColor={colors.changePasswordInputPlaceholder}
            style={{ color: colors.changePasswordInputText }}
          />
          <Icon 
            name="eye" 
            color={colors.changePasswordEyeIcon} 
          />
        </View>
        
        {/* Submit Button */}
        <LinearGradient
          colors={[
            colors.changePasswordButtonGradient1, 
            colors.changePasswordButtonGradient2
          ]}
        >
          <Text style={{ color: colors.changePasswordButtonText }}>
            Change Password
          </Text>
        </LinearGradient>

        {/* Loading Overlay */}
        {loading && (
          <View style={{ 
            backgroundColor: colors.changePasswordLoadingBackground,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: colors.changePasswordLoadingText }}>
              Changing Password...
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  // Usage examples for feedback messages:
  // showFeedback('Password changed successfully', 'success');
  // showFeedback('Current password is incorrect', 'error');
  // showFeedback('New password must be at least 6 characters', 'warning');
}; 
            colors.changePasswordButtonGradient2
          ]}
        >
          <Text style={{ color: colors.changePasswordButtonText }}>
            Change Password
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};
```

## Color Categories Summary

- **Layout Colors**: 3 colors for main containers and backgrounds
- **Header Colors**: 3 colors for header elements
- **Input Colors**: 5 colors for input fields and styling
- **Icon Colors**: 4 colors for different input field icons
- **Button Colors**: 5 colors for submit button and states
- **Loading Colors**: 2 colors for loading states
- **Feedback Colors**: 3 colors for validation messages

**Total**: 25 dedicated Change Password page colors for comprehensive theming support.

## Key Design Features

### **Security Focus:**
- Different icons for each password field (lock, key, check)
- Eye icons for password visibility toggle
- Clear visual feedback for form validation

### **Input Field Design:**
- Consistent container backgrounds with elevation
- Proper contrast for text and placeholders
- Icon colors that complement the input styling

### **Button Styling:**
- Orange gradient for brand consistency
- Disabled state for form validation
- Loading state feedback

### **Validation System:**
- Green for success messages
- Red for error messages  
- Orange for warning messages

### **Theme Adaptation:**
- All colors properly adapt between light and dark modes
- Maintains readability and accessibility
- Consistent with app's orange brand theme

## Implementation Notes

1. **Feedback Messages**: Implemented animated feedback system replacing Alert.alert with themed messages
   - Success messages use `changePasswordSuccessText` with check-circle icon
   - Error messages use `changePasswordErrorText` with close-circle icon  
   - Warning messages use `changePasswordWarningText` with alert-circle icon
   - Messages auto-dismiss after 3 seconds with fade animation

2. **Loading States**: Implemented loading overlay with `changePasswordLoadingBackground` and `changePasswordLoadingText`

3. **Form Validation**: Real-time validation with immediate themed feedback
   - Field validation (empty fields, password mismatch)
   - Password strength validation (minimum 6 characters)
   - Authentication error handling with specific messages

4. **Icon Consistency**: Different icons for different password fields
   - Lock outline for current password
   - Key plus for new password
   - Lock check for confirm password
   - Eye/eye-off for password visibility toggle

5. **Accessibility**: All color combinations meet contrast requirements

6. **Brand Consistency**: Orange theme colors maintain brand identity

7. **User Experience**: Enhanced UX with visual feedback
   - Animated feedback messages instead of system alerts
   - Loading overlay during password change process
   - Auto-navigation back to previous screen on success
   - Form clearing after successful password change

## Security & UX Considerations

- **Visual Hierarchy**: Clear distinction between different input types
- **Feedback System**: Animated themed feedback messages replace system alerts for better UX
- **Loading States**: Clear indication when password change is in progress with themed overlay
- **Error Handling**: Distinct colors and icons for different types of messages (success/error/warning)
- **Accessibility**: High contrast ratios for all text and interactive elements
- **User Flow**: Seamless experience with auto-dismiss messages and navigation
- **Form State Management**: Clear visual feedback for all form interactions and validation states