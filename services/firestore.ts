import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { SampleData } from '../types';

const COLLECTION_NAME = 'sampleData';

export const firestoreService = {
  async addSampleData(data: Omit<SampleData, 'id' | 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  },

  async getSampleData(userId: string): Promise<SampleData[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as SampleData[];
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw error;
    }
  },

  async updateSampleData(id: string, data: Partial<Omit<SampleData, 'id' | 'createdAt'>>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating document: ', error);
      throw error;
    }
  },

  async deleteSampleData(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting document: ', error);
      throw error;
    }
  },
};