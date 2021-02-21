import firebase from "firebase/app";

export interface firebaseDate {seconds : number}
export interface TeamDonor {firstName : string, id:string}
export interface LastDonor {teamDonorId : string, createdAt : Date | firebaseDate}


export const addDonor = async (database : firebase.firestore.Firestore | null) => {
    await database?.collection("teamDonor").add({
        firstName: "Ada",
    })
}
export const getTeamDonors = async (database : firebase.firestore.Firestore | null) => {
    const usersData = await database?.collection("teamDonor").get();
    let users : TeamDonor[] = [];
    usersData?.forEach((doc) => {
        users.push(doc.data() as TeamDonor) 
    });
    console.log(users)
    return users
}

export const getLastDonors = async (database : firebase.firestore.Firestore | null) => {
    const usersData = await database?.collection("lastDonor").get();
    let users : LastDonor[] = [];
    usersData?.forEach((doc) => {
        users.push(doc.data() as LastDonor) 
    });
    return users.sort((a, b) => (a.createdAt as firebaseDate).seconds - (b.createdAt as firebaseDate).seconds)
}

export const saveLastDonor = async (database : firebase.firestore.Firestore | null, user : TeamDonor) => {
    await database?.collection("lastDonor").add({
        teamDonorId: user.id,
        createdAt : new Date()
    })
}
