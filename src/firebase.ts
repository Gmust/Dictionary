import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDt69LMct0Ryh6nCc6ptNV4k2OZLxRNnIA",
    authDomain: "rightversion-dictionary.firebaseapp.com",
    projectId: "rightversion-dictionary",
    storageBucket: "rightversion-dictionary.appspot.com",
    messagingSenderId: "738390834311",
    appId: "1:738390834311:web:66703c2ab2db2368850c22"
};


const app = initializeApp(firebaseConfig);
const db =  getFirestore();
export {db};


