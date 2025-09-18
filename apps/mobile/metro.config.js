const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');
const { withNativeWind } = require('nativewind/metro');

// Find the project and workspace directories
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

module.exports = (() => {
  const config = getDefaultConfig(projectRoot);

  // 1. Watch all files within the monorepo
  config.watchFolders = [monorepoRoot];

  // 2. Let Metro know where to resolve packages and in what order
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
  ];

  // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  config.resolver.disableHierarchicalLookup = false;

  // 4. Add shared package to resolver
  config.resolver.alias = {
    'shared': path.resolve(monorepoRoot, 'packages/shared'),
  };

  // 5. Ensure expo-router works properly
  config.resolver.platforms = ['ios', 'android', 'native', 'web'];

  return withNativeWind(config, { input: "./global.css" });
})();
