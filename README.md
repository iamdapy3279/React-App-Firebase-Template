# Firebase React Native App

A React Native Expo app with Firebase authentication, Firestore database, and Firebase Storage integration.

## Features

- ✅ User authentication (Login/Signup)
- ✅ Profile management
- ✅ Dashboard with sidebar navigation
- ✅ Firestore database integration
- ✅ Real-time data operations (CRUD)
- ✅ Cross-platform (iOS & Android)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database in test mode
4. Enable Firebase Storage
5. Get your Firebase configuration from Project Settings > General > Your apps
6. Update the `.env` file with your Firebase credentials:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

The `firebaseConfig.js` file automatically reads from these environment variables.

**Important**: This app uses Firebase JS SDK v9+ which is compatible with Expo Go. The configuration includes AsyncStorage persistence for authentication state.

### 3. Run the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Project Structure

```
├── App.tsx                 # Main app component
├── firebaseConfig.js       # Firebase configuration (Expo compatible)
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── screens/
│   ├── LoginScreen.tsx     # Login screen
│   ├── SignupScreen.tsx    # Signup screen
│   ├── DashboardScreen.tsx # Main dashboard
│   ├── ProfileScreen.tsx   # User profile
│   └── DataListScreen.tsx  # Data list with CRUD
├── navigation/
│   └── AppNavigator.tsx    # Navigation setup
├── services/
│   └── firestore.ts        # Firestore operations
└── types/
    └── index.ts            # TypeScript types
```

## Firebase Services Used

- **Authentication**: Email/password login and registration
- **Firestore**: Real-time database for storing user data
- **Storage**: File upload capabilities (configured but not used in screens)

## Getting Started

1. Install Expo CLI globally: `npm install -g @expo/cli`
2. Follow the setup instructions above
3. Configure your Firebase project
4. Run the app and create a test account

## Notes

- **Firebase Setup**: Uses Firebase JS SDK v9+ with modular imports for Expo Go compatibility
- **Authentication Persistence**: Configured with AsyncStorage for persistent login state
- **Metro Configuration**: Includes `metro.config.js` for proper Firebase asset handling
- Replace the Firebase configuration with your actual project credentials
- The app includes sample data operations to test database connectivity
- Navigation uses React Navigation with drawer navigation for authenticated users

## Firebase Services Configuration

### Authentication
- Email/Password authentication enabled
- Persistent authentication state with AsyncStorage
- Automatic user state management

### Firestore Database
- Collection: `sampleData` for testing CRUD operations
- Collection: `users` for user profile data
- **Important**: Configure security rules in Firebase Console:
  ```javascript
  // Security rules for authenticated users
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      // Users can only access their own profile
      match /users/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Users can only access their own sample data
      match /sampleData/{document} {
        allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      }
    }
  }
  ```

### Storage
- Firebase Storage configured and ready for file uploads
- Not implemented in UI but available for use

## Important Setup Steps

1. **Enable Authentication**: Go to Firebase Console > Authentication > Sign-in method > Email/Password → Enable
2. **Create Firestore Database**: Go to Firestore Database > Create database > Start in test mode
3. **Configure Security Rules**: Update Firestore rules to secure your data
4. **Enable Storage**: Go to Storage > Get started