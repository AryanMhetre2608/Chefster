#!/usr/bin/env node

/**
 * Start React Native with UserData.json Auto-Sync
 * This script starts both Metro bundler and the auto-sync server
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting React Native with UserData.json Auto-Sync...');
console.log('');

// Start Metro bundler (which will also start our auto-sync server via metro.config.js)
const metroProcess = spawn('npx', ['react-native', 'start'], {
  stdio: 'inherit',
  shell: true
});

metroProcess.on('close', (code) => {
  console.log(`Metro bundler exited with code ${code}`);
});

metroProcess.on('error', (error) => {
  console.error('Failed to start Metro bundler:', error);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');
  metroProcess.kill('SIGINT');
  process.exit(0);
});

console.log('📱 Metro bundler starting...');
console.log('🔄 Auto-sync server will start automatically');
console.log('');
console.log('💡 USAGE:');
console.log('1. Run your React Native app (npm run android or npm run ios)');
console.log('2. When users are created/updated, src/data/UserData.json will update automatically');
console.log('3. Check console logs for auto-sync status');
console.log('');