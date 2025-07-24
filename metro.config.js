const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase configuration for React Native
config.resolver.assetExts.push('cjs');

module.exports = config;