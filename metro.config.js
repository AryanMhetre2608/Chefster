const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Start UserData auto-sync server
const userDataPlugin = require('./metro-userdata-plugin');
userDataPlugin.start();

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
