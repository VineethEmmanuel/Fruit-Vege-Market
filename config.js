import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCipJWNB259k2mF5pxpSfpW1GNGIOsWFbI",
  authDomain: "fruit-vege-market.firebaseapp.com",
  projectId: "fruit-vege-market",
  storageBucket: "fruit-vege-market.appspot.com",
  messagingSenderId: "296262262640",
  appId: "1:296262262640:web:3aca7cc26e0af6ca0879b5",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
