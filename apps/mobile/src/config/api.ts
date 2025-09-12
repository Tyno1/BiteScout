const config = {
  backend: {
    baseURL: process.env.EXPO_PUBLIC_API_URL || 
      (__DEV__ ? "http://localhost:5001" : "https://api.bitescout.com"),
  },
  
  mediaService: {
    baseURL: process.env.EXPO_PUBLIC_MEDIA_URL || 
      (__DEV__ ? "http://localhost:3002/api/v1" : "https://media.bitescout.com/api/v1"),
  },
  
  isDevelopment: __DEV__,
  isProduction: !__DEV__,
  
  features: {
    debug: __DEV__,
    analytics: !__DEV__,
  }
};

export default config;
