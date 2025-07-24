import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  signInWithCredential,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthContextType, User } from '../types';
import { userProfileService } from '../services/userProfile';
import { configureGoogleSignIn, googleSignInService } from '../services/googleSignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Configure Google Sign-In on component mount
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Ensure user profile exists in Firestore
          await userProfileService.ensureUserProfileExists(
            firebaseUser.uid,
            firebaseUser.email || '',
            firebaseUser.displayName
          );
          
          const userData: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          };
          setUser(userData);
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error setting up user profile:', error);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem('user');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Create user profile in Firestore
      await userProfileService.createUserProfile(
        userCredential.user.uid,
        userCredential.user.email || email
      );
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Get Google user info
      const googleUser = await googleSignInService.signIn();
      
      if (!googleUser.data.idToken) {
        throw new Error('No ID token received from Google');
      }

      // Create Firebase credential with Google token
      const googleCredential = GoogleAuthProvider.credential(
        googleUser.data.idToken,
        googleUser.data.accessToken
      );

      // Sign in to Firebase with Google credential
      const userCredential = await signInWithCredential(auth, googleCredential);
      
      // Create user profile in Firestore if it doesn't exist
      await userProfileService.ensureUserProfileExists(
        userCredential.user.uid,
        userCredential.user.email || '',
        userCredential.user.displayName
      );
    } catch (error) {
      console.error('Google Sign-In error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Sign out from Google if user is signed in
      try {
        await googleSignInService.signOut();
      } catch (googleError) {
        // Google sign out error is not critical
        console.warn('Google sign out error:', googleError);
      }
      
      // Sign out from Firebase
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (displayName: string) => {
    try {
      if (auth.currentUser) {
        // Update Firebase Auth profile
        await firebaseUpdateProfile(auth.currentUser, { displayName });
        
        // Update Firestore user profile
        await userProfileService.updateUserProfile(auth.currentUser.uid, {
          displayName
        });
        
        // Update local state
        setUser(prev => prev ? { ...prev, displayName } : null);
        
        // Update AsyncStorage
        const updatedUser = { ...user, displayName };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};