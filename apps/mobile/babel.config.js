module.exports =  (api)=> {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      // Reanimated moved its Babel plugin here
      "react-native-worklets/plugin",
    ],
  };
};
