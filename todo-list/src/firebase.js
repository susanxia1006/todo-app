import * as firebase from 'firebase';
import {
  FB_API,
  FB_AUTHDOMAIN,
  FB_DB,
  FB_PROJ_ID,
  FB_BUCKET,
  FB_MSG
} from 'react-native-dotenv';

const config = {
  apiKey: FB_API,
  authDomain: FB_AUTHDOMAIN,
  databaseURL: FB_DB,
  projectId: FB_PROJ_ID,
  storageBucket: FB_BUCKET,
  messagingSenderId: FB_MSG
};

const firebaseApp = firebase.initializeApp(config);
console.log('fb initialized');

const db = firebaseApp.database();

export default db;
