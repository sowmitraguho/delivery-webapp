// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZZO3FnYARgggsU0FctvIKCg0dD8gaw4I",
  authDomain: "deliverywebapp-a04d1.firebaseapp.com",
  projectId: "deliverywebapp-a04d1",
  storageBucket: "deliverywebapp-a04d1.firebasestorage.app",
  messagingSenderId: "908946166573",
  appId: "1:908946166573:web:45339a0e771684e4baf9a4",
  measurementId: "G-C31YSPSM1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);