import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDCY-q-7kdl67CeOeWIYrYPHW5qIqjdu-w',
    authDomain: 'saas2022.firebaseapp.com',
    projectId: 'saas2022',
    storageBucket: 'saas2022.appspot.com',
    messagingSenderId: '403403271668',
    appId: '1:403403271668:web:2a06a22771953130b01da1'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
