# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm start` - Start Expo development server with QR code
- `npm run android` - Launch on Android device/emulator  
- `npm run ios` - Launch on iOS simulator
- `npx expo start --tunnel` - Use tunnel if network issues prevent QR code access
- `npx expo start --clear` - Clear Metro bundler cache and restart

### Firebase Setup Requirements
- Copy `.env.example` to `.env` and configure with Firebase project credentials
- Enable Authentication (Email/Password) in Firebase Console
- Create Firestore database in test mode
- Configure Firestore security rules (see README.md)

## Architecture Overview

### Authentication Flow
The app uses a conditional navigation pattern based on authentication state:
- **Unauthenticated**: Stack navigator with Login/Signup screens
- **Authenticated**: Drawer navigator with Dashboard/Profile/DataList screens

Authentication state is managed globally via `contexts/AuthContext.tsx` with:
- Firebase Auth integration with AsyncStorage persistence
- Automatic user profile creation/sync in Firestore `users` collection
- User state available throughout app via `useAuth()` hook

### Firebase Integration Pattern
Uses Firebase JS SDK v9+ with modular imports (Expo Go compatible):
- **Configuration**: `firebaseConfig.js` with environment variables + fallback values
- **Authentication**: Firebase Auth with AsyncStorage persistence via `initializeAuth`
- **Database**: Firestore with user-scoped queries (all data filtered by `userId`)
- **Services**: Separate service modules in `services/` for data operations

### Data Architecture
Two main Firestore collections:
- `users/{userId}` - User profiles (displayName, email, timestamps)
- `sampleData/{docId}` - User-generated content (scoped by userId field)

All database operations use user-scoped queries for security. User profiles are automatically created/synchronized between Firebase Auth and Firestore on signup/login.

### Navigation Structure
- **AppNavigator.tsx**: Root navigator with conditional rendering
- **AuthStack**: Stack navigator for Login/Signup (no header)
- **DrawerNavigator**: Main app navigation with custom drawer content
- Drawer includes sign-out functionality and direct navigation to main screens

### Service Layer
- `services/firestore.ts` - CRUD operations for sampleData collection
- `services/userProfile.ts` - User profile management in Firestore
- All services include proper error handling and TypeScript types

## Key Development Patterns

### Authentication Context Updates
When modifying auth functionality, remember to update both Firebase Auth and Firestore:
```typescript
// Pattern: Always sync Firebase Auth with Firestore user profile
await firebaseUpdateProfile(auth.currentUser, { displayName });
await userProfileService.updateUserProfile(userId, { displayName });
```

### Database Queries
All Firestore queries must be user-scoped:
```typescript
// Pattern: Always filter by userId for security
const q = query(
  collection(db, 'sampleData'),
  where('userId', '==', userId),
  orderBy('createdAt', 'desc')
);
```

### Error Handling
Use consistent error handling with user-friendly alerts:
```typescript
try {
  await operation();
  Alert.alert('Success', 'Operation completed!');
} catch (error: any) {
  Alert.alert('Error', error.message);
}
```

## Configuration Files

### Metro Configuration
`metro.config.js` includes Firebase compatibility configuration:
```javascript
config.resolver.assetExts.push('cjs');
```

### TypeScript Configuration  
`tsconfig.json` extends Expo's base configuration with strict mode enabled.

### App Configuration
`app.json` configured for iOS, Android, and web platforms with Firebase project compatibility.

## Firebase Security Rules
The app requires specific Firestore security rules for proper data access:
- Users can only access their own profile in `users/{userId}`
- Users can only access `sampleData` documents where `userId` matches their auth UID
- See README.md for complete security rules configuration

## Testing the App
1. Use Expo Go on physical device (recommended) or simulator
2. Test authentication flow: signup → profile creation → data operations
3. Verify Firestore data appears in Firebase Console after operations
4. Test navigation between all screens via drawer menu