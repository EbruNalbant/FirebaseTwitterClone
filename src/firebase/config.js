// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqt9IRJmDJVXWIVgd0RVxfVr_Wf2fsSlk",
  authDomain: "twitter-clone-3c08e.firebaseapp.com",
  projectId: "twitter-clone-3c08e",
  storageBucket: "twitter-clone-3c08e.appspot.com",
  messagingSenderId: "600740071517",
  appId: "1:600740071517:web:3cd69229f894db7546e5b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirmenin referansını alma
export const auth = getAuth(app);

// google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// veritabanının referansını alma
export const db = getFirestore(app);

// depolama alanının referansını alma
export const storage = getStorage(app);
