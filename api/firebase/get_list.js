import * as firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnNtF4yy8pdN85laIfnvP6rHBZHbl18A0",
  authDomain: "with-touch.firebaseapp.com",
  databaseURL: "https://with-touch-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "with-touch",
  storageBucket: "with-touch.appspot.com",
  messagingSenderId: "474339573185",
  appId: "1:474339573185:web:81c7b66b253385e7428340",
  measurementId: "G-6GWWBPYKNZ"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();