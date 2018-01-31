import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDsSbvLXWiiHdiw9lrnDJg5f1cezkZHgiU",
    authDomain: "raffle-manager.firebaseapp.com",
    databaseURL: "https://raffle-manager.firebaseio.com",
}

const firebaseConn = firebase.initializeApp(config);

export const database = firebaseConn.database();