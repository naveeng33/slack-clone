import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA058wYyTBA038bipBHpuk6mJ2EfY5e4LU",
  authDomain: "slack-clone-a763e.firebaseapp.com",
  projectId: "slack-clone-a763e",
  storageBucket: "slack-clone-a763e.appspot.com",
  messagingSenderId: "522709091307",
  appId: "1:522709091307:web:e143da0f0be50b156b4fae",
  measurementId: "G-TCL2KE3BQD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
