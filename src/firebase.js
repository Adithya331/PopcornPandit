import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVqGolNDyZNDa4DEsjBOILvh74_xoFSXw",
  authDomain: "popcornpandit-3737a.firebaseapp.com",
  projectId: "popcornpandit-3737a",
  storageBucket: "popcornpandit-3737a.appspot.com",
  messagingSenderId: "676929615423",
  appId: "1:676929615423:web:c25c299d506e7765b22a8a",
  measurementId: "G-Y2MPPCJ2XY"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);