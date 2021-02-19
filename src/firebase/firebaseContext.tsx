import * as React from "react"
import firebase from "firebase/app";
import 'firebase/firestore'


const config = {
  apiKey: "AIzaSyCfLwp2BJ31sDS4e2Sk8cNUOjDcyU2bXmM",
  authDomain: "simplykweeklyteamdonation.firebaseapp.com",
  projectId: "simplykweeklyteamdonation",
  storageBucket: "simplykweeklyteamdonation.appspot.com",
  messagingSenderId: "898543390041",
  appId: "1:898543390041:web:29e1953576541c3a09d048",
  databaseURL: "https://simplykweeklyteamdonation.firebaseio.com",
};


export const FirebaseContext = React.createContext<{database : firebase.firestore.Firestore | null}>({database :null})


export const useFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }else {
        firebase.app(); // if already initialized, use that one
    }

    const database = firebase.firestore();

    return {database}
}