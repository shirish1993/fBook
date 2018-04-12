import firebase from 'firebase';
const config = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  databaseURL: process.env.REACT_DATABASE_URL,
  storageBucket: process.env.REACT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_SENDER_ID,
};

const app = firebase.initializeApp(config);
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {
  app,
  facebookProvider,
};
