import * as firebase from "firebase";
import uuidv4 from 'uuid/v4'

const firebaseConfig = {
    apiKey: "AIzaSyDsSbvLXWiiHdiw9lrnDJg5f1cezkZHgiU",
    authDomain: "raffle-manager.firebaseapp.com",
    databaseURL: "https://raffle-manager.firebaseio.com",
    projectId: "raffle-manager",
    storageBucket: "raffle-manager.appspot.com",
    messagingSenderId: "384429168266"
};

const firebaseConn = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const database = firebaseConn.database();
export const adminRef = database.ref('admin/');
export const usersRef = database.ref('users/');
export const ticketsRef = database.ref('tickets/');

export async function createAccount(firstName, lastName, username, password) {
    const _id = uuidv4();

    await usersRef.child(_id).set({
        _id,
        firstName,
        lastName,
        username,
        password
    })

    return await ticketsRef.child(_id).set({
        firstName,
        lastName,
        ticketCount: 1,
        lastUpdated: firebase.database.ServerValue.TIMESTAMP
    })
}

