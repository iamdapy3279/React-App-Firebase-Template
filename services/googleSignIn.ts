import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

export const configureGoogleSignIn = () => {
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

  // Use platform-specific client ID, fallback to web client ID
  let clientId = webClientId;
  if (Platform.OS === 'ios' && iosClientId) {
    clientId = iosClientId;
  } else if (Platform.OS === 'android' && androidClientId) {
    clientId = androidClientId;
  }

  if (!clientId) {
    console.warn('Google Sign-In client ID not configured. Please check your environment variables.');
    return false;
  }

  try {
    GoogleSignin.configure({
      webClientId: clientId,
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
    });
    return true;
  } catch (error) {
    console.error('Error configuring Google Sign-In:', error);
    return false;
  }
};

export const googleSignInService = {
  async signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error) {
      console.error('Google Sign-In error:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Google Sign-Out error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      return userInfo;
    } catch (error) {
      console.error('Get current Google user error:', error);
      return null;
    }
  },

  async getTokens() {
    try {
      const tokens = await GoogleSignin.getTokens();
      return tokens;
    } catch (error) {
      console.error('Get Google tokens error:', error);
      throw error;
    }
  },
};