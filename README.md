# Firebase React Native App

A React Native Expo app with Firebase authentication, Firestore database, and Firebase Storage integration.

## Features

- ✅ User authentication (Email/Password + Google Sign-In)
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
3. **Enable Google Sign-In provider** in Authentication > Sign-in method
4. Create a Firestore database in test mode
5. Enable Firebase Storage
6. Get your Firebase configuration from Project Settings > General > Your apps
7. **Download Google Services files**:
   - For Android: Download `google-services.json` and place in project root
   - For iOS: Download `GoogleService-Info.plist` and place in project root
8. Update the `.env` file with your Firebase credentials:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Google Sign-In configuration (get from Firebase Console > Authentication > Google provider)
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
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
- **Email/Password authentication** enabled
- **Google Sign-In integration** with Firebase Auth
- Persistent authentication state with AsyncStorage
- Automatic user state management and profile synchronization

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

1. **Enable Authentication**: 
   - Email/Password: Firebase Console > Authentication > Sign-in method > Email/Password → Enable
   - Google Sign-In: Firebase Console > Authentication > Sign-in method > Google → Enable
2. **Create Firestore Database**: Go to Firestore Database > Create database > Start in test mode
3. **Configure Security Rules**: Update Firestore rules to secure your data
4. **Enable Storage**: Go to Storage > Get started
5. **Download Google Services Files**: Place `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) in project root