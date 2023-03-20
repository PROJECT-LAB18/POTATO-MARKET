import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

// const {
//   VITE_API_KEY,
//   VITE_AUTH_DOMAIN,
//   VITE_PROJECT_ID,
//   VITE_MESSAGE_SENDER_ID,
//   VITE_STORAGE_BUCKET,
//   VITE_APP_ID,
// } = import.meta.env;

// const firebaseConfig = {
//   apiKey: VITE_API_KEY,
//   authDomain: VITE_AUTH_DOMAIN,
//   projectId: VITE_PROJECT_ID,
//   storageBucket: VITE_STORAGE_BUCKET,
//   messagingSenderId: VITE_MESSAGE_SENDER_ID,
//   appId: VITE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyBzWObRx_ukdrL00YXlSxG18r3nIKVZKJA",
  authDomain: "patato-market.firebaseapp.com",
  projectId: "patato-market",
  storageBucket: "patato-market.appspot.com",
  messagingSenderId: "524849815138",
  appId: "1:524849815138:web:780ed5bb193ff53a51fb3b",
  measurementId: "G-G84D0KJ1XZ"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const usersRef = db.collection('users');

export { firebase, db, usersRef };
export default firebase;