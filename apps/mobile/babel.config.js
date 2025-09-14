module.exports =  (api)=> {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Reanimated moved its Babel plugin here
      "react-native-worklets/plugin",
    ],
  };
};
