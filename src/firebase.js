import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/FirebaseConfig";
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"


const firebaseApp = initializeApp(firebaseConfig);
const auth=getAuth(firebaseApp);
const db=getDatabase(firebaseApp);



export {auth,db}

