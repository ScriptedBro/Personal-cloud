import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { collection, doc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBotpJAhFKvm9JjN9nA_P_a6EVBZndiHJY",
  authDomain: "home-cloud-72114.firebaseapp.com",
  projectId: "home-cloud-72114",
  storageBucket: "home-cloud-72114.appspot.com",
  messagingSenderId: "450192343604",
  appId: "1:450192343604:web:c6f3dc6ce76e30653d8061"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);
export const database = {
  folders: collection(db, 'folders'),
  files: collection(db, 'files'),
  getFolder: (id) => doc(db, 'folders', id),
  getFile: (id) => doc(db, 'files', id),
  formatDoc: doc => {
    return {id: doc.id, ...doc.data()}
  }
}
export const auth = getAuth(app);