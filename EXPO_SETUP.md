# 📱 Testing Your Firebase App on Phone with Expo Go

## Step 1: Install Expo Go App on Your Phone

### For iOS:
1. Open the App Store
2. Search for "Expo Go"
3. Install the app by Expo

### For Android:
1. Open Google Play Store
2. Search for "Expo Go"
3. Install the app by Expo

## Step 2: Start the Development Server

In your terminal/command prompt, run:

```bash
npx expo start
```

You should see output like:
```
› Metro Bundler is starting
› Press s to switch to Expo Go
› Press a to open on Android device/emulator
› Press i to open on iOS simulator
```

## Step 3: Connect Your Phone

### Method 1: QR Code (Recommended)
1. The terminal will display a QR code
2. **For iOS**: Open the built-in Camera app and point it at the QR code
3. **For Android**: Open Expo Go app and tap "Scan QR Code"
4. Your app should load on your phone!

### Method 2: Same Network Connection
1. Make sure your phone and computer are on the same WiFi network
2. In Expo Go app, you should see your project listed under "Recently in Development"
3. Tap on your project name

## Step 4: Create Expo Account (Optional but Recommended)

1. Visit [https://expo.dev/signup](https://expo.dev/signup)
2. Create a free account
3. In terminal, run: `npx expo login`
4. Enter your credentials

This allows you to:
- Save your projects to the cloud
- Share with others
- Access projects from anywhere

## Step 5: Test Your App

Once the app loads on your phone, you can:

1. **Test Authentication**:
   - Create a new account with email/password
   - Login with existing credentials

2. **Test Navigation**:
   - Use the drawer menu (swipe from left or tap hamburger menu)
   - Navigate between Dashboard, Profile, and Data List

3. **Test Database**:
   - Go to "Data List" screen
   - Tap "Add Sample" to create test data
   - Try refreshing the list

4. **Test Profile**:
   - Update your display name
   - Sign out and back in

## Troubleshooting

### App Won't Load:
- Make sure phone and computer are on same WiFi
- Try restarting the Expo development server
- Check if Firebase credentials are correct

### Can't Scan QR Code:
- Make sure Expo Go app is installed
- Try the tunnel option: `npx expo start --tunnel`

### Firebase Errors:
- Make sure Authentication is enabled in Firebase Console
- Check that Firestore database is created
- Verify your Firebase project settings

## Commands Reference

```bash
# Start development server
npx expo start

# Start with tunnel (if network issues)
npx expo start --tunnel

# Start on specific port
npx expo start --port 8082

# Clear cache and restart
npx expo start --clear

# Login to Expo account
npx expo login

# Check Expo status
npx expo whoami
```

## What's Included in Your App

✅ **Authentication**: Email/password login and signup  
✅ **Dashboard**: Stats and quick actions  
✅ **Profile Management**: Update display name, sign out  
✅ **Database Operations**: Add, view, delete sample data  
✅ **Navigation**: Drawer menu with multiple screens  
✅ **Real-time Data**: Firestore integration  

## Next Steps

1. Test all features on your phone
2. Create additional user accounts
3. Try the app on different devices
4. Consider publishing to app stores when ready

Your Firebase React Native app is now ready for mobile testing! 🚀