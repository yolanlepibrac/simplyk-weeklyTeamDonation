import * as React from "react"
import firebase from "firebase/app";
import 'firebase/firestore'
import { getLastDonors, getTeamDonors, LastDonor, TeamDonor } from "../api/api";


const config = {
  apiKey: "AIzaSyCfLwp2BJ31sDS4e2Sk8cNUOjDcyU2bXmM",
  authDomain: "simplykweeklyteamdonation.firebaseapp.com",
  projectId: "simplykweeklyteamdonation",
  storageBucket: "simplykweeklyteamdonation.appspot.com",
  messagingSenderId: "898543390041",
  appId: "1:898543390041:web:29e1953576541c3a09d048",
  databaseURL: "https://simplykweeklyteamdonation.firebaseio.com",
};


export const FirebaseContext = React.createContext<{database : firebase.firestore.Firestore | null, teamDonors : TeamDonor[] | null, lastDonors : LastDonor[] | null, refetchLastDonors:() => Promise<void>}>({database :null, teamDonors:null, lastDonors :null, refetchLastDonors : async () => {} })


export const useFirebase = () => {
    const [teamDonors, setTeamDonors] = React.useState<TeamDonor[] | null>(null)
    const [lastDonors, setLastDonors] = React.useState<LastDonor[] | null>(null)

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }else {
        firebase.app();
    }
    const database = firebase.firestore();

    React.useEffect(() => {
        async function getAndSetDonor() {
            const teamDonors  = await getTeamDonors(database)
            setTeamDonors(teamDonors)
            const lastDonors  = await getLastDonors(database)
            setLastDonors(lastDonors)
        }    
        getAndSetDonor();
    }, [])

    const refetchLastDonors = async () => {
        const lastDonors  = await getLastDonors(database)
        setLastDonors(lastDonors)
    }

    return {database, teamDonors, lastDonors, refetchLastDonors}
}