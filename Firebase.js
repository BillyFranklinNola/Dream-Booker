
import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDau1UfX1xp19HCztV5maxTLUemvjiHlx8",
    authDomain: "dreamstay-1c950.firebaseapp.com",
    projectId: "dreamstay-1c950",
    storageBucket: "dreamstay-1c950.appspot.com",
    messagingSenderId: "307219154081",
    appId: "1:307219154081:web:7bbec2453c09f0c55b9ce0"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};