import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlXPoX5kVlXw9IrGp-16V_5WxeTasOV1g',
  authDomain: 'mood-messenger.firebaseapp.com',
  projectId: 'mood-messenger',
  storageBucket: 'mood-messenger.appspot.com',
  messagingSenderId: '256718023354',
  appId: '1:256718023354:web:a6f096da76205c04b13083',
  measurementId: 'G-7J15QKCNJJ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
