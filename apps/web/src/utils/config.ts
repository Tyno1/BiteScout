// Configuration utility for handling different environments
console.log('Environment variables:', {
  BACKEND_URL_SERVER: process.env.BACKEND_URL_SERVER,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  NODE_ENV: process.env.NODE_ENV
});

const config = {
  // Backend URLs
  backend: {
    // For server-side requests (SSR, API routes)
    server: process.env.BACKEND_URL_SERVER || "https://bitescout-69t9.onrender.com",
    // For client-side requests (browser)
    client: process.env.NEXT_PUBLIC_BACKEND_URL || "https://bitescout-69t9.onrender.com",
  },
  
  // Media Service URLs
  mediaService: {
    // For client-side requests (browser)
    url: process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL || 
      (process.env.NODE_ENV === 'development' ? "http://localhost:3002/api/v1" : "http://localhost:3002/api/v1"),
  },
  
  // NextAuth configuration
  auth: {
    secret: process.env.AUTH_SECRET,
    url: process.env.AUTH_URL,
  },
  
  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // Feature flags
  features: {
    debug: process.env.NODE_ENV === 'development',
    analytics: process.env.NODE_ENV === 'production',
  }
};

export default config; 