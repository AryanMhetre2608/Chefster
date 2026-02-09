# 🚀 Quick Guide: Build Release APK for Chefster

## ✅ Configuration Status: READY TO BUILD!

All critical configurations have been fixed. You can now build your release APK.

---

## 📦 Build Release APK

### Step 1: Clean Previous Builds
```bash
cd android
./gradlew clean
```

### Step 2: Build Release APK
```bash
./gradlew assembleRelease
```

### Step 3: Find Your APK
**Location:** `android/app/build/outputs/apk/release/app-release.apk`

**File Size:** Approximately 30-50 MB

---

## 🏪 Build for Google Play Store (AAB)

### Build Release Bundle
```bash
cd android
./gradlew bundleRelease
```

**Output:** `android/app/build/outputs/bundle/release/app-release.aab`

---

## 📱 Install Release Build on Device

### Option 1: Via Gradle
```bash
cd android
./gradlew installRelease
```

### Option 2: Via ADB
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

## 🧪 Test Release Build

Before distributing, test these features:

### Critical Tests:
- [ ] App launches without crashes
- [ ] Login/Registration works
- [ ] Email verification works
- [ ] Firebase authentication successful
- [ ] Profile image upload works
- [ ] Favorites add/remove works
- [ ] Recipe browsing works
- [ ] Search functionality works
- [ ] Theme switching works
- [ ] Password change works
- [ ] Logout works properly

### Performance Tests:
- [ ] App loads quickly
- [ ] Images load properly
- [ ] No lag or freezing
- [ ] Smooth animations
- [ ] Low memory usage

---

## 🔐 Security Checklist

✅ **COMPLETED:**
- Keystore passwords secured in gradle.properties
- gradle.properties added to .gitignore
- Release signing configured properly
- Keystore file protected

⚠️ **BEFORE PRODUCTION:**
- Remove all console.log statements
- Test on multiple devices
- Check for memory leaks
- Verify all API keys are secure

---

## 📊 Build Information

**App Name:** Chefster
**Package:** com.chefster
**Version:** 1.0 (versionCode: 1)
**Min SDK:** 24 (Android 7.0)
**Target SDK:** 36 (Android 14)
**Keystore:** my-release-key.keystore
**Key Alias:** my-key-alias

---

## 🐛 Troubleshooting

### Build Fails with "Keystore not found"
**Solution:** Ensure `my-release-key.keystore` is in `android/app/` folder

### Build Fails with "Password incorrect"
**Solution:** Check passwords in `gradle.properties` are correct

### APK Size Too Large
**Solution:** Enable ProGuard in `build.gradle`:
```groovy
def enableProguardInReleaseBuilds = true
```

### App Crashes on Launch
**Solution:** 
1. Check logcat: `adb logcat`
2. Verify Firebase configuration
3. Test debug build first

---

## 📈 Version Management

### For Next Release:
1. Update `versionCode` in `build.gradle` (increment by 1)
2. Update `versionName` (e.g., 1.0 → 1.1)
3. Clean and rebuild

Example:
```groovy
versionCode 2
versionName "1.1"
```

---

## 🎯 Quick Commands Reference

```bash
# Clean build
cd android && ./gradlew clean

# Build release APK
cd android && ./gradlew assembleRelease

# Build release AAB (Play Store)
cd android && ./gradlew bundleRelease

# Install release on device
cd android && ./gradlew installRelease

# Check build variants
cd android && ./gradlew tasks

# View signing report
cd android && ./gradlew signingReport
```

---

## ✨ You're Ready!

Your app is now configured correctly for release builds. 

**Next Steps:**
1. Run `./gradlew assembleRelease`
2. Test the APK thoroughly
3. Upload to Google Play Console (if ready)

**Good luck with your release! 🎉**
