# Complete Theme Colors Guide - All Components

## 🎨 **Comprehensive Color System**

Your ThemeContext now includes **100+ colors** covering every component and UI element in your app.

## 📱 **Component-Specific Colors**

### **🏠 Backgrounds**
```typescript
colors.background          // Main app background
colors.surface            // Cards, buttons surface
colors.card               // Individual card backgrounds
colors.overlay            // Modal/popup overlays
colors.modalBackground    // Modal content background
```

### **📝 Text Colors**
```typescript
colors.text               // Primary text
colors.textSecondary      // Secondary text
colors.textMuted          // Muted/disabled text
colors.textInverse        // Inverse text (white on dark)
colors.textDisabled       // Disabled text
```

### **🎯 Primary Colors**
```typescript
colors.primary            // Main orange (#FF8A00)
colors.primaryLight       // Light orange variant
colors.primaryDark        // Dark orange variant
```

### **🌈 Gradients**
```typescript
colors.gradient1          // Main gradient start
colors.gradient2          // Main gradient end
colors.gradientLight1     // Light gradient start
colors.gradientLight2     // Light gradient end
```

### **🔘 Buttons**
```typescript
colors.buttonPrimary      // Primary button background
colors.buttonSecondary    // Secondary button background
colors.buttonDisabled     // Disabled button background
colors.buttonText         // Primary button text
colors.buttonTextSecondary // Secondary button text
colors.buttonTextDisabled // Disabled button text
colors.buttonBorder       // Button borders
```

### **📝 Input Fields**
```typescript
colors.inputBackground    // Input field background
colors.inputBorder        // Input field border
colors.inputBorderFocused // Focused input border
colors.inputText          // Input text color
colors.inputPlaceholder   // Placeholder text
colors.inputIcon          // Input field icons
```

### **✅ Status Colors**
```typescript
colors.success           // Success green
colors.error             // Error red
colors.warning           // Warning orange
colors.info              // Info blue
colors.successLight      // Light success background
colors.errorLight        // Light error background
colors.warningLight      // Light warning background
colors.infoLight         // Light info background
```

### **🎨 UI Elements**
```typescript
colors.border            // General borders
colors.divider           // Divider lines
colors.shadow            // Shadow colors
colors.icon              // General icons
colors.iconSecondary     // Secondary icons
colors.iconDisabled      // Disabled icons
```

### **🧭 Navigation**
```typescript
colors.tabActive         // Active tab color
colors.tabInactive       // Inactive tab color
colors.tabBackground     // Tab bar background
colors.headerBackground  // Header background
colors.headerText        // Header text
colors.drawerBackground  // Drawer background
colors.drawerText        // Drawer text
colors.drawerActive      // Active drawer item
```

## 🏗️ **Component-Specific Colors**

### **📋 Header Component**
```typescript
colors.headerGradient1   // Header gradient start
colors.headerGradient2   // Header gradient end
colors.headerTitle       // Header title text
colors.headerSubtitle    // Header subtitle text
```

### **🃏 Cards**
```typescript
colors.cardBackground    // Card background
colors.cardBorder        // Card borders
colors.cardShadow        // Card shadows
colors.cardText          // Card text
colors.cardTextSecondary // Card secondary text
```

### **📋 Lists**
```typescript
colors.listItemBackground    // List item background
colors.listItemBorder        // List item borders
colors.listItemText          // List item text
colors.listItemTextSecondary // List item secondary text
colors.listSeparator         // List separators
```

### **📝 Forms**
```typescript
colors.formBackground    // Form background
colors.formLabel         // Form labels
colors.formError         // Form error text
colors.formSuccess       // Form success text
```

### **🔔 Modals**
```typescript
colors.modalOverlay      // Modal overlay
colors.modalContent      // Modal content background
colors.modalTitle        // Modal title text
colors.modalText         // Modal body text
```

### **🍞 Toast/Notifications**
```typescript
colors.toastBackground   // Toast background
colors.toastText         // Toast text
colors.toastBorder       // Toast border
colors.toastSuccess      // Success toast
colors.toastError        // Error toast
colors.toastWarning      // Warning toast
colors.toastInfo         // Info toast
```

### **⏳ Loading/Spinner**
```typescript
colors.loaderPrimary     // Primary loader color
colors.loaderSecondary   // Secondary loader color
colors.loaderBackground  // Loader background
```

### **🍽️ Recipe/Food Specific**
```typescript
colors.recipeCard        // Recipe card background
colors.recipeTitle       // Recipe title
colors.recipeDescription // Recipe description
colors.recipeMeta        // Recipe metadata (time, servings)
colors.cuisineTag        // Cuisine tag background
colors.cuisineTagText    // Cuisine tag text
colors.favoriteIcon      // Favorite heart icon
colors.ratingStars       // Rating stars
```

### **👤 Profile/User**
```typescript
colors.profileBackground    // Profile screen background
colors.profileCard          // Profile card background
colors.profileText          // Profile text
colors.profileTextSecondary // Profile secondary text
colors.profileBorder        // Profile borders
```

### **⚙️ Settings**
```typescript
colors.settingsBackground    // Settings screen background
colors.settingsCard          // Settings card background
colors.settingsText          // Settings text
colors.settingsTextSecondary // Settings secondary text
colors.settingsBorder        // Settings borders
colors.settingsIcon          // Settings icons
```

### **🔍 Search**
```typescript
colors.searchBackground  // Search bar background
colors.searchBorder      // Search bar border
colors.searchText        // Search text
colors.searchPlaceholder // Search placeholder
colors.searchIcon        // Search icon
```

## 💡 **Usage Examples**

### **Recipe Card Component**
```typescript
<View style={{
  backgroundColor: colors.recipeCard,
  borderColor: colors.cardBorder,
  shadowColor: colors.cardShadow,
}}>
  <Text style={{ color: colors.recipeTitle }}>Recipe Name</Text>
  <Text style={{ color: colors.recipeDescription }}>Description</Text>
  <Text style={{ color: colors.recipeMeta }}>30 mins • 4 servings</Text>
</View>
```

### **Form Input**
```typescript
<TextInput
  style={{
    backgroundColor: colors.inputBackground,
    borderColor: isFocused ? colors.inputBorderFocused : colors.inputBorder,
    color: colors.inputText,
  }}
  placeholderTextColor={colors.inputPlaceholder}
/>
```

### **Status Messages**
```typescript
<View style={{ backgroundColor: colors.successLight }}>
  <Text style={{ color: colors.success }}>Success message</Text>
</View>

<View style={{ backgroundColor: colors.errorLight }}>
  <Text style={{ color: colors.error }}>Error message</Text>
</View>
```

### **Navigation Tabs**
```typescript
<View style={{ backgroundColor: colors.tabBackground }}>
  <Text style={{ 
    color: isActive ? colors.tabActive : colors.tabInactive 
  }}>
    Tab Label
  </Text>
</View>
```

### **Loading Spinner**
```typescript
<ActivityIndicator 
  color={colors.loaderPrimary}
  style={{ backgroundColor: colors.loaderBackground }}
/>
```

## 🌙 **Dark Mode Support**

All colors automatically adapt between light and dark themes:

- **Light Mode**: Clean whites, subtle grays, vibrant colors
- **Dark Mode**: Dark backgrounds, light text, same orange branding
- **Consistent**: Orange theme (#FF8A00) maintained across both modes
- **Accessible**: Proper contrast ratios for readability

## 🎯 **Best Practices**

1. **Use semantic colors**: `colors.success` instead of hardcoded green
2. **Component-specific colors**: Use `colors.recipeCard` for recipe cards
3. **Status-aware**: Use light variants for backgrounds, regular for text
4. **Consistent branding**: Orange theme maintained across all components
5. **Accessibility**: All colors tested for proper contrast

Your app now has a complete, professional color system covering every component and use case! 🎉