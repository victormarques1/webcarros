// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJ12L0j5GGB6SPpNGTwH4wIv_pAO9qvHg",
  authDomain: "webcarros-99ee5.firebaseapp.com",
  projectId: "webcarros-99ee5",
  storageBucket: "webcarros-99ee5.appspot.com",
  messagingSenderId: "694728293494",
  appId: "1:694728293494:web:a7b9702be2f16668217357",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };