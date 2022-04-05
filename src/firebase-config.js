import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const {REACT_APP_USERSKEY} = process.env;
// setting up the database 
const firebaseConfig = {
    apiKey: `${REACT_APP_USERSKEY}`,
    authDomain: "react-with-firebase-8d961.firebaseapp.com",
    projectId: "react-with-firebase-8d961",
    storageBucket: "react-with-firebase-8d961.appspot.com",
    messagingSenderId: "190144325895",
    appId: "1:190144325895:web:f5cd5c4bf612ea16033da2",
    measurementId: "G-XZTY643KJH"
  };

//   initializing app 
const app = initializeApp(firebaseConfig);

// connecting to firestore 
export const db = getFirestore(app);
console.log(process.env)