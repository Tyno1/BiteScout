# BiteScout Mobile App

A React Native mobile application built with Expo for discovering and exploring restaurants.

## Features

- **Restaurant Discovery**: Search and browse restaurants by location, cuisine, and ratings
- **User Authentication**: Login and registration functionality
- **Restaurant Details**: View detailed information about restaurants including menus and reviews
- **User Profiles**: Manage user preferences and favorites
- **Modern UI**: Clean and intuitive user interface with consistent design

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Zustand** for state management
- **Axios** for API communication
- **React Native Safe Area Context** for safe area handling

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── stores/             # Zustand state stores
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
├── hooks/              # Custom React hooks
└── navigation/         # Navigation configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on specific platform:
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## Configuration

### API Configuration

Update the API base URL in `src/services/api.ts` to point to your backend server:

```typescript
const api = axios.create({
  baseURL: 'http://your-backend-url/api',
  // ...
});
```

### Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
API_BASE_URL=http://localhost:3000/api
```

## State Management

The app uses Zustand for state management with the following stores:

- **authStore**: Manages user authentication state
- **restaurantStore**: Manages restaurant data and search functionality

## Navigation

The app uses React Navigation with a stack navigator for the following screens:

- Home
- Login
- Register
- Restaurant Details
- Profile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 