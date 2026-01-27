# Theme-Aware Header Component

## ✅ **Fixed Issues:**
- Removed invalid syntax `{{colors.background}}`
- Moved `useTheme()` hook inside the component
- Made all colors theme-aware with proper fallbacks
- Fixed gradient colors array syntax

## 🎨 **Theme Integration:**

### **Default Theme Colors:**
```typescript
// These are used automatically if not overridden:
titleColor: colors.headerText        // White text
subTitleColor: colors.headerText     // White text  
gradientColors: [colors.gradient1, colors.gradient2]  // Orange gradient
shadowColor: colors.shadow           // Shadow color
iconColor: colors.headerText         // White icons
```

### **Usage Examples:**

#### **Basic Usage (uses theme defaults):**
```typescript
<Header title="Settings" />
```

#### **With Custom Colors:**
```typescript
<Header 
  title="Custom Header"
  titleColor="#FF0000"           // Override theme color
  subTitleColor="#00FF00"        // Override theme color
  gradientColors={['#FF0000', '#0000FF']}  // Custom gradient
/>
```

#### **With Subtitle:**
```typescript
<Header 
  title="Main Title"
  subTitle="Subtitle text"
/>
```

#### **With Left Component:**
```typescript
<Header 
  title="Back Navigation"
  leftComponent={
    <Pressable onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" color={colors.headerText} />
    </Pressable>
  }
/>
```

#### **With Right Component:**
```typescript
<Header 
  title="Profile"
  rightComponent={
    <Pressable onPress={() => navigation.navigate('Settings')}>
      <Icon name="settings" color={colors.headerText} />
    </Pressable>
  }
/>
```

## 🌙 **Dark Mode Support:**

The Header automatically adapts to dark mode:
- **Light Mode**: Orange gradient background, white text
- **Dark Mode**: Same orange gradient (consistent branding), white text
- **Shadows**: Automatically use theme shadow colors

## 📱 **Features:**

### **Automatic Theme Colors:**
- Uses `colors.headerText` for title and subtitle
- Uses `colors.gradient1` and `colors.gradient2` for background
- Uses `colors.shadow` for drop shadows

### **Customizable:**
- All colors can be overridden via props
- Custom gradients supported
- Custom left/right components
- Flexible styling options

### **Safe Area Aware:**
- Automatically handles device safe areas
- Proper status bar integration

## 🔧 **Props:**

```typescript
interface HeaderProps {
  title: string;                    // Required
  subTitle?: string;               // Optional
  onLeftPress?: () => void;        // Optional back button
  leftComponent?: React.ReactNode; // Custom left component
  rightComponent?: React.ReactNode;// Custom right component
  titleColor?: string;             // Override theme color
  subTitleColor?: string;          // Override theme color
  titleStyle?: TextStyle;          // Custom title styling
  subTitleStyle?: TextStyle;       // Custom subtitle styling
  subTitleContainerStyle?: ViewStyle; // Subtitle container styling
  height?: number;                 // Header height (default: 64)
  gradientColors?: string[];       // Custom gradient colors
}
```

## 🎯 **Best Practices:**

1. **Use defaults when possible** - Let the theme handle colors
2. **Override only when needed** - For special cases or branding
3. **Consistent heights** - Use default height for consistency
4. **Safe area handling** - Component handles this automatically

The Header component now seamlessly integrates with your app's theme system! 🎉