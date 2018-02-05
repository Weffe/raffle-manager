import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA7-PYQA2mMdHS-dBbOKbbjYBPiXC4uHtA",
    authDomain: "club-raffle-manager.firebaseapp.com",
    databaseURL: "https://club-raffle-manager.firebaseio.com",
    projectId: "club-raffle-manager",
    storageBucket: "club-raffle-manager.appspot.com",
    messagingSenderId: "177049236256"
};

const firebaseConn = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const database = firebaseConn.database();
export const ticketsRef = database.ref('/tickets');

