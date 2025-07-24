import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const USERS_COLLECTION = 'users';

export const userProfileService = {
  async createUserProfile(userId: string, email: string, displayName?: string | null) {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      const profileData = {
        uid: userId,
        email,
        displayName: displayName || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(userRef, profileData);
      return profileData;
    } catch (error) {
      console.error('Error creating user profile: ', error);
      throw error;
    }
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(),
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile: ', error);
      throw error;
    }
  },

  async updateUserProfile(userId: string, updates: { displayName?: string; email?: string }) {
    try {
      const userRef = doc(db, USERS_COLLECTION, userId);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
      };
      
      await updateDoc(userRef, updateData);
      return updateData;
    } catch (error) {
      console.error('Error updating user profile: ', error);
      throw error;
    }
  },

  async ensureUserProfileExists(userId: string, email: string, displayName?: string | null) {
    try {
      const existingProfile = await this.getUserProfile(userId);
      if (!existingProfile) {
        return await this.createUserProfile(userId, email, displayName);
      }
      return existingProfile;
    } catch (error) {
      console.error('Error ensuring user profile exists: ', error);
      throw error;
    }
  },
};