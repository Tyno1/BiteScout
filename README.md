# 🍽️ BiteScout

A visual-first food discovery platform with mobile app, web dashboard, and backend API.

## 📋 Project Scope

BiteScout is a full-stack application consisting of:

- **📱 Mobile App** - React Native consumer app for food discovery
- **🖥️ Web Dashboard** - Next.js admin interface for restaurants
- **⚙️ Backend API** - Express.js server with MongoDB
- **📦 Shared Package** - Common types and OpenAPI specifications

## 🏗️ Architecture

Monorepo setup with modern tooling:

- **📱 Mobile App**: React Native with Expo
- **🖥️ Web Dashboard**: Next.js with Tailwind
- **⚙️ Backend**: Express + MongoDB
- **📦 Shared**: OpenAPI types and shared logic

## 📁 Project Structure

```
BiteScout/
├── mobile/               # React Native mobile app
│   ├── src/
│   │   ├── screens/      # App screens
│   │   ├── components/   # Mobile components
│   │   ├── stores/       # Zustand stores
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── app.json
├── web/                  # Next.js admin dashboard
│   ├── src/
│   │   ├── app/          # App Router pages and layouts
│   │   ├── components/   # Reusable UI components
│   │   ├── stores/       # Zustand state management
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   ├── package.json
│   └── next.config.mjs
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── shared/               # Shared types and specifications
│   ├── types/           # Generated TypeScript types
│   ├── openapi/         # OpenAPI specifications
│   ├── package.json
│   └── tsconfig.json
├── package.json         # Root package.json
└── README.md           # This file
```

## 🛠️ Tech Stack

### Mobile App
- React Native (Expo)
- Zustand for state
- Axios + React Navigation
- Expo Vector Icons

### Web Dashboard
- Next.js 15 (App Router)
- Tailwind CSS + Radix UI
- NextAuth.js for auth

### Backend API
- Node.js with Express + TypeScript
- MongoDB (Mongoose ODM)
- JWT auth with refresh tokens
- Socket.IO for real-time updates

### Shared
- OpenAPI 3.0 Specification
- Type-safe SDKs via OpenAPI Generator
- Shared types and validators

## 🚀 Development Setup

### Prerequisites

- **Node.js** 18+ 
- **MongoDB** 6+
- **npm** or **yarn**
- **Expo CLI** (for mobile development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BiteScout
   ```

2. **Install dependencies for all packages**
   ```bash
   # Install root dependencies
   npm install
   
   # Install mobile dependencies
   cd mobile && npm install
   
   # Install web dependencies
   cd ../web && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   
   # Install shared dependencies
   cd ../shared && npm install
   ```

3. **Set up environment variables**

   **Backend (.env)**
   ```env
   PORT=5001
   NODE_ENV=development
   MONGODB_CONNECTION_STRING=mongodb://localhost:27017/bitescout
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

   **Web (.env.local)**
   ```env
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
   ```

4. **Generate shared types**
   ```bash
   cd shared
   npm run generate-types
   ```

### Running the Application

#### Development Mode

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will be available at: http://localhost:5001

3. **Start Web Dashboard** (in new terminal)
   ```bash
   cd web
   npm run dev
   ```
   Web dashboard will be available at: http://localhost:3000

4. **Start Mobile App** (in new terminal)
   ```bash
   cd mobile
   npm start
   ```
   Follow Expo CLI instructions to run on device or simulator

#### Production Mode

1. **Build Backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build Web Dashboard**
   ```bash
   cd web
   npm run build
   npm start
   ```

## 🔧 Available Scripts

### Mobile App
```bash
cd mobile
npm start               # Start Expo development server
npm run android         # Run on Android
npm run ios             # Run on iOS
npm run web             # Run in web browser
```

### Web Dashboard
```bash
cd web
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Backend
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
```

### Shared Package
```bash
cd shared
npm run generate-types    # Generate TypeScript types from OpenAPI
npm run build            # Build the package
npm run watch            # Watch mode for development
```

## 📚 API Documentation

The API is documented using OpenAPI 3.0 specification located in `shared/openapi/spec.yaml`. 

### Available Endpoints

- **Authentication**: `/api/auth/*` - Login, register, refresh tokens
- **Users**: `/api/user/*` - User management and profiles
- **Restaurants**: `/api/restaurants/*` - Restaurant CRUD operations
- **Food Catalog**: `/api/food-catalogue/*` - Food item management
- **Allergens**: `/api/allergens/*` - Allergen management
- **Courses**: `/api/courses/*` - Course type management
- **Cuisines**: `/api/cuisines/*` - Cuisine type management
- **Access Control**: `/api/restaurant-access/*` - Restaurant access management
- **Notifications**: `/api/notifications/*` - User notifications

## 🔐 Security Features

### 🔒 **Critical Security Implementations**
- **Enhanced Password Validation** (8+ chars, complexity requirements)
- **Improved CORS Configuration** with environment-based origins
- **Enhanced Socket.IO Security** with rate limiting and validation
- **Comprehensive Error Handling** middleware
- **Security Headers** implementation
- **Environment Variables** properly configured and documented

### 🛡️ **Additional Security Features**
- **MongoDB Connection Pooling** and timeout configuration
- **JWT Token Validation** improvements
- **Input Validation** and sanitization
- **Rate Limiting** for authentication attempts
- **Health Check Endpoints**
- **Proper Error Logging** and handling

## 🔄 Real-time Features

BiteScout uses Socket.IO for real-time communication:

- **Live Notifications**: Instant updates for access requests and approvals
- **Real-time Updates**: Menu changes and status updates
- **Connection Management**: Automatic reconnection and error handling

### Socket.IO Configuration

#### Important Notes
- Backend Socket.IO server runs on port 5001
- Frontend connects to `http://localhost:5001` by default
- Socket.IO uses the root namespace (`/`)
- CORS is configured to allow connections from frontend

#### Troubleshooting Socket.IO Issues

1. **"Invalid namespace" Error**
   - Ensure backend is running on port 5001
   - Check `NEXT_PUBLIC_BACKEND_URL` environment variable
   - Verify CORS configuration allows your frontend origin

2. **Connection Refused**
   - Check if backend server is running
   - Verify port 5001 is not blocked by firewall
   - Check console for backend startup errors

3. **CORS Issues**
   - Ensure `ALLOWED_ORIGINS` includes your frontend URL
   - Check browser console for CORS error details

## 📊 Monitoring and Logging

### Health Checks
- Backend health: `GET /health`
- Monitor uptime and response times
- Set up alerts for health check failures

### Error Logging
- All errors are logged with stack traces in development
- Production errors are sanitized for security
- Consider implementing structured logging (Winston, Pino)

### Performance Monitoring
- Monitor MongoDB connection pool usage
- Track API response times
- Monitor Socket.IO connection counts

## 🧪 Testing

### Web Dashboard Testing
```bash
cd web
npm run test           # Run all tests
npm run test:watch     # Run tests in watch mode
```

### Backend Testing
```bash
cd backend
npm test              # Run backend tests
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or self-hosted MongoDB
2. Configure environment variables for production
3. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

### Web Dashboard Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred hosting platform
3. Configure environment variables

### Mobile App Deployment
1. Build with Expo: `expo build:android` or `expo build:ios`
2. Submit to app stores or distribute via Expo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Anthony Ukutegbe**

## 📞 Support

For support and questions:
- Create an issue in the repository
- Review the API documentation in `shared/openapi/spec.yaml`

## 🔗 Links

- **Mobile App**: Expo development build
- **Web Dashboard**: http://localhost:3000 (development)
- **Backend API**: http://localhost:5001 (development)
- **API Documentation**: `shared/openapi/spec.yaml`
- **Health Check**: http://localhost:5001/health
