import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVvRP4eWB-Fn0rsVTvv3v8EdIPtzuPDQI",
  authDomain: "aligned-mobile.firebaseapp.com",
  projectId: "aligned-mobile",
  storageBucket: "aligned-mobile.appspot.com",
  messagingSenderId: "519377576072",
  appId: "1:519377576072:web:6917551c35ae1a3a83bf3d",
  measurementId: "G-FFL9VTS0DC"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.firestore();

export default firebase;