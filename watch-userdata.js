const fs = require('fs');
const path = require('path');

/**
 * Simple UserData.json Auto-Updater
 * Monitors console output and updates src/data/UserData.json automatically
 */

class SimpleUserDataUpdater {
  constructor() {
    this.userDataPath = path.join(__dirname, 'src', 'data', 'UserData.json');
    this.tempDataPath = path.join(__dirname, 'temp_userdata.json');
    this.lastContent = '';
  }

  // Start watching for updates
  start() {
    console.log('🚀 UserData.json Auto-Updater Started');
    console.log('📁 Target file:', this.userDataPath);
    console.log('');
    console.log('📋 INSTRUCTIONS:');
    console.log('1. Copy the dataset JSON from your console logs');
    console.log('2. Save it to temp_userdata.json in your project root');
    console.log('3. This script will automatically update src/data/UserData.json');
    console.log('');

    // Watch for temp file changes
    this.watchTempFile();
    
    // Also provide a manual update method
    this.setupManualUpdate();
  }

  // Watch the temp file for changes
  watchTempFile() {
    if (!fs.existsSync(this.tempDataPath)) {
      // Create empty temp file
      fs.writeFileSync(this.tempDataPath, '{}', 'utf8');
      console.log('📄 Created temp_userdata.json - paste your dataset here');
    }

    fs.watchFile(this.tempDataPath, (curr, prev) => {
      if (curr.mtime > prev.mtime) {
        this.processTempFile();
      }
    });

    console.log('👀 Watching temp_userdata.json for changes...');
  }

  // Process the temp file
  processTempFile() {
    try {
      const content = fs.readFileSync(this.tempDataPath, 'utf8').trim();
      
      if (content && content !== this.lastContent && content !== '{}') {
        const dataset = JSON.parse(content);
        
        if (dataset.users && Array.isArray(dataset.users)) {
          this.updateUserDataFile(dataset);
          this.lastContent = content;
        }
      }
    } catch (error) {
      console.log('❌ Error processing temp file:', error.message);
    }
  }

  // Update the main UserData.json file
  updateUserDataFile(dataset) {
    try {
      const jsonString = JSON.stringify(dataset, null, 2);
      fs.writeFileSync(this.userDataPath, jsonString, 'utf8');
      
      console.log('');
      console.log('✅ UPDATED src/data/UserData.json');
      console.log(`📊 Users: ${dataset.users.length}, Next ID: ${dataset.nextUserId}`);
      console.log(`⏰ ${new Date().toLocaleTimeString()}`);
      console.log('');
      
      // Clear temp file
      fs.writeFileSync(this.tempDataPath, '{}', 'utf8');
      
    } catch (error) {
      console.log('❌ Failed to update UserData.json:', error.message);
    }
  }

  // Setup manual update via console input
  setupManualUpdate() {
    console.log('💡 TIP: You can also paste JSON directly here and press Enter');
    
    process.stdin.on('data', (data) => {
      const input = data.toString().trim();
      
      if (input.startsWith('{') && input.endsWith('}')) {
        try {
          const dataset = JSON.parse(input);
          if (dataset.users && Array.isArray(dataset.users)) {
            this.updateUserDataFile(dataset);
          } else {
            console.log('❌ Invalid dataset format - missing users array');
          }
        } catch (error) {
          console.log('❌ Invalid JSON:', error.message);
        }
      }
    });
  }
}

// Start the updater
const updater = new SimpleUserDataUpdater();
updater.start();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Auto-updater stopped');
  process.exit(0);
});