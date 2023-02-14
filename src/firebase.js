import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/FirebaseConfig";
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp(firebaseConfig);
const auth=getAuth(firebaseApp);
const db=getDatabase(firebaseApp);
const storage=getStorage(firebaseApp)

export {auth,db,storage}

