import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDdAhjyKc572p4fdcA7qYZj5JpapFjWkD4",
  authDomain: "gyed-96d08.firebaseapp.com",
  databaseURL: "https://gyed-96d08-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
