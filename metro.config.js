const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};


module.exports = mergeConfig(getDefaultConfig(__dirname), {
  // ... other configurations
  server: {
    port: 8082, // Change this to a different port
  },
  // Add other properties if needed
  transformer: {
    // Any additional transformer configuration goes here
  },
});

  