import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCC-AAO6zmCvQKF4iARpgWwUWevJ099vec",
  authDomain: "shintv-68934.firebaseapp.com",
  projectId: "shintv-68934",
  storageBucket: "shintv-68934.appspot.com",
  messagingSenderId: "843863311800",
  appId: "1:843863311800:web:f985684f82f677e8e9bb4d",
  measurementId: "G-4T96FL9NK8"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);