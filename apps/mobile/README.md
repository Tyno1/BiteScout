# BiteScout Mobile App

This is the mobile application for BiteScout, built with Expo and React Native.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- For iOS development: Xcode
- For Android development: Android Studio

### Installation

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev
```

### Available Scripts

- `yarn dev` - Start the Expo development server
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS device/simulator
- `yarn web` - Run in web browser
- `yarn build` - Build the app for production
- `yarn lint` - Run ESLint
- `yarn test` - Run tests

### Development

The app uses TypeScript and follows React Native best practices. The project structure includes:

- `App.tsx` - Main app component
- `assets/` - Images and other static assets
- `src/` - Source code (to be created)

### Testing

Tests are written using Jest and React Native Testing Library. Run tests with:

```bash
yarn test
```

### Building for Production

To build the app for production:

```bash
# For Android
yarn build:android

# For iOS
yarn build:ios

# For web
yarn build
```

## Project Structure

```
apps/mobile/
├── App.tsx              # Main app component
├── app.json             # Expo configuration
├── assets/              # Static assets
├── src/                 # Source code
├── jest.config.js       # Jest configuration
├── jest.setup.js        # Jest setup
├── .eslintrc.js         # ESLint configuration
└── package.json         # Dependencies and scripts
```
