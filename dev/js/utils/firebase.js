import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCB-iCKJGRXITuE6DFKNV8qx1AWUhNY5aw",
  authDomain: "fb-comm.firebaseapp.com",
  databaseURL: "https://fb-comm.firebaseio.com",
  projectId: "fb-comm",
  storageBucket: "fb-comm.appspot.com",
  messagingSenderId: "76040958616"
};

const app = firebase.initializeApp(config);
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {
  app,
  facebookProvider,
};
