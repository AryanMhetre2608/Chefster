#!/usr/bin/env node

/**
 * Auto-Update UserData.json Script
 * This script monitors console output and automatically updates src/data/UserData.json
 * when new user data is detected.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class UserDataAutoUpdater {
  constructor() {
    this.userDataPath = path.join(__dirname, 'src', 'data', 'UserData.json');
    this.isMonitoring = false;
    this.lastUpdateTime = 0;
  }

  // Start monitoring React Native logs
  startMonitoring() {
    console.log('🚀 Starting UserData.json Auto-Updater...');
    console.log('📁 Monitoring file:', this.userDataPath);
    console.log('👀 Watching for console logs with "UserDataService: Current dataset:"');
    console.log('');

    // Start React Native metro bundler with log monitoring
    const metroProcess = spawn('npx', ['react-native', 'start'], {
      stdio: ['inherit', 'pipe', 'pipe']
    });

    // Monitor stdout for dataset updates
    metroProcess.stdout.on('data', (data) => {
      const output = data.toString();
      this.processLogOutput(output);
      process.stdout.write(data); // Pass through the output
    });

    // Monitor stderr for dataset updates
    metroProcess.stderr.on('data', (data) => {
      const output = data.toString();
      this.processLogOutput(output);
      process.stderr.write(data); // Pass through the output
    });

    metroProcess.on('close', (code) => {
      console.log(`Metro bundler exited with code ${code}`);
    });

    this.isMonitoring = true;
  }

  // Process log output to find dataset updates
  processLogOutput(output) {
    try {
      // Look for the specific log pattern
      const datasetPattern = /UserDataService: Current dataset: ({.*})/;
      const match = output.match(datasetPattern);

      if (match) {
        const jsonString = match[1];
        try {
          const dataset = JSON.parse(jsonString);
          this.updateUserDataFile(dataset);
        } catch (parseError) {
          console.log('❌ Failed to parse dataset JSON:', parseError.message);
        }
      }
    } catch (error) {
      // Ignore processing errors
    }
  }

  // Update the UserData.json file
  updateUserDataFile(dataset) {
    try {
      // Prevent rapid updates
      const now = Date.now();
      if (now - this.lastUpdateTime < 1000) {
        return; // Skip if updated less than 1 second ago
      }

      // Read current file to compare
      let currentData = { users: [], nextUserId: 0 };
      if (fs.existsSync(this.userDataPath)) {
        const currentContent = fs.readFileSync(this.userDataPath, 'utf8');
        currentData = JSON.parse(currentContent);
      }

      // Check if data has actually changed
      if (JSON.stringify(currentData) === JSON.stringify(dataset)) {
        return; // No changes, skip update
      }

      // Write the updated data
      const jsonString = JSON.stringify(dataset, null, 2);
      fs.writeFileSync(this.userDataPath, jsonString, 'utf8');

      console.log('');
      console.log('✅ AUTO-UPDATED src/data/UserData.json');
      console.log(`📊 Users: ${dataset.users.length}, Next ID: ${dataset.nextUserId}`);
      console.log(`⏰ Updated at: ${new Date().toLocaleTimeString()}`);
      console.log('');

      this.lastUpdateTime = now;
    } catch (error) {
      console.log('❌ Failed to update UserData.json:', error.message);
    }
  }

  // Manual update method
  manualUpdate(dataset) {
    console.log('🔧 Manual update triggered...');
    this.updateUserDataFile(dataset);
  }
}

// Create and start the auto-updater
const autoUpdater = new UserDataAutoUpdater();

// Handle command line arguments
const args = process.argv.slice(2);
if (args.length > 0 && args[0] === 'manual') {
  // Manual mode - read from stdin
  console.log('📝 Manual mode - paste your dataset JSON and press Enter:');
  process.stdin.on('data', (data) => {
    try {
      const dataset = JSON.parse(data.toString().trim());
      autoUpdater.manualUpdate(dataset);
      process.exit(0);
    } catch (error) {
      console.log('❌ Invalid JSON:', error.message);
      process.exit(1);
    }
  });
} else {
  // Auto-monitoring mode
  autoUpdater.startMonitoring();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Auto-updater stopped');
  process.exit(0);
});

module.exports = UserDataAutoUpdater;