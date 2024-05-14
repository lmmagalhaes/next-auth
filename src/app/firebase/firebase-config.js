// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAKkc1IQU0uHRmGIAO96gW3dCrubhEeifg',
  authDomain: 'next-ecommerce-study-8d544.firebaseapp.com',
  projectId: 'next-ecommerce-study-8d544',
  storageBucket: 'next-ecommerce-study-8d544.appspot.com',
  messagingSenderId: '48663669039',
  appId: '1:48663669039:web:0f84718db53bb79112d9da',
  measurementId: 'G-DZ9BCHWG3X',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getStorage(app)
