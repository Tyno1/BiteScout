// Configuration utility for handling different environments
const config = {
  // Backend URLs
  backend: {
    // For server-side requests (SSR, API routes)
    server: process.env.BACKEND_URL_SERVER || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001",
    // For client-side requests (browser)
    client: process.env.BACKEND_URL_CLIENT || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001",
  },
  
  // Media Service URLs
  mediaService: {
    // For client-side requests (browser)
    url: process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL || 
      (process.env.NODE_ENV === 'development' ? "http://localhost:3002/api/v1" : "http://localhost:3002/api/v1"),
  },
  
  // NextAuth configuration
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
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