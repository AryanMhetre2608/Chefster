# Profile Page Colors Guide

## 🎨 **Profile Page Color System**

I've added comprehensive colors for all Profile page features and UI elements.

## 👤 **Profile Page Structure Colors**

### **Main Profile Elements**
```typescript
colors.profileBackground        // Main profile screen background
colors.profileCard             // Profile card container
colors.profileText             // Primary profile text
colors.profileTextSecondary    // Secondary profile text
colors.profileBorder           // Profile borders
```

### **Avatar/Profile Picture**
```typescript
colors.profileAvatar           // Avatar background/placeholder
colors.profileAvatarBorder     // Avatar border
colors.profileAvatarPlaceholder // Avatar placeholder color
```

### **User Information**
```typescript
colors.profileName             // User name text
colors.profileEmail           // User email text
colors.profileInfoContainer   // Info container background
```

### **Feature List Items**
```typescript
colors.profileFeatureBackground // Feature item background
colors.profileFeatureBorder     // Feature item border
colors.profileFeatureText       // Feature item text
colors.profileFeatureShadow     // Feature item shadow
```

## 🎯 **Feature-Specific Icon Colors**

Based on your dataset.json, each profile feature has its own themed color:

### **Edit Profile**
```typescript
colors.profileEditIcon         // Orange (#FF8A00)
// Usage: Edit Profile icon
```

### **My Favourites**
```typescript
colors.profileFavoriteIcon     // Red (#FF6B6B)
// Usage: Favorites heart icon
```

### **About App**
```typescript
colors.profileAboutIcon        // Blue (#2196F3 / #42A5F5)
// Usage: Info/about icon
```

### **Privacy Policy**
```typescript
colors.profilePrivacyIcon      // Green (#4CAF50 / #66BB6A)
// Usage: Shield/privacy icon
```

### **Settings**
```typescript
colors.profileSettingsIcon    // Orange-Red (#FF5722)
// Usage: Settings gear icon
```

### **Logout**
```typescript
colors.profileLogoutIcon      // Red (#F44336 / #EF5350)
// Usage: Logout icon
```

### **Navigation Arrows**
```typescript
colors.profileChevronIcon     // Gray (#666666 / #AAAAAA)
// Usage: Right chevron arrows
```

## 🎨 **Interactive States**

### **Press/Hover Effects**
```typescript
colors.profileFeaturePressed  // Pressed state background
colors.profileFeatureHover    // Hover state background
```

## 💡 **Usage Examples**

### **Profile Header Section**
```typescript
<View style={{ backgroundColor: colors.profileBackground }}>
  <View style={{ 
    backgroundColor: colors.profileAvatar,
    borderColor: colors.profileAvatarBorder 
  }}>
    {/* Avatar content */}
  </View>
  
  <View style={{ backgroundColor: colors.profileInfoContainer }}>
    <Text style={{ color: colors.profileName }}>User Name</Text>
    <Text style={{ color: colors.profileEmail }}>user@email.com</Text>
  </View>
</View>
```

### **Feature List Items**
```typescript
<Pressable style={{
  backgroundColor: colors.profileFeatureBackground,
  borderColor: colors.profileFeatureBorder,
  shadowColor: colors.profileFeatureShadow,
}}>
  <Icon 
    name="edit-3" 
    color={colors.profileEditIcon}  // Orange for Edit Profile
  />
  <Text style={{ color: colors.profileFeatureText }}>
    Edit Profile
  </Text>
  <Icon 
    name="chevron-right" 
    color={colors.profileChevronIcon}
  />
</Pressable>
```

### **All Profile Features with Correct Colors**
```typescript
// Edit Profile
<Icon name="edit-3" color={colors.profileEditIcon} />

// My Favourites  
<Icon name="favorite" color={colors.profileFavoriteIcon} />

// About App
<Icon name="info" color={colors.profileAboutIcon} />

// Privacy Policy
<Icon name="shield" color={colors.profilePrivacyIcon} />

// Settings
<Icon name="settings" color={colors.profileSettingsIcon} />

// Logout
<Icon name="log-out" color={colors.profileLogoutIcon} />

// Navigation arrows
<Icon name="chevron-right" color={colors.profileChevronIcon} />
```

### **Interactive Feature Item**
```typescript
<Pressable 
  style={({ pressed }) => ({
    backgroundColor: pressed 
      ? colors.profileFeaturePressed 
      : colors.profileFeatureBackground,
    borderColor: colors.profileFeatureBorder,
  })}
  onPress={handlePress}
>
  {/* Feature content */}
</Pressable>
```

## 🌙 **Dark Mode Support**

All profile colors automatically adapt:

### **Light Mode**
- Clean white backgrounds
- Dark text for readability  
- Vibrant feature icon colors
- Subtle borders and shadows

### **Dark Mode**
- Dark gray backgrounds
- Light text for readability
- Same vibrant icon colors (consistent branding)
- Darker borders and shadows

## 🎯 **Color Mapping to Your Features**

Based on your `dataset.json` profilepageFeatures:

| Feature | Icon Color | Variable |
|---------|------------|----------|
| Edit Profile | Orange | `colors.profileEditIcon` |
| My Favourites | Red | `colors.profileFavoriteIcon` |
| About App | Blue | `colors.profileAboutIcon` |
| Privacy Policy | Green | `colors.profilePrivacyIcon` |
| Settings | Orange-Red | `colors.profileSettingsIcon` |
| Logout | Red | `colors.profileLogoutIcon` |
| Chevron Arrows | Gray | `colors.profileChevronIcon` |

## 🔧 **Implementation Tips**

1. **Use semantic colors**: `colors.profileEditIcon` instead of hardcoded orange
2. **Consistent theming**: All colors adapt to light/dark mode automatically
3. **Interactive states**: Use pressed/hover colors for better UX
4. **Icon consistency**: Each feature type has its dedicated color
5. **Accessibility**: All colors maintain proper contrast ratios

Your Profile page now has a complete, professional color system that matches your app's design and automatically supports dark mode! 🎉