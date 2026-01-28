#!/usr/bin/env node

/**
 * Test script for UserData.json Auto-Sync
 */

const http = require('http');

const testData = {
  data: {
    users: [
      {
        id: 0,
        email: "test@example.com",
        name: "Test User",
        phoneNumber: "",
        bio: "",
        profileImage: null,
        favoriteRecipes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    nextUserId: 1
  }
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 8082,
  path: '/update-userdata',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🧪 Testing UserData.json Auto-Sync...');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.success) {
        console.log('✅ Auto-sync test successful!');
        console.log('📁 Check src/data/UserData.json for updates');
      } else {
        console.log('❌ Auto-sync test failed:', response.error);
      }
    } catch (error) {
      console.log('❌ Failed to parse response:', error.message);
    }
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.log('❌ Connection failed:', error.message);
  console.log('💡 Make sure the auto-sync server is running (npm run start)');
  process.exit(1);
});

req.write(postData);
req.end();