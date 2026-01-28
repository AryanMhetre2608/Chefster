import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {


    // ===== header go back button =====
    headerLeftComponent:string,
    headerRightComponent:string,
    headerTittle:string,
    headerSubTittle:string,
    headerAvatarPlaceholder: string,
    headerAvatarIcon: string,

    // ===== BACKGROUNDS =====
    headerTitleColor:string;
    background: string;
    surface: string;
    card: string;
    overlay: string;
    modalBackground: string;
    
    // ===== TEXT COLORS =====
    text: string;
    textSecondary: string;
    textMuted: string;
    textInverse: string;
    textDisabled: string;
    
    // ===== PRIMARY COLORS =====
    primary: string;
    primaryLight: string;
    primaryDark: string;
    
    // ===== GRADIENTS =====
    gradient1: string;
    gradient2: string;
    gradientLight1: string;
    gradientLight2: string;
    
    // ===== BUTTONS =====
    buttonPrimary: string;
    buttonSecondary: string;
    buttonDisabled: string;
    buttonText: string;
    buttonTextSecondary: string;
    buttonTextDisabled: string;
    buttonBorder: string;
    
    // ===== INPUT FIELDS =====
    inputBackground: string;
    inputBorder: string;
    inputBorderFocused: string;
    inputText: string;
    inputPlaceholder: string;
    inputIcon: string;
    
    // ===== STATUS COLORS =====
    success: string;
    error: string;
    warning: string;
    info: string;
    successLight: string;
    errorLight: string;
    warningLight: string;
    infoLight: string;
    
    // ===== UI ELEMENTS =====
    border: string;
    divider: string;
    shadow: string;
    icon: string;
    iconSecondary: string;
    iconDisabled: string;
    
    // ===== NAVIGATION =====
    tabActive: string;
    tabInactive: string;
    tabBackground: string;
    headerBackground: string;
    headerText: string;
    drawerBackground: string;
    drawerText: string;
    drawerActive: string;
    
    // ===== BOTTOM TAB NAVIGATOR COLORS =====
    // Tab Bar Container
    bottomTabBarBackground: string;          // Tab bar background color
    bottomTabBarBorder: string;              // Tab bar top border color
    bottomTabBarShadow: string;              // Tab bar shadow color
    
    // Tab Items
    bottomTabActiveBackground: string;       // Active tab background
    bottomTabInactiveBackground: string;     // Inactive tab background
    bottomTabActiveTint: string;             // Active tab icon and text color
    bottomTabInactiveTint: string;           // Inactive tab icon and text color
    
    // Tab Labels
    bottomTabActiveLabelColor: string;       // Active tab label text color
    bottomTabInactiveLabelColor: string;     // Inactive tab label text color
    bottomTabLabelFontWeight: string;        // Tab label font weight
    
    // Tab Icons
    bottomTabActiveIconColor: string;        // Active tab icon color
    bottomTabInactiveIconColor: string;      // Inactive tab icon color
    bottomTabIconSize: string;               // Tab icon size
    
    // Tab Indicators & Effects
    bottomTabIndicatorColor: string;         // Tab indicator/badge color
    bottomTabRippleColor: string;            // Tab press ripple effect color
    bottomTabPressedOpacity: string;         // Tab pressed opacity
    
    // Tab Bar Layout
    bottomTabBarHeight: string;              // Tab bar height
    bottomTabBarPaddingTop: string;          // Tab bar top padding
    bottomTabBarPaddingBottom: string;       // Tab bar bottom padding
    bottomTabBarElevation: string;           // Tab bar elevation (Android)
    
    // ===== SPECIFIC COMPONENTS =====
    // Header
    headerGradient1: string;
    headerGradient2: string;
    headerTitle: string;
    headerSubtitle: string;
    
    // Cards
    cardBackground: string;
    cardBorder: string;
    cardShadow: string;
    cardText: string;
    cardTextSecondary: string;
    
    // Lists
    listItemBackground: string;
    listItemBorder: string;
    listItemText: string;
    listItemTextSecondary: string;
    listSeparator: string;
    
    // Forms
    formBackground: string;
    formLabel: string;
    formError: string;
    formSuccess: string;
    
    // Modals
    modalOverlay: string;
    modalContent: string;
    modalTitle: string;
    modalText: string;
    
    // Toast/Notifications
    toastBackground: string;
    toastText: string;
    toastBorder: string;
    toastSuccess: string;
    toastError: string;
    toastWarning: string;
    toastInfo: string;
    
    // Loading/Spinner
    loaderPrimary: string;
    loaderSecondary: string;
    loaderBackground: string;
    
    // Recipe/Food specific
    recipeCard: string;
    recipeTitle: string;
    recipeDescription: string;
    recipeMeta: string;
    cuisineTag: string;
    cuisineTagText: string;
    favoriteIcon: string;
    ratingStars: string;
    
    // Profile/User
    profileBackground: string;
    profileCard: string;
    profileText: string;
    profileTextSecondary: string;
    profileBorder: string;
    
    // Profile Page Specific Features
    profileAvatar: string;
    profileAvatarBorder: string;
    profileAvatarPlaceholder: string;
    profileAvatarIcon: string;
    profileName: string;
    profileEmail: string;
    profilePhone: string;
    profileBio: string;
    profileInfoContainer: string;
    
    // Profile Feature Items
    profileFeatureBackground: string;
    profileFeatureBorder: string;
    profileFeatureText: string;
    profileFeatureShadow: string;
    
    // Profile Feature Icons (specific colors for each feature)
    profileEditIcon: string;           // Edit Profile - orange
    profileFavoriteIcon: string;       // My Favourites - red
    profileAboutIcon: string;          // About App - blue
    profilePrivacyIcon: string;        // Privacy Policy - green
    profileSettingsIcon: string;       // Settings - orange
    profileLogoutIcon: string;         // Logout - red
    profileChevronIcon: string;        // Right chevron arrows
    
    // Profile Feature Hover/Press States
    profileFeaturePressed: string;
    profileFeatureHover: string;
    
    // ===== EDIT PROFILE PAGE COLORS =====
    // Avatar Section
    editProfileAvatarContainer: string;      // Avatar container background
    editProfileAvatarBorder: string;         // Avatar border color
    editProfileAvatarPlaceholder: string;    // Avatar placeholder background
    editProfileAvatarIcon: string;           // Avatar placeholder icon color
    editProfileCameraButton: string;         // Camera button gradient start
    editProfileCameraButtonEnd: string;      // Camera button gradient end
    editProfileCameraIcon: string;           // Camera icon color
    
    // Form Section
    editProfileFormBackground: string;       // Form container background
    editProfileFormLabel: string;            // Form field labels (Full Name, Email, etc.)
    editProfileInputBackground: string;      // Text input background
    editProfileInputBorder: string;          // Text input border (normal state)
    editProfileInputBorderError: string;     // Text input border (error state)
    editProfileInputText: string;            // Text input text color
    editProfileInputPlaceholder: string;     // Text input placeholder color
    editProfileErrorText: string;            // Error message text color
    
    // Save Button
    editProfileSaveButton: string;           // Save button gradient start
    editProfileSaveButtonEnd: string;        // Save button gradient end
    editProfileSaveButtonText: string;       // Save button text color
    editProfileSaveButtonPressed: string;    // Save button pressed state opacity
    
    // Container/Layout
    editProfileContainer: string;            // Main container background
    editProfileOverlayContainer: string;     // Overlapping container background
    
    // ===== FAVOURITES PAGE COLORS =====
    // Main Layout & Containers
    favouritesMainBackground: string;        // Main screen background
    favouritesContentBackground: string;     // Content area background
    favouritesOverlayBackground: string;     // Overlay container background
    
    // Header Section
    favouritesHeaderBackground: string;      // Header background color
    favouritesHeaderTitle: string;           // Header title text color
    favouritesHeaderSubtitle: string;        // Header subtitle text color
    favouritesHeaderBackIcon: string;        // Back button icon color
    
    // Recipe Cards
    favouritesCardContainer: string;         // Recipe card background
    favouritesCardBorder: string;            // Recipe card border color
    favouritesCardShadow: string;            // Recipe card shadow color
    favouritesCardPressed: string;           // Recipe card pressed state
    
    // Recipe Card Content
    favouritesRecipeImage: string;           // Recipe image background/placeholder
    favouritesRecipeTitle: string;           // Recipe name text color
    favouritesRecipeSubtitle: string;        // Recipe cuisine text color
    favouritesRecipeMetadata: string;        // Recipe metadata text color
    
    // Action Buttons
    favouritesViewButtonBg: string;          // View button background
    favouritesViewButtonText: string;        // View button text color
    favouritesRemoveButtonBg: string;        // Remove button background
    favouritesRemoveButtonText: string;      // Remove button text color
    favouritesButtonShadow: string;          // Button shadow color
    favouritesButtonPressed: string;         // Button pressed opacity
    removeButtonGradient1:string,
    removeButtonGradient2:string,
    
    // Empty State
    favouritesEmptyBackground: string;       // Empty state container background
    favouritesEmptyText: string;             // Empty state text color
    favouritesEmptyIcon: string;             // Empty state icon color
    favouritesEmptyMessage: string;          // Empty state message color
    
    // List & Layout
    favouritesListBackground: string;        // FlatList background
    favouritesListSeparator: string;         // List item separator color
    favouritesScrollIndicator: string;       // Scroll indicator color
    
    // ===== ABOUT US PAGE COLORS =====
    // Main Layout & Containers
    aboutUsMainBackground: string;           // Main screen background
    aboutUsContentBackground: string;        // Content area background
    aboutUsScrollBackground: string;         // ScrollView background
    
    // Header Section
    aboutUsHeaderBackground: string;         // Header background color
    aboutUsHeaderTitle: string;              // Header title text color
    aboutUsHeaderBackIcon: string;           // Back button icon color
    
    // Logo & Branding
    aboutUsLogoContainer: string;            // Logo container background
    aboutUsAppName: string;                  // App name text color
    aboutUsVersionBox: string;               // Version box background
    aboutUsVersionText: string;              // Version text color
    
    // Tagline Section
    aboutUsTaglineText: string;              // Tagline text color
    aboutUsTaglineContainer: string;         // Tagline container background
    
    // Mission Card
    aboutUsMissionContainer: string;         // Mission card background
    aboutUsMissionBorderGradient1: string;            // Mission card border/gradient
    aboutUsMissionBorderGradient2: string; 
    aboutUsMissionBorderGradient3: string; 
    aboutUsMissionTitle: string;             // Mission title text color
    aboutUsMissionText: string;              // Mission description text color
    aboutUsMissionIcon: string;              // Mission icon tint
    
    // Features Section
    aboutUsFeaturesGradient1: string,            // Mission card border/gradient
    aboutUsFeaturesGradient2: string,
    aboutUsFeaturesGradient3: string,  
    aboutUsFeaturesTitle: string;            // Features section title color
    aboutUsFeatureBox: string;               // Feature box background
    aboutUsFeatureBorder: string;            // Feature box border color
    aboutUsFeatureIcon: string;              // Feature icon color
    aboutUsFeatureText: string;              // Feature text color
    aboutUsFeatureGradient: string;          // Feature gradient overlay
    
    // Footer Section
    aboutUsFooterBackground: string;         // Footer container background
    aboutUsFooterText: string;               // Footer text color
    aboutUsFooterLink: string;               // Footer link color
    aboutUsFooterSeparator: string;          // Footer separator dot color
    
    // ===== CHANGE PASSWORD PAGE COLORS =====
    // Main Layout & Containers
    changePasswordMainBackground: string;    // Main screen background
    changePasswordContentBackground: string; // Content area background
    changePasswordOverlayBackground: string; // Overlapping container background
    
    // Header Section
    changePasswordHeaderBackground: string;  // Header background color
    changePasswordHeaderTitle: string;       // Header title text color
    changePasswordHeaderText: string;        // Header text color
    
    // Input Fields
    changePasswordInputContainer: string;    // Input field container background
    changePasswordInputBorder: string;       // Input field border color
    changePasswordInputText: string;         // Input field text color
    changePasswordInputPlaceholder: string;  // Input field placeholder color
    changePasswordInputShadow: string;       // Input field shadow color
    
    // Input Icons
    changePasswordLockIcon: string;          // Lock icon color (current password)
    changePasswordKeyIcon: string;           // Key icon color (new password)
    changePasswordCheckIcon: string;         // Check icon color (confirm password)
    changePasswordEyeIcon: string;           // Eye icon color (show/hide password)
    
    // Submit Button
    changePasswordButtonGradient1: string;   // Submit button gradient start
    changePasswordButtonGradient2: string;   // Submit button gradient end
    changePasswordButtonText: string;        // Submit button text color
    changePasswordButtonShadow: string;      // Submit button shadow color
    changePasswordButtonDisabled: string;    // Submit button disabled state
    
    // Loading States
    changePasswordLoadingText: string;       // Loading text color
    changePasswordLoadingBackground: string; // Loading overlay background
    
    // Validation & Feedback
    changePasswordSuccessText: string;       // Success message color
    changePasswordErrorText: string;         // Error message color
    changePasswordWarningText: string;       // Warning message color
    
    // ===== PRIVACY POLICY PAGE COLORS =====
    // Main Layout
    privacyPolicyContainer: string;          // Main container background
    privacyPolicyOverlayContainer: string;   // Overlapping container background
    privacyPolicyContent: string;            // Content area background
    
    // Header Elements
    privacyPolicyHeaderBackground: string;   // Header background
    privacyPolicyHeaderTitle: string;        // Header title color
    privacyPolicyBackButton: string;         // Back button icon color
    privacyPolicyShieldIcon: string;         // Shield icon color
    
    // Policy Sections
    privacyPolicySection: string;            // Policy section container background
    privacyPolicySectionBorder: string;      // Policy section border
    privacyPolicySectionShadow: string;      // Policy section shadow
    
    // Section Headers
    privacyPolicyNumberBadge: string;        // Number badge gradient start
    privacyPolicyNumberBadgeEnd: string;     // Number badge gradient end
    privacyPolicyNumberText: string;         // Number text color in badge
    privacyPolicySectionTitle: string;       // Section title text color
    
    // Content Text
    privacyPolicyBodyText: string;           // Main body text color
    privacyPolicyBulletPoint: string;        // Bullet point color
    privacyPolicyBulletText: string;         // Bullet point text color
    privacyPolicyLastUpdated: string;        // Last updated text color
    
    // Links and Interactive Elements
    privacyPolicyEmailLink: string;          // Email link color
    privacyPolicyEmailLinkUnderline: string; // Email link underline
    privacyPolicyContactText: string;        // Contact text color
    
    // Footer
    privacyPolicyFooterText: string;         // Footer text color
    privacyPolicyFooterLink: string;         // Footer link color
    
    // ===== LOGOUT PAGE COLORS =====
    // Main Layout
    logoutContainer: string;                 // Main container background
    logoutOverlayContainer: string;          // Overlapping container background
    logoutSubContainer: string;              // Sub container background
    
    // Header Elements
    logoutHeaderBackground: string;          // Header background
    logoutHeaderTitle: string;               // Header title color
    logoutHeaderText: string;                // Header text color
    
    // Logo Section
    logoutLogoContainer: string;             // Logo container background
    logoutLogoShadow: string;                // Logo shadow color
    logoutLogoBorder: string;                // Logo border color
    
    // Text Elements
    logoutMainTitle: string;                 // Main "Logout?" title color
    logoutSubtitle: string;                  // Subtitle text color
    logoutDescription: string;               // Description text color
    
    // Logout Button
    logoutButtonGradient1: string;           // Logout button gradient start
    logoutButtonGradient2: string;           // Logout button gradient end
    logoutButtonText: string;                // Logout button text color
    logoutButtonShadow: string;              // Logout button shadow color
    logoutButtonPressed: string;             // Logout button pressed opacity
    
    // Cancel Button
    logoutCancelBackground: string;          // Cancel button background
    logoutCancelBorder: string;              // Cancel button border color
    logoutCancelText: string;                // Cancel button text color
    logoutCancelPressed: string;             // Cancel button pressed state
    
    // Image Elements
    logoutImageTint: string;                 // Logout image tint (if needed)
    logoutImageBackground: string;           // Image background/placeholder
    
    // ===== CONTACT US PAGE COLORS =====
    // Main Layout & Containers
    contactUsMainBackground: string;         // Main screen background
    contactUsContentBackground: string;      // Content area background
    contactUsOverlayBackground: string;      // Overlapping container background
    contactUsScrollBackground: string;       // ScrollView background
    
    // Header Section
    contactUsHeaderBackground: string;       // Header background color
    contactUsHeaderTitle: string;            // Header title text color
    contactUsHeaderText: string;             // Header text color
    
    // Form Section
    contactUsFormBackground: string;         // Form container background
    contactUsFormLabel: string;              // Form field labels (Name, Email, Message)
    contactUsFormLabelText: string;          // Form label text color
    
    // Input Fields
    contactUsInputContainer: string;         // Input field container background
    contactUsInputBorder: string;            // Input field border color
    contactUsInputBorderFocused: string;     // Input field border (focused state)
    contactUsInputText: string;              // Input field text color
    contactUsInputPlaceholder: string;       // Input field placeholder color
    contactUsInputShadow: string;            // Input field shadow color
    
    // Input Icons
    contactUsPersonIcon: string;             // Person icon color (name field)
    contactUsEmailIcon: string;              // Email icon color (email field)
    contactUsMessageIcon: string;            // Message icon color (message field)
    
    // Send Button
    contactUsSendButtonGradient1: string;    // Send button gradient start
    contactUsSendButtonGradient2: string;    // Send button gradient end
    contactUsSendButtonText: string;         // Send button text color
    contactUsSendButtonShadow: string;       // Send button shadow color
    contactUsSendButtonPressed: string;      // Send button pressed state
    
    // Social Media Icons
    contactUsSocialContainer: string;        // Social media container background
    contactUsSocialBorder: string;           // Social media icon border color
    contactUsSocialBackground: string;       // Social media icon background
    contactUsInstagramIcon: string;          // Instagram icon color
    contactUsFacebookIcon: string;           // Facebook icon color
    contactUsMailIcon: string;               // Mail icon color
    contactUsSocialPressed: string;          // Social icon pressed state
    
    // ===== UNIVERSAL RECIPE PAGE COLORS =====
    // Main Layout & Containers
    universalRecipeMainBackground: string;   // Main screen background
    universalRecipeImageContainer: string;   // Recipe image container background
    universalRecipeContentBackground: string; // Content area background
    universalRecipeScrollBackground: string; // ScrollView background
    
    // Recipe Image Section
    universalRecipeImageBackground: string;  // Recipe image background/placeholder
    universalRecipeImageBorder: string;      // Recipe image border color
    universalRecipeImageShadow: string;      // Recipe image shadow color
    
    // Recipe Header Section
    universalRecipeTitle: string;            // Recipe title text color
    universalRecipeCuisine: string;          // Recipe cuisine text color
    universalRecipeInfoBackground: string;   // Info row background
    universalRecipeInfoText: string;         // Info text color (servings, prep, cook time)
    universalRecipeInfoBorder: string;       // Info item border color
    
    // Section Containers
    universalRecipeSectionBackground: string; // Section container background
    universalRecipeSectionBorder: string;    // Section container border
    universalRecipeSectionShadow: string;    // Section container shadow
    universalRecipeSectionTitle: string;     // Section title color (Ingredients, Instructions, etc.)
    universalRecipeSectionTitleBorder: string; // Section title bottom border
    
    // Ingredients Section
    universalRecipeIngredientText: string;   // Ingredient text color
    universalRecipeIngredientBullet: string; // Ingredient bullet point color
    universalRecipeIngredientBackground: string; // Ingredient item background
    
    // Instructions Section
    universalRecipeStepNumber: string;       // Step number color
    universalRecipeStepNumberBackground: string; // Step number background
    universalRecipeInstructionText: string;  // Instruction text color
    universalRecipeInstructionBackground: string; // Instruction item background
    
    // Serving Suggestions Section
    universalRecipeSuggestionText: string;   // Suggestion text color
    universalRecipeSuggestionBullet: string; // Suggestion bullet point color
    universalRecipeSuggestionBackground: string; // Suggestion item background
    
    // Error State
    universalRecipeErrorText: string;        // Error message text color
    universalRecipeErrorBackground: string;  // Error container background
    universalRecipeErrorImageBorder: string; // Error image border color
    
    // ===== ALL CUISINES PAGE COLORS =====
    // Main Layout & Containers
    allCuisinesMainBackground: string;       // Main screen background
    allCuisinesContentBackground: string;    // Content area background
    
    // Header Section
    allCuisinesHeaderBackground: string;     // Header background color
    allCuisinesHeaderTitle: string;          // Header title text color
    allCuisinesHeaderBackIcon: string;       // Back button icon color
    
    // Cuisine Title
    allCuisinesTitleText: string;            // Cuisine title text color
    
    // Food Item Cards
    allCuisinesFoodItemContainer: string;    // Food item card background
    allCuisinesFoodItemBorder: string;       // Food item card border color
    allCuisinesFoodItemShadow: string;       // Food item card shadow color
    allCuisinesFoodItemPressed: string;      // Food item card pressed state
    
    // Food Item Content
    allCuisinesFoodImage: string;            // Food image background/placeholder
    allCuisinesFoodImageBorder: string;      // Food image border color
    allCuisinesFoodName: string;             // Food name text color
    allCuisinesFoodCategory: string;         // Food category text color
    
    // Prep Time Container
    allCuisinesPrepTimeContainer: string;    // Prep time container background
    allCuisinesPrepTimeText: string;         // Prep time text color
    allCuisinesPrepTimeIcon: string;         // Prep time clock icon color
    
    // Favorite Button
    allCuisinesFavoriteButton: string;       // Favorite button background
    allCuisinesFavoriteIconActive: string;   // Active favorite icon color
    allCuisinesFavoriteIconInactive: string; // Inactive favorite icon color
    
    // List Layout
    allCuisinesListBackground: string;       // FlatList background
    allCuisinesScrollIndicator: string;      // Scroll indicator color
    
    // ===== LOGIN PAGE COLORS =====
    // Main Layout & Container
    loginMainBackground: string;             // Main screen background
    loginCardBackground: string;             // Card container background
    loginCardShadow: string;                 // Card shadow color
    
    // Text Elements
    loginTitle: string;                      // Login title text color
    loginSubtitle: string;                   // Subtitle text color
    
    // Input Fields
    loginInputBackground: string;            // Input field background
    loginInputBorder: string;                // Input field border color
    loginInputText: string;                  // Input field text color
    loginInputPlaceholder: string;           // Input field placeholder color
    
    // Password Field
    loginPasswordContainer: string;          // Password container background
    loginPasswordBorder: string;             // Password container border
    loginPasswordText: string;               // Password text color
    loginShowHideText: string;               // Show/Hide button text color
    
    // Buttons
    loginButtonBackground: string;           // Login button background
    loginButtonText: string;                 // Login button text color
    loginButtonDisabled: string;             // Login button disabled opacity
    loginForgotPasswordText: string;         // Forgot password link color
    
    // Navigation Links
    loginSignupText: string;                 // "Don't have account" text color
    loginSignupLink: string;                 // Register link color
    
    // Loading
    loginLoadingIndicator: string;           // Loading indicator color
    
    // ===== REGISTRATION PAGE COLORS =====
    // Main Layout & Container
    registrationMainBackground: string;      // Main screen background
    registrationCardBackground: string;      // Card container background
    registrationCardShadow: string;          // Card shadow color
    
    // Text Elements
    registrationTitle: string;               // Registration title text color
    registrationSubtitle: string;            // Subtitle text color
    
    // Input Fields
    registrationInputBackground: string;     // Input field background
    registrationInputBorder: string;         // Input field border color
    registrationInputText: string;           // Input field text color
    registrationInputPlaceholder: string;    // Input field placeholder color
    
    // Password Fields
    registrationPasswordContainer: string;   // Password container background
    registrationPasswordBorder: string;      // Password container border
    registrationPasswordText: string;        // Password text color
    registrationShowHideText: string;        // Show/Hide button text color
    
    // Buttons
    registrationButtonBackground: string;    // Register button background
    registrationButtonText: string;          // Register button text color
    registrationButtonDisabled: string;      // Register button disabled opacity
    
    // Navigation Links
    registrationLoginText: string;           // "Already have account" text color
    registrationLoginLink: string;           // Login link color
    
    // Loading
    registrationLoadingIndicator: string;    // Loading indicator color
    
    // Settings
    settingsBackground: string;
    settingsCard: string;
    settingsText: string;
    settingsTextSecondary: string;
    settingsBorder: string;
    settingsIcon: string;
    
    // Search
    searchBackground: string;
    searchBorder: string;
    searchText: string;
    searchPlaceholder: string;
    searchIcon: string;
    
    // Legacy (for backward compatibility)
    darkGrey: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference on app start
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
      // Fallback to light mode if there's an error
      setIsDarkMode(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newTheme));
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const lightColors = {
    headerLeftComponent:'#FFFFFF',
    headerRightComponent:'#FFFFFF',
    headerTittle:'#FFFFFF',
    headerSubTittle:'#FFFFFF',
    headerAvatarPlaceholder: '#E0E0E0',
    headerAvatarIcon: '#999999',


    // ===== BACKGROUNDS =====
    headerTitleColor:'#FFFFFF',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
    modalBackground: '#FFFFFF',
    
    // ===== TEXT COLORS =====
    text: '#000000',
    textSecondary: '#666666',
    textMuted: '#999999',
    textInverse: '#FFFFFF',
    textDisabled: '#CCCCCC',
    
    // ===== PRIMARY COLORS =====
    primary: '#FF8A00',
    primaryLight: '#FFB84D',
    primaryDark: '#E67300',
    
    // ===== GRADIENTS =====
    gradient1: '#FF8A00',
    gradient2: '#FF6A00',
    gradientLight1: '#FFB84D',
    gradientLight2: '#FF9933',
    
    // ===== BUTTONS =====
    buttonPrimary: '#FF8A00',
    buttonSecondary: '#F8F9FA',
    buttonDisabled: '#CCCCCC',
    buttonText: '#FFFFFF',
    buttonTextSecondary: '#666666',
    buttonTextDisabled: '#999999',
    buttonBorder: '#E0E0E0',
    
    // ===== INPUT FIELDS =====
    inputBackground: '#FFFFFF',
    inputBorder: '#E0E0E0',
    inputBorderFocused: '#FF8A00',
    inputText: '#000000',
    inputPlaceholder: '#999999',
    inputIcon: '#666666',
    
    // ===== STATUS COLORS =====
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#FF8A00',
    successLight: '#E8F5E8',
    errorLight: '#FFEBEE',
    warningLight: '#FFF3E0',
    infoLight: '#E3F2FD',
    
    // ===== UI ELEMENTS =====
    border: '#E0E0E0',
    divider: '#F0F0F0',
    shadow: '#000000',
    icon: '#666666',
    iconSecondary: '#999999',
    iconDisabled: '#CCCCCC',
    
    // ===== NAVIGATION =====
    tabActive: '#FF8A00',
    tabInactive: '#999999',
    tabBackground: '#FFFFFF',
    headerBackground: '#FF8A00',
    headerText: '#FFFFFF',
    drawerBackground: '#FFFFFF',
    drawerText: '#000000',
    drawerActive: '#FF8A00',
    
    // ===== BOTTOM TAB NAVIGATOR COLORS =====
    // Tab Bar Container
    bottomTabBarBackground: '#FFFFFF',          // Tab bar background color
    bottomTabBarBorder: '#E0E0E0',              // Tab bar top border color
    bottomTabBarShadow: '#000000',              // Tab bar shadow color
    
    // Tab Items
    bottomTabActiveBackground: 'transparent',   // Active tab background
    bottomTabInactiveBackground: 'transparent', // Inactive tab background
    bottomTabActiveTint: '#FF5722',             // Active tab icon and text color
    bottomTabInactiveTint: '#666666',           // Inactive tab icon and text color
    
    // Tab Labels
    bottomTabActiveLabelColor: '#FF5722',       // Active tab label text color
    bottomTabInactiveLabelColor: '#666666',     // Inactive tab label text color
    bottomTabLabelFontWeight: '600',            // Tab label font weight
    
    // Tab Icons
    bottomTabActiveIconColor: '#FF5722',        // Active tab icon color
    bottomTabInactiveIconColor: '#666666',      // Inactive tab icon color
    bottomTabIconSize: '22',                    // Tab icon size
    
    // Tab Indicators & Effects
    bottomTabIndicatorColor: '#FF8A00',         // Tab indicator/badge color
    bottomTabRippleColor: '#FFE6CC',            // Tab press ripple effect color
    bottomTabPressedOpacity: '0.7',             // Tab pressed opacity
    
    // Tab Bar Layout
    bottomTabBarHeight: '60',                   // Tab bar height
    bottomTabBarPaddingTop: '5',                // Tab bar top padding
    bottomTabBarPaddingBottom: '5',             // Tab bar bottom padding
    bottomTabBarElevation: '8',                 // Tab bar elevation (Android)
    
    // ===== SPECIFIC COMPONENTS =====
    // Header
    headerGradient1: '#FF8A00',
    headerGradient2: '#FF6A00',
    headerTitle: '#FFFFFF',
    headerSubtitle: '#FFE6CC',
    
    // Cards
    cardBackground: '#FFFFFF',
    cardBorder: '#E0E0E0',
    cardShadow: '#000000',
    cardText: '#000000',
    cardTextSecondary: '#666666',
    
    // Lists
    listItemBackground: '#FFFFFF',
    listItemBorder: '#F0F0F0',
    listItemText: '#000000',
    listItemTextSecondary: '#666666',
    listSeparator: '#E0E0E0',
    
    // Forms
    formBackground: '#FFFFFF',
    formLabel: '#333333',
    formError: '#F44336',
    formSuccess: '#4CAF50',
    
    // Modals
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
    modalContent: '#FFFFFF',
    modalTitle: '#000000',
    modalText: '#666666',
    
    // Toast/Notifications
    toastBackground: '#FFFFFF',
    toastText: '#333333',
    toastBorder: '#E0E0E0',
    toastSuccess: '#4CAF50',
    toastError: '#F44336',
    toastWarning: '#FF9800',
    toastInfo: '#FF8A00',
    
    // Loading/Spinner
    loaderPrimary: '#FF8A00',
    loaderSecondary: '#FFB84D',
    loaderBackground: 'rgba(255, 255, 255, 0.8)',
    
    // Recipe/Food specific
    recipeCard: '#FFFFFF',
    recipeTitle: '#000000',
    recipeDescription: '#666666',
    recipeMeta: '#999999',
    cuisineTag: '#FF8A00',
    cuisineTagText: '#FFFFFF',
    favoriteIcon: '#FF6B6B',
    ratingStars: '#FFD700',
    
    // Profile/User
    profileBackground: '#F8F9FA',
    profileCard: '#FFFFFF',
    profileText: '#000000',
    profileTextSecondary: '#666666',
    profileBorder: '#E0E0E0',
    
    // Profile Page Specific Features
    profileAvatar: '#F0F0F0',
    profileAvatarBorder: '#E0E0E0',
    profileAvatarPlaceholder: '#CCCCCC',
    profileAvatarIcon: '#999999',
    profileName: '#000000',
    profileEmail: '#666666',
    profilePhone: '#888888',
    profileBio: '#777777',
    profileInfoContainer: '#FFFFFF',
    
    // Profile Feature Items
    profileFeatureBackground: '#FFFFFF',
    profileFeatureBorder: '#E0E0E0',
    profileFeatureText: '#000000',
    profileFeatureShadow: '#000000',
    
    // Profile Feature Icons (specific colors for each feature)
    profileEditIcon: '#FF8A00',        // Edit Profile - orange
    profileFavoriteIcon: '#FF6B6B',    // My Favourites - red
    profileAboutIcon: '#FF8A00',       // About App - orange
    profilePrivacyIcon: '#4CAF50',     // Privacy Policy - green
    profileSettingsIcon: '#FF5722',    // Settings - orange/red
    profileLogoutIcon: '#F44336',      // Logout - red
    profileChevronIcon: '#666666',     // Right chevron arrows
    
    // Profile Feature Hover/Press States
    profileFeaturePressed: '#F5F5F5',
    profileFeatureHover: '#F8F9FA',
    
    // ===== EDIT PROFILE PAGE COLORS =====
    // Avatar Section
    editProfileAvatarContainer: '#FFFFFF',      // Avatar container background
    editProfileAvatarBorder: '#E0E0E0',         // Avatar border color
    editProfileAvatarPlaceholder: '#F5F5F5',    // Avatar placeholder background
    editProfileAvatarIcon: '#CCCCCC',           // Avatar placeholder icon color
    editProfileCameraButton: '#FF8A00',         // Camera button gradient start
    editProfileCameraButtonEnd: '#FF6A00',      // Camera button gradient end
    editProfileCameraIcon: '#FFFFFF',           // Camera icon color
    
    // Form Section
    editProfileFormBackground: '#F5F5F5',       // Form container background
    editProfileFormLabel: '#666666',            // Form field labels (Full Name, Email, etc.)
    editProfileInputBackground: '#D3D3D3',      // Text input background
    editProfileInputBorder: '#CCCCCC',          // Text input border (normal state)
    editProfileInputBorderError: '#F44336',     // Text input border (error state)
    editProfileInputText: '#000000',            // Text input text color
    editProfileInputPlaceholder: '#999999',     // Text input placeholder color
    editProfileErrorText: '#F44336',            // Error message text color
    
    // Save Button
    editProfileSaveButton: '#FF8A00',           // Save button gradient start
    editProfileSaveButtonEnd: '#FF6A00',        // Save button gradient end
    editProfileSaveButtonText: '#FFFFFF',       // Save button text color
    editProfileSaveButtonPressed: '0.85',       // Save button pressed state opacity
    
    // Container/Layout
    editProfileContainer: '#FFFFFF',            // Main container background
    editProfileOverlayContainer: '#F5F5F5',     // Overlapping container background
    
    // ===== FAVOURITES PAGE COLORS =====
    // Main Layout & Containers
    favouritesMainBackground: '#F8F9FA',        // Main screen background
    favouritesContentBackground: '#FFFFFF',     // Content area background
    favouritesOverlayBackground: '#FFFFFF',     // Overlay container background
    
    // Header Section
    favouritesHeaderBackground: '#FF8A00',      // Header background color
    favouritesHeaderTitle: '#FFFFFF',           // Header title text color
    favouritesHeaderSubtitle: '#FFE6CC',        // Header subtitle text color
    favouritesHeaderBackIcon: '#FFFFFF',        // Back button icon color
    
    // Recipe Cards
    favouritesCardContainer: '#FFFFFF',         // Recipe card background
    favouritesCardBorder: '#E5E5E5',            // Recipe card border color
    favouritesCardShadow: '#000000',            // Recipe card shadow color
    favouritesCardPressed: '#F8F9FA',           // Recipe card pressed state
    
    // Recipe Card Content
    favouritesRecipeImage: '#F0F0F0',           // Recipe image background/placeholder
    favouritesRecipeTitle: '#1A1A1A',           // Recipe name text color
    favouritesRecipeSubtitle: '#666666',        // Recipe cuisine text color
    favouritesRecipeMetadata: '#888888',        // Recipe metadata text color
    
    // Action Buttons
    favouritesViewButtonBg: '#4CAF50',          // View button background (green)
    favouritesViewButtonText: '#FFFFFF',        // View button text color
    favouritesRemoveButtonBg: '#F44336',        // Remove button background (red)
    favouritesRemoveButtonText: '#FFFFFF',      // Remove button text color
    favouritesButtonShadow: '#000000',          // Button shadow color
    favouritesButtonPressed: '0.8',             // Button pressed opacity
    removeButtonGradient1:"#ff6090",
    removeButtonGradient2:"#e91e63",
    
    // Empty State
    favouritesEmptyBackground: '#FFFFFF',       // Empty state container background
    favouritesEmptyText: '#666666',             // Empty state text color
    favouritesEmptyIcon: '#CCCCCC',             // Empty state icon color
    favouritesEmptyMessage: '#888888',          // Empty state message color
    
    // List & Layout
    favouritesListBackground: '#F8F9FA',        // FlatList background
    favouritesListSeparator: '#E5E5E5',         // List item separator color
    favouritesScrollIndicator: '#CCCCCC',       // Scroll indicator color
    
    // ===== ABOUT US PAGE COLORS =====
    // Main Layout & Containers
    aboutUsMainBackground: '#FFFFFF',           // Main screen background
    aboutUsContentBackground: '#FFFFFF',        // Content area background
    aboutUsScrollBackground: '#FFFFFF',         // ScrollView background
    
    // Header Section
    aboutUsHeaderBackground: '#FF8A00',         // Header background color
    aboutUsHeaderTitle: '#FFFFFF',              // Header title text color
    aboutUsHeaderBackIcon: '#FFFFFF',           // Back button icon color
    
    // Logo & Branding
    aboutUsLogoContainer: '#FFFFFF',            // Logo container background
    aboutUsAppName: '#FF5722',                  // App name text color (orange-red)
    aboutUsVersionBox: '#666666',               // Version box background (gray)
    aboutUsVersionText: '#FFFFFF',              // Version text color
    
    // Tagline Section
    aboutUsTaglineText: '#666666',              // Tagline text color
    aboutUsTaglineContainer: '#FFFFFF',         // Tagline container background
    
    // Mission Card
    aboutUsMissionContainer: '#FFFFFF',         // Mission card background
    aboutUsMissionBorder: '#FFB8B8',            // Mission card border/gradient (light pink)
    aboutUsMissionTitle: '#000000',             // Mission title text color
    aboutUsMissionText: '#333333',              // Mission description text color
    aboutUsMissionIcon: '#FF5722',              // Mission icon tint
     aboutUsMissionBorderGradient1: '#FF8A00',            // Mission card border/gradient
    aboutUsMissionBorderGradient2: '#FF6A00',
    aboutUsMissionBorderGradient3: '#E65100',
    
    // Features Section
    aboutUsFeaturesTitle: '#000000',            // Features section title color
    aboutUsFeatureBox: '#FFFFFF',               // Feature box background
    aboutUsFeatureBorder: '#666666',            // Feature box border color
    aboutUsFeatureIcon: '#FF5722',              // Feature icon color (orange-red)
    aboutUsFeatureText: '#000000',              // Feature text color
    aboutUsFeatureGradient: '#FFE4E4',
    aboutUsFeaturesGradient1: '#FF8A00',            // Mission card border/gradient
    aboutUsFeaturesGradient2: '#FF6A00',
    aboutUsFeaturesGradient3: '#E65100',          // Feature gradient overlay (light pink)
    
    // Footer Section
    aboutUsFooterBackground: '#FFFFFF',         // Footer container background
    aboutUsFooterText: '#000000',               // Footer text color
    aboutUsFooterLink: '#FF5722',               // Footer link color (orange-red)
    aboutUsFooterSeparator: '#666666',          // Footer separator dot color
    
    // ===== CHANGE PASSWORD PAGE COLORS =====
    // Main Layout & Containers
    changePasswordMainBackground: '#FFFFFF',    // Main screen background
    changePasswordContentBackground: '#FFFFFF', // Content area background
    changePasswordOverlayBackground: '#FFFFFF', // Overlapping container background
    
    // Header Section
    changePasswordHeaderBackground: '#FF8A00',  // Header background color
    changePasswordHeaderTitle: '#FFFFFF',       // Header title text color
    changePasswordHeaderText: '#FFFFFF',        // Header text color
    
    // Input Fields
    changePasswordInputContainer: '#FFFFFF',    // Input field container background
    changePasswordInputBorder: '#E0E0E0',       // Input field border color
    changePasswordInputText: '#000000',         // Input field text color
    changePasswordInputPlaceholder: '#999999',  // Input field placeholder color
    changePasswordInputShadow: '#000000',       // Input field shadow color
    
    // Input Icons
    changePasswordLockIcon: '#666666',          // Lock icon color (current password)
    changePasswordKeyIcon: '#666666',           // Key icon color (new password)
    changePasswordCheckIcon: '#666666',         // Check icon color (confirm password)
    changePasswordEyeIcon: '#666666',           // Eye icon color (show/hide password)
    
    // Submit Button
    changePasswordButtonGradient1: '#FF8A00',   // Submit button gradient start
    changePasswordButtonGradient2: '#FF6A00',   // Submit button gradient end
    changePasswordButtonText: '#FFFFFF',        // Submit button text color
    changePasswordButtonShadow: '#000000',      // Submit button shadow color
    changePasswordButtonDisabled: '#CCCCCC',    // Submit button disabled state
    
    // Loading States
    changePasswordLoadingText: '#FFFFFF',       // Loading text color
    changePasswordLoadingBackground: 'rgba(0, 0, 0, 0.3)', // Loading overlay background
    
    // Validation & Feedback
    changePasswordSuccessText: '#4CAF50',       // Success message color (green)
    changePasswordErrorText: '#F44336',         // Error message color (red)
    changePasswordWarningText: '#FF9800',       // Warning message color (orange)
    
    // Settings
    settingsBackground: '#F8F9FA',
    settingsCard: '#FFFFFF',
    settingsText: '#000000',
    settingsTextSecondary: '#666666',
    settingsBorder: '#E0E0E0',
    settingsIcon: '#666666',
    
    // Search
    searchBackground: '#F8F9FA',
    searchBorder: '#E0E0E0',
    searchText: '#000000',
    searchPlaceholder: '#999999',
    searchIcon: '#666666',
    
    // ===== PRIVACY POLICY PAGE COLORS =====
    // Main Layout
    privacyPolicyContainer: '#FFFFFF',          // Main container background
    privacyPolicyOverlayContainer: '#F5F5F5',   // Overlapping container background
    privacyPolicyContent: '#F5F5F5',            // Content area background
    
    // Header Elements
    privacyPolicyHeaderBackground: '#FF8A00',   // Header background
    privacyPolicyHeaderTitle: '#FFFFFF',        // Header title color
    privacyPolicyBackButton: '#FFFFFF',         // Back button icon color
    privacyPolicyShieldIcon: '#FFFFFF',         // Shield icon color
    
    // Policy Sections
    privacyPolicySection: '#FFFFFF',            // Policy section container background
    privacyPolicySectionBorder: '#E0E0E0',      // Policy section border
    privacyPolicySectionShadow: '#000000',      // Policy section shadow
    
    // Section Headers
    privacyPolicyNumberBadge: '#FF8A00',        // Number badge gradient start
    privacyPolicyNumberBadgeEnd: '#FF6A00',     // Number badge gradient end
    privacyPolicyNumberText: '#FFFFFF',         // Number text color in badge
    privacyPolicySectionTitle: '#000000',       // Section title text color
    
    // Content Text
    privacyPolicyBodyText: '#000000',           // Main body text color
    privacyPolicyBulletPoint: '#FF5722',        // Bullet point color
    privacyPolicyBulletText: '#000000',         // Bullet point text color
    privacyPolicyLastUpdated: '#666666',        // Last updated text color
    
    // Links and Interactive Elements
    privacyPolicyEmailLink: '#FF5722',          // Email link color
    privacyPolicyEmailLinkUnderline: '#FF5722', // Email link underline
    privacyPolicyContactText: '#000000',        // Contact text color
    
    // Footer
    privacyPolicyFooterText: '#666666',         // Footer text color
    privacyPolicyFooterLink: '#FF5722',         // Footer link color
    
    // ===== LOGOUT PAGE COLORS =====
    // Main Layout
    logoutContainer: '#FFFFFF',                 // Main container background
    logoutOverlayContainer: '#FFFFFF',          // Overlapping container background
    logoutSubContainer: '#FFFFFF',              // Sub container background
    
    // Header Elements
    logoutHeaderBackground: '#FF8A00',          // Header background
    logoutHeaderTitle: '#FFFFFF',               // Header title color
    logoutHeaderText: '#FFFFFF',                // Header text color
    
    // Logo Section
    logoutLogoContainer: '#FFFFFF',             // Logo container background
    logoutLogoShadow: '#FF8A00',                // Logo shadow color
    logoutLogoBorder: '#E0E0E0',                // Logo border color
    
    // Text Elements
    logoutMainTitle: '#000000',                 // Main "Logout?" title color
    logoutSubtitle: '#666666',                  // Subtitle text color
    logoutDescription: '#666666',               // Description text color
    
    // Logout Button
    logoutButtonGradient1: '#FF7A18',           // Logout button gradient start
    logoutButtonGradient2: '#B31217',           // Logout button gradient end
    logoutButtonText: '#FFFFFF',                // Logout button text color
    logoutButtonShadow: '#000000',              // Logout button shadow color
    logoutButtonPressed: '0.85',                // Logout button pressed opacity
    
    // Cancel Button
    logoutCancelBackground: '#FFFFFF',          // Cancel button background
    logoutCancelBorder: '#B31217',              // Cancel button border color
    logoutCancelText: '#FF7A18',                // Cancel button text color
    logoutCancelPressed: '#F5F5F5',             // Cancel button pressed state
    
    // Image Elements
    logoutImageTint: '#FF8A00',                 // Logout image tint (if needed)
    logoutImageBackground: '#F5F5F5',           // Image background/placeholder
    
    // ===== CONTACT US PAGE COLORS =====
    // Main Layout & Containers
    contactUsMainBackground: '#FFFFFF',         // Main screen background
    contactUsContentBackground: '#FFFFFF',      // Content area background
    contactUsOverlayBackground: '#F5F5F5',      // Overlapping container background
    contactUsScrollBackground: '#F5F5F5',       // ScrollView background
    
    // Header Section
    contactUsHeaderBackground: '#FF8A00',       // Header background color
    contactUsHeaderTitle: '#FFFFFF',            // Header title text color
    contactUsHeaderText: '#FFFFFF',             // Header text color
    
    // Form Section
    contactUsFormBackground: '#F5F5F5',         // Form container background
    contactUsFormLabel: '#333333',              // Form field labels (Name, Email, Message)
    contactUsFormLabelText: '#333333',          // Form label text color
    
    // Input Fields
    contactUsInputContainer: '#FFFFFF',         // Input field container background
    contactUsInputBorder: '#E0E0E0',            // Input field border color
    contactUsInputBorderFocused: '#FF8A00',     // Input field border (focused state)
    contactUsInputText: '#212121',              // Input field text color
    contactUsInputPlaceholder: '#666666',       // Input field placeholder color
    contactUsInputShadow: '#000000',            // Input field shadow color
    
    // Input Icons
    contactUsPersonIcon: '#4F4F4F',             // Person icon color (name field)
    contactUsEmailIcon: '#4F4F4F',              // Email icon color (email field)
    contactUsMessageIcon: '#4F4F4F',            // Message icon color (message field)
    
    // Send Button
    contactUsSendButtonGradient1: '#FF8A00',    // Send button gradient start
    contactUsSendButtonGradient2: '#FF6A00',    // Send button gradient end
    contactUsSendButtonText: '#FFFFFF',         // Send button text color
    contactUsSendButtonShadow: '#000000',       // Send button shadow color
    contactUsSendButtonPressed: '0.95',         // Send button pressed state
    
    // Social Media Icons
    contactUsSocialContainer: '#FFFFFF',        // Social media container background
    contactUsSocialBorder: '#4F4F4F',           // Social media icon border color
    contactUsSocialBackground: '#FFFFFF',       // Social media icon background
    contactUsInstagramIcon: '#4F4F4F',          // Instagram icon color
    contactUsFacebookIcon: '#4F4F4F',           // Facebook icon color
    contactUsMailIcon: '#4F4F4F',               // Mail icon color
    contactUsSocialPressed: '#F0F0F0',          // Social icon pressed state
    
    // ===== UNIVERSAL RECIPE PAGE COLORS =====
    // Main Layout & Containers
    universalRecipeMainBackground: '#FFFFFF',   // Main screen background
    universalRecipeImageContainer: '#FFFFFF',   // Recipe image container background
    universalRecipeContentBackground: '#FFFFFF', // Content area background
    universalRecipeScrollBackground: '#FFFFFF', // ScrollView background
    
    // Recipe Image Section
    universalRecipeImageBackground: '#F0F0F0',  // Recipe image background/placeholder
    universalRecipeImageBorder: '#E0E0E0',      // Recipe image border color
    universalRecipeImageShadow: '#000000',      // Recipe image shadow color
    
    // Recipe Header Section
    universalRecipeTitle: '#333333',            // Recipe title text color
    universalRecipeCuisine: '#666666',          // Recipe cuisine text color
    universalRecipeInfoBackground: '#F0F0F0',   // Info row background
    universalRecipeInfoText: '#888888',         // Info text color (servings, prep, cook time)
    universalRecipeInfoBorder: '#E0E0E0',       // Info item border color
    
    // Section Containers
    universalRecipeSectionBackground: '#FFFFFF', // Section container background
    universalRecipeSectionBorder: '#E0E0E0',    // Section container border
    universalRecipeSectionShadow: '#000000',    // Section container shadow
    universalRecipeSectionTitle: '#333333',     // Section title color (Ingredients, Instructions, etc.)
    universalRecipeSectionTitleBorder: '#E0E0E0', // Section title bottom border
    
    // Ingredients Section
    universalRecipeIngredientText: '#555555',   // Ingredient text color
    universalRecipeIngredientBullet: '#FF8A00', // Ingredient bullet point color
    universalRecipeIngredientBackground: 'transparent', // Ingredient item background
    
    // Instructions Section
    universalRecipeStepNumber: '#E91E63',       // Step number color (pink/red)
    universalRecipeStepNumberBackground: 'transparent', // Step number background
    universalRecipeInstructionText: '#555555',  // Instruction text color
    universalRecipeInstructionBackground: 'transparent', // Instruction item background
    
    // Serving Suggestions Section
    universalRecipeSuggestionText: '#555555',   // Suggestion text color
    universalRecipeSuggestionBullet: '#FF8A00', // Suggestion bullet point color
    universalRecipeSuggestionBackground: 'transparent', // Suggestion item background
    
    // Error State
    universalRecipeErrorText: '#E91E63',        // Error message text color
    universalRecipeErrorBackground: '#FFFFFF',  // Error container background
    universalRecipeErrorImageBorder: '#E0E0E0', // Error image border color
    
    // ===== ALL CUISINES PAGE COLORS =====
    // Main Layout & Containers
    allCuisinesMainBackground: '#FFFFFF',       // Main screen background
    allCuisinesContentBackground: '#FFFFFF',    // Content area background
    
    // Header Section
    allCuisinesHeaderBackground: '#FF8A00',     // Header background color
    allCuisinesHeaderTitle: '#FFFFFF',          // Header title text color
    allCuisinesHeaderBackIcon: '#FFFFFF',       // Back button icon color
    
    // Cuisine Title
    allCuisinesTitleText: '#000000',            // Cuisine title text color
    
    // Food Item Cards
    allCuisinesFoodItemContainer: '#FFFFFF',    // Food item card background
    allCuisinesFoodItemBorder: '#FFFFFF',       // Food item card border color
    allCuisinesFoodItemShadow: '#000000',       // Food item card shadow color
    allCuisinesFoodItemPressed: '#F5F5F5',      // Food item card pressed state
    
    // Food Item Content
    allCuisinesFoodImage: '#F0F0F0',            // Food image background/placeholder
    allCuisinesFoodImageBorder: '#E0E0E0',      // Food image border color
    allCuisinesFoodName: '#000000',             // Food name text color
    allCuisinesFoodCategory: '#808080',         // Food category text color (grey)
    
    // Prep Time Container
    allCuisinesPrepTimeContainer: '#FFFFFF',    // Prep time container background
    allCuisinesPrepTimeText: '#333333',         // Prep time text color
    allCuisinesPrepTimeIcon: '#333333',         // Prep time clock icon color
    
    // Favorite Button
    allCuisinesFavoriteButton: 'transparent',   // Favorite button background
    allCuisinesFavoriteIconActive: '#FF8A00',   // Active favorite icon color (orange)
    allCuisinesFavoriteIconInactive: '#FF8A00', // Inactive favorite icon color (orange)
    
    // List Layout
    allCuisinesListBackground: '#FFFFFF',       // FlatList background
    allCuisinesScrollIndicator: '#CCCCCC',      // Scroll indicator color
    
    // ===== LOGIN PAGE COLORS =====
    // Main Layout & Container
    loginMainBackground: '#F6F6F6',             // Main screen background
    loginCardBackground: '#FFFFFF',             // Card container background
    loginCardShadow: '#000000',                 // Card shadow color
    
    // Text Elements
    loginTitle: '#222222',                      // Login title text color
    loginSubtitle: '#777777',                   // Subtitle text color
    
    // Input Fields
    loginInputBackground: '#FFFFFF',            // Input field background
    loginInputBorder: '#DDDDDD',                // Input field border color
    loginInputText: '#000000',                  // Input field text color
    loginInputPlaceholder: '#999999',           // Input field placeholder color
    
    // Password Field
    loginPasswordContainer: '#FFFFFF',          // Password container background
    loginPasswordBorder: '#DDDDDD',             // Password container border
    loginPasswordText: '#000000',               // Password text color
    loginShowHideText: '#FF7A00',               // Show/Hide button text color
    
    // Buttons
    loginButtonBackground: '#FF7A00',           // Login button background
    loginButtonText: '#FFFFFF',                 // Login button text color
    loginButtonDisabled: '0.7',                 // Login button disabled opacity
    loginForgotPasswordText: '#FF7A00',         // Forgot password link color
    
    // Navigation Links
    loginSignupText: '#666666',                 // "Don't have account" text color
    loginSignupLink: '#FF7A00',                 // Register link color
    
    // Loading
    loginLoadingIndicator: '#FFFFFF',           // Loading indicator color
    
    // ===== REGISTRATION PAGE COLORS =====
    // Main Layout & Container
    registrationMainBackground: '#F6F6F6',      // Main screen background
    registrationCardBackground: '#FFFFFF',      // Card container background
    registrationCardShadow: '#000000',          // Card shadow color
    
    // Text Elements
    registrationTitle: '#222222',               // Registration title text color
    registrationSubtitle: '#777777',            // Subtitle text color
    
    // Input Fields
    registrationInputBackground: '#FFFFFF',     // Input field background
    registrationInputBorder: '#DDDDDD',         // Input field border color
    registrationInputText: '#000000',           // Input field text color
    registrationInputPlaceholder: '#999999',    // Input field placeholder color
    
    // Password Fields
    registrationPasswordContainer: '#FFFFFF',   // Password container background
    registrationPasswordBorder: '#DDDDDD',      // Password container border
    registrationPasswordText: '#000000',        // Password text color
    registrationShowHideText: '#FF7A00',        // Show/Hide button text color
    
    // Buttons
    registrationButtonBackground: '#FF7A00',    // Register button background
    registrationButtonText: '#FFFFFF',          // Register button text color
    registrationButtonDisabled: '0.7',          // Register button disabled opacity
    
    // Navigation Links
    registrationLoginText: '#666666',           // "Already have account" text color
    registrationLoginLink: '#FF7A00',           // Login link color
    
    // Loading
    registrationLoadingIndicator: '#FFFFFF',    // Loading indicator color
    
    // Legacy (for backward compatibility)
    darkGrey: '#4F4F4F',
  };

  const darkColors = {
    headerLeftComponent:'#000000',
    headerRightComponent:'#000000',
    headerTittle:'#000000',
    headerSubTittle:'#000000',
    headerAvatarPlaceholder: '#3D3D3D',
    headerAvatarIcon: '#AAAAAA',


    headerGoBack:'#000000',
    headerTitleColor:'#000000',
    // ===== BACKGROUNDS =====
    background: '#121212',
    surface: '#1E1E1E',
    card: '#2D2D2D',
    overlay: 'rgba(0, 0, 0, 0.7)',
    modalBackground: '#2D2D2D',
    
    // ===== TEXT COLORS =====
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textMuted: '#777777',
    textInverse: '#000000',
    textDisabled: '#555555',
    
    // ===== PRIMARY COLORS =====
    primary: '#FF8A00',
    primaryLight: '#FFB84D',
    primaryDark: '#E67300',
    
    // ===== GRADIENTS =====
    gradient1: '#FF8A00',
    gradient2: '#FF6A00',
    gradientLight1: '#FFB84D',
    gradientLight2: '#FF9933',
    
    // ===== BUTTONS =====
    buttonPrimary: '#FF8A00',
    buttonSecondary: '#2D2D2D',
    buttonDisabled: '#444444',
    buttonText: '#FFFFFF',
    buttonTextSecondary: '#AAAAAA',
    buttonTextDisabled: '#666666',
    buttonBorder: '#444444',
    
    // ===== INPUT FIELDS =====
    inputBackground: '#2D2D2D',
    inputBorder: '#444444',
    inputBorderFocused: '#FF8A00',
    inputText: '#FFFFFF',
    inputPlaceholder: '#777777',
    inputIcon: '#AAAAAA',
    
    // ===== STATUS COLORS =====
    success: '#66BB6A',
    error: '#EF5350',
    warning: '#FFA726',
    info: '#FF8A00',
    successLight: '#1B5E20',
    errorLight: '#B71C1C',
    warningLight: '#E65100',
    infoLight: '#0D47A1',
    
    // ===== UI ELEMENTS =====
    border: '#333333',
    divider: '#2D2D2D',
    shadow: '#000000',
    icon: '#AAAAAA',
    iconSecondary: '#777777',
    iconDisabled: '#555555',
    
    // ===== NAVIGATION =====
    tabActive: '#FF8A00',
    tabInactive: '#777777',
    tabBackground: '#1E1E1E',
    headerBackground: '#FF8A00',
    headerText: '#FFFFFF',
    drawerBackground: '#1E1E1E',
    drawerText: '#FFFFFF',
    drawerActive: '#FF8A00',
    
    // ===== BOTTOM TAB NAVIGATOR COLORS =====
    // Tab Bar Container
    bottomTabBarBackground: '#1E1E1E',          // Tab bar background color
    bottomTabBarBorder: '#333333',              // Tab bar top border color
    bottomTabBarShadow: '#000000',              // Tab bar shadow color
    
    // Tab Items
    bottomTabActiveBackground: 'transparent',   // Active tab background
    bottomTabInactiveBackground: 'transparent', // Inactive tab background
    bottomTabActiveTint: '#FF5722',             // Active tab icon and text color
    bottomTabInactiveTint: '#AAAAAA',           // Inactive tab icon and text color
    
    // Tab Labels
    bottomTabActiveLabelColor: '#FF5722',       // Active tab label text color
    bottomTabInactiveLabelColor: '#AAAAAA',     // Inactive tab label text color
    bottomTabLabelFontWeight: '600',            // Tab label font weight
    
    // Tab Icons
    bottomTabActiveIconColor: '#FF5722',        // Active tab icon color
    bottomTabInactiveIconColor: '#AAAAAA',      // Inactive tab icon color
    bottomTabIconSize: '22',                    // Tab icon size
    
    // Tab Indicators & Effects
    bottomTabIndicatorColor: '#FF8A00',         // Tab indicator/badge color
    bottomTabRippleColor: '#2D2D2D',            // Tab press ripple effect color
    bottomTabPressedOpacity: '0.7',             // Tab pressed opacity
    
    // Tab Bar Layout
    bottomTabBarHeight: '60',                   // Tab bar height
    bottomTabBarPaddingTop: '5',                // Tab bar top padding
    bottomTabBarPaddingBottom: '5',             // Tab bar bottom padding
    bottomTabBarElevation: '8',                 // Tab bar elevation (Android)
    
    // ===== SPECIFIC COMPONENTS =====
    // Header
    headerGradient1: '#FF8A00',
    headerGradient2: '#FF6A00',
    headerTitle: '#FFFFFF',
    headerSubtitle: '#FFE6CC',
    
    // Cards
    cardBackground: '#2D2D2D',
    cardBorder: '#444444',
    cardShadow: '#000000',
    cardText: '#FFFFFF',
    cardTextSecondary: '#AAAAAA',
    
    // Lists
    listItemBackground: '#2D2D2D',
    listItemBorder: '#333333',
    listItemText: '#FFFFFF',
    listItemTextSecondary: '#AAAAAA',
    listSeparator: '#444444',
    
    // Forms
    formBackground: '#2D2D2D',
    formLabel: '#CCCCCC',
    formError: '#EF5350',
    formSuccess: '#66BB6A',
    
    // Modals
    modalOverlay: 'rgba(0, 0, 0, 0.8)',
    modalContent: '#2D2D2D',
    modalTitle: '#FFFFFF',
    modalText: '#AAAAAA',
    
    // Toast/Notifications
    toastBackground: '#2D2D2D',
    toastText: '#FFFFFF',
    toastBorder: '#555555',
    toastSuccess: '#66BB6A',
    toastError: '#EF5350',
    toastWarning: '#FFA726',
    toastInfo: '#FF8A00',
    
    // Loading/Spinner
    loaderPrimary: '#FF8A00',
    loaderSecondary: '#FFB84D',
    loaderBackground: 'rgba(0, 0, 0, 0.8)',
    
    // Recipe/Food specific
    recipeCard: '#2D2D2D',
    recipeTitle: '#FFFFFF',
    recipeDescription: '#AAAAAA',
    recipeMeta: '#777777',
    cuisineTag: '#FF8A00',
    cuisineTagText: '#FFFFFF',
    favoriteIcon: '#FF6B6B',
    ratingStars: '#FFD700',
    
    // Profile/User
    profileBackground: '#1E1E1E',
    profileCard: '#2D2D2D',
    profileText: '#FFFFFF',
    profileTextSecondary: '#AAAAAA',
    profileBorder: '#444444',
    
    // Profile Page Specific Features
    profileAvatar: '#3D3D3D',
    profileAvatarBorder: '#555555',
    profileAvatarPlaceholder: '#666666',
    profileAvatarIcon: '#AAAAAA',
    profileName: '#FFFFFF',
    profileEmail: '#AAAAAA',
    profilePhone: '#CCCCCC',
    profileBio: '#BBBBBB',
    profileInfoContainer: '#2D2D2D',
    
    // Profile Feature Items
    profileFeatureBackground: '#2D2D2D',
    profileFeatureBorder: '#444444',
    profileFeatureText: '#FFFFFF',
    profileFeatureShadow: '#000000',
    
    // Profile Feature Icons (specific colors for each feature)
    profileEditIcon: '#FF8A00',        // Edit Profile - orange
    profileFavoriteIcon: '#FF6B6B',    // My Favourites - red
    profileAboutIcon: '#FF8A00',       // About App - orange
    profilePrivacyIcon: '#66BB6A',     // Privacy Policy - green (lighter for dark mode)
    profileSettingsIcon: '#FF5722',    // Settings - orange/red
    profileLogoutIcon: '#EF5350',      // Logout - red (lighter for dark mode)
    profileChevronIcon: '#AAAAAA',     // Right chevron arrows
    
    // Profile Feature Hover/Press States
    profileFeaturePressed: '#3D3D3D',
    profileFeatureHover: '#333333',
    
    // ===== EDIT PROFILE PAGE COLORS =====
    // Avatar Section
    editProfileAvatarContainer: '#2D2D2D',      // Avatar container background
    editProfileAvatarBorder: '#555555',         // Avatar border color
    editProfileAvatarPlaceholder: '#3D3D3D',    // Avatar placeholder background
    editProfileAvatarIcon: '#888888',           // Avatar placeholder icon color
    editProfileCameraButton: '#FF8A00',         // Camera button gradient start
    editProfileCameraButtonEnd: '#FF6A00',      // Camera button gradient end
    editProfileCameraIcon: '#000000',           // Camera icon color
    
    // Form Section
    editProfileFormBackground: '#1E1E1E',       // Form container background
    editProfileFormLabel: '#AAAAAA',            // Form field labels (Full Name, Email, etc.)
    editProfileInputBackground: '#3D3D3D',      // Text input background
    editProfileInputBorder: '#555555',          // Text input border (normal state)
    editProfileInputBorderError: '#EF5350',     // Text input border (error state)
    editProfileInputText: '#FFFFFF',            // Text input text color
    editProfileInputPlaceholder: '#777777',     // Text input placeholder color
    editProfileErrorText: '#EF5350',            // Error message text color
    
    // Save Button
    editProfileSaveButton: '#FF8A00',           // Save button gradient start
    editProfileSaveButtonEnd: '#FF6A00',        // Save button gradient end
    editProfileSaveButtonText: '#000000',       // Save button text color
    editProfileSaveButtonPressed: '0.85',       // Save button pressed state opacity
    
    // Container/Layout
    editProfileContainer: '#121212',            // Main container background
    editProfileOverlayContainer: '#1E1E1E',     // Overlapping container background
    
    // ===== FAVOURITES PAGE COLORS =====
    // Main Layout & Containers
    favouritesMainBackground: '#121212',        // Main screen background
    favouritesContentBackground: '#1E1E1E',     // Content area background
    favouritesOverlayBackground: '#1E1E1E',     // Overlay container background
    
    // Header Section
    favouritesHeaderBackground: '#FF8A00',      // Header background color
    favouritesHeaderTitle: '#FFFFFF',           // Header title text color
    favouritesHeaderSubtitle: '#FFE6CC',        // Header subtitle text color
    favouritesHeaderBackIcon: '#FFFFFF',        // Back button icon color
    
    // Recipe Cards
    favouritesCardContainer: '#2D2D2D',         // Recipe card background
    favouritesCardBorder: '#404040',            // Recipe card border color
    favouritesCardShadow: '#000000',            // Recipe card shadow color
    favouritesCardPressed: '#3A3A3A',           // Recipe card pressed state
    
    // Recipe Card Content
    favouritesRecipeImage: '#404040',           // Recipe image background/placeholder
    favouritesRecipeTitle: '#FFFFFF',           // Recipe name text color
    favouritesRecipeSubtitle: '#BBBBBB',        // Recipe cuisine text color
    favouritesRecipeMetadata: '#999999',        // Recipe metadata text color
    
    // Action Buttons
    favouritesViewButtonBg: '#4CAF50',          // View button background (green)
    favouritesViewButtonText: '#FFFFFF',        // View button text color
    favouritesRemoveButtonBg: '#F44336',        // Remove button background (red)
    favouritesRemoveButtonText: '#FFFFFF',      // Remove button text color
    favouritesButtonShadow: '#000000',          // Button shadow color
    favouritesButtonPressed: '0.8',             // Button pressed opacity
    removeButtonGradient1:"#ff6090",
    removeButtonGradient2:"#e91e63",
    // Empty State
    favouritesEmptyBackground: '#1E1E1E',       // Empty state container background
    favouritesEmptyText: '#BBBBBB',             // Empty state text color
    favouritesEmptyIcon: '#666666',             // Empty state icon color
    favouritesEmptyMessage: '#999999',          // Empty state message color
    
    // List & Layout
    favouritesListBackground: '#121212',        // FlatList background
    favouritesListSeparator: '#404040',         // List item separator color
    favouritesScrollIndicator: '#666666',       // Scroll indicator color
    
    // ===== ABOUT US PAGE COLORS =====
    // Main Layout & Containers
    aboutUsMainBackground: '#121212',           // Main screen background
    aboutUsContentBackground: '#1E1E1E',        // Content area background
    aboutUsScrollBackground: '#1E1E1E',         // ScrollView background
    
    // Header Section
    aboutUsHeaderBackground: '#FF8A00',         // Header background color
    aboutUsHeaderTitle: '#FFFFFF',              // Header title text color
    aboutUsHeaderBackIcon: '#FFFFFF',           // Back button icon color
    
    // Logo & Branding
    aboutUsLogoContainer: '#1E1E1E',            // Logo container background
    aboutUsAppName: '#FF5722',                  // App name text color (orange-red)
    aboutUsVersionBox: '#404040',               // Version box background (dark gray)
    aboutUsVersionText: '#FFFFFF',              // Version text color
    
    // Tagline Section
    aboutUsTaglineText: '#BBBBBB',              // Tagline text color
    aboutUsTaglineContainer: '#1E1E1E',         // Tagline container background
    
    // Mission Card
    aboutUsMissionContainer: '#2D2D2D',         // Mission card background
    aboutUsMissionBorder: '#FF8A8A',            // Mission card border/gradient (darker pink)
    aboutUsMissionTitle: '#FFFFFF',             // Mission title text color
    aboutUsMissionText: '#CCCCCC',              // Mission description text color
    aboutUsMissionIcon: '#FF5722',              // Mission icon tint
    aboutUsMissionBorderGradient1: '#FF8A00',            // Mission card border/gradient
    aboutUsMissionBorderGradient2: '#FF6A00',
    aboutUsMissionBorderGradient3: '#E65100',
    
    // Features Section
    aboutUsFeaturesGradient1: '#FF8A00',            // Mission card border/gradient
    aboutUsFeaturesGradient2: '#FF6A00',
    aboutUsFeaturesGradient3: '#E65100',  
    aboutUsFeaturesTitle: '#FFFFFF',            // Features section title color
    aboutUsFeatureBox: '#2D2D2D',               // Feature box background
    aboutUsFeatureBorder: '#555555',            // Feature box border color
    aboutUsFeatureIcon: '#FF5722',              // Feature icon color (orange-red)
    aboutUsFeatureText: '#FFFFFF',              // Feature text color
    aboutUsFeatureGradient: '#4A3A3A',          // Feature gradient overlay (dark pink)
    
    // Footer Section
    aboutUsFooterBackground: '#1E1E1E',         // Footer container background
    aboutUsFooterText: '#FFFFFF',               // Footer text color
    aboutUsFooterLink: '#FF5722',               // Footer link color (orange-red)
    aboutUsFooterSeparator: '#BBBBBB',          // Footer separator dot color
    
    // ===== CHANGE PASSWORD PAGE COLORS =====
    // Main Layout & Containers
    changePasswordMainBackground: '#121212',    // Main screen background
    changePasswordContentBackground: '#1E1E1E', // Content area background
    changePasswordOverlayBackground: '#1E1E1E', // Overlapping container background
    
    // Header Section
    changePasswordHeaderBackground: '#FF8A00',  // Header background color
    changePasswordHeaderTitle: '#FFFFFF',       // Header title text color
    changePasswordHeaderText: '#FFFFFF',        // Header text color
    
    // Input Fields
    changePasswordInputContainer: '#2D2D2D',    // Input field container background
    changePasswordInputBorder: '#555555',       // Input field border color
    changePasswordInputText: '#AAAAAA',         // Input field text color
    changePasswordInputPlaceholder: '#AAAAAA',  // Input field placeholder color
    changePasswordInputShadow: '#000000',       // Input field shadow color
    
    // Input Icons
    changePasswordLockIcon: '#AAAAAA',          // Lock icon color (current password)
    changePasswordKeyIcon: '#AAAAAA',           // Key icon color (new password)
    changePasswordCheckIcon: '#AAAAAA',         // Check icon color (confirm password)
    changePasswordEyeIcon: '#AAAAAA',           // Eye icon color (show/hide password)
    
    // Submit Button
    changePasswordButtonGradient1: '#FF8A00',   // Submit button gradient start
    changePasswordButtonGradient2: '#FF6A00',   // Submit button gradient end
    changePasswordButtonText: '#FFFFFF',        // Submit button text color
    changePasswordButtonShadow: '#000000',      // Submit button shadow color
    changePasswordButtonDisabled: '#555555',    // Submit button disabled state
    
    // Loading States
    changePasswordLoadingText: '#FFFFFF',       // Loading text color
    changePasswordLoadingBackground: 'rgba(0, 0, 0, 0.5)', // Loading overlay background
    
    // Validation & Feedback
    changePasswordSuccessText: '#66BB6A',       // Success message color (light green)
    changePasswordErrorText: '#EF5350',         // Error message color (light red)
    changePasswordWarningText: '#FFA726',       // Warning message color (light orange)
    
    // Settings
    settingsBackground: '#1E1E1E',
    settingsCard: '#2D2D2D',
    settingsText: '#FFFFFF',
    settingsTextSecondary: '#AAAAAA',
    settingsBorder: '#444444',
    settingsIcon: '#AAAAAA',
    
    // Search
    searchBackground: '#2D2D2D',
    searchBorder: '#444444',
    searchText: '#FFFFFF',
    searchPlaceholder: '#777777',
    searchIcon: '#AAAAAA',
    
    // ===== PRIVACY POLICY PAGE COLORS =====
    // Main Layout
    privacyPolicyContainer: '#121212',          // Main container background
    privacyPolicyOverlayContainer: '#1E1E1E',   // Overlapping container background
    privacyPolicyContent: '#1E1E1E',            // Content area background
    
    // Header Elements
    privacyPolicyHeaderBackground: '#FF8A00',   // Header background
    privacyPolicyHeaderTitle: '#FFFFFF',        // Header title color
    privacyPolicyBackButton: '#FFFFFF',         // Back button icon color
    privacyPolicyShieldIcon: '#FFFFFF',         // Shield icon color
    
    // Policy Sections
    privacyPolicySection: '#2D2D2D',            // Policy section container background
    privacyPolicySectionBorder: '#444444',      // Policy section border
    privacyPolicySectionShadow: '#000000',      // Policy section shadow
    
    // Section Headers
    privacyPolicyNumberBadge: '#FF8A00',        // Number badge gradient start
    privacyPolicyNumberBadgeEnd: '#FF6A00',     // Number badge gradient end
    privacyPolicyNumberText: '#FFFFFF',         // Number text color in badge
    privacyPolicySectionTitle: '#FFFFFF',       // Section title text color
    
    // Content Text
    privacyPolicyBodyText: '#FFFFFF',           // Main body text color
    privacyPolicyBulletPoint: '#FF5722',        // Bullet point color
    privacyPolicyBulletText: '#FFFFFF',         // Bullet point text color
    privacyPolicyLastUpdated: '#AAAAAA',        // Last updated text color
    
    // Links and Interactive Elements
    privacyPolicyEmailLink: '#FF5722',          // Email link color
    privacyPolicyEmailLinkUnderline: '#FF5722', // Email link underline
    privacyPolicyContactText: '#FFFFFF',        // Contact text color
    
    // Footer
    privacyPolicyFooterText: '#AAAAAA',         // Footer text color
    privacyPolicyFooterLink: '#FF5722',         // Footer link color
    
    // ===== LOGOUT PAGE COLORS =====
    // Main Layout
    logoutContainer: '#121212',                 // Main container background
    logoutOverlayContainer: '#1E1E1E',          // Overlapping container background
    logoutSubContainer: '#1E1E1E',              // Sub container background
    
    // Header Elements
    logoutHeaderBackground: '#FF8A00',          // Header background
    logoutHeaderTitle: '#FFFFFF',               // Header title color
    logoutHeaderText: '#FFFFFF',                // Header text color
    
    // Logo Section
    logoutLogoContainer: '#2D2D2D',             // Logo container background
    logoutLogoShadow: '#FF8A00',                // Logo shadow color
    logoutLogoBorder: '#555555',                // Logo border color
    
    // Text Elements
    logoutMainTitle: '#FFFFFF',                 // Main "Logout?" title color
    logoutSubtitle: '#AAAAAA',                  // Subtitle text color
    logoutDescription: '#AAAAAA',               // Description text color
    
    // Logout Button
    logoutButtonGradient1: '#FF7A18',           // Logout button gradient start
    logoutButtonGradient2: '#B31217',           // Logout button gradient end
    logoutButtonText: '#FFFFFF',                // Logout button text color
    logoutButtonShadow: '#000000',              // Logout button shadow color
    logoutButtonPressed: '0.85',                // Logout button pressed opacity
    
    // Cancel Button
    logoutCancelBackground: '#2D2D2D',          // Cancel button background
    logoutCancelBorder: '#B31217',              // Cancel button border color
    logoutCancelText: '#FF7A18',                // Cancel button text color
    logoutCancelPressed: '#3D3D3D',             // Cancel button pressed state
    
    // Image Elements
    logoutImageTint: '#FF8A00',                 // Logout image tint (if needed)
    logoutImageBackground: '#2D2D2D',           // Image background/placeholder
    
    // ===== CONTACT US PAGE COLORS =====
    // Main Layout & Containers
    contactUsMainBackground: '#121212',         // Main screen background
    contactUsContentBackground: '#1E1E1E',      // Content area background
    contactUsOverlayBackground: '#1E1E1E',      // Overlapping container background
    contactUsScrollBackground: '#1E1E1E',       // ScrollView background
    
    // Header Section
    contactUsHeaderBackground: '#FF8A00',       // Header background color
    contactUsHeaderTitle: '#FFFFFF',            // Header title text color
    contactUsHeaderText: '#FFFFFF',             // Header text color
    
    // Form Section
    contactUsFormBackground: '#1E1E1E',         // Form container background
    contactUsFormLabel: '#FFFFFF',              // Form field labels (Name, Email, Message)
    contactUsFormLabelText: '#FFFFFF',          // Form label text color
    
    // Input Fields
    contactUsInputContainer: '#2D2D2D',         // Input field container background
    contactUsInputBorder: '#555555',            // Input field border color
    contactUsInputBorderFocused: '#FF8A00',     // Input field border (focused state)
    contactUsInputText: '#FFFFFF',              // Input field text color
    contactUsInputPlaceholder: '#AAAAAA',       // Input field placeholder color
    contactUsInputShadow: '#000000',            // Input field shadow color
    
    // Input Icons
    contactUsPersonIcon: '#AAAAAA',             // Person icon color (name field)
    contactUsEmailIcon: '#AAAAAA',              // Email icon color (email field)
    contactUsMessageIcon: '#AAAAAA',            // Message icon color (message field)
    
    // Send Button
    contactUsSendButtonGradient1: '#FF8A00',    // Send button gradient start
    contactUsSendButtonGradient2: '#FF6A00',    // Send button gradient end
    contactUsSendButtonText: '#FFFFFF',         // Send button text color
    contactUsSendButtonShadow: '#000000',       // Send button shadow color
    contactUsSendButtonPressed: '0.95',         // Send button pressed state
    
    // Social Media Icons
    contactUsSocialContainer: '#2D2D2D',        // Social media container background
    contactUsSocialBorder: '#AAAAAA',           // Social media icon border color
    contactUsSocialBackground: '#2D2D2D',       // Social media icon background
    contactUsInstagramIcon: '#AAAAAA',          // Instagram icon color
    contactUsFacebookIcon: '#AAAAAA',           // Facebook icon color
    contactUsMailIcon: '#AAAAAA',               // Mail icon color
    contactUsSocialPressed: '#3D3D3D',          // Social icon pressed state
    
    // ===== UNIVERSAL RECIPE PAGE COLORS =====
    // Main Layout & Containers
    universalRecipeMainBackground: '#121212',   // Main screen background
    universalRecipeImageContainer: '#1E1E1E',   // Recipe image container background
    universalRecipeContentBackground: '#1E1E1E', // Content area background
    universalRecipeScrollBackground: '#1E1E1E', // ScrollView background
    
    // Recipe Image Section
    universalRecipeImageBackground: '#404040',  // Recipe image background/placeholder
    universalRecipeImageBorder: '#555555',      // Recipe image border color
    universalRecipeImageShadow: '#000000',      // Recipe image shadow color
    
    // Recipe Header Section
    universalRecipeTitle: '#FFFFFF',            // Recipe title text color
    universalRecipeCuisine: '#AAAAAA',          // Recipe cuisine text color
    universalRecipeInfoBackground: '#404040',   // Info row background
    universalRecipeInfoText: '#BBBBBB',         // Info text color (servings, prep, cook time)
    universalRecipeInfoBorder: '#555555',       // Info item border color
    
    // Section Containers
    universalRecipeSectionBackground: '#2D2D2D', // Section container background
    universalRecipeSectionBorder: '#555555',    // Section container border
    universalRecipeSectionShadow: '#000000',    // Section container shadow
    universalRecipeSectionTitle: '#FFFFFF',     // Section title color (Ingredients, Instructions, etc.)
    universalRecipeSectionTitleBorder: '#555555', // Section title bottom border
    
    // Ingredients Section
    universalRecipeIngredientText: '#CCCCCC',   // Ingredient text color
    universalRecipeIngredientBullet: '#FF8A00', // Ingredient bullet point color
    universalRecipeIngredientBackground: 'transparent', // Ingredient item background
    
    // Instructions Section
    universalRecipeStepNumber: '#E91E63',       // Step number color (pink/red)
    universalRecipeStepNumberBackground: 'transparent', // Step number background
    universalRecipeInstructionText: '#CCCCCC',  // Instruction text color
    universalRecipeInstructionBackground: 'transparent', // Instruction item background
    
    // Serving Suggestions Section
    universalRecipeSuggestionText: '#CCCCCC',   // Suggestion text color
    universalRecipeSuggestionBullet: '#FF8A00', // Suggestion bullet point color
    universalRecipeSuggestionBackground: 'transparent', // Suggestion item background
    
    // Error State
    universalRecipeErrorText: '#E91E63',        // Error message text color
    universalRecipeErrorBackground: '#1E1E1E',  // Error container background
    universalRecipeErrorImageBorder: '#555555', // Error image border color
    
    // ===== ALL CUISINES PAGE COLORS =====
    // Main Layout & Containers
    allCuisinesMainBackground: '#121212',       // Main screen background
    allCuisinesContentBackground: '#1E1E1E',    // Content area background
    
    // Header Section
    allCuisinesHeaderBackground: '#FF8A00',     // Header background color
    allCuisinesHeaderTitle: '#FFFFFF',          // Header title text color
    allCuisinesHeaderBackIcon: '#FFFFFF',       // Back button icon color
    
    // Cuisine Title
    allCuisinesTitleText: '#FFFFFF',            // Cuisine title text color
    
    // Food Item Cards
    allCuisinesFoodItemContainer: '#2D2D2D',    // Food item card background
    allCuisinesFoodItemBorder: '#404040',       // Food item card border color
    allCuisinesFoodItemShadow: '#000000',       // Food item card shadow color
    allCuisinesFoodItemPressed: '#3A3A3A',      // Food item card pressed state
    
    // Food Item Content
    allCuisinesFoodImage: '#404040',            // Food image background/placeholder
    allCuisinesFoodImageBorder: '#555555',      // Food image border color
    allCuisinesFoodName: '#FFFFFF',             // Food name text color
    allCuisinesFoodCategory: '#AAAAAA',         // Food category text color (grey)
    
    // Prep Time Container
    allCuisinesPrepTimeContainer: '#2D2D2D',    // Prep time container background
    allCuisinesPrepTimeText: '#CCCCCC',         // Prep time text color
    allCuisinesPrepTimeIcon: '#CCCCCC',         // Prep time clock icon color
    
    // Favorite Button
    allCuisinesFavoriteButton: 'transparent',   // Favorite button background
    allCuisinesFavoriteIconActive: '#FF8A00',   // Active favorite icon color (orange)
    allCuisinesFavoriteIconInactive: '#FF8A00', // Inactive favorite icon color (orange)
    
    // List Layout
    allCuisinesListBackground: '#121212',       // FlatList background
    allCuisinesScrollIndicator: '#666666',      // Scroll indicator color
    
    // ===== LOGIN PAGE COLORS =====
    // Main Layout & Container
    loginMainBackground: '#121212',             // Main screen background
    loginCardBackground: '#2D2D2D',             // Card container background
    loginCardShadow: '#000000',                 // Card shadow color
    
    // Text Elements
    loginTitle: '#FFFFFF',                      // Login title text color
    loginSubtitle: '#AAAAAA',                   // Subtitle text color
    
    // Input Fields
    loginInputBackground: '#3D3D3D',            // Input field background
    loginInputBorder: '#555555',                // Input field border color
    loginInputText: '#FFFFFF',                  // Input field text color
    loginInputPlaceholder: '#AAAAAA',           // Input field placeholder color
    
    // Password Field
    loginPasswordContainer: '#3D3D3D',          // Password container background
    loginPasswordBorder: '#555555',             // Password container border
    loginPasswordText: '#FFFFFF',               // Password text color
    loginShowHideText: '#FF7A00',               // Show/Hide button text color
    
    // Buttons
    loginButtonBackground: '#FF7A00',           // Login button background
    loginButtonText: '#FFFFFF',                 // Login button text color
    loginButtonDisabled: '0.7',                 // Login button disabled opacity
    loginForgotPasswordText: '#FF7A00',         // Forgot password link color
    
    // Navigation Links
    loginSignupText: '#AAAAAA',                 // "Don't have account" text color
    loginSignupLink: '#FF7A00',                 // Register link color
    
    // Loading
    loginLoadingIndicator: '#FFFFFF',           // Loading indicator color
    
    // ===== REGISTRATION PAGE COLORS =====
    // Main Layout & Container
    registrationMainBackground: '#121212',      // Main screen background
    registrationCardBackground: '#2D2D2D',      // Card container background
    registrationCardShadow: '#000000',          // Card shadow color
    
    // Text Elements
    registrationTitle: '#FFFFFF',               // Registration title text color
    registrationSubtitle: '#AAAAAA',            // Subtitle text color
    
    // Input Fields
    registrationInputBackground: '#3D3D3D',     // Input field background
    registrationInputBorder: '#555555',         // Input field border color
    registrationInputText: '#FFFFFF',           // Input field text color
    registrationInputPlaceholder: '#AAAAAA',    // Input field placeholder color
    
    // Password Fields
    registrationPasswordContainer: '#3D3D3D',   // Password container background
    registrationPasswordBorder: '#555555',      // Password container border
    registrationPasswordText: '#FFFFFF',        // Password text color
    registrationShowHideText: '#FF7A00',        // Show/Hide button text color
    
    // Buttons
    registrationButtonBackground: '#FF7A00',    // Register button background
    registrationButtonText: '#FFFFFF',          // Register button text color
    registrationButtonDisabled: '0.7',          // Register button disabled opacity
    
    // Navigation Links
    registrationLoginText: '#AAAAAA',           // "Already have account" text color
    registrationLoginLink: '#FF7A00',           // Login link color
    
    // Loading
    registrationLoadingIndicator: '#FFFFFF',    // Loading indicator color
    
    // Legacy (for backward compatibility)
    darkGrey: '#666666',
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
