import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAwrDNHMYX4Vig0X2enw6T8bd_j_BLG-5M",
  authDomain: "reactapp-fe611.firebaseapp.com",
  databaseURL: "https://reactapp-fe611-default-rtdb.firebaseio.com",
  projectId: "reactapp-fe611",
  storageBucket: "reactapp-fe611.appspot.com",
  messagingSenderId: "422302899242",
  appId: "1:422302899242:web:d9b629a421e37f3723f753"
};
const app = initializeApp(firebaseConfig);
const db= getFirestore(app)
export default app
