/**
 * Metro Bundler Plugin for UserData.json Auto-Sync
 * This plugin creates an HTTP endpoint that the React Native app can call
 * to automatically update src/data/UserData.json
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

class UserDataMetroPlugin {
  constructor() {
    this.userDataPath = path.join(__dirname, 'src', 'data', 'UserData.json');
    this.server = null;
    this.port = 8082; // Different from Metro's 8081
  }

  // Start the auto-sync server
  start() {
    this.server = http.createServer((req, res) => {
      // Enable CORS
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      if (req.method === 'POST' && req.url === '/update-userdata') {
        let body = '';
        
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            this.updateUserDataFile(data.data);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'UserData.json updated successfully' }));
          } catch (error) {
            console.error('❌ Failed to update UserData.json:', error.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        });
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });

    this.server.listen(this.port, () => {
      console.log(`🚀 UserData Auto-Sync Server running on http://localhost:${this.port}`);
      console.log(`📁 Monitoring updates to: ${this.userDataPath}`);
    });

    // Handle server errors
    this.server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`⚠️  Port ${this.port} is busy, trying ${this.port + 1}...`);
        this.port++;
        this.server.listen(this.port);
      } else {
        console.error('❌ Auto-sync server error:', error.message);
      }
    });
  }

  // Update the UserData.json file
  updateUserDataFile(dataset) {
    try {
      // Validate dataset structure
      if (!dataset || !dataset.users || !Array.isArray(dataset.users)) {
        throw new Error('Invalid dataset structure');
      }

      // Read current file to compare
      let currentData = { users: [], nextUserId: 0 };
      if (fs.existsSync(this.userDataPath)) {
        const currentContent = fs.readFileSync(this.userDataPath, 'utf8');
        currentData = JSON.parse(currentContent);
      }

      // Check if data has actually changed
      if (JSON.stringify(currentData) === JSON.stringify(dataset)) {
        console.log('📊 UserData.json - No changes detected, skipping update');
        return;
      }

      // Write the updated data
      const jsonString = JSON.stringify(dataset, null, 2);
      fs.writeFileSync(this.userDataPath, jsonString, 'utf8');

      console.log('');
      console.log('✅ AUTO-UPDATED src/data/UserData.json');
      console.log(`📊 Users: ${dataset.users.length}, Next ID: ${dataset.nextUserId}`);
      console.log(`⏰ Updated at: ${new Date().toLocaleTimeString()}`);
      console.log('');

    } catch (error) {
      console.error('❌ Failed to update UserData.json:', error.message);
      throw error;
    }
  }

  // Stop the server
  stop() {
    if (this.server) {
      this.server.close(() => {
        console.log('👋 UserData Auto-Sync Server stopped');
      });
    }
  }
}

// Create and export the plugin instance
const userDataPlugin = new UserDataMetroPlugin();

// Auto-start when required
if (require.main === module) {
  userDataPlugin.start();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    userDataPlugin.stop();
    process.exit(0);
  });
}

module.exports = userDataPlugin;