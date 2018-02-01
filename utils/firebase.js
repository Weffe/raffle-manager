import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDsSbvLXWiiHdiw9lrnDJg5f1cezkZHgiU",
    authDomain: "raffle-manager.firebaseapp.com",
    databaseURL: "https://raffle-manager.firebaseio.com",
}

const firebaseConn = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const database = firebaseConn.database();