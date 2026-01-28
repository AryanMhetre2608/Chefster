# UserData.json Auto-Sync System

This system automatically updates your `src/data/UserData.json` file whenever users are created or updated in your React Native app.

## How It Works

1. **Metro Plugin**: The `metro-userdata-plugin.js` creates an HTTP server on port 8082
2. **Service Integration**: `userDataService.js` sends updates to the plugin server
3. **Automatic Updates**: When users are created/updated, the source file is automatically updated

## Setup & Usage

### Method 1: Automatic (Recommended)
```bash
# Start Metro with auto-sync enabled
npm run start

# In another terminal, run your app
npm run android
# or
npm run ios
```

### Method 2: Manual Script
```bash
# Use the dedicated auto-sync script
npm run start-with-sync

# In another terminal, run your app
npm run android
```

## How to Test

1. Open your React Native app
2. Navigate to the UserDataDebug screen (if available)
3. Create test users or login with different Firebase accounts
4. Check the console logs for auto-sync messages
5. Verify that `src/data/UserData.json` is automatically updated

## Console Messages

When auto-sync is working, you'll see:
```
🚀 UserData Auto-Sync Server running on http://localhost:8082
✅ AUTO-UPDATED src/data/UserData.json
📊 Users: 2, Next ID: 2
⏰ Updated at: 10:30:45 AM
```

## Troubleshooting

### Port Already in Use
If port 8082 is busy, the system will automatically try port 8083, 8084, etc.

### Auto-Sync Not Working
1. Check console logs for error messages
2. Ensure you're running in development mode (`__DEV__` is true)
3. Try the manual test: Use the "Test Auto-Sync" button in UserDataDebug screen

### Fallback Method
If auto-sync fails, the system will:
1. Log the JSON data to console with clear markers
2. Create backup files in accessible locations
3. Show instructions for manual copying

## Files Involved

- `metro-userdata-plugin.js` - HTTP server for receiving updates
- `metro.config.js` - Starts the plugin with Metro bundler
- `src/services/userDataService.js` - Sends updates to the plugin
- `src/data/UserData.json` - Target file that gets updated
- `start-with-autosync.js` - Alternative startup script

## Development Notes

- Only works in development mode (`__DEV__ === true`)
- Updates are throttled to prevent rapid successive writes
- The system validates data structure before updating
- Backup methods ensure data isn't lost if auto-sync fails