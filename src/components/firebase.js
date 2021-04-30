import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyBEIvpyxquu3vBLJ6xTpaO3aURn8dKiRxw",
  authDomain: "schoolender-a5aba.firebaseapp.com",
  projectId: "schoolender-a5aba",
  storageBucket: "schoolender-a5aba.appspot.com",
  messagingSenderId: "656938514406",
  appId: "1:656938514406:web:b87d93067d70791d1a4827",
  measurementId: "G-V2XNSX94H5",
};

firebase.initializeApp(firebaseConfig);
const app = firebase.app();

export default app;
export const db = firebase.firestore();
export const auth = app.auth();
