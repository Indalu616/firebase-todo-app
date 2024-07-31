import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  APP_ID,
  API_KEY,
  MEASUREMENT_ID,
  MESSAGING_ID,
  STORAGE_BUCKET,
  PROJECT_ID,
  AUTH_DOMAIN,
} from "../MySecret";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
