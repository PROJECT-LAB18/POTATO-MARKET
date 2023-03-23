import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/compat/database'
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
  apiKey: "AIzaSyAOumwOGF_a3j3v5RqF_OzMEzNrlASGRyE",
  authDomain: "potato-market-lab18.firebaseapp.com",
  projectId: "potato-market-lab18",
  storageBucket: "potato-market-lab18.appspot.com",
  messagingSenderId: "862520392764",
  appId: "1:862520392764:web:fa40b5561ca057dcfa5739"
};

firebase.initializeApp(firebaseConfig);

export const realDB = firebase.database(); //리얼 데이터 베이스
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const usersRef = db.collection('users'); // 유저 정보 컬렉션
export const userWriteRef = db.collection('UserWrite'); // 게시글 정보 컬렉션

export default firebase;